import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import { createMemberInCRM, initMemberStructures, writeActivationRecord } from "./src/gatekeeper/api/crm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock database for the server
  const members: any[] = [];
  const activations: any[] = [];
  const lunaProfiles: any[] = [];
  const notePadPages: any[] = [];
  const backPocketItems: any[] = [];

  // API Routes
  
  // 1. Signup API
  app.post("/api/signup", async (req, res) => {
    const { fullName, chosenMemberName, email, password, subscriptionTier } = req.body;
    
    const memberId = `MTT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
    const profileId = `LP-${memberId}`;
    
    const member = {
      id: memberId,
      displayName: chosenMemberName,
      fullName,
      email,
      createdAt: new Date().toISOString(),
      lunaProfileId: profileId,
      subscriptionTier,
      isActivated: false,
      hasMetLuna: false
    };
    
    members.push(member);
    
    // CRM Integration
    await createMemberInCRM(member);
    
    console.log(`[GateKeeper CRM] New member added: ${memberId}`);
    res.json({ success: true, memberId, member });
  });

  // 2. Send Confirmation Email API
  app.post("/api/sendConfirmationEmail", (req, res) => {
    const { memberId, email, displayName } = req.body;
    
    const activationLink = `${process.env.APP_URL || 'http://localhost:3000'}/activate/${memberId}`;
    
    console.log(`[Luna Email] Sending to ${email}...`);
    console.log(`Subject: Welcome, ${displayName} — Your Journey Begins`);
    console.log(`Body: Hello, ${displayName}. Your path has opened.`);
    console.log(`Link: ${activationLink}`);
    
    res.json({ success: true, message: "Email sent (check server logs)" });
  });

  // 3. Activate Member API
  app.post("/api/activateMember/:memberId", async (req, res) => {
    const { memberId } = req.params;
    const memberIndex = members.findIndex(m => m.id === memberId);
    if (memberIndex === -1) return res.status(404).json({ success: false, message: "Member not found" });
    
    // Initialize structures
    const { lunaProfile, indexPage, backPocketItems: bpItems } = await initMemberStructures(memberId);
    
    lunaProfiles.push(lunaProfile);
    notePadPages.push(indexPage);
    backPocketItems.push(...bpItems);
    
    // Write activation record
    await writeActivationRecord(memberId);
    
    // Mark as activated
    members[memberIndex].isActivated = true;
    
    console.log(`[GateKeeper CRM] Member activated: ${memberId}`);
    res.json({ success: true, member: members[memberIndex] });
  });

  // 4. Luna Profile API
  app.post("/api/members/:memberId/met-luna", (req, res) => {
    const { memberId } = req.params;
    const index = members.findIndex(m => m.id === memberId);
    if (index !== -1) {
      members[index].hasMetLuna = true;
      res.json({ success: true, member: members[index] });
    } else {
      res.status(404).json({ error: "Member not found" });
    }
  });

  app.get("/api/members/:memberId/profile", (req, res) => {
    const profile = lunaProfiles.find(p => p.memberId === req.params.memberId);
    res.json(profile || { error: "Profile not found" });
  });

  app.post("/api/members/:memberId/profile/evolve", (req, res) => {
    const index = lunaProfiles.findIndex(p => p.memberId === req.params.memberId);
    if (index !== -1) {
      lunaProfiles[index] = { ...lunaProfiles[index], ...req.body, lastInteractionAt: new Date().toISOString() };
      res.json(lunaProfiles[index]);
    } else {
      res.status(404).json({ error: "Profile not found" });
    }
  });

  // 5. NotePad API
  app.get("/api/members/:memberId/notepad", (req, res) => {
    const pages = notePadPages.filter(p => p.memberId === req.params.memberId);
    res.json(pages);
  });

  app.post("/api/members/:memberId/notepad", (req, res) => {
    const newPage = { ...req.body, id: `page-${Date.now()}`, memberId: req.params.memberId };
    notePadPages.push(newPage);
    res.json(newPage);
  });

  // 6. BackPocket API
  app.get("/api/members/:memberId/backpocket", (req, res) => {
    const items = backPocketItems.filter(i => i.memberId === req.params.memberId);
    res.json(items);
  });

  // 7. Get All Members API (for GateKeeper)
  app.get("/api/gatekeeper/members", (req, res) => {
    const membersWithActivation = members.map(member => ({
      ...member,
      activation: activations.find(a => a.memberId === member.id)
    }));
    res.json({ members: membersWithActivation });
  });

  // 5. Get Single Member API (for GateKeeper)
  app.get("/api/gatekeeper/members/:memberId", (req, res) => {
    const { memberId } = req.params;
    const member = members.find(m => m.id === memberId);
    const activation = activations.find(a => a.memberId === memberId);
    
    if (!member) {
      return res.status(404).json({ success: false, message: "Member not found" });
    }
    
    res.json({ member, activation });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import { Member, LunaProfile, NotePadPage, BackPocketItem } from "../../types/luna";

/**
 * GateKeeper CRM API
 * These functions are used by the backend to manage the CRM structure.
 */

export async function createMemberInCRM(member: Member): Promise<void> {
  // In this mock, the server.ts handles the storage in its memory.
  // In a real app, this would write to a database or filesystem.
  console.log(`[GateKeeper CRM] Creating profile for: ${member.id}`);
}

export async function initMemberStructures(memberId: string): Promise<{
  lunaProfile: LunaProfile;
  indexPage: NotePadPage;
  backPocketItems: BackPocketItem[];
}> {
  const lunaProfile: LunaProfile = {
    id: `LP-${memberId}`,
    memberId,
    tone: "warm",
    teachingStyle: "step-by-step",
    supportLevel: "gentle",
    lastInteractionAt: new Date().toISOString(),
    interactionCount: 0,
    tags: ["new_Finder"]
  };

  const indexPage: NotePadPage = {
    id: `index-${memberId}`,
    memberId,
    title: "Journey Index",
    content: "# Your Journey Begins\nWelcome to your NotePad.",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    pageNumber: 1,
    type: "index"
  };

  const backPocketItems: BackPocketItem[] = [];

  return { lunaProfile, indexPage, backPocketItems };
}

export async function writeActivationRecord(memberId: string): Promise<void> {
  const activationRecord = {
    activatedAt: new Date().toISOString(),
    activatedByLink: true,
    memberId
  };
  console.log(`[GateKeeper CRM] Writing activation record for: ${memberId}`, activationRecord);
}

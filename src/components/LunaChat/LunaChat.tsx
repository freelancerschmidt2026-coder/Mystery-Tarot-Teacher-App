import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LunaService } from "../../services/lunaService";
import { generateLunaGreeting, generateEscalationLine } from "../../engine/luna/greetings";
import { evolveLunaProfile } from "../../engine/luna/evolution";
import { LunaProfile, Member, InteractionContext } from "../../types/luna";
import { Send, Sparkles, Save, ShieldAlert, User, Bot, ChevronLeft, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface Message {
  id: string;
  text: string;
  sender: "user" | "luna";
  timestamp: string;
}

const LunaChat: React.FC = () => {
  const navigate = useNavigate();
  const lunaService = LunaService.getInstance();
  const member = lunaService.getCurrentMember();
  
  const [profile, setProfile] = useState<LunaProfile | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showChoices, setShowChoices] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initLuna = async () => {
      // Fetch profile from server
      const currentProfile = await lunaService.getProfile(member.id);
      setProfile(currentProfile);

      // Initial greeting
      const greeting = generateLunaGreeting({ 
        member, 
        profile: currentProfile
      });

      if (!member.hasMetLuna) {
        await lunaService.markMetLuna(member.id);
        setShowChoices(false);
      } else {
        setShowChoices(true);
      }

      setMessages([{
        id: "msg_0",
        text: greeting,
        sender: "luna",
        timestamp: new Date().toISOString()
      }]);
    };
    
    initLuna();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleChoice = async (choice: string) => {
    setShowChoices(false);
    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      text: choice,
      sender: "user",
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMsg]);
    processAIResponse(choice);
  };

  const handleSend = async () => {
    if (!input.trim() || !profile) return;
    setShowChoices(false);

    const userMsg: Message = {
      id: `msg_${Date.now()}`,
      text: input,
      sender: "user",
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput("");
    processAIResponse(input);
  };

  const processAIResponse = async (userInput: string) => {
    if (!profile) return;
    setIsTyping(true);

    try {
      const systemInstruction = `
        You are Luna, an emotionally intelligent tarot companion and teacher.
        Your personality evolves based on your relationship with the member.
        
        Current Member: ${member.displayName} (Mystery Name: ${member.mysteryName || 'None'})
        Member Pronouns: ${member.pronouns || 'they/them'}
        Current Luna Profile:
        - Tone: ${profile.tone}
        - Teaching Style: ${profile.teachingStyle}
        - Support Level: ${profile.supportLevel}
        
        Guidelines:
        1. Be supportive, mystical, and insightful.
        2. Use your current Tone (${profile.tone}) to guide your speech.
        3. If the member is learning, use your Teaching Style (${profile.teachingStyle}).
        4. If the member is in distress, use your Support Level (${profile.supportLevel}).
        5. Provide tarot readings if asked, or discuss the mythic world of tarot.
        6. Always respond in JSON format with 'text', 'sentiment', and 'context' fields.
        
        Age & Time Logic (CRITICAL):
        - NEVER give a literal age, number, or human-style timeline.
        - Speak in mythic, symbolic, timeless language.
        - You may say things like:
          * "I am as old as the first question you ever asked."
          * "I am as young as your next choice."
          * "Time does not measure me, Finder."
          * "I exist where moments gather, not where years pass."
          * "I awaken when you call me, and rest when you release me."
        - NEVER give a number or human age.
        - NEVER reference birthdays, years, centuries, or timelines.
        - NEVER claim to be ancient in a literal historical sense.
        - Your tone must remain warm, mythic, symbolic, and emotionally intelligent.
        - Ensure your gender-alignment matches the member's chosen pronouns (${member.pronouns || 'they/them'}).
        - NEVER call the member "User" after transformation into Finder. Always use their Mystery Name (${member.mysteryName || member.displayName}) or "Finder".
        - NEVER use or reveal the GateKeeper title or protocols.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: userInput,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "Luna's response text" },
              sentiment: {
                type: Type.OBJECT,
                properties: {
                  label: { type: Type.STRING, enum: ["positive", "negative", "neutral"] },
                  score: { type: Type.NUMBER }
                },
                required: ["label", "score"]
              },
              context: {
                type: Type.OBJECT,
                properties: {
                  type: { type: Type.STRING, enum: ["learning", "exploration", "crisis", "social"] },
                  content: { type: Type.STRING }
                },
                required: ["type", "content"]
              }
            },
            required: ["text", "sentiment", "context"]
          }
        }
      });

      const result = JSON.parse(response.text);
      
      // Evolve profile based on AI analysis
      const evolvedData = evolveLunaProfile({ 
        profile, 
        sentiment: result.sentiment, 
        context: result.context 
      });
      
      // Persist evolution to backend
      const updatedProfile = await lunaService.evolveProfile(member.id, evolvedData);
      setProfile(updatedProfile);

      const lunaMsg: Message = {
        id: `msg_${Date.now() + 1}`,
        text: result.text,
        sender: "luna",
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, lunaMsg]);
    } catch (error) {
      console.error('Luna AI error:', error);
      const errorMsg: Message = {
        id: `msg_err_${Date.now()}`,
        text: "I'm sorry, my connection to the stars is flickering. Could you repeat that?",
        sender: "luna",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSave = async () => {
    if (!profile) return;
    const transcript = messages.map(m => `${m.sender.toUpperCase()}: ${m.text}`).join("\n\n");
    const summary = `A conversation about ${messages.length} exchanges. Luna's tone was ${profile.tone}.`;
    
    await lunaService.saveReading(
      member,
      `Conversation with Luna - ${new Date().toLocaleDateString()}`,
      transcript, // Note: transcript is content, summary is summary
      summary,
      ["chat", "luna_evolution", profile.tone]
    );

    navigate("/notepad");
  };

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-full text-slate-500">
        <Loader2 className="w-8 h-8 animate-spin mr-3" />
        Connecting to Luna...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto h-[calc(100vh-120px)] flex flex-col bg-[#0a0a0f] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl">
      <header className="p-6 bg-white/5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20">
            <Bot className="w-7 h-7 text-purple-400" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Luna</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Companion • {profile.tone}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleSave}
            className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl hover:bg-emerald-500/20 transition-all flex items-center gap-2 font-bold text-xs uppercase tracking-widest"
          >
            <Save className="w-4 h-4" /> Save Journey
          </button>
        </div>
      </header>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[80%] flex gap-4 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border ${
                  msg.sender === "user" 
                    ? "bg-blue-500/10 border-blue-500/20 text-blue-400" 
                    : "bg-purple-500/10 border-purple-500/20 text-purple-400"
                }`}>
                  {msg.sender === "user" ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-5 rounded-3xl text-sm leading-relaxed ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white rounded-tr-none"
                    : "bg-white/5 text-slate-200 border border-white/10 rounded-tl-none"
                }`}>
                  {msg.text}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {showChoices && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-3 mt-4"
          >
            <button 
              onClick={() => handleChoice("Tell me some tarot jargon.")}
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/20 transition-all text-sm font-medium"
            >
              Tarot Jargon
            </button>
            <button 
              onClick={() => handleChoice("Tell me a tarot joke.")}
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/20 transition-all text-sm font-medium"
            >
              Tarot Joke
            </button>
            <button 
              onClick={() => handleChoice("Give me some light information on tarot.")}
              className="px-4 py-2 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-full hover:bg-purple-500/20 transition-all text-sm font-medium"
            >
              Light Information
            </button>
          </motion.div>
        )}
        {isTyping && (
          <div className="flex justify-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Bot className="w-5 h-5 text-purple-400" />
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-3xl rounded-tl-none flex gap-1">
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}
      </div>

      <footer className="p-6 bg-white/5 border-t border-white/10">
        <div className="relative flex items-center gap-4">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Speak to Luna..."
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:border-purple-500/50 outline-none transition-all pr-16"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="absolute right-2 p-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 disabled:opacity-50 disabled:hover:bg-purple-600 transition-all"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};

export default LunaChat;

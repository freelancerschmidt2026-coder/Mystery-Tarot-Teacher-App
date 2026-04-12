import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GateKeeperCRM } from "../../api/crm";
import { Member, LunaProfile, NotePadPage, BackPocketItem } from "../../types/luna";
import { 
  ChevronLeft, 
  Book, 
  Pocket, 
  UserCircle, 
  CreditCard, 
  Plus, 
  ShieldCheck, 
  Calendar, 
  Tag, 
  Activity, 
  MessageSquare, 
  Clock 
} from "lucide-react";
import ReactMarkdown from "react-markdown";

const MemberDetail: React.FC = () => {
  const { memberId } = useParams<{ memberId: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [profile, setProfile] = useState<LunaProfile | null>(null);
  const [pages, setPages] = useState<NotePadPage[]>([]);
  const [backPocket, setBackPocket] = useState<BackPocketItem[]>([]);
  const [payments, setPayments] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"notepad" | "backpocket" | "profile" | "payments">("profile");

  const crm = GateKeeperCRM.getInstance();

  useEffect(() => {
    const fetchData = async () => {
      if (!memberId) return;
      const allMembers = await crm.getAllMembers();
      const m = allMembers.find(x => x.id === memberId);
      if (m) {
        setMember(m);
        const p = await crm.getMemberLunaProfile(memberId);
        if (p) setProfile(p);
        const bp = await crm.getMemberBackPocket(memberId);
        setBackPocket(bp);
        const pay = await crm.getMemberPayments(memberId);
        setPayments(pay);
        
        // Fetch NotePad pages
        const np = await crm.getMemberNotePad(memberId);
        setPages(np);
      }
    };
    fetchData();
  }, [memberId]);

  if (!member) return <div className="p-8 text-white">Member not found.</div>;

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8 bg-[#0a0a0f] min-h-screen text-white">
      <header className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-6">
          <Link to="/gatekeeper" className="p-3 bg-white/5 rounded-2xl hover:bg-white/10 transition-colors text-slate-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-black tracking-tighter uppercase">{member.displayName}</h1>
              <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold rounded-full uppercase tracking-widest">
                {member.mysteryName}
              </span>
            </div>
            <p className="text-slate-500 font-medium mt-1">Member ID: <span className="text-slate-400">{member.id}</span></p>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-2 font-bold text-sm uppercase tracking-widest">
            <Plus className="w-4 h-4" /> Add Note
          </button>
          <button className="px-6 py-3 bg-amber-600 text-white rounded-2xl hover:bg-amber-500 transition-all flex items-center gap-2 font-bold text-sm uppercase tracking-widest shadow-lg shadow-amber-900/20">
            <CreditCard className="w-4 h-4" /> Charge Member
          </button>
        </div>
      </header>

      <nav className="flex gap-2 p-1 bg-white/5 rounded-3xl border border-white/10 w-fit">
        {[
          { id: "profile", label: "Luna Profile", icon: UserCircle },
          { id: "notepad", label: "NotePad", icon: Book },
          { id: "backpocket", label: "BackPocket", icon: Pocket },
          { id: "payments", label: "Payments", icon: CreditCard },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all ${
              activeTab === tab.id 
                ? "bg-amber-500 text-black shadow-lg shadow-amber-500/20" 
                : "text-slate-500 hover:text-white hover:bg-white/5"
            }`}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </nav>

      <main className="bg-white/5 border border-white/10 rounded-[40px] p-10 shadow-2xl">
        {activeTab === "profile" && profile && (
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Activity className="w-6 h-6 text-amber-500" />
                Evolution State
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Current Tone</p>
                  <p className="text-xl font-bold text-amber-400 capitalize">{profile.tone}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Teaching Style</p>
                  <p className="text-xl font-bold text-amber-400 capitalize">{profile.teachingStyle}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Support Level</p>
                  <p className="text-xl font-bold text-amber-400 capitalize">{profile.supportLevel}</p>
                </div>
                <div className="p-6 bg-white/5 rounded-3xl border border-white/10">
                  <p className="text-xs uppercase tracking-widest text-slate-500 font-bold mb-2">Interactions</p>
                  <p className="text-xl font-bold text-amber-400">{profile.interactionCount}</p>
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                <Tag className="w-6 h-6 text-amber-500" />
                Accumulated Tags
              </h2>
              <div className="flex flex-wrap gap-3">
                {profile.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-2xl font-bold text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
              <div className="p-8 bg-black/40 rounded-[32px] border border-white/5 space-y-4">
                <h3 className="text-sm uppercase tracking-widest text-slate-500 font-black">Last Interaction</h3>
                <div className="flex items-center gap-4">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <p className="text-slate-300">{new Date(profile.lastInteractionAt).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "notepad" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Member NotePad</h2>
              <button className="px-4 py-2 bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
                Add Manual Page
              </button>
            </div>
            {pages.length > 0 ? (
              <div className="grid gap-6">
                {pages.map(page => (
                  <div key={page.id} className="p-8 bg-white/5 rounded-[32px] border border-white/10 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 flex items-center justify-center bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold">
                          {page.pageNumber}
                        </span>
                        <h3 className="text-xl font-bold">{page.title}</h3>
                      </div>
                      <span className="px-3 py-1 bg-white/5 text-[10px] uppercase tracking-widest font-black text-slate-500 rounded-lg">
                        {page.type}
                      </span>
                    </div>
                    <div className="prose prose-invert max-w-none text-slate-400 text-sm line-clamp-3">
                      <ReactMarkdown>{page.content}</ReactMarkdown>
                    </div>
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest font-bold text-slate-600">
                      <span>Created: {new Date(page.createdAt).toLocaleDateString()}</span>
                      <Link to={`/notepad/${page.pageNumber}`} className="text-amber-500 hover:text-amber-400 transition-colors">
                        View Full Page
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-black/20 rounded-[40px] border border-dashed border-white/10">
                <Book className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                <p className="text-slate-500">No pages found in this member's NotePad.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "backpocket" && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">BackPocket Items</h2>
              <button className="px-4 py-2 bg-amber-600 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-amber-500 transition-all flex items-center gap-2">
                <Plus className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {backPocket.map(item => (
                <div key={item.id} className="p-6 bg-white/5 rounded-3xl border border-white/10 flex items-start gap-4">
                  <div className="p-3 bg-amber-500/10 rounded-2xl">
                    <Pocket className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.label}</h3>
                    <p className="text-slate-400 text-sm mt-1">{item.description}</p>
                    <span className="inline-block mt-3 px-2 py-1 bg-white/5 text-[10px] uppercase tracking-widest font-black text-slate-500 rounded-lg">
                      {item.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold">Transaction History</h2>
            <div className="overflow-hidden rounded-3xl border border-white/10">
              <table className="w-full text-left border-collapse">
                <thead className="bg-white/5">
                  <tr>
                    <th className="p-6 text-xs uppercase tracking-widest text-slate-500 font-black">Date</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-slate-500 font-black">Description</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-slate-500 font-black">Amount</th>
                    <th className="p-6 text-xs uppercase tracking-widest text-slate-500 font-black">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {payments.map(payment => (
                    <tr key={payment.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-6 text-sm text-slate-400">{new Date(payment.createdAt).toLocaleDateString()}</td>
                      <td className="p-6 text-sm font-bold text-white">{payment.description}</td>
                      <td className="p-6 text-sm font-bold text-amber-400">${payment.amount.toFixed(2)}</td>
                      <td className="p-6">
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest rounded-full">
                          {payment.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MemberDetail;

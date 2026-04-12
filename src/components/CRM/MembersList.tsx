import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GateKeeperCRM } from "../../api/crm";
import { Member } from "../../types/luna";
import { Search, User, ChevronRight, ShieldCheck } from "lucide-react";

const MembersList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const crm = GateKeeperCRM.getInstance();

  useEffect(() => {
    const fetchMembers = async () => {
      const all = await crm.getAllMembers();
      setMembers(all);
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(m => 
    m.displayName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.mysteryName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-8 space-y-8 bg-[#0a0a0f] min-h-screen text-white">
      <header className="flex items-center justify-between border-b border-white/10 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-amber-500/10 rounded-3xl border border-amber-500/20">
            <ShieldCheck className="w-10 h-10 text-amber-400" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tighter uppercase">GateKeeper CRM</h1>
            <p className="text-slate-500 font-medium">Managing the Finder's Path</p>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search members..." 
            className="pl-12 pr-6 py-3 bg-white/5 border border-white/10 rounded-2xl focus:border-amber-500/50 outline-none w-80 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </header>

      <div className="grid gap-4">
        {filteredMembers.length > 0 ? (
          filteredMembers.map(member => (
            <Link 
              key={member.id} 
              to={`/gatekeeper/member/${member.id}`}
              className="group flex items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-3xl transition-all"
            >
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 flex items-center justify-center bg-amber-500/5 rounded-2xl border border-amber-500/10 group-hover:border-amber-500/30 transition-all">
                  <User className="w-8 h-8 text-amber-500/50 group-hover:text-amber-400 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">{member.displayName}</h3>
                  <p className="text-slate-500 italic">Mystery Name: <span className="text-slate-300">{member.mysteryName}</span></p>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right hidden md:block">
                  <p className="text-xs uppercase tracking-widest text-slate-600 font-bold mb-1">Joined</p>
                  <p className="text-sm text-slate-400">{new Date(member.createdAt).toLocaleDateString()}</p>
                </div>
                <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-amber-400 transition-all" />
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10">
            <p className="text-slate-500">No members found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MembersList;

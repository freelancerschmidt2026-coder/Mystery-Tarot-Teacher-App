import React from 'react';

export default function MysteryPrizesWon() {
  // This would normally come from a global state or backend
  const prizes = [
    { name: "Mystery Question Mark Prize", description: "Earned by finding the daily prize mark.", date: new Date().toLocaleDateString() }
  ];

  return (
    <div className="min-h-screen bg-black p-10 border-2 border-[#00a3ff] m-4 rounded-xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#ff4ffb]/5 to-transparent pointer-events-none" />
      <h1 className="text-4xl font-bold text-[#ff8c00] mb-8 relative z-10">Your Mystery Prizes</h1>
      
      <div className="grid gap-6 relative z-10">
        {prizes.map((prize, idx) => (
          <div key={idx} className="bg-zinc-900/80 backdrop-blur-sm p-6 rounded-lg border border-[#6EC1FF]/30 hover:border-[#6EC1FF] transition-all">
            <h3 className="text-2xl font-semibold text-[#6EC1FF] mb-2">{prize.name}</h3>
            <p className="text-zinc-300 mb-4">{prize.description}</p>
            <div className="text-sm text-zinc-500">Earned on: {prize.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

import React from 'react';

export default function MysteryTeacherPrizeRoom() {
  return (
    <div className="min-h-screen bg-black p-10 border-2 border-[#00a3ff] m-4 rounded-xl">
      <h1 className="text-4xl font-bold text-[#ff8c00] mb-6">Mystery Teacher Luna - Prize Room</h1>
      <div className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800">
        <p className="text-[#ff8c00] text-xl mb-4">Congratulations, Finder!</p>
        <p className="text-zinc-400 leading-relaxed">
          You have unlocked a secret lesson from the Mystery Teacher. 
          This sacred space holds the wisdom you've earned through your intuition.
        </p>
        <div className="mt-10 p-6 border border-dashed border-[#ff8c00]/30 rounded-lg">
          <p className="text-zinc-500 italic">Lesson content loading from the digital stars...</p>
        </div>
      </div>
    </div>
  );
}

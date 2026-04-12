import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { MajorArcanaCard } from "../../types";
import { runMajorArcanaExperience } from "../../engine/majorArcana/runMajorArcanaExperience";
import type { MajorOrientation } from "../../engine/majorArcana/types";
import { LunaService } from "../../services/lunaService";

interface Props {
  card: MajorArcanaCard;
  orientation: MajorOrientation;
  onComplete?: (result: ReturnType<typeof runMajorArcanaExperience>) => void;
}

export const MajorArcanaExperienceScene: React.FC<Props> = ({
  card,
  orientation,
  onComplete
}) => {
  const navigate = useNavigate();
  const orientationData =
    orientation === "upright" ? card.upright : card.reversed;

  const [input, setInput] = useState("");
  const [result, setResult] = useState<
    ReturnType<typeof runMajorArcanaExperience> | null
  >(null);

  const handleSubmit = async () => {
    const experienceResult = runMajorArcanaExperience(card, orientation, input);
    setResult(experienceResult);
    
    // Save to LunaService
    const lunaService = LunaService.getInstance();
    const member = lunaService.getCurrentMember();
    
    await lunaService.saveReading(
      member,
      `${card.name} - ${orientation.charAt(0).toUpperCase() + orientation.slice(1)}`,
      experienceResult.experienceSummary,
      `Prompt: ${orientationData.prompt}\n\nUser Input: ${input}\n\nExperience Result: ${experienceResult.experienceSummary}`,
      ['major_arcana', card.id, orientation]
    );

    onComplete?.(experienceResult);
  };

  const handleFinish = () => {
    navigate("/notepad");
  };

  return (
    <div className="major-experience p-8 bg-[#0d0d14] border border-white/5 rounded-3xl space-y-6">
      <div className="world-description text-slate-400 italic leading-relaxed">
        {orientationData.world}
      </div>

      <div className="prompt text-2xl font-bold text-white">
        {orientationData.prompt}
      </div>

      <textarea
        className="w-full h-32 bg-white/5 border border-white/10 rounded-2xl p-4 text-white focus:border-purple-500/50 outline-none transition-colors"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your answer..."
      />

      <button 
        className="px-8 py-3 bg-white text-black font-bold rounded-xl hover:bg-purple-400 transition-colors"
        onClick={handleSubmit}
      >
        Continue
      </button>

      {result && (
        <div className="result mt-8 p-6 bg-purple-500/5 border border-purple-500/20 rounded-2xl space-y-4">
          <div className="summary text-slate-200 leading-relaxed">
            {result.experienceSummary}
          </div>

          <div className="reward flex items-center gap-2 text-emerald-400">
            <strong className="text-xs uppercase tracking-widest text-slate-500">Reward:</strong> {result.reward.name}
          </div>

          {result.featureUnlock.enabled && (
            <div className="unlock flex items-center gap-2 text-blue-400">
              <strong className="text-xs uppercase tracking-widest text-slate-500">Unlocked:</strong> {result.featureUnlock.name}
            </div>
          )}

          <button 
            className="w-full mt-4 px-8 py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-500 transition-colors"
            onClick={handleFinish}
          >
            Go to NotePad
          </button>
        </div>
      )}
    </div>
  );
};

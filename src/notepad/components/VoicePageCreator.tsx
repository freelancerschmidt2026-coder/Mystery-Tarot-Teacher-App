import React, { useState } from "react";
import { motion } from "framer-motion";
import { NotebookPage } from "../pages/PageSystem";

interface VoicePageCreatorProps {
  onCreate: (page: NotebookPage) => void;
}

declare global {
  interface Window {
    webkitSpeechRecognition?: any;
    SpeechRecognition?: any;
  }
}

export const VoicePageCreator: React.FC<VoicePageCreatorProps> = ({
  onCreate,
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.onresult = (event: any) => {
      const text = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join(" ");
      setTranscript(text);
    };

    recognition.start();
  };

  const createFromTranscript = () => {
    if (!transcript.trim()) return;

    onCreate({
      id: `voice-page-${Date.now()}`,
      title: "Voice‑Captured Reflection",
      content: transcript,
    });

    setTranscript("");
  };

  return (
    <motion.div
      className="p-6 rounded-xl bg-black/60 border border-[#7ffcff]/30 text-white mt-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-semibold mb-3">
        Voice‑Driven Page Creation
      </h2>

      <p className="text-sm opacity-80 mb-3">
        Speak your reflection, and Luna will capture it as a page.
      </p>

      <div className="flex gap-3 mb-3">
        <motion.button
          onClick={startListening}
          className={`px-4 py-2 rounded-md border ${
            isListening
              ? "border-red-400 text-red-300"
              : "border-[#7ffcff]/40 text-white"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isListening ? "Listening…" : "Start Listening"}
        </motion.button>

        <motion.button
          onClick={createFromTranscript}
          disabled={!transcript.trim()}
          className={`px-4 py-2 rounded-md border ${
            transcript.trim()
              ? "border-green-400 text-green-300 hover:bg-green-400/10"
              : "border-white/20 text-white/40 cursor-not-allowed"
          }`}
          whileHover={transcript.trim() ? { scale: 1.05 } : {}}
          whileTap={transcript.trim() ? { scale: 0.95 } : {}}
        >
          Create Page from Voice
        </motion.button>
      </div>

      <textarea
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Transcript will appear here…"
        className="w-full p-2 rounded bg-black/40 border border-white/20 text-white h-24 text-sm"
      />
    </motion.div>
  );
};

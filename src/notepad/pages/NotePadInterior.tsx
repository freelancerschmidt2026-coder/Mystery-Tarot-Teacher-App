import React from "react";
import { motion } from "framer-motion";

const NotePadInterior: React.FC = () => {
  return (
    <motion.div
      className="p-8 rounded-xl bg-black/70 border border-[#7ffcff]/30 shadow-[0_0_30px_rgba(127,252,255,0.3)] text-white"
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.9, ease: "easeOut" }}
    >
      {/* Header */}
      <h1 className="text-3xl font-bold mb-4 tracking-wide">
        Your NotePad Interior
      </h1>

      {/* Description */}
      <p className="opacity-80 leading-relaxed">
        This is the sacred interior of your notebook. Soon, this space will hold:
      </p>

      {/* Feature List */}
      <ul className="mt-4 space-y-2 opacity-90">
        <li>• Your personal pages</li>
        <li>• Luna‑generated templates</li>
        <li>• Tarot training modules</li>
        <li>• Course content</li>
        <li>• Ritual notes and spreads</li>
      </ul>

      {/* Footer */}
      <p className="mt-6 opacity-70">
        More features will unlock as your journey continues.
      </p>
    </motion.div>
  );
};

export default NotePadInterior;

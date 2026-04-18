import React from "react";
import { motion } from "framer-motion";

const NotePadInterior: React.FC = () => {
  return (
    <motion.div
      className="p-8 rounded-xl bg-black/70 border border-[#7ffcff]/30 shadow-[0_0_30px_rgba(127,252,255,0.3)] text-white"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h1 className="text-3xl font-bold mb-4">Your NotePad Interior</h1>

      <p className="opacity-80 leading-relaxed">
        This is the sacred interior of your notebook. Soon, this space will hold:
      </p>

      <ul className="mt-4 space-y-2 opacity-90">
        <li>• Your personal pages</li>
        <li>• Luna‑generated templates</li>
        <li>• Tarot training modules</li>
        <li>• Course content</li>
        <li>• Ritual notes and spreads</li>
      </ul>

      <p className="mt-6 opacity-70">
        More features will unlock as your journey continues.
      </p>
    </motion.div>
  );
};

export default NotePadInterior;

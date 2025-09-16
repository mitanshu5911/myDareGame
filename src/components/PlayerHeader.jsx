// src/components/PlayerHeader.jsx
import { motion } from "framer-motion";
import { User, Heart } from "lucide-react";

export default function PlayerHeader({ maleName, femaleName, activePlayer }) {
  return (
    <div className="flex justify-center items-center gap-6 mb-8">
      {/* Male Player */}
      <motion.div
        animate={activePlayer === 0 ? { scale: 1.1 } : { scale: 1 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition shadow-md
          ${
            activePlayer === 0
              ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white font-bold"
              : "bg-rose-100 text-rose-500"
          }`}
      >
        <User size={18} />
        <span>{maleName}</span>
      </motion.div>

      {/* Heart icon between names */}
      <Heart className="text-rose-500" size={22} />

      {/* Female Player */}
      <motion.div
        animate={activePlayer === 1 ? { scale: 1.1 } : { scale: 1 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl transition shadow-md
          ${
            activePlayer === 1
              ? "bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold"
              : "bg-rose-100 text-rose-500"
          }`}
      >
        <User size={18} />
        <span>{femaleName}</span>
      </motion.div>
    </div>
  );
}

// src/components/LevelSelector.jsx
import { motion } from "framer-motion";

export default function LevelSelector({ currentLevel, maxLevel, jumpToLevel }) {
  return (
    <div className="flex flex-col items-center mb-6">
      {/* Heading */}
      <h2 className="text-lg font-semibold text-rose-600 mb-3">
        Choose Level
      </h2>

      {/* Level Buttons */}
      <div className="flex flex-wrap gap-3 justify-center">
        {Array.from({ length: maxLevel }, (_, i) => i + 1).map((level) => (
          <motion.button
            key={level}
            onClick={() => jumpToLevel(level)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`w-12 h-12 rounded-full font-semibold shadow-md transition 
              ${
                level === currentLevel
                  ? "bg-gradient-to-r from-rose-400 to-pink-500 text-white shadow-lg"
                  : "bg-rose-100 text-rose-600 hover:bg-rose-200"
              }`}
          >
            {level}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

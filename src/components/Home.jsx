// src/components/Home.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, User } from "lucide-react";
import { saveToStorage } from "../utils/storage";

export default function Home({ onStart }) {
  const [maleName, setMaleName] = useState("");
  const [femaleName, setFemaleName] = useState("");

  const handleStart = (mode) => {
    const trimmedMale = maleName.trim();
    const trimmedFemale = femaleName.trim();

    if (!trimmedMale || !trimmedFemale) {
      alert("Please enter both names ❤️");
      return;
    }

    // Save to storage so GameBoard can restore state if refreshed
    saveToStorage("players", { maleName: trimmedMale, femaleName: trimmedFemale });
    saveToStorage("mode", mode);

    // Send data up to parent App.jsx
    onStart({ maleName: trimmedMale, femaleName: trimmedFemale, mode });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-100 to-red-200 p-6">
      {/* Title */}
      <motion.h1
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-rose-600 drop-shadow-lg mb-2"
      >
        Enjoy Night
      </motion.h1>
      <p className="text-rose-500 mb-8 italic">Play together, feel closer ❤️</p>

      {/* Player Inputs */}
      <div className="w-full max-w-md space-y-6">
        {/* Male Name */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="relative"
        >
          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
          <input
            type="text"
            placeholder="Enter Male Name"
            value={maleName}
            onChange={(e) => setMaleName(e.target.value)}
            className="w-full px-12 py-4 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          />
        </motion.div>

        {/* Female Name */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="relative"
        >
          <Heart className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-400" />
          <input
            type="text"
            placeholder="Enter Female Name"
            value={femaleName}
            onChange={(e) => setFemaleName(e.target.value)}
            className="w-full px-12 py-4 rounded-2xl bg-white/60 backdrop-blur-md shadow-lg focus:outline-none focus:ring-2 focus:ring-rose-400 transition"
          />
        </motion.div>
      </div>

      {/* Mode Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 mt-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleStart("level")}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-lg"
        >
          Level by Level
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleStart("random")}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold shadow-lg"
        >
          All Randoms
        </motion.button>
      </div>
    </div>
  );
}

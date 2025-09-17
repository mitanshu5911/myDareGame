import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Home from "./components/Home";
import GameBoard from "./components/GameBoard";

export default function App() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const handleStart = ({ maleName, femaleName, mode }) => {
    setPlayerData({ maleName, femaleName, mode });
    setShowIntro(true); // Show intro first
    setTimeout(() => {
      setShowIntro(false);
      setGameStarted(true); // Then start the game
    }, 5500); // 2.5s intro
  };

  const handleRestart = () => {
    setGameStarted(false);
    setPlayerData(null);
  };

  if (showIntro) {
    return (
      <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-300 via-rose-200 to-red-400 overflow-hidden">
        {/* Floating hearts */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-pink-400"
            style={{
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 20}px`,
              top: "-10%",
            }}
            animate={{ y: "120vh", rotate: Math.random() * 360 }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            <Heart />
          </motion.div>
        ))}

        {/* Main intro text */}
        <motion.div
          initial={{ scale: 0.6, rotateX: -20, opacity: 0 }}
          animate={{ scale: 1, rotateX: 0, opacity: 1 }}
          transition={{ duration: 1.2, type: "spring", stiffness: 100 }}
          className="text-center relative z-10"
        >
          <motion.h1
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-xl"
          >
            Let's Play the Game! ❤️
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-4 text-lg md:text-xl text-white/90 italic drop-shadow-lg"
          >
            Ready for some romantic fun together?
          </motion.p>
        </motion.div>
      </div>
    );
  }

  if (!gameStarted) {
    return <Home onStart={handleStart} />;
  }

  return (
    <GameBoard
      maleName={playerData.maleName}
      femaleName={playerData.femaleName}
      mode={playerData.mode}
      onRestart={handleRestart}
    />
  );
}

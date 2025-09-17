import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import useGame from "../hooks/useGame";
import Card from "./Card";
import Controls from "./Controls";
import PlayerHeader from "./PlayerHeader";
import LevelSelector from "./LevelSelector";
import Modal from "./Modal";
import { clearStorage } from "../utils/storage";
import { Heart } from "lucide-react";

export default function GameBoard({ maleName, femaleName, mode, onRestart }) {
  const {
    currentCard,
    next,
    prev,
    started,
    currentLevel,
    jumpToLevel,
    activePlayer,
    deckLength,
    position,
    initGame,
    resetAll,
  } = useGame({ maleName, femaleName, mode });

  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    initGame(mode);
  }, [initGame, mode]);

  // Generate a fixed array of hearts
  const heartsArray = [...Array(35)];

  if (!currentCard) {
    return (
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-rose-100 to-pink-200 p-6 overflow-hidden">
        {/* Falling hearts */}
        {started &&
          heartsArray.map((_, i) => (
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

        <p className="text-xl font-bold text-rose-600 mb-6">
          Now it's your turn! Have fun and fuck guys!🎉
        </p>
        <button
          onClick={() => {
            resetAll();
            clearStorage();
            onRestart();
          }}
          className="px-6 py-3 rounded-xl bg-rose-500 text-white shadow-md hover:bg-rose-600"
        >
          Restart Game
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-rose-100 to-pink-200 p-6 overflow-hidden">
      {/* Falling hearts */}
      {started &&
        heartsArray.map((_, i) => (
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

      <PlayerHeader
        maleName={maleName}
        femaleName={femaleName}
        activePlayer={activePlayer}
      />

      {mode === "level" && (
        <LevelSelector
          currentLevel={currentLevel}
          maxLevel={5}
          jumpToLevel={jumpToLevel}
        />
      )}

      <Card text={currentCard.text} />

      <Controls
        prev={prev}
        next={next}
        disablePrev={position <= 0 && currentLevel === 1}
        disableNext={!started}
      />

      <p className="mt-4 text-sm text-rose-500">
        Card {position + 1} of {deckLength}
      </p>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-6 px-4 py-2 bg-rose-400 text-white rounded-xl shadow-md hover:opacity-90"
      >
        Show Rules / Info
      </button>

      <Modal
        isOpen={isModalOpen}
        title="Game Instructions"
        message="Click the card to flip, use Next/Prev to navigate, and select levels above. Enjoy your romantic dare game!"
        onClose={() => setModalOpen(false)}
      />

      <button
        onClick={() => {
          resetAll();
          clearStorage();
          onRestart();
        }}
        className="mt-4 px-4 py-2 bg-rose-600 text-white rounded-xl shadow-md hover:opacity-90"
      >
        Restart Game
      </button>
    </div>
  );
}

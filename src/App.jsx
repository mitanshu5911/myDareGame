import { useState } from "react";
import Home from "./components/Home";
import GameBoard from "./components/GameBoard";
import { loadFromStorage } from "./utils/storage";

export default function App() {
  const [gameData, setGameData] = useState(() => {
    const players = loadFromStorage("players");
    const mode = loadFromStorage("mode");
    return players && mode ? { ...players, mode } : null;
  });

  const handleStart = (data) => {
    setGameData(data); // only store names & mode
  };

  const handleRestart = () => {
    setGameData(null); // Go back to Home
  };

  if (!gameData) return <Home onStart={handleStart} />;

  return (
    <GameBoard
      maleName={gameData.maleName}
      femaleName={gameData.femaleName}
      mode={gameData.mode}
      onRestart={handleRestart}
    />
  );
}

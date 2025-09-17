// src/hooks/useGame.js
import { useEffect, useState, useCallback } from "react";
import shuffle from "../utils/shuffle";
import { DARES } from "../data/dares";
import { saveToStorage, loadFromStorage } from "../utils/storage";

const STORAGE_KEY = "dare_game_state_v1";

function buildRandomDeck() {
  return shuffle(
    Object.keys(DARES)
      .map(Number)
      .flatMap((lvl) =>
        DARES[lvl].map((text, idx) => ({ level: lvl, idx, text }))
      )
  );
}

function buildLevelDeck(level, shuffleInside = true) {
  const arr = DARES[level].map((text, idx) => ({ level, idx, text }));
  return shuffleInside ? shuffle(arr) : arr.slice();
}

export default function useGame({ maleName, femaleName, mode: initialMode }) {
  const maxLevel = Math.max(...Object.keys(DARES).map(Number));

  const [mode, setMode] = useState(initialMode || "level");
  const [currentLevel, setCurrentLevel] = useState(1);
  const [deck, setDeck] = useState([]);
  const [position, setPosition] = useState(0);
  const [activePlayer, setActivePlayer] = useState(0);
  const [started, setStarted] = useState(false);

  // Load saved state on mount
  useEffect(() => {
    const saved = loadFromStorage(STORAGE_KEY, null);
    if (saved && saved.mode && saved.deck && saved.started) {
      setMode(saved.mode);
      setCurrentLevel(saved.currentLevel || 1);
      setDeck(saved.deck);
      setPosition(saved.position || 0);
      setActivePlayer(saved.activePlayer || 0);
      setStarted(true);
    }
  }, []);

  // Persist relevant state
  useEffect(() => {
    saveToStorage(STORAGE_KEY, {
      mode,
      currentLevel,
      deck,
      position,
      activePlayer,
      started,
    });
  }, [mode, currentLevel, deck, position, activePlayer, started]);

  // Initialize game
  const initGame = useCallback(
    (newMode = "level") => {
      setMode(newMode);
      setActivePlayer(0);
      setStarted(true);
      setCurrentLevel(1);

      if (newMode === "random") {
        const newDeck = buildRandomDeck();
        setDeck(newDeck);
        setPosition(0);
      } else {
        const newDeck = buildLevelDeck(1, true);
        setDeck(newDeck);
        setPosition(0);
      }
    },
    []
  );

  const currentCard = started ? deck[position] || null : null;

  // Next card
  const next = useCallback(() => {
    if (!deck || deck.length === 0) return;

    if (position < deck.length - 1) {
      setPosition((p) => p + 1);
      setActivePlayer((a) => 1 - a);
      return;
    }

    if (mode === "level" && currentLevel < maxLevel) {
      const nextLevel = currentLevel + 1;
      const nextDeck = buildLevelDeck(nextLevel, true);
      setCurrentLevel(nextLevel);
      setDeck(nextDeck);
      setPosition(0);
      setActivePlayer((a) => 1 - a);
    } else {
      setStarted(false); // game over
    }
  }, [deck, position, mode, currentLevel, maxLevel]);

  // Previous card
  const prev = useCallback(() => {
    if (position > 0) {
      setPosition((p) =>  - 1);
      setActivePlayer((a) => 1 - a);
    } else if (mode === "level" && currentLevel > 1) {
      const prevLevel = currentLevel - 1;
      const prevDeck = buildLevelDeck(prevLevel, true);
      setCurrentLevel(prevLevel);
      setDeck(prevDeck);
      setPosition(prevDeck.length - 1);
      setActivePlayer((a) => 1 - a);
    }
  }, [position, mode, currentLevel]);

  // Jump to specific level
  const jumpToLevel = useCallback(
    (level) => {
      if (mode !== "level" || !DARES[level]) return;
      const levelDeck = buildLevelDeck(level, true);
      setCurrentLevel(level);
      setDeck(levelDeck);
      setPosition(0);
      setActivePlayer(0);
    },
    [mode]
  );

  // Reset all state
  const resetAll = useCallback(() => {
    setMode(initialMode || "level");
    setCurrentLevel(1);
    setDeck([]);
    setPosition(0);
    setActivePlayer(0);
    setStarted(false);
    saveToStorage(STORAGE_KEY, null);
  }, [initialMode]);

  return {
    maleName,
    femaleName,
    mode,
    started,
    currentLevel,
    position,
    currentCard,
    activePlayer,
    initGame,
    next,
    prev,
    jumpToLevel,
    resetAll,
    deckLength: deck.length,
  };
}

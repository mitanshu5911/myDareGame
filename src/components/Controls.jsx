// src/components/Controls.jsx
import { useEffect } from "react";

export default function Controls({ prev, next, disablePrev, disableNext }) {
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft" && !disablePrev) prev?.();
      if (e.key === "ArrowRight" && !disableNext) next?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [prev, next, disablePrev, disableNext]);

  return (
    <div className="flex gap-4 mt-6 justify-center">
      {/* Prev button */}
      <button
        onClick={prev}
        disabled={disablePrev}
        className={`px-6 py-3 rounded-xl shadow-md font-semibold transition 
          ${
            disablePrev
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-300 to-pink-400 text-white hover:opacity-90"
          }`}
      >
        Prev
      </button>

      {/* Next button */}
      <button
        onClick={next}
        disabled={disableNext}
        className={`px-6 py-3 rounded-xl shadow-md font-semibold transition 
          ${
            disableNext
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-500 to-pink-600 text-white hover:opacity-90"
          }`}
      >
        Next
      </button>
    </div>
  );
}

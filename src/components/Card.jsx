// src/components/Card.jsx
import { useState,useEffect } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Card({ text }) {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped(true); // flip once to reveal

  useEffect(() => {
    setFlipped(false);
  }, [text]);

  return (
    <div
      className="w-80 h-60 perspective cursor-pointer"
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Back Side - shown initially */}
        <div
          className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-2xl shadow-lg p-6"
          style={{
            background: "linear-gradient(135deg, #ff9a9e, #fecfef)",
            color: "#fff",
          }}
        >
          <div className="text-center">
            <Heart size={50} className="mx-auto mb-2 text-pink-400 animate-pulse" />
            <p className="text-lg font-semibold">Tap to Reveal ❤️</p>
          </div>
        </div>

        {/* Front Side - shows the text */}
        <div
          className="absolute w-full h-full backface-hidden flex items-center justify-center rounded-2xl shadow-lg p-6 rotate-y-180"
          style={{
            background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
            color: "#fff",
          }}
        >
          <div className="text-center">
            <Heart size={40} className="mx-auto mb-2 text-red-400 animate-bounce" />
            <p className="text-lg font-bold">{flipped?text:""}</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

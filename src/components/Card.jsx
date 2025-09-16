// src/components/Card.jsx
import { motion } from "framer-motion";

export default function Card({ text }) {
  return (
    <motion.div
      initial={{ rotateY: 90, opacity: 0 }}
      animate={{ rotateY: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-80 min-h-[200px] bg-white rounded-2xl shadow-lg flex items-center justify-center p-6 text-center"
    >
      <p className="text-lg font-semibold text-rose-600">{text}</p>
    </motion.div>
  );
}

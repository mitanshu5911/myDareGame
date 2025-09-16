// src/components/Modal.jsx
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Modal({ isOpen, title, message, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Title */}
            <h3 className="text-xl font-bold text-rose-600 mb-2">{title}</h3>

            {/* Message */}
            <p className="text-rose-500 mb-6">{message}</p>

            {/* Close button */}
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 transition"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

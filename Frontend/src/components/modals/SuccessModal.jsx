import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect } from "react";

const SuccessModal = ({ isOpen, message, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const audio = new Audio("/success-sound.mp3")
      audio.volume = 0.3
      audio.play().catch(err => console.log("Sound play error:", err))
    }
  }, [isOpen])
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white p-8 rounded-[40px] shadow-2xl flex flex-col items-center max-w-xs w-full mx-4"
          >
            {/* Style Animated Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2
              }}
              className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-emerald-100"
            >
              {/* Animated Tick */}
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Check size={48} className="text-white" strokeWidth={4} />
              </motion.div>
            </motion.div>

            <h2 className="text-xl font-black text-slate-900 text-center mb-2 uppercase tracking-tight">
              Awesome!
            </h2>
            <p className="text-sm font-bold text-slate-500 text-center uppercase tracking-widest leading-relaxed">
              {message || "Operation Completed Successfully"}
            </p>

            <button
              onClick={onClose}
              className="mt-8 px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-[2px] rounded-2xl hover:bg-slate-800 transition-all active:scale-95"
            >
              Done
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SuccessModal;
import { motion, AnimatePresence } from "framer-motion";
import { AlertCircle, X } from "lucide-react";

const ErrorModal = ({ isOpen, message, onClose }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-300 flex items-center justify-center px-4">


                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
                    />


                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 rounded-[3rem] w-full max-w-sm text-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
                    >

                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-linear-to-r from-transparent via-red-500 to-transparent opacity-50" />


                        <div className="relative w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                className="absolute inset-0 bg-red-500/20 rounded-full"
                            />
                            <AlertCircle className="text-red-500 w-10 h-10 relative z-10" />
                        </div>


                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-3">
                            Action <span className="text-red-500">Failed</span>
                        </h2>
                        <p className="text-slate-300 text-sm font-medium leading-relaxed mb-8">
                            {message || "Something went wrong. Please try again later."}
                        </p>


                        <button
                            onClick={onClose}
                            className="w-full py-4 bg-linear-to-r from-red-600 to-rose-600 text-white rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-red-500/20 hover:shadow-red-500/40 hover:-translate-y-0.5 transition-all active:scale-95"
                        >
                            Understand & Close
                        </button>


                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ErrorModal;
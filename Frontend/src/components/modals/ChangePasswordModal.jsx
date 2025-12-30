import { useState } from "react";
import { X, Lock, Loader2 } from "lucide-react";
import authService from "../../features/auth/authService"; // Tera updated service
import { motion, AnimatePresence } from "framer-motion";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return alert("Naya password match nahi ho raha bhai!");
    }

    setLoading(true);
    try {
      const res = await authService.changePassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });
      alert(res.message || "Password changed! ✅");
      onClose(); // Modal band kar do
    } catch (err) {
      alert(err.response?.data?.message || "Kuch error aa gaya!");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 pointer-events-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200"><Lock size={18} strokeWidth={2.5} /></div>
              <h2 className="font-black text-slate-900 uppercase tracking-tight">Change Admin Password</h2>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Asporea SDTC Security</p>
            </div>
            <button onClick={onClose} className=" p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-all duration-300 cursor-pointer"><X size={20} /></button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6 bg-white cursor-default">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 px-1">Current Password</label>
              <input 
                type="password" required
                onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                className=" w-full p-4 bg-slate-200 border-slate-700 text-slate-900 rounded-2xl outline-none font-bold text-sm transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 cursor-text placeholder:text-slate-400"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 px-1">New Password</label>
              <input 
                type="password" required
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className=" w-full p-4  bg-slate-200 border-slate-700 text-slate-900 rounded-2xl outline-none font-bold text-sm transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 cursor-text placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase text-slate-500 px-1">Confirm New Password</label>
              <input 
                type="password" required
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className=" w-full p-4  bg-slate-200 border-slate-700 text-slate-900 rounded-2xl outline-none font-bold text-sm transition-all focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 cursor-text placeholder:text-slate-300"
                placeholder="••••••••"
              />
            </div>

            <button 
              disabled={loading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="animate-spin" size={16}/> : "Update Password"}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ChangePasswordModal;
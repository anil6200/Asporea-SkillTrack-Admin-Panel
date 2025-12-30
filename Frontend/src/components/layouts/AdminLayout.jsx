import Sidebar from "./sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";

const AdminLayout = () => {
  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ duration: 20, repeat: Infinity }} className="absolute -top-40 -left-40 w-150 h-150 bg-indigo-200 rounded-full blur-[120px]" />
        <motion.div animate={{ scale: [1, 1.1, 1], x: [0, -50, 0] }} transition={{ duration: 25, repeat: Infinity }} className="absolute -bottom-40 -right-40 w-150 h-150 bg-purple-200 rounded-full blur-[120px]" />
      </div>

      <Sidebar />

      <div className="flex-1 flex flex-col relative z-10">
        <Navbar />
        <main className="flex-1 p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
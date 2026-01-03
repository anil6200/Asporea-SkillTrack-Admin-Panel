import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; //
import { LayoutDashboard, Users, BookOpen, ClipboardCheck } from "lucide-react";
import { useSelector } from "react-redux";
import SuccessModal from "../modals/SuccessModal";
import { useState } from "react";



const Sidebar = () => {
  const navigate = useNavigate()
  const [showNavSuccess, setShowNavSuccess] = useState(false);
  const [navMsg, setNavMsg] = useState("");
  const menuItems = [
    { path: "/Dashboard", name: "Dashboard", icon: <LayoutDashboard size={20} />, end: true },
    { path: "/candidates", name: "Candidates", icon: <Users size={20} /> },
    { path: "/courses", name: "Courses", icon: <BookOpen size={20} /> },
    { path: "/assessments", name: "Assessments", icon: <ClipboardCheck size={20} /> },
  ];

  const handleNav = (e, path, name) => {                  // Navigation interceptor function
    e.preventDefault();
    setNavMsg(`${name} Section Loaded!`);
    setShowNavSuccess(true);
    setTimeout(() => {
      setShowNavSuccess(false);
      navigate(path);
    }, 1000);
  };
  const { stats } = useSelector((state) => state.dashboard);

  const total = (stats?.appliedCandidates || 0) + (stats?.trainingCandidates || 0) + (stats?.placedCandidates || 0);

  const getWidth = (value) => (total > 0 ? (value / total) * 100 : 0);      // Percentage logic


  return (
    <aside className="w-64 bg-[#0f172a] h-screen flex flex-col border-r border-slate-800">
      <div className="p-8">
        <h2 className="text-2xl font-black text-white italic tracking-tighter">
          Skill<span className="text-indigo-500">Track</span>
        </h2>
        <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 transition-transform hover:scale-105">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.end}
            onClick={(e) => handleNav(e, item.path, item.name)}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group ${isActive ? "text-white" : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-indigo-600 shadow-lg shadow-indigo-500/30 rounded-2xl -z-10"
                  />
                )}
                <span className={`${isActive ? "text-white" : "text-slate-500 group-hover:text-indigo-400"}`}>
                  {item.icon}
                </span>
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* SIDEBAR FOOTER: Live Metrics Status Analytics Breakdown */}
      <div className="mt-auto bg-slate-900 px-6 py-8 text-white relative overflow-hidden">

        {/* Background Accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-indigo-500 via-purple-500 to-emerald-500 opacity-30" />

        <div className="flex items-center justify-between mb-6 relative z-10">
          <h3 className="text-[12px] font-black text-slate-300 uppercase tracking-[0.2em]">
            Status Analytics
          </h3>
          {/* Pulse indicator placed next to title */}
          <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
        </div>

        <div className="space-y-5 relative z-10">
          {/* Applied  Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">Applied</span>
              <span className="text-xs font-black text-white">{stats?.appliedCandidates || 0}</span>
            </div>
            {/* Darker track, thicker bar */}
            <div className="h-2.5 w-full bg-slate-800/50 rounded-sm overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-amber-400 transition-all duration-1000 ease-out"
                style={{ width: `${getWidth(stats?.appliedCandidates)}%` }}
              />
            </div>
          </div>

          {/* Training  Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">In Training</span>
              <span className="text-xs font-black text-white">{stats?.trainingCandidates || 0}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800/50 rounded-sm overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-indigo-500 transition-all duration-1000 ease-out"
                style={{ width: `${getWidth(stats?.trainingCandidates)}%` }}
              />
            </div>
          </div>

          {/* Placed  Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-tight">Placed Success</span>
              <span className="text-xs font-black text-emerald-400">{stats?.placedCandidates || 0}</span>
            </div>
            <div className="h-2.5 w-full bg-slate-800/50 rounded-sm overflow-hidden border border-slate-700/50">
              <div
                className="h-full bg-emerald-500 transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                style={{ width: `${getWidth(stats?.placedCandidates)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Node Identifier */}
        <div className="mt-8 pt-4 border-t border-slate-800/50 relative z-10">
          <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] text-center">
            BGD-SDTC-01
          </p>
        </div>
      </div>
      <SuccessModal
        isOpen={showNavSuccess}
        message={navMsg}
        onClose={() => setShowNavSuccess(false)}
      />
    </aside>
  );
};

export default Sidebar;
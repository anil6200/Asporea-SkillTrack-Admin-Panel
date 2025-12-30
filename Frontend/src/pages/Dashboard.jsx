import { Users, BookOpen, ClipboardCheck, CheckCircle, PlusCircle, Activity } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardStats } from "../features/dashboard/dashboardSlice"; 
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 
import timeActivity from "../utils/timeActivity";
import TrendChart from "../components/trendChart/trendChart";


const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stats, isLoading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  if (isLoading) return <div className="p-8 text-center text-indigo-600 font-black animate-pulse uppercase tracking-widest text-xs">Synchronizing Dashboard...</div>;

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-10 p-2">
  
    {/*  BRANDED HEADER: Bagdogra Centre Branding */}
    <div className="flex justify-between items-end">
      <div className="space-y-1">
        {/* Location Badge */}
        <div className="flex items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 bg-indigo-100 text-indigo-700 rounded-md text-[9px] font-black uppercase tracking-widest border border-indigo-200 shadow-sm">
            Bagdogra Training Centre
          </span>
          <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">
            • West Bengal 
          </span>
        </div>
  
        <h1 className="text-4xl font-black text-slate-900 tracking-tight italic leading-none">
          Admin <span className="text-indigo-600 font-black">Console</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-2">
          Real-time metrics for Asporea Skill Development Training Centre ..
        </p>
      </div>
  
      {/*  Right side date display */}
      <div className="hidden md:block text-right pb-1">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Reporting Date</p>
        <p className="text-sm font-bold text-slate-900">
          {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
        </p>
      </div>
    </div>
   

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-transform hover:scale-103">
        <StatCard label="Total Candidates" value={stats?.totalCandidates || 0} icon={<Users />} color="indigo" onClick={() => navigate("/candidates")} />
        <StatCard label="Total Courses" value={stats?.totalCourses || 0} icon={<BookOpen />} color="blue" onClick={() => navigate("/courses")} />
        <StatCard label="Assessments" value={stats?.totalAssessments || 0} icon={<ClipboardCheck />} color="yellow" onClick={() => navigate("/assessments")} />
        <StatCard label="Successfully Placed" value={stats?.placedCandidates || 0} icon={<CheckCircle />} color="green" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col: Activity  */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
             <div className="flex justify-between items-center mb-5">
                <h3  className="text-sm font-black text-slate-900 flex items-center gap-2">
                <Activity size={16} className="text-indigo-500"/> Recent Activity</h3>
             </div>
             <div className="space-y-4">
                {stats?.recentActivities?.length > 0 ? (
                  stats.recentActivities.map((activity, index) => (
                    <div 
                      key={index} 
                      className="flex gap-3 items-start p-1" // Removed cursor-pointer, hover, and navigation
                    >
                      {/* Indicator */}
                      <div className="w-2.5 h-2.5 rounded-full bg-slate-300 mt-1.5 shrink-0" />
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-[12.5px] font-bold text-slate-600 leading-tight">
                          {activity.message}
                        </p>
                        {/* RESTORED: Timeago feature */}
                        <p className="text-[10.5px] text-slate-500 font-bold uppercase mt-0.5 tracking-tighter">
                          {timeActivity(activity.createdAt)}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-400 font-medium italic">No recent activity found.</p>
                )}
             </div>
          </div>
        </div>
        

        {/* Right Col */}
        <div className="space-y-8  mt-32.5">
           {/* QUICK CONTROLS */}
          <div className="bg-slate-900 rounded-2xl p-3 text-white shadow-lg">
            <h3 className="text-sm font-black mb-4 flex items-center gap-2 text-indigo-400 uppercase tracking-widest">
              <PlusCircle size={16}/> Quick Controls
            </h3>
            <div className="grid gap-2 transition-transform hover:scale-107">
              <ActionButton label="Register Candidate" onClick={() => navigate("/candidates")} />
              <ActionButton label="New Course" onClick={() => navigate("/courses")} />
              <ActionButton label="Create Assessment" onClick={() => navigate("/assessments")} />
            </div>
          </div>
        </div>
        <div className="w-full transition-transform hover:scale-107 mix-blend-multiply">
            <TrendChart data={stats?.enrollmentTrends} />
          </div>
        
      </div>
    </motion.div>
  );
};

/* components polish  */

const StatCard = ({ label, value, icon, color, onClick }) => {
  const themeStyles = {
    indigo: { bg: "bg-indigo-600", lightBg: "bg-indigo-50", text: "text-indigo-600" },
    blue: { bg: "bg-blue-600", lightBg: "bg-blue-50", text: "text-blue-600" },
    yellow: { bg: "bg-amber-500", lightBg: "bg-amber-50", text: "text-amber-600" },
    green: { bg: "bg-emerald-600", lightBg: "bg-emerald-50", text: "text-emerald-600" },
  };

  const style = themeStyles[color];

  return (
    <motion.div 
      whileHover={{ 
        y: -5,
        backgroundColor: "var(--hover-bg)", 
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.setProperty('--hover-bg', color === 'yellow' ? '#f59e0b' : color === 'indigo' ? '#4f46e5' : color === 'blue' ? '#2563eb' : '#10b981');
      }}
      onClick={onClick}
      className={`
        relative group overflow-hidden bg-white p-6 rounded-2xl shadow-sm border border-slate-100 
        flex flex-col justify-between h-40 transition-all duration-300
        ${onClick ? "cursor-pointer hover:shadow-xl hover:shadow-indigo-100" : ""}
      `}
    >
      {/* Icon Section: Becomes white on hover */}
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300
        ${style.lightBg} ${style.text} group-hover:bg-white/20 group-hover:text-white
      `}>
        {icon}
      </div>

      {/* Text Section: Becomes white on hover */}
      <div className="relative z-10">
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter transition-colors duration-300 group-hover:text-white">
          {value}
        </h2>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1 transition-colors duration-300 group-hover:text-white/80">
          {label}
        </p>
      </div>
    </motion.div>
  );
};

const ActionButton = ({ label, onClick }) => (
  <button onClick={onClick} className="w-full py-4 bg-white/5 hover:bg-white hover:text-slate-900 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest transition-all">
    {label}
  </button>
);


export default Dashboard;
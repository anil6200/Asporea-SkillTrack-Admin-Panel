import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/auth/authSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, ChevronRight, ShieldCheck, Eye, EyeOff, CheckCircle2 } from "lucide-react"; // Eye icons added
import logo from "../assets/logo 6.png"

const Login = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Toggle state
  const [rememberMe, setRememberMe] = useState(false); // Checkbox state

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, token } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ email: "", password: "" });

  useEffect(() => {
    if (token) {
      const clickSound=new Audio("/login-sound.mp3")
      clickSound.volume=0.4;
      clickSound.play().catch(err => console.log("Sound play blocked:", err));
      const timer = setTimeout(() => {
        navigate("/Dashboard")
      }, 3000) //
      return () => clearTimeout(timer)
    };
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ ...formData, rememberMe }));
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-slate-100 p-4 overflow-hidden">
      {/* SUCCESS OVERLAY: its visible when login */}
      <AnimatePresence>
        {token && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-100 bg-indigo-600/90 backdrop-blur-xl flex flex-col items-center justify-center text-white"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="bg-white/20 p-8 rounded-full mb-6 border border-white/30 shadow-2xl"
            >
              <CheckCircle2 className="w-20 h-20 text-white" />
            </motion.div>
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-black uppercase tracking-[0.3em] italic"
            >
              Access Granted Welcome Sir
            </motion.h2>
            <motion.p className="text-[10px] mt-4 font-bold opacity-60 uppercase tracking-widest">
              Redirecting to Dashboard...
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
      {/* BACKGROUND ANIMATION */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-[#f3f6fc]"> {/* Light base background */}

        {/* Shape 1: Top-Left Large Polygon */}
        <motion.div
          animate={{
            x: [0, 20, -20, 0],
            y: [0, -30, 10, 0],
            rotate: [0, 120, 240, 360],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: 'transform' }} // Performance booster
          className="absolute -top-[30%] -left-[20%] w-[80%] h-[80%] bg-linear-to-br from-indigo-400/40 to-cyan-300/30 rotate-45 z-0"
        />

        {/* Shape 2: Bottom-Right Large Polygon */}
        <motion.div
          animate={{
            x: [0, -30, 20, 0],
            y: [0, 40, -20, 0],
            rotate: [360, 240, 120, 0],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          style={{ willChange: 'transform' }}
          className="absolute -bottom-[40%] -right-[30%] w-[90%] h-[90%] bg-linear-to-tl from-fuchsia-400/30 to-purple-500/20 rotate-30 z-0"
        />

        {/* Shape 3: Center-Right Medium Polygon (Filler) */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
            rotate: [60, 70, 60],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          style={{ willChange: 'transform' }}
          className="absolute top-[20%] -right-[40%] w-[60%] h-[60%] bg-linear-to-bl from-blue-200/60 to-indigo-200/40 rotate-60 z-0"
        />


        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
      </div>

      {/* MAIN CONTAINER: Exit animation  */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05, filter: "blur(20px)" }}
        className="relative z-10 w-full max-w-250 h-150 bg-white/70 backdrop-blur-2xl rounded-[60px] shadow-2xl overflow-hidden flex border border-white/50"
      >

        {/* LEFT PANEL: Welcome Gate */}
        <div className="w-1/2 relative flex flex-col items-center justify-center p-16 text-center overflow-hidden">

          {/*  LOGO */}
          <motion.img
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            src={logo}
            alt="Asporea Logo"
            className="absolute top-3 h-52 w-auto object-contain mix-blend-multiply brightness-110 contrast-125 z-10"
          />

          {/*  CENTERED CONTENT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative z-10 flex flex-col items-center transform translate-y-12"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[12px] font-black text-slate-500 uppercase tracking-[0.12em] mb-5 whitespace-nowrap"
            >
              Asporea Human Resource Consultants <br /> Pvt. Ltd.
            </motion.p>

            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              className="bg-indigo-600 p-5 rounded-3xl mb-8 shadow-xl shadow-indigo-200"
            >
              <ShieldCheck className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="text-4xl font-black text-gray-900 mb-4 tracking-tight italic">Hello, Welcome!</h1>

            <p className="text-gray-600 text-sm mb-12 max-w-xs leading-relaxed font-medium">
              Access the secure administrative gateway of Asporea Skill Development Centre.
            </p>

            <motion.button
              whileHover={{ x: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsLoginVisible(true)}
              className="flex items-center gap-4 px-12 py-4 bg-gray-900 text-white rounded-2xl font-bold hover:bg-black transition-all shadow-xl"
            >
              Open Admin Login <ChevronRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT PANEL*/}
        <div className="w-1/2 relative bg-linear-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-16 text-white text-center overflow-hidden">
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
            className="relative z-10 flex flex-col items-center justify-center"
          >
            <h2 className="text-5xl font-black leading-tight drop-shadow-2xl mb-2 italic text-white">
              Asporea Skill<br /> <span className="text-indigo-200">Development Centre</span>
            </h2>
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "120px", opacity: 1, scaleX: [1, 1.1, 1] }}
              transition={{
                width: { delay: 0.5, duration: 1.5, ease: "easeOut" },
                opacity: { delay: 0.5, duration: 1 },
                scaleX: { repeat: Infinity, duration: 3, ease: "easeInOut" }
              }}
              className="h-1.5 bg-linear-to-r from-transparent via-white/40 to-transparent rounded-full my-8 shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            ></motion.div>
            <p className="tracking-[0.3em] uppercase text-[10px] font-black bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/20 text-white">
              SkillTrack – Admin Portal
            </p>
          </motion.div>
        </div>

        {/* SLIDING OVERLAY: Real Login Form */}
        <AnimatePresence>
          {isLoginVisible && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 80, damping: 20 }}
              className="absolute top-0 right-0 h-full w-1/2 bg-white z-50 border-l border-gray-100 shadow-2xl flex flex-col justify-start pt-22.5 p-16"
            >
              <button onClick={() => setIsLoginVisible(false)} className="absolute top-10 right-10 text-gray-400 hover:text-indigo-600 transition-colors font-black text-xs uppercase tracking-tighter">
                ← Back
              </button>

              <div className="mb-10">
                <h2 className="text-4xl font-black text-gray-900 tracking-tighter">Admin Portal</h2>
                <p className="text-gray-500 text-[10px] mt-2 font-bold uppercase tracking-widest font-sans">Secured Session</p>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-5 ">
                {/* Email Input */}
                <div className="group relative">
                  <Mail className="absolute left-5 top-5 w-5 h-5 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type="email"
                    placeholder="Admin Email"
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-14 pr-6 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white outline-none rounded-3xl transition-all font-bold text-sm"
                  />
                </div>

                {/*  PASSWORD TOGGLE: Type changed based on showPassword state */}
                <div className="group relative">
                  <Lock className="absolute left-5 top-5 w-5 h-5 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    required
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="w-full pl-14 pr-14 py-5 bg-gray-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white outline-none rounded-3xl transition-all font-bold text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-5 text-gray-400 hover:text-indigo-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {/* REMEMBER ME  */}
                <div className="flex items-center justify-between px-2 text-xs font-bold text-gray-500 uppercase tracking-tighter">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 accent-indigo-600"
                    />
                    <span className="group-hover:text-gray-700 transition-colors">Remember Me</span>
                  </label>

                </div>

                <div className="relative w-full"> 
  <AnimatePresence>
    {error && (
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        // 'absolute' aur '-top-14' magic lines hain
        className="absolute -top-14 left-0 w-full text-red-500 text-[10px] font-black text-center bg-red-50/90 backdrop-blur-sm p-3 rounded-xl mt-3 tracking-widest border border-red-100 shadow-sm z-20"
      >
        {error}
      </motion.p>
    )}
  </AnimatePresence>
</div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-5 mt-20 bg-linear-to-r from-indigo-600 to-purple-700 text-white rounded-3xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-indigo-100 disabled:opacity-50"
                >
                  {isLoading ? "Authorizing..." : "Authenticate"}
                </motion.button>
              </form>

              {/*  FOOTER : Added at the bottom of the sliding div */}
              <div className=" absolute bottom-3 left-0 w-full text-center">
                <p className=" text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] ">
                  © 2025 Asporea Skill Development Centre
                </p>
                <p className="text-[9.5px] text-gray-700 font-medium mt-2">
                  SkillTrack Admin Portal v 1.2
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Login;


import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, User, ChevronDown, Camera } from "lucide-react";
import logo from "../../assets/logo 4.png"
import { jwtDecode } from "jwt-decode"
import ChangePasswordModal from "../modals/ChangePasswordModal";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef(null)
  const [profilePic, setProfilePic] = useState(localStorage.getItem("adminAvatar") || null);
  const [searchTerm, setSearchTerm] = useState("")
  const [isPassModalOpen, setIsPassModalOpen] = useState(false)

  const token = sessionStorage.getItem("token")
  let adminEmail = "Admin Session"

  if (token) {
    try {
      const decoded = jwtDecode(token)
      adminEmail = decoded.email || decoded.sub || "Admin Access";
    } catch (err) {
      console.error("Token decoding operation failed", err)
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      if (file.size > 2 * 1024 * 1024) {
        alert("Bhai, photo 2MB se kam rakho varna session storage bhar jayegi!");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setProfilePic(base64String);

        localStorage.setItem("adminAvatar", base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${searchTerm}`);       // admin ko search page par bhejo query ke sath
      setSearchTerm("");                         // Input clear karne ke liye
    }
  };


  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
      <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-40">

        {/* LEFT: Logo & all*/}
        <div className="flex items-center gap-4">
          <img src={logo} alt="Asporea" className="h-11 w-auto object-contain mix-blend-multiply transition-transform hover:scale-109" />
          <div className="hidden lg:block h-8 w-[0.5px] bg-slate-200 mx-2" />
          <div className="hidden lg:block leading-none">
            <h1 className="text-sm font-black text-slate-900 tracking-tighter uppercase">Bagdogra <span className="text-indigo-600">SDTC</span></h1>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skill Development & Training Portal</p>
          </div>
        </div>

        {/* CENTER: Search */}
        <div className="flex-1 flex justify-center px-4">
          <form onSubmit={handleSearch} className="relative w-full max-w-60 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
            <input
              type="text"
              placeholder="Global search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-2xl text-xs font-bold outline-none focus:ring-4 focus:ring-indigo-50 focus:bg-white transition-all"
            />
          </form>
        </div>

        {/* RIGHT: Profile & Logout */}
        <div className="flex items-center gap-4 transition-transform hover:scale-106">
          <input type="file" ref={fileInputRef} onChange={handleImageChange} className="hidden" accept="image/*" />

          {/* Profile Capsule  */}
          <div className="flex items-center gap-1 bg-slate-50 rounded-2xl border border-slate-100 p-1 hover:bg-white hover:shadow-md transition-all">

            {/* Avatar Click -> Change Photo */}
            <div
              onClick={() => fileInputRef.current.click()}
              className="relative w-10 h-10 rounded-full overflow-hidden bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-100 ring-2 ring-white cursor-pointer group/avatar"
            >
              {profilePic ? (
                <img src={profilePic} alt="Admin" className="w-full h-full object-cover object-center" />
              ) : (
                <span className="text-xs font-black uppercase">
                  {adminEmail !== "Admin Session" ? adminEmail.charAt(0) : <User size={16} />}
                </span>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/avatar:opacity-100 transition-opacity">
                <Camera size={14} className="text-white" />
              </div>
            </div>

            {/* Text Click -> Open Change Password Modal */}
            <div
              onClick={() => setIsPassModalOpen(true)}
              className="flex items-center gap-3 pl-1 pr-3 py-1 cursor-pointer group/info"
            >
              <div className="hidden md:block text-left">
                <p className="text-[11px] font-black text-slate-900 leading-tight truncate max-w-35 group-hover/info:text-indigo-600 transition-colors">
                  {adminEmail}
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Update Password</p>
                </div>
              </div>
              <ChevronDown size={14} className="text-slate-300 group-hover/info:text-indigo-600 transition-colors ml-1" />
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="group relative flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-600 rounded-xl text-[11px] font-black uppercase tracking-widest border border-red-100 shadow-sm transition-all hover:bg-red-500 hover:text-white active:scale-95"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/*  Modal ko Header ke bahar render kiya */}
      <ChangePasswordModal
        isOpen={isPassModalOpen}
        onClose={() => setIsPassModalOpen(false)}
      />
    </>
  );
};

export default Navbar;
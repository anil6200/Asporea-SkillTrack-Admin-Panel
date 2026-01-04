import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  fetchCandidates, createCandidate, editCandidate, removeCandidate
} from "../features/candidates/candidateSlice";
import { getDashboardStats } from "../features/dashboard/dashboardSlice";
import {
  Search, Edit2, Trash2, UserPlus, Filter, X, Inbox
} from "lucide-react";
import SuccessModal from "../components/modals/SuccessModal";
import { fetchCourses } from "../features/courses/courseSlice";

const Candidates = () => {
  const dispatch = useDispatch();
  const { candidates } = useSelector((state) => state.candidates);
  const safeCandidates = Array.isArray(candidates) ? candidates : [];
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [formError, setFormError] = useState("");
  const { courses } = useSelector((state) => state.courses);
  const safeCourses = Array.isArray(courses) ? courses : [];


  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [feePaid, setFeePaid] = useState(false);

  useEffect(() => {
    dispatch(fetchCandidates());
    dispatch(fetchCourses());

  }, [dispatch]);

  const statusColor = (status) => {
    const colors = {
      placed: "bg-emerald-50 text-emerald-600 border-emerald-100",
      training: "bg-amber-50 text-amber-600 border-amber-100",
      applied: "bg-indigo-50 text-indigo-600 border-indigo-100",
    };
    return colors[status] || "bg-slate-50 text-slate-600 border-slate-100";
  };

  const statusColorDark = (status) => {
    const colors = {
      placed: "bg-emerald-500/30 text-emerald-300 border-emerald-400/50",
      training: "bg-amber-500/30 text-amber-300 border-amber-400/50",
      applied: "bg-indigo-500/30 text-indigo-300 border-indigo-400/50",
    };
    return colors[status] || "bg-white/10 text-white/80 border-white/20";
  };

  const filteredCandidates = safeCandidates.filter((c) =>
    `${c.fullName} ${c.mobileNumber} ${c.emailAddress}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  // Actions (Logic Intact)
  const handleAdd = () => {
    setSelectedCandidate(null);
    setFeePaid(false);
    setIsModalOpen(true);
  };

  const handleEdit = (candidate) => {
    setSelectedCandidate(candidate);
    setFeePaid(candidate.enrollmentFeePaid);
    setIsModalOpen(true);
  };

  const handleDelete = (candidate) => {
    if (window.confirm(`Are you sure you want to delete ${candidate.fullName}?`)) {
      dispatch(removeCandidate(candidate._id))
        .unwrap()
        .then(() => {
          setSuccessMsg(" Candidate Deleted Successfully!");
          setShowSuccess(true)
          dispatch(fetchCandidates());
          dispatch(getDashboardStats())
        })
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    setFormError("");
    const form = e.target;
    const data = {
      fullName: form.name.value.trim(),
      mobileNumber: form.mobile.value.trim(),
      emailAddress: form.email.value.trim(),
      education: form.education.value.trim(),
      panchayatName: form.panchayat.value.trim(),
      courseApplied: form.course.value,
      status: form.status.value,
      enrollmentFeePaid: feePaid,
    };

    if (selectedCandidate) {
      dispatch(editCandidate({ id: selectedCandidate._id, data }))
        .unwrap()
        .then(() => {
          setSuccessMsg("Candidate Updated Successfully!");
          setShowSuccess(true)
          dispatch(fetchCandidates());
          dispatch(getDashboardStats())
          setIsModalOpen(false);
        })
        .catch((err) => {
          setFormError(err || "update failed")
        })
    } else {
      dispatch(createCandidate(data)).unwrap().then(() => {
        setSuccessMsg("New Candidate Enrolled!");
        setShowSuccess(true);
        dispatch(fetchCandidates());
        dispatch(getDashboardStats());
        setIsModalOpen(false);
      })
        .catch((err) => {
          setFormError(err || "Candidate already exists")
        })
    }

  };

  return (
    <div className="relative min-h-screen bg-[#0a1628] overflow-hidden -m-8 p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 space-y-8 p-2"
      >
        {/*  HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              Candidate <span className="text-purple-400">Management </span>
            </h1>
            <p className="text-white/80 text-sm font-medium mt-1">Manage and track enrollment lifecycle.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-500/30 hover:bg-purple-700 transition-all"
          >
            <UserPlus size={18} /> Add Candidate
          </motion.button>
      </div>

        {/*  SEARCH & FILTER TOOLBAR */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, mobile or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-sm font-bold text-white placeholder:text-white/40 focus:ring-4 focus:ring-purple-500/30 focus:bg-white/20 focus:border-purple-400 outline-none transition-all"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-white/60 italic uppercase tracking-widest hidden md:block">
              ( Note: Filter logic under maintenance sir )
            </span>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20">
            <Filter size={16} /> Filter
          </button>
        </div>

        {/*  TABLE */}
        <div className="bg-white/10 backdrop-blur-xl rounded-4xl border border-white/20 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Full Name & Education </th>
                  <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Mobile Number & Email Address</th>
                  <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Panchayat Name</th>
                  <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Course Applied</th>
                  <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Status</th>
                  <th className="px-6 py-5 text-right text-[11px] font-black uppercase tracking-[0.2em] text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <AnimatePresence>
                  {filteredCandidates.map((c, index) => (
                    <motion.tr
                      key={c._id || index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/10 transition-colors group"
                    >
                      <td className="px-6 py-5">
                        <p className="font-bold text-white">{c.fullName}</p>
                        <p className="text-[10px] text-white/60 font-bold uppercase">{c.education}</p>
                      </td>
                      <td className="px-6 py-5">
                        <p className="text-sm font-medium text-white/90">{c.mobileNumber}</p>
                        <p className="text-xs text-white/60">{c.emailAddress}</p>
                      </td>
                      <td className="px-6 py-5 text-sm font-semibold text-white/80">{c.panchayatName}</td>
                      <td className="px-6 py-5">
                        <span className="px-3 py-1 bg-purple-600/30 text-purple-200 border border-purple-500/30 rounded-lg text-[10px] font-black uppercase tracking-wider">
                          {c.courseApplied}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${statusColorDark(c.status)}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(c)} className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-xl transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(c)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
            {filteredCandidates.length === 0 && (
              <div className="py-20 text-center flex flex-col items-center">
                <Inbox className="w-12 h-12 text-white/30 mb-4" />
                <p className="text-white/60 font-bold uppercase text-xs tracking-widest">No candidates found in registry</p>
              </div>
            )}
          </div>
        </div>

        {/*  MODAL OVERLAY */}
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              <motion.form
                onSubmit={handleSave}
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 20 }}
                className="relative bg-[#1a2332] w-full max-w-2xl rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
              >
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {selectedCandidate ? "Modify Record" : "New Enrollment"}
                    </h2>
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mt-2">Asporea Skill Development & Training Centre</p>
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={20} className="text-white/60" />
                  </button>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormInput name="name" label="Full Name" defValue={selectedCandidate?.fullName} placeholder="Ex: xyz " />
                  <FormInput name="mobile" label="Mobile Number" defValue={selectedCandidate?.mobileNumber} placeholder="10-digit number" />
                  <FormInput name="email" label="Email Address" defValue={selectedCandidate?.emailAddress} placeholder="name@email.com" />
                  <FormInput name="education" label="Education" defValue={selectedCandidate?.education} placeholder="Ex: B.Tech or any " />
                  <div className="md:col-span-2">
                    <FormInput name="panchayat" label="Panchayat Name" defValue={selectedCandidate?.panchayatName} placeholder="Enter Panchayat Name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/80 tracking-widest px-1">Select Course</label>
                    <select
                      name="course"
                      defaultValue={selectedCandidate?.courseApplied || ""}
                      className="w-full p-4 bg-white/10 border-2 border-transparent
               focus:border-purple-400 focus:bg-white/20 outline-none
               rounded-2xl font-bold text-sm text-white transition-all appearance-none"
                    >
                      <option value="" className="bg-[#1a2332]">Choose Course...</option>

                      {safeCourses.map((course) => (
                        <option key={course._id} value={course.courseName} className="bg-[#1a2332]">
                          {course.courseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-white/80 tracking-widest px-1">Current Status</label>
                    <select name="status" defaultValue={selectedCandidate?.status || ""} className="w-full p-4 bg-white/10 border-2 border-transparent focus:border-purple-400 focus:bg-white/20 outline-none rounded-2xl font-bold text-sm text-white transition-all appearance-none">
                      <option value="applied" className="bg-[#1a2332]">Applied</option>
                      <option value="training" className="bg-[#1a2332]">Training</option>
                      <option value="placed" className="bg-[#1a2332]">Placed</option>
                    </select>
                  </div>

                  <div className="md:col-span-2 flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-purple-500/30 transition-transform hover:scale-105">
                    <input
                      type="checkbox"
                      checked={feePaid}
                      onChange={(e) => setFeePaid(e.target.checked)}
                      className="w-5 h-5 rounded border-purple-400 text-purple-600 focus:ring-purple-500 accent-purple-600"
                    />
                    <span className="text-sm font-bold text-white">Enrollment Fee Paid & Verified</span>
                  </div>
                </div>
                {formError && (
                  <div className="mx-8 mb-4 p-3 text-sm font-bold text-red-300 bg-red-500/20 rounded-xl border border-red-500/30">
                    {formError}
                  </div>
                )}
                <div className="p-8 bg-white/5 flex justify-end gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 font-bold text-white/60 hover:text-white text-sm">Cancel</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="px-10 py-3 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all">
                    {selectedCandidate ? "Update Record" : "Finalize Enrollment"}
                  </motion.button>
                </div>
              </motion.form>
            </div>
          )}
        </AnimatePresence>
        <SuccessModal
          isOpen={showSuccess}
          message={successMsg}
          onClose={() => setShowSuccess(false)}
        />
      </motion.div>
    </div>
  );
};

// Sub-component for clean form inputs
const FormInput = ({ name, label, defValue, placeholder }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-white/80 tracking-widest px-1">{label}</label>
    <input
      name={name}
      defaultValue={defValue || ""}
      placeholder={placeholder}
      className="w-full p-4 bg-white/10 border-2 border-transparent focus:border-purple-400 focus:bg-white/20 outline-none rounded-2xl font-bold text-sm text-white transition-all placeholder:text-white/40"
    />
  </div>
);

export default Candidates;
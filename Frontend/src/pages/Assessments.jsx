import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { fetchAssessments, createAssessment, editAssessment } from "../features/assessments/assessmentSlice";
import { fetchCandidates } from "../features/candidates/candidateSlice";
import { getDashboardStats } from "../features/dashboard/dashboardSlice";
import {
  Search, Plus, Edit2, X, Trophy, Star, MessageSquare, GraduationCap, CheckCircle2, AlertCircle
} from "lucide-react"; // Performance icons
import SuccessModal from "../components/modals/SuccessModal";
import ErrorModal from "../components/modals/ErrorModal";


const Assessments = () => {
  const dispatch = useDispatch();
  const { assessments, isLoading } = useSelector((state) => state.assessments);
  const { candidates } = useSelector((state) => state.candidates);
  const safeAssessments = Array.isArray(assessments) ? assessments : [];
  const safeCandidates = Array.isArray(candidates) ? candidates : [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
const [successMsg, setSuccessMsg] = useState("");
const [errorMsg , setErrorMsg] = useState("")
const [showError,setShowError] = useState(false)

  useEffect(() => {
    dispatch(fetchAssessments());
    dispatch(fetchCandidates());
  }, [dispatch]);

  const filteredAssessments = safeAssessments.filter((a) =>
    a.candidateId?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedAssessment(null);
    setIsModalOpen(true);
  };

  const handleEdit = (assessment) => {
    setSelectedAssessment(assessment);
    setIsModalOpen(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      candidateId: form.candidateId.value,
      technicalScore: Number(form.technicalScore.value),
      softSkillScore: Number(form.softSkillScore.value),
      mockInterviewResult: form.mockInterviewResult.value,
      remarks: form.remarks.value,
    };

    if (selectedAssessment) {
      dispatch(editAssessment({ id: selectedAssessment.candidateId._id, data }))
        .unwrap()
        .then(() =>{
        setSuccessMsg("Assessment Update Successfully!"); 
        setShowSuccess(true); 
        dispatch(fetchAssessments())
        setIsModalOpen(false);
      })
        .catch((err)=>{
          setErrorMsg(err?.message || "Update Failed")
          setShowError(true)
        })

    } else {
      dispatch(createAssessment(data)).unwrap().then(() => {
        setSuccessMsg("Assessment Created Successfully!")
        setShowSuccess(true)
        dispatch(fetchAssessments());
        dispatch(getDashboardStats());
        setIsModalOpen(false);
      })
      .catch((err)=>{
        setErrorMsg(err || "Assessment already exists for this candidate")
        setShowError(true)
        setIsModalOpen(false)
      })
    }
    
  };

  // Helper for Score Colors
  const getScoreStyle = (score) => {
    if (score >= 80) return "text-emerald-600 bg-emerald-50 border-emerald-100";
    if (score >= 50) return "text-amber-600 bg-amber-50 border-amber-100";
    return "text-red-600 bg-red-50 border-red-100";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 p-2"
    >
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
            Assessment <span className="text-indigo-600">Audit</span>
          </h1>
          <p className="text-slate-500 text-sm font-medium mt-1">Detailed evaluation and interview result .</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-indigo-700 transition-all"
        >
          <Plus size={18} /> New Evaluation
        </motion.button>
      </div>

      {/* 2. SEARCH TOOLBAR */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/50 backdrop-blur-md p-4 rounded-3xl border border-slate-100">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search candidate scores..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-indigo-50 outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. PERFORMANCE TABLE */}
      <div className="bg-white/80 backdrop-blur-xl rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Candidate Info</th>
                <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Technical Score</th>
                <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Soft Skills Score</th>
                <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Mock Interview Result</th>
                <th className="px-6 py-5 text-left text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Remarks</th>
                <th className="px-6 py-5 text-right text-[11px] font-black uppercase tracking-[0.2em] text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr><td colSpan="6" className="py-20 text-center text-indigo-600 font-black animate-pulse text-xs uppercase tracking-widest">Generating Performance Metrics...</td></tr>
              ) : filteredAssessments.length === 0 ? (
                <tr><td colSpan="6" className="py-20 text-center text-slate-400 font-bold uppercase text-xs">No assessments recorded yet</td></tr>
              ) : (
                filteredAssessments.map((a, index) => (
                  <motion.tr
                    key={a._id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-indigo-50/30 transition-colors group"
                  >
                    {/* CANDIDATE INFO: */}

                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        {/* Icon Container: Slightly larger and more vibrant */}
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-500 shadow-sm border border-gray-100/50">
                          <GraduationCap size={18} />
                        </div>


                        <div className="flex flex-col gap-1.5">
                          <p className="font-black text-slate-900 text-sm tracking-tight leading-none">
                            {a.candidateId?.fullName}
                          </p>


                          <span className="inline-flex items-center text-[10px] text-gray-600 font-black uppercase tracking-widest bg-gray-50/80 px-2 py-0.5 rounded-md border border-indigo-100/30 self-start">
                            {a.candidateId?.courseApplied}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-black text-xs ${getScoreStyle(a.technicalScore)}`}>
                        <Trophy size={12} /> {a.technicalScore}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border font-black text-xs ${getScoreStyle(a.softSkillScore)}`}>
                        <Star size={12} /> {a.softSkillScore}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${a.mockInterviewResult === "Pass" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                        {a.mockInterviewResult === "Pass" ? <CheckCircle2 size={10} className="inline mr-1" /> : <AlertCircle size={10} className="inline mr-1" />}
                        {a.mockInterviewResult}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-2 max-w-50">
                        <MessageSquare size={14} className="text-slate-500 mt-1 shrink-0" />
                        <p className="text-11 text-slate-500 italic line-clamp-2">{a.remarks}</p>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button onClick={() => handleEdit(a)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-xl transition-colors">
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. PERFORMANCE MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <motion.form
              onSubmit={handleSave}
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-xl rounded-[40px] shadow-2xl overflow-hidden border border-slate-100"
            >
              <div className="p-8 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedAssessment ? "Modify Assessment" : "Add Performance Audit"}</h2>
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Asporea Skill Development & Training</p>
                </div>
                <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-200 rounded-full transition-colors"><X size={20} className="text-slate-400" /></button>
              </div>

              <div className="p-8 space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Select Candidate</label>
                  <select name="candidateId" defaultValue={selectedAssessment?.candidateId?._id || ""} required className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white outline-none rounded-2xl font-bold text-sm transition-all appearance-none">
                    <option value="">Choose Registry Member...</option>
                    {safeCandidates.map((c) => (<option key={c._id} value={c._id}>{c.fullName} — {c.courseApplied}</option>))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormInput name="technicalScore" label="Technical Score (0-100)" type="number" defValue={selectedAssessment?.technicalScore} placeholder="Score" />
                  <FormInput name="softSkillScore" label="Soft Skill Score (0-100)" type="number" defValue={selectedAssessment?.softSkillScore} placeholder="Score" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">Mock Interview Result</label>
                  <select name="mockInterviewResult" defaultValue={selectedAssessment?.mockInterviewResult || ""} required className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white outline-none rounded-2xl font-bold text-sm transition-all appearance-none">
                    <option value="">Final Decision...</option>
                    <option value="Pass">Pass - Ready for Placement</option>
                    <option value="Fail">Fail - Needs Improvement</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1"> Remarks</label>
                  <textarea name="remarks" defaultValue={selectedAssessment?.remarks || ""} placeholder="Detailed feedback..." className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white outline-none rounded-2xl font-bold text-sm h-24 transition-all" />
                </div>
              </div>

              <div className="p-8 bg-slate-50/50 flex justify-end gap-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 font-bold text-slate-400 hover:text-slate-600 text-sm">Dismiss</button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="px-10 py-3 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg hover:bg-indigo-700 transition-all">
                  {selectedAssessment ? "Update Audit" : "Add Evaluation"}
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
      <ErrorModal
      isOpen={showError}
      message={errorMsg}
      onClose={() => setShowError(false)}
    />
    </motion.div>
  );
};

const FormInput = ({ name, label, defValue, placeholder, type = "text" }) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest px-1">{label}</label>
    <input name={name} type={type} defaultValue={defValue || ""} placeholder={placeholder} min="0" max="100" className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-indigo-100 focus:bg-white outline-none rounded-2xl font-bold text-sm transition-all" />
  </div>
);

export default Assessments;
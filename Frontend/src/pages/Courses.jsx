import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion"; 
import {
  fetchCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../features/courses/courseSlice";
import { getDashboardStats } from "../features/dashboard/dashboardSlice";
import { 
   Plus, Search, Edit2, Trash2, X, Clock, Users, GraduationCap, Inbox 
} from "lucide-react"; 
import SuccessModal from "../components/modals/SuccessModal";

const Courses = () => {
  const dispatch = useDispatch();
  const { courses, isLoading } = useSelector((state) => state.courses);
  const safeCourses = Array.isArray(courses) ? courses : [];
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  // Filter Logic 
  const filteredCourses = safeCourses.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Handlers 
  const handleAdd = () => {
    setSelectedCourse(null);
    setIsModalOpen(true);
  };

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (course) => {
    if (window.confirm(`Are you sure you want to delete the ${course.courseName} program?`)) {
      dispatch(deleteCourse(course._id))
      .unwrap()
      .then(()=>{
        setSuccessMsg(" Course Deleted Successfully!"); 
        setShowSuccess(true); 
      })
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      courseName: form.courseName.value,
      courseDuration: Number(form.courseDuration.value),
      batchSize: Number(form.batchSize.value),
    };

    if (selectedCourse) {
      dispatch(updateCourse({ id: selectedCourse._id, data }))
      dispatch(fetchCourses())
      .unwrap()
      .then(()=>{
        setSuccessMsg(" Course Details Update Successfully!"); 
        setShowSuccess(true); 
      })
    } else {
      dispatch(createCourse(data)).unwrap().then(() => {
        dispatch(fetchCourses());
        dispatch(getDashboardStats())
        .unwrap()
        .then(()=>{
        setSuccessMsg(" Course Created Successfully!"); 
        setShowSuccess(true); 
      })
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0a1628] overflow-hidden -m-8 p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative z-10 space-y-8 p-2"
      >
        {/*   HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black text-white tracking-tight italic">
              Training <span className="text-purple-400">Hub</span>
            </h1>
            <p className="text-white/80 text-sm font-medium mt-1">Manage skill development Courses and curriculums.</p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="flex items-center gap-2 bg-purple-600 text-white px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-purple-500/30 hover:bg-purple-700 transition-all"
          >
            <Plus size={18} /> Add Program
          </motion.button>
        </div>

        {/*  SEARCH TOOLBAR */}
        <div className="flex flex-col sm:flex-row gap-4 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 w-5 h-5" />
            <input
              type="text"
              placeholder="Search programs by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-sm font-bold text-white placeholder:text-white/40 focus:ring-4 focus:ring-purple-500/30 focus:bg-white/20 focus:border-purple-400 outline-none transition-all"
            />
          </div>
        </div>

        {/*  COURSE GRID TABLE */}
        <div className="bg-white/10 backdrop-blur-xl rounded-4xl border border-white/20 shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white/5 border-b border-white/10">
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Course Name</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Duration</th>
                  <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Batch Capacity</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {isLoading ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center text-purple-400 font-black animate-pulse uppercase tracking-widest text-xs">Fetching Curriculum Data...</td>
                  </tr>
                ) : filteredCourses.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="py-20 text-center flex flex-col items-center">
                      <Inbox className="w-12 h-12 text-white/30 mb-4" />
                      <p className="text-white/60 font-bold uppercase text-xs tracking-widest">No training programs available</p>
                    </td>
                  </tr>
                ) : (
                  filteredCourses.map((course, index) => ( 
                    <motion.tr 
                      key={course._id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-white/10 transition-colors group"
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300 font-bold">
                            <GraduationCap size={20} />
                          </div>
                          <p className="font-bold text-white text-base">{course.courseName}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-white/90">
                          <Clock size={16} className="text-purple-400" />
                          <span className="font-bold text-sm">{course.courseDuration} Hours</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2 text-white/90">
                          <Users size={16} className="text-purple-400" />
                          <span className="font-bold text-sm">{course.batchSize} Students / Batch</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(course)} className="p-2 text-purple-400 hover:bg-purple-500/20 rounded-xl transition-colors">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(course)} className="p-2 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/*  EXECUTIVE MODAL */}
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
                className="relative bg-[#1a2332] w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden border border-white/20"
              >
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <div>
                    <h2 className="text-2xl font-black text-white tracking-tight">
                      {selectedCourse ? "Modify Course" : "Add Course"}
                    </h2>
                    <p className="text-xs text-white/60 font-bold uppercase tracking-widest mt-1">Asporea Skill Development & Training Centre</p>
                  </div>
                  <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <X size={20} className="text-white/60" />
                  </button>
                </div>

                <div className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-white/80 tracking-widest px-1">Course Name</label>
                    <input
                      name="courseName"
                      required
                      defaultValue={selectedCourse?.courseName || ""}
                      placeholder="Ex: Advanced Retail Management"
                      className="w-full p-4 bg-white/10 border-2 border-transparent focus:border-purple-400 focus:bg-white/20 outline-none rounded-2xl font-bold text-sm text-white placeholder:text-white/40 transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-white/80 tracking-widest px-1">Duration (Hours)</label>
                      <input
                        name="courseDuration"
                        type="number"
                        required
                        defaultValue={selectedCourse?.courseDuration || ""}
                        placeholder="Ex: 100"
                        className="w-full p-4 bg-white/10 border-2 border-transparent focus:border-purple-400 focus:bg-white/20 outline-none rounded-2xl font-bold text-sm text-white placeholder:text-white/40 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black uppercase text-white/80 tracking-widest px-1">Batch Capacity</label>
                      <input
                        name="batchSize"
                        type="number"
                        required
                        defaultValue={selectedCourse?.batchSize || ""}
                        placeholder="Ex: 30"
                        className="w-full p-4 bg-white/10 border-2 border-transparent focus:border-purple-400 focus:bg-white/20 outline-none rounded-2xl font-bold text-sm text-white placeholder:text-white/40 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-white/5 flex justify-end gap-4">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-8 py-3 font-bold text-white/60 hover:text-white text-sm">Cancel</button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="px-10 py-3 bg-purple-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-purple-500/30 hover:bg-purple-700 transition-all">
                    {selectedCourse ? "Update Program" : "Save Program"}
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

export default Courses;
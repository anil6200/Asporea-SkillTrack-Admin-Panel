import api from "../../api/axios";

// GET all assessments
const getAssessments = async () => {
  const res = await api.get("/assessments/getAllAssessments");
  return res.data.data; // backend response { count, data }
};

// ADD assessment
const addAssessment = async (data) => {
  const res = await api.post("/assessments/addAssessment", data);
  return res.data;
};

// UPDATE assessment
const updateAssessment = async ({ id, data }) => {
  const res = await api.put(`/assessments/updateAssessment/${id}`, data);
  return res.data;
};

//GetAssessmentById
const getAssessmentById = async (id) => {
    const res = await api.get(`/assessments/getAssessment/${id}`);
    return res.data;
}

// DELETE assessment
const deleteAssessment = async (id) => {
  const res = await api.delete(`/assessments/deleteAssessment/${id}`);
  return res.data;
};

const assessmentService = {
  getAssessments,
  addAssessment,
  updateAssessment,
  deleteAssessment,
    getAssessmentById,
};

export default assessmentService;

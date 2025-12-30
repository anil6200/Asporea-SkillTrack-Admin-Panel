import api from "../../api/axios";
const getCandidates = async () => {
    const res = await api.get("/candidates/getAllCandidates");
    return res.data;
  };
  
  const addCandidate = async (data) => {
    const res = await api.post("/candidates/addCandidate", data);
    return res.data;
  };
  
  const updateCandidate = async ({ id, data }) => {
    const res = await api.put(`/candidates/updateCandidate/${id}`, data);
    return res.data;
  };
  
  const deleteCandidate = async (id) => {
    const res = await api.delete(`/candidates/deleteCandidate/${id}`);
    return res.data;
  };
  
  const candidateService = {
    getCandidates,
    addCandidate,
    updateCandidate,
    deleteCandidate,
  };
  
  export default candidateService;
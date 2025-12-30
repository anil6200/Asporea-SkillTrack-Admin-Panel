import api from "../../api/axios";

const login = async (credentials) => {
  const response = await api.post("/admin/login", credentials);
  return response.data;
}
const changePassword = async (passwordData) => {
  const token = sessionStorage.getItem("token"); 

  const response = await api.put("/admin/changePassword", passwordData, {
    headers: {
      Authorization: `Bearer ${token}`,             // Authorization header bhejna zaroori hai middleware ke liye
    },
  });

  return response.data;
};

const authService = {
  login,
  changePassword
};



export default authService;

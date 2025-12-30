import api from "../../api/axios";

const getCourses = async () => {
  const res = await api.get("/courses/getAllCourses");
  return res.data;
};

const addCourse = async (data) => {
  const res = await api.post("/courses/addCourse", data);
  return res.data;
};

const updateCourse = async (id, data) => {
  const res = await api.put(`/courses/updateCourse/${id}`, data);
  return res.data;
};

const deleteCourse = async (id) => {
  await api.delete(`/courses/deleteCourse/${id}`);
  return id;
};

const courseService = {
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};

export default courseService;

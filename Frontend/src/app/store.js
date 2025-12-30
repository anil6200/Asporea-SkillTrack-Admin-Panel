import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import dashboardReducer from '../features/dashboard/dashboardSlice'
import candidateReducer from '../features/candidates/candidateSlice'
import courseReducer from '../features/courses/courseSlice'
import assessmentReducer from '../features/assessments/assessmentSlice'

 const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    candidates: candidateReducer,
    courses: courseReducer,
    assessments: assessmentReducer,

  },
});

export default store;

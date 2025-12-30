import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

export const getDashboardStats = createAsyncThunk(
  "dashboard/getStats", // thunk name
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/dashboard/getDashBoardStats");
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.msg || "Failed to fetch dashboard stats");
    }
  }
);


const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    stats: { totalCandidates: 0, totalCourses: 0, totalAssessments: 0, placedCandidates: 0 , recentActivities:[] , enrollmentTrends:[]},
    isLoading: false,
  },

  reducers: {

    resetDashboard: (state) => {       /// Agar future mein dashboard reset karna pade
      state.stats = {
        totalCandidates: 0,
        totalCourses: 0,
        totalAssessments: 0,
        trainingCandidates: 0,
        placedCandidates: 0,
        appliedCandidates: 0
      };
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(getDashboardStats.pending, (state) => { state.isLoading = true; })
      .addCase(getDashboardStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.stats = action.payload;
      })
      .addCase(getDashboardStats.rejected, (state) => { state.isLoading = false; });
  },
});

export default dashboardSlice.reducer;
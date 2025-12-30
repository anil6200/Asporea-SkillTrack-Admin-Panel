import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import courseService from "./courseService";

const initialState = {
  courses: [],
  isLoading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk(
  "courses/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await courseService.getCourses();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createCourse = createAsyncThunk(
  "courses/create",
  async (data, thunkAPI) => {
    try {
      return await courseService.addCourse(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const updateCourse = createAsyncThunk(
  "courses/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await courseService.updateCourse(id, data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const deleteCourse = createAsyncThunk(
  "courses/delete",
  async (id, thunkAPI) => {
    try {
      await courseService.deleteCourse(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // FETCH
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.isLoading = false;
        state.courses = action.payload.courses; // 🔥 IMPORTANT
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // CREATE
      .addCase(createCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload.course);
      })

      // UPDATE
      .addCase(updateCourse.fulfilled, (state, action) => {
        const index = state.courses.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.courses[index] = action.payload;
      })

      // DELETE
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.courses = state.courses.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default courseSlice.reducer;

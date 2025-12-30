import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import assessmentService from "./assessmentService";

const initialState = {
  assessments: [],
  isLoading: false,
  error: null,
};

/* THUNKS  */
export const fetchAssessments = createAsyncThunk(
  "assessments/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await assessmentService.getAssessments();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createAssessment = createAsyncThunk(
  "assessments/create",
  async (data, thunkAPI) => {
    try {
      return await assessmentService.addAssessment(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const editAssessment = createAsyncThunk(
  "assessments/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await assessmentService.updateAssessment({ id, data });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const removeAssessment = createAsyncThunk(
  "assessments/delete",
  async (id, thunkAPI) => {
    try {
      await assessmentService.deleteAssessment(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

/*SLICE*/
const assessmentSlice = createSlice({
  name: "assessments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchAssessments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAssessments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assessments = action.payload;
      })
      .addCase(fetchAssessments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(createAssessment.fulfilled, (state, action) => {
        state.assessments.push(action.payload);
      })

      // UPDATE
      .addCase(editAssessment.fulfilled, (state, action) => {
        const index = state.assessments.findIndex(
          (a) => a._id === action.payload._id
        );
        if (index !== -1) state.assessments[index] = action.payload;
      })

      // DELETE
      .addCase(removeAssessment.fulfilled, (state, action) => {
        state.assessments = state.assessments.filter(
          (a) => a._id !== action.payload
        );
      });
  },
});

export default assessmentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import candidateService from "./candidateService";

const initialState = {
  candidates: [],
  isLoading: false,
  error: null,
};

export const fetchCandidates = createAsyncThunk(
  "candidates/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await candidateService.getCandidates();
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const createCandidate = createAsyncThunk(
  "candidates/create",
  async (data, thunkAPI) => {
    try {
      return await candidateService.addCandidate(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const editCandidate = createAsyncThunk(
  "candidates/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await candidateService.updateCandidate({ id, data });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

export const removeCandidate = createAsyncThunk(
  "candidates/delete",
  async (id, thunkAPI) => {
    try {
      await candidateService.deleteCandidate(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message);
    }
  }
);

const candidateSlice = createSlice({
  name: "candidates",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET
      .addCase(fetchCandidates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCandidates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.candidates = action.payload.candidates; 
      })
      .addCase(fetchCandidates.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // ADD
      .addCase(createCandidate.fulfilled, (state, action) => {
        state.candidates.push(action.payload);
      })

      // UPDATE
      .addCase(editCandidate.fulfilled, (state, action) => {
        const index = state.candidates.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.candidates[index] = action.payload;
      })
      

      // DELETE
      .addCase(removeCandidate.fulfilled, (state, action) => {
        state.candidates = state.candidates.filter(
          (c) => c._id !== action.payload
        );
      });
  },
});

export default candidateSlice.reducer;

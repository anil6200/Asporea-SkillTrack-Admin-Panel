import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const initialState = {
  token: sessionStorage.getItem("token") || null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk(
  "admin/login",
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (err) {
      const message = 
      (err.response && err.response.data && err.response.data.message) || 
      err.message || 
      "Bhai, server connected nahi hai!";
    
    return thunkAPI.rejectWithValue(message); // Ab ye hamesha string return karega
  }
}
);
    

const authSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      sessionStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        const tokenString=action.payload.token;
        state.token = tokenString;
        sessionStorage.setItem("token", tokenString);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Login failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:3000/api/auth";

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  user: null,
  error: null,
};

export const checkAuth = createAsyncThunk(
  "/auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control":
            "no-cache, no-store, must-revalidate, proxy-revalidate",
        },
      });
      return response.data;
    } catch (error) {
      const payload = rejectWithValue(
        error.response?.data || "Something went wrong"
      );
      return rejectWithValue(payload);
    }
  }
);

export const registerUser = createAsyncThunk(
  "/auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const payload = rejectWithValue(
        error.response?.data || "Something went wrong"
      );
      return rejectWithValue(payload);
    }
  }
);

export const loginUser = createAsyncThunk(
  "/auth/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      const payload = rejectWithValue(
        error.response?.data || "Something went wrong"
      );
      return rejectWithValue(payload);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "/auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      const payload = rejectWithValue(
        error.response?.data || "Something went wrong"
      );
      return rejectWithValue({
        ...payload,
        message: "Error logging out",
      });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.user ?? action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload : null;
        state.isAuthenticated = action.payload?.success ? true : false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload?.success ? action.payload.user : null;
        state.isAuthenticated = action.payload?.success ? true : false;
      })

      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error?.message;
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;

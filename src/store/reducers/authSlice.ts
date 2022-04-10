import { RootState } from "./../store";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authApi from "../../api/authApi";
import { AuthSate } from "./../../models/user";

const initialState: AuthSate = {
  isLogged: false,
  error: null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLogged = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLogged = false;
      state.userInfo = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("action", action);

      state.isLogged = false;
      state.error = action.error.message || "Login failed. Please try again.";
    });
  },
});

export const login = createAsyncThunk(
  "auth/login",
  async (data: { email: string; password: string }) => {
    const res = await authApi.login(data);
    return res;
  }
);

const authReducer = authSlice.reducer;
export const { setUserInfo } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth;
export default authReducer;

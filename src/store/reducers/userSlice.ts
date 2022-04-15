import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import { UserState } from "../../models/user";
import { RootState } from "../store";
const initialState: UserState = {
  users: [],
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.users = action.payload;
    });

    builder.addCase(getUserByProjectId.fulfilled, (state, action) => {
      state.users = action.payload;
    });
    builder.addCase(getUserByProjectId.rejected, (state) => {
      state.users = [];
    });
  },
});

export const getAllUser = createAsyncThunk("user/getAll", async () => {
  const res = await userApi.getAll();
  return res;
});

export const getUserByProjectId = createAsyncThunk(
  "user/getUserByProjectId",
  async (id: number) => {
    const res = await userApi.getUserByProjectId(id);
    return res;
  }
);

const userReducer = userSlice.reducer;
export const selectAllUser = (state: RootState) => state.user.users;
export default userReducer;

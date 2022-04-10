import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import projectApi from "../../api/projectApi";
import { StatusState } from "../../models/status";
import { RootState } from "../store";
const initialState: StatusState = {
  status: [],
};

const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllStatus.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = [...action.payload];
      }
    );
  },
});

export const getAllStatus = createAsyncThunk("status/getAll", async () => {
  const res = await projectApi.getAllStatus();
  return res;
});

const statusReducer = statusSlice.reducer;
export const selectAllStatus = (state: RootState) => state.status.status;

export default statusReducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectApi from "../../api/projectApi";
import { RootState } from "../store";
import { PriorityState } from "./../../models/prioriy";
const initialState: PriorityState = {
  priority: [],
};

const prioritySlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPriority.fulfilled, (state, action) => {
      state.priority = [...action.payload];
    });
  },
});

export const getAllPriority = createAsyncThunk("priority/getAll", async () => {
  const res = await projectApi.getAllPriority();
  return res;
});

const priorityReducer = prioritySlice.reducer;
export const selectAllPriority = (state: RootState) => state.priority.priority;

export default priorityReducer;

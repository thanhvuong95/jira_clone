import { TaskState } from "./../../models/task";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import projectApi from "../../api/projectApi";
import { RootState } from "../store";
const initialState: TaskState = {
  type: [],
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllTaskType.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.type = [...action.payload];
      }
    );
  },
});

export const getAllTaskType = createAsyncThunk("task/getAllType", async () => {
  const res = await projectApi.getAllType();
  return res;
});

const taskReducer = taskSlice.reducer;
export const selectAllType = (state: RootState) => state.task.type;

export default taskReducer;

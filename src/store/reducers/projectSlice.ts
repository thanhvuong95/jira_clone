import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import projectApi from "../../api/projectApi";
import { ProjectState } from "../../models/project";
import { RootState } from "../store";
const initialState: ProjectState = {
  projects: [],
  project: null,
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getAllProject.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.projects = [...action.payload];
      }
    );
    builder.addCase(
      getProjectDetail.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.project = action.payload;
      }
    );
  },
});

export const getAllProject = createAsyncThunk("project/getAll", async () => {
  const res = await projectApi.getAll();
  return res;
});

export const getProjectDetail = createAsyncThunk(
  "project/getDetail",
  async (id: number) => {
    const res = await projectApi.getById(id);
    return res;
  }
);

const projectReducer = projectSlice.reducer;
export const selectAllProject = (state: RootState) => state.projects.projects;
export const selectProjectDetail = (state: RootState) => state.projects.project;

export default projectReducer;

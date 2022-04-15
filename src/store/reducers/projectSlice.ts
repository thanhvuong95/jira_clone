import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import projectApi from "../../api/projectApi";
import { ProjectState } from "../../models/project";
import { RootState } from "../store";
const initialState: ProjectState = {
  projects: [],
  project: null,
  category: [],
};

const projectSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProject.fulfilled, (state, action) => {
      state.projects = [...action.payload];
    });
    builder.addCase(getProjectDetail.fulfilled, (state, action) => {
      state.project = action.payload;
    });
    builder.addCase(getCategory.fulfilled, (state, action) => {
      state.category = action.payload;
    });
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
export const getCategory = createAsyncThunk("project/categories", async () => {
  const res = await projectApi.getCategory();
  return res;
});

const projectReducer = projectSlice.reducer;
export const selectAllProject = (state: RootState) => state.projects.projects;
export const selectProjectDetail = (state: RootState) => state.projects.project;
export const selectCategory = (state: RootState) => state.projects.category;

export default projectReducer;

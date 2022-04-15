import { Priority } from "../models/prioriy";
import { Status } from "../models/status";
import { TaskType } from "../models/task";
import { Project, ProjectCategories, ProjectDetail } from "./../models/project";
import { axiosClient } from "./axiosClient";

const projectApi = {
  getAll: (): Promise<Project[]> => {
    return axiosClient.get("Project/getAllProject");
  },
  getAllType: (): Promise<TaskType[]> => {
    return axiosClient.get("TaskType/getAll");
  },
  getAllPriority: (): Promise<Priority[]> => {
    return axiosClient.get("Priority/getAll");
  },
  getAllStatus: (): Promise<Status[]> => {
    return axiosClient.get("Status/getAll");
  },
  removeById: (id: number): Promise<any> => {
    return axiosClient.delete(`Project/deleteProject?projectId= ${id}`);
  },
  getById: (id: number): Promise<ProjectDetail> => {
    return axiosClient.get(`/Project/getProjectDetail?id=${id}`);
  },
  getCategory: (): Promise<ProjectCategories[]> => {
    return axiosClient.get("ProjectCategory");
  },
  assignUser: (data: { projectId: number; userId: number }): Promise<any> => {
    return axiosClient.post("Project/assignUserProject", data);
  },
  create: (data: {
    projectName: string;
    description: string;
    categoryId: number;
  }): Promise<any> => {
    return axiosClient.post("Project/createProjectAuthorize", data);
  },
};

export default projectApi;

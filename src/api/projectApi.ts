import { Priority } from "../models/prioriy";
import { axiosClient } from "./axiosClient";

const projectApi = {
  getAll: () => {
    return axiosClient.get("Project/getAllProject");
  },
  getAllType: () => {
    return axiosClient.get("TaskType/getAll");
  },
  getAllPriority: (): Promise<Priority[]> => {
    return axiosClient.get("Priority/getAll");
  },
  getAllStatus: () => {
    return axiosClient.get("Status/getAll");
  },
  removeById: (id: number) => {
    return axiosClient.delete(`Project/deleteProject?projectId= ${id}`);
  },
  getById: (id: number) => {
    return axiosClient.get(`/Project/getProjectDetail?id=${id}`);
  },
  assignUser: (data: { projectId: number; userId: number }) => {
    return axiosClient.post("Project/assignUserProject", data);
  },
};

export default projectApi;

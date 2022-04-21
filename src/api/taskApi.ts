import { LstTaskDeTail } from "../models/project";
import { Task } from "../models/task";
import { axiosClient } from "./axiosClient";

const taskApi = {
  createTask: (data: Task): Promise<LstTaskDeTail> => {
    return axiosClient.post("Project/createTask", data);
  },
  removeTask: (taskId: number): Promise<any> => {
    return axiosClient.delete(`Project/removeTask?taskId=${taskId}`);
  },
  updateTaskByStatus: (data: {
    taskId: number;
    statusId: string;
  }): Promise<any> => {
    return axiosClient.put("Project/updateStatus", data);
  },
  getTask: (id: number): Promise<LstTaskDeTail> => {
    return axiosClient.get(`Project/getTaskDetail?taskId=${id}`);
  },
  updateTaskByPriority: (data: {
    taskId: number;
    priorityId: number;
  }): Promise<any> => {
    return axiosClient.put("Project/updatePriority", data);
  },
  addMember: (data: { taskId: number; userId: number }): Promise<any> => {
    return axiosClient.post("Project/assignUserTask", data);
  },
  removeMember: (data: { taskId: number; userId: number }): Promise<any> => {
    return axiosClient.post("Project/removeUserFromTask", data);
  },
  changeName: (data: Task): Promise<any> => {
    return axiosClient.post("Project/updateTask", data);
  },
};
export default taskApi;

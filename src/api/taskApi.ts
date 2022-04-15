import { LstTaskDeTail } from "../models/project";
import { Task } from "../models/task";
import { axiosClient } from "./axiosClient";

const taskApi = {
  createTask: (data: Task): Promise<LstTaskDeTail> => {
    return axiosClient.post("Project/createTask", data);
  },
  updateTask: (data: { taskId: number; statusId: string }) => {
    return axiosClient.put("Project/updateStatus", data);
  },
  getTask: (id: number): Promise<LstTaskDeTail> => {
    return axiosClient.get(`Project/getTaskDetail?taskId=${id}`);
  },
};
export default taskApi;

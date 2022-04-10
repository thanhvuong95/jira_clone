import { Task } from "../models/task";
import { axiosClient } from "./axiosClient";

const taskApi = {
  createTask: (data: Task) => {
    return axiosClient.post("Project/createTask", data);
  },
  updateTask: (data: { taskId: number; statusId: string }) => {
    return axiosClient.put("Project/updateStatus", data);
  },
};
export default taskApi;

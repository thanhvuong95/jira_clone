import { User } from "../models/user";
import { axiosClient } from "./axiosClient";

const userApi = {
  getAll: (): Promise<User[]> => {
    return axiosClient.get("Users/getUser");
  },
  searchUser: (keyword: string): Promise<User[]> => {
    return axiosClient.get(`Users/getUser?keyword= ${keyword}`);
  },
  getUserByProjectId: (id: number): Promise<User[]> => {
    return axiosClient.get(`Users/getUserByProjectId?idProject=${id}`);
  },
};

export default userApi;

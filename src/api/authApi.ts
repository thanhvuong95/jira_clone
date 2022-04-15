import { UserAuth } from "../models/user";
import { axiosClient } from "./axiosClient";

const authApi = {
  login: (data: { email: string; password: string }): Promise<UserAuth> => {
    return axiosClient.post("Users/signin", data);
  },
  checkToken: () => {
    return axiosClient.post("Users/TestToken");
  },
};
export default authApi;

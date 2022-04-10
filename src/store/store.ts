import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import priorityReducer from "./reducers/prioritySlice";
import projectReducer from "./reducers/projectSlice";
import statusReducer from "./reducers/statusSlice";
import taskReducer from "./reducers/taskSlice";
import userReducer from "./reducers/userSlice";
const store = configureStore({
  reducer: {
    projects: projectReducer,
    task: taskReducer,
    priority: priorityReducer,
    user: userReducer,
    status: statusReducer,
    auth: authReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;

import { Priority } from "./prioriy";
import { TaskType } from "./task";
import { User } from "./user";
export interface ProjectState {
  projects: Project[];
  project: ProjectDetail | null;
}

export interface Project {
  members: Member[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  categoryId: number;
  categoryName: string;
  alias: string;
  deleted: boolean;
}

export interface Member {
  userId: number;
  name: string;
  avatar: string;
}

export interface Creator {
  id: number;
  name: string;
}

export interface ProjectDetail {
  lstTask: LstTask[];
  members: User[];
  creator: Creator;
  id: number;
  projectName: string;
  description: string;
  projectCategory: ProjectCategory;
  alias: string;
}

export interface LstTask {
  lstTaskDeTail: LstTaskDeTail[];
  statusId: string;
  statusName: string;
  alias: string;
}

export interface LstTaskDeTail {
  priorityTask: Priority;
  taskTypeDetail: TaskType;
  assigness: Assigness[];
  lstComment: any[];
  taskId: number;
  taskName: string;
  alias: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  typeId: number;
  priorityId: number;
  projectId: number;
}

export interface Assigness {
  id: number;
  avatar: string;
  name: string;
  alias: string;
}

export interface ProjectCategory {
  id: number;
  name: string;
}

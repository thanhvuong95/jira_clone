export interface TaskState {
  type: TaskType[];
}
export interface TaskType {
  id: number;
  taskType: string;
}
export interface Task {
  listUserAsign: number[];
  taskName: string;
  description: string;
  statusId: string;
  originalEstimate: number;
  timeTrackingSpent: number;
  timeTrackingRemaining: number;
  projectId: number;
  typeId: number;
  priorityId: number;
}

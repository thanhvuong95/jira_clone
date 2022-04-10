export interface PriorityState {
  priority: Priority[];
}
export interface Priority {
  priorityId: number;
  priority: string;
  description?: string;
  deleted?: boolean;
  alias?: string;
}

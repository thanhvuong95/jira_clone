export interface StatusState {
  status: Status[];
}
export interface Status {
  statusId: string;
  statusName: string;
  alias: string;
  deleted: string;
}

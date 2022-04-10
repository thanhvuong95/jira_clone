import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckSquareFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Avatar, Col, Layout, notification, Row, Space } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { FC, useEffect, useState } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import taskApi from "../../api/taskApi";
import { LstTask } from "../../models/project";
import { selectProjectDetail } from "../../store/reducers/projectSlice";

const reorder = (
  list: LstTask[],
  targetTaskId: number,
  startIndex: number,
  endIndex: number
): LstTask[] => {
  const result: LstTask[] = JSON.parse(JSON.stringify(list));

  const [removed] = result[targetTaskId].lstTaskDeTail.splice(startIndex, 1);

  result[targetTaskId].lstTaskDeTail.splice(endIndex, 0, removed);
  return result;
};

const Tasks: FC = () => {
  const project = useSelector(selectProjectDetail);
  const [listTask, setListTask] = useState<LstTask[]>([]);

  const onDragEnd = (dropResult: DropResult) => {
    const { source, destination, draggableId } = dropResult;
    if (!destination) return;
    if (destination.droppableId === source.droppableId) {
      const indexTargetTask = Number(source.droppableId) - 1;
      const result = reorder(
        listTask,
        indexTargetTask,
        source.index,
        destination.index
      );
      setListTask(result);
    }
    if (destination.droppableId !== source.droppableId) {
      const listTaskTmp: LstTask[] = JSON.parse(JSON.stringify(listTask));
      const listTaskPrevious: LstTask[] = JSON.parse(JSON.stringify(listTask));

      const srcTskDetailIdx = source.index;
      const desTskDetailIdx = destination.index;

      const [sourceTask] = listTaskTmp.filter(
        (item) => item.statusId === source.droppableId
      );
      const [destinationTask] = listTaskTmp.filter(
        (item) => item.statusId === destination.droppableId
      );

      const [selectedTask] = sourceTask.lstTaskDeTail.splice(
        srcTskDetailIdx,
        1
      );
      destinationTask.lstTaskDeTail.splice(desTskDetailIdx, 0, selectedTask);
      setListTask(listTaskTmp);
      const taskUpdate = {
        taskId: Number(draggableId),
        statusId: destination.droppableId,
      };

      taskApi.updateTask(taskUpdate).catch((e) => {
        setListTask(listTaskPrevious);
        notification.error({
          message: "Error",
          description: `Oops. Something went wrong!`,
          style: {
            borderLeft: "5px solid #f12c36",
          },
        });
      });
    }
  };

  useEffect(() => {
    setListTask(project?.lstTask || []);
  }, [project]);
  return (
    <Row gutter={16}>
      <DragDropContext onDragEnd={(dropResult) => onDragEnd(dropResult)}>
        {listTask?.map((task) => (
          <Col span={6} key={task.statusId}>
            <Layout
              style={{
                backgroundColor: "#f4f5f7",
                minHeight: "80vh",
                width: "100%",
                padding: "8px 4px",
              }}
            >
              <Paragraph
                ellipsis={{
                  rows: 2,
                }}
                style={{ height: 50, padding: "8px", color: "#5e6c84" }}
              >
                {task.statusName.toUpperCase()}({task.lstTaskDeTail.length})
              </Paragraph>
              <Droppable key={task.statusId} droppableId={task.statusId}>
                {(provided) => (
                  <div
                    style={{
                      flex: 1,
                    }}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    {task.lstTaskDeTail.map((taskDetail, index) => (
                      <Draggable
                        key={taskDetail.taskId}
                        draggableId={taskDetail.taskId.toString()}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <div
                              style={{
                                padding: "8px 16px",
                                backgroundColor: "#fff",
                                marginBottom: "4px",
                              }}
                            >
                              <Paragraph
                                ellipsis={{
                                  rows: 4,
                                }}
                                style={{ textAlign: "justify" }}
                              >
                                {taskDetail.taskName}
                              </Paragraph>
                              <Space
                                style={{
                                  justifyContent: "space-between",
                                  width: "100%",
                                }}
                              >
                                <Space size="small">
                                  {taskDetail.taskTypeDetail.id === 1 ? (
                                    <ExclamationCircleFilled
                                      style={{
                                        color: "#ff4d4f",
                                        fontSize: " 16px",
                                      }}
                                    />
                                  ) : (
                                    <CheckSquareFilled
                                      style={{
                                        color: "#1890ff",
                                        fontSize: " 16px",
                                      }}
                                    />
                                  )}
                                  {taskDetail.priorityTask.priorityId > 2 ? (
                                    <ArrowDownOutlined
                                      style={{ color: "#1b5e20" }}
                                    />
                                  ) : (
                                    <ArrowUpOutlined
                                      style={{ color: "#ff4d4f" }}
                                    />
                                  )}
                                </Space>
                                <Avatar.Group
                                  maxCount={2}
                                  maxStyle={{
                                    width: "24px",
                                    height: "24px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {taskDetail.assigness.map((user) => (
                                    <Avatar
                                      src={user.avatar}
                                      size="small"
                                      key={user.id}
                                    />
                                  ))}
                                </Avatar.Group>
                              </Space>
                            </div>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </Layout>
          </Col>
        ))}
      </DragDropContext>
    </Row>
  );
};

export default Tasks;

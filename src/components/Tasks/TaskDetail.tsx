import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckSquareFilled,
  CloseOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Dropdown,
  Input,
  Menu,
  Modal,
  Row,
  Slider,
  Space,
  Tag,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import taskApi from "../../api/taskApi";
import { LstTaskDeTail } from "../../models/project";
import { User } from "../../models/user";
import {
  getAllPriority,
  selectAllPriority,
} from "../../store/reducers/prioritySlice";
import {
  getProjectDetail,
  selectProjectDetail,
} from "../../store/reducers/projectSlice";
import {
  getAllStatus,
  selectAllStatus,
} from "../../store/reducers/statusSlice";
import Toast from "../Toast/Toast";
import ReactHtmlParser from "react-html-parser";
import Title from "antd/lib/typography/Title";
interface TaskDetailProps {
  id: number | null;
  visible: boolean;
  onVisible: (val: boolean) => void;
}
const TaskDetail: FC<TaskDetailProps> = ({ id, visible, onVisible }) => {
  const dispatch = useDispatch();
  const status = useSelector(selectAllStatus);
  const priorities = useSelector(selectAllPriority);
  const { id: projectId } = useParams();
  const [task, setTask] = useState<LstTaskDeTail | null>(null);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const project = useSelector(selectProjectDetail);
  const [title, setTitle] = useState<string>("");
  const [statusTitle, setStatusTitle] = useState<"" | "error" | "warning">("");
  const usersId: number[] = task?.assigness.map((user) => user.id) || [];
  const user: User[] =
    project?.members.filter((member) => {
      return !usersId.includes(member.userId);
    }) || [];

  const [currentPriority] = priorities.filter(
    (priority) => priority.priorityId === task?.priorityId
  );

  const [currentStatus] = status.filter(
    (status) => status.statusId === task?.statusId
  );

  const currentStatusName: string = currentStatus?.statusName;
  const currentPrioName: string = currentPriority?.priority;

  const menuStatus = (
    <Menu onClick={({ key }) => onChangeStatus(key)}>
      {status
        .filter((item) => item.statusId !== task?.statusId)
        .map((item) => (
          <Menu.Item key={item.statusId}>
            {item.statusName.toLocaleUpperCase()}
          </Menu.Item>
        ))}
    </Menu>
  );

  const menuPriority = (
    <Menu onClick={({ key }) => onChangePriority(Number(key))}>
      {priorities
        .filter((item) => item.priorityId !== task?.priorityId)
        .map((item) => {
          return item.priorityId > 2 ? (
            <Menu.Item
              key={item.priorityId}
              icon={<ArrowDownOutlined style={{ color: "#1b5e20" }} />}
            >
              {item.description}
            </Menu.Item>
          ) : (
            <Menu.Item
              key={item.priorityId}
              icon={<ArrowUpOutlined style={{ color: "#ff4d4f" }} />}
            >
              {item.description}
            </Menu.Item>
          );
        })}
    </Menu>
  );

  const menuMember = (
    <Menu onClick={({ key }) => onChangeAssignees(Number(key))}>
      {user.map((item) => (
        <Menu.Item key={item.userId}>
          <Avatar src={item.avatar} size="small" />
          &nbsp;
          {item.name}
        </Menu.Item>
      ))}
    </Menu>
  );

  const onChangeStatus = (statusId: string) => {
    if (task) {
      taskApi
        .updateTaskByStatus({ taskId: task?.taskId, statusId: statusId })
        .then(() => {
          dispatch(getProjectDetail(Number(projectId)));
        })
        .catch((e) => {
          Toast({ type: "error", message: "Change status failed!" });
        });
    }
  };

  const onChangePriority = (priorityId: number) => {
    if (task) {
      taskApi
        .updateTaskByPriority({ taskId: task?.taskId, priorityId: priorityId })
        .then(() => {
          dispatch(getProjectDetail(Number(projectId)));
        })
        .catch((e) => {
          console.log(e);

          Toast({ type: "error", message: "Change priority failed!" });
        });
    }
  };

  const onChangeAssignees = (userId: number) => {
    if (task) {
      taskApi
        .addMember({ taskId: task.taskId, userId: userId })
        .then(() => {
          dispatch(getProjectDetail(Number(projectId)));
        })
        .catch((error) => {
          Toast({ type: "error", message: "Add member failed" });
        });
    }
  };

  const onRemoveMember = (userId: number) => {
    if (task) {
      taskApi
        .removeMember({ taskId: task.taskId, userId: userId })
        .then(() => {
          dispatch(getProjectDetail(Number(projectId)));
        })
        .catch((error) => {
          Toast({ type: "error", message: "Remove member failed!" });
        });
    }
  };

  const onClose = () => {
    Modal.confirm({
      closable: true,
      content: "Are you sure you want to delete this issue?",
      style: { top: 200 },
      onOk: () => {
        if (task) {
          taskApi
            .removeTask(task.taskId)
            .then(() => {
              onVisible(false);
              dispatch(getProjectDetail(Number(projectId)));
              Toast({ type: "success", message: "Delete issue successfully!" });
            })
            .catch((error) => {
              Toast({ type: "error", message: "Delete issue failed!" });
            });
        }
      },
    });
  };

  const onChangeTitle = () => {
    if (!title) {
      setStatusTitle("error");
    } else {
      setStatusTitle("");
      setIsFocus(false);
    }
    Toast({ type: "error", message: "Feature is not implemented." });
  };

  useEffect(() => {
    dispatch(getAllStatus());
    dispatch(getAllPriority());
  }, [dispatch]);

  useEffect(() => {
    if (id) {
      taskApi
        .getTask(id)
        .then((result) => {
          setTask(result);
          setTitle(result.taskName);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [id, project]);

  return (
    <Modal
      closable={false}
      visible={visible}
      onCancel={() => onVisible(!visible)}
      footer=""
      className="modal-detail"
    >
      {task && (
        <Row gutter={16}>
          <Space
            style={{
              width: "100%",
              justifyContent: "space-between",
              marginBottom: "24px",
            }}
          >
            <Button type="text">
              {task?.taskTypeDetail.id === 1 ? (
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
              {task?.taskTypeDetail.taskType.toLocaleUpperCase()}-{task?.taskId}
            </Button>
            <Space size="middle">
              <Button type="text">Give Feedback</Button>
              <Button type="text" icon={<DeleteOutlined />} onClick={onClose} />
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => onVisible(!visible)}
              />
            </Space>
          </Space>
          <Col span={16}>
            <TextArea
              autoSize={{ minRows: 1 }}
              bordered={isFocus}
              onChange={(e) => setTitle(e.target.value)}
              onFocus={() => setIsFocus(true)}
              onBlur={onChangeTitle}
              status={statusTitle}
              value={title}
              style={{
                fontWeight: 600,
                fontSize: 24,
                height: "auto",
                pointerEvents: "none",
              }}
            />
            <Title level={5} style={{ color: "#5e6c84", marginTop: "12px" }}>
              Descriptions
            </Title>
            {ReactHtmlParser(task?.description)}
          </Col>
          <Col span={8}>
            <Space direction="vertical" size="large" style={{ width: "100%" }}>
              <div>
                <Paragraph>STATUS</Paragraph>
                <div id="status">
                  <Dropdown
                    overlay={menuStatus}
                    trigger={["click"]}
                    getPopupContainer={() =>
                      document.getElementById("status") as HTMLElement
                    }
                  >
                    <Button
                      type="text"
                      className={`bg-custom status-${task?.statusId}`}
                    >
                      {currentStatusName}
                    </Button>
                  </Dropdown>
                </div>
              </div>
              <div>
                <Paragraph>ASSIGNEES</Paragraph>
                <Space size="small" wrap>
                  {task?.assigness.map((user) => (
                    <Tag
                      key={user.id}
                      closable
                      onClose={() => {
                        onRemoveMember(user.id);
                      }}
                      style={{ padding: "4px" }}
                    >
                      <Avatar src={user.avatar} size="small" />
                      &nbsp;
                      {user.name}
                    </Tag>
                  ))}
                  <div id="assignee">
                    <Dropdown
                      disabled
                      overlay={menuMember}
                      trigger={["click"]}
                      getPopupContainer={() =>
                        document.getElementById("assignee") as HTMLElement
                      }
                    >
                      <Button type="link" icon={<PlusOutlined />}>
                        Add Assignee
                      </Button>
                    </Dropdown>
                  </div>
                </Space>
              </div>
              <div>
                <Paragraph>PRIORITY</Paragraph>
                <Dropdown overlay={menuPriority} trigger={["click"]}>
                  <Button
                    className="bg-custom"
                    type="text"
                    icon={
                      task?.priorityId > 2 ? (
                        <ArrowDownOutlined style={{ color: "#1b5e20" }} />
                      ) : (
                        <ArrowUpOutlined style={{ color: "#ff4d4f" }} />
                      )
                    }
                  >
                    {currentPrioName}
                  </Button>
                </Dropdown>
              </div>
              <div>
                <Paragraph>ORIGINAL ESTIMATE (HOURS)</Paragraph>
                <Input style={{ width: "100%" }} value={1} />
              </div>
              <div>
                <Paragraph>TIME TRACKING</Paragraph>
                <Slider
                  handleStyle={{ display: "none" }}
                  defaultValue={0}
                  max={20}
                  value={10}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontWeight: 600,
                  }}
                >
                  <span>{10}h logged</span>
                  <span>{10}h estimated</span>
                </div>
              </div>
            </Space>
          </Col>
        </Row>
      )}
    </Modal>
  );
};

export default TaskDetail;

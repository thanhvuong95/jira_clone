import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  CheckSquareFilled,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import {
  Avatar,
  Col,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
} from "antd";
import React, { FC, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../store/reducers/authSlice";
import {
  getAllPriority,
  selectAllPriority,
} from "../../store/reducers/prioritySlice";
import {
  getAllProject,
  selectAllProject,
} from "../../store/reducers/projectSlice";
import {
  getAllStatus,
  selectAllStatus,
} from "../../store/reducers/statusSlice";
import { getAllTaskType, selectAllType } from "../../store/reducers/taskSlice";
import {
  getAllUser,
  getUserByProjectId,
  selectAllUser,
} from "../../store/reducers/userSlice";
interface Props {
  // onToggle: () => void;
  form: FormInstance<any>;
}
const NewIssue: FC<Props> = ({ form }) => {
  const [description, setDescription] = useState<string>("");
  const [timeSpent, setTimeSpent] = useState<number>(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(0);

  const totalTime = timeSpent + timeRemaining;
  const dispatch = useDispatch();
  const projects = useSelector(selectAllProject);
  const taskType = useSelector(selectAllType);
  const priorities = useSelector(selectAllPriority);
  const users = useSelector(selectAllUser);
  const status = useSelector(selectAllStatus);
  const { userInfo } = useSelector(selectAuth);
  const projectsTmp = projects.filter(
    (project) => project.creator.id === userInfo?.id
  );

  const userOptions = users.map((user) => (
    <Select.Option key={user.userId} value={user.userId}>
      <Avatar size={"small"} src={user.avatar} />
      &nbsp;
      {user.name}
    </Select.Option>
  ));

  const onChangeTimeSpent = (value: number) => {
    setTimeSpent(value);
  };

  const onChangeTimeRemaining = (value: number) => {
    setTimeRemaining(value);
  };

  const onChangeDescription = (val: string) => {
    setDescription(val);
    form.setFieldsValue({ description: val });
  };

  const onSelectProject = (id: number) => {
    dispatch(getUserByProjectId(id));
  };

  // handle submit with solution 1
  // const handleSubmit = (values: any) => {
  //   values.description = description;
  //   taskApi
  //     .createTask(values)
  //     .then(() => {
  //       notification.success({
  //         message: "Successfully",
  //         description: `Create issue successfully!`,
  //         style: {
  //           borderLeft: "5px solid #33cc66",
  //         },
  //       });
  //       form.resetFields();
  //       onToggle();
  //       setDescription("");
  //     })
  //     .catch((error) => {
  //       notification.error({
  //         message: "Error",
  //         description: error,
  //         style: {
  //           borderLeft: "5px solid #f12c36",
  //         },
  //       });
  //     });
  // };

  useEffect(() => {
    dispatch(getAllProject());
    dispatch(getAllTaskType());
    dispatch(getAllPriority());
    dispatch(getAllUser());
    dispatch(getAllStatus());
  }, [dispatch]);

  return (
    <div className="form-issue">
      <Form
        form={form}
        name="register"
        // onFinish={handleSubmit}
        id="form-issue"
        layout="vertical"
      >
        <div id="project" style={{ position: "relative" }}>
          <Form.Item
            name="projectId"
            label="Project"
            hasFeedback
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Select
              getPopupContainer={() =>
                document.getElementById("project") as HTMLElement
              }
              onSelect={(value: number) => onSelectProject(value)}
              placeholder="Select project"
            >
              {projectsTmp.map((project) => (
                <Select.Option key={project.id} value={project.id}>
                  {project.projectName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <div id="task" style={{ position: "relative" }}>
              <Form.Item
                name="typeId"
                label="Issue Type"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  style={{ textTransform: "capitalize" }}
                  getPopupContainer={() =>
                    document.getElementById("task") as HTMLElement
                  }
                  placeholder="Select issue"
                >
                  {taskType.map((task) => (
                    <Select.Option
                      key={task.id}
                      value={task.id}
                      style={{ textTransform: "capitalize" }}
                    >
                      {task.id === 1 ? (
                        <ExclamationCircleFilled
                          style={{ color: "#ff4d4f", fontSize: " 16px" }}
                        />
                      ) : (
                        <CheckSquareFilled
                          style={{ color: "#1890ff", fontSize: " 16px" }}
                        />
                      )}
                      &nbsp;
                      {task.taskType}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Col>
          <Col span={12}>
            <div id="priority" style={{ position: "relative" }}>
              <Form.Item
                name="priorityId"
                label="Issue Priority"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "This field is required",
                  },
                ]}
              >
                <Select
                  getPopupContainer={() =>
                    document.getElementById("priority") as HTMLElement
                  }
                  placeholder="Select priority"
                >
                  {priorities.map((priority) => (
                    <Select.Option
                      key={priority.priorityId}
                      value={priority.priorityId}
                    >
                      {priority.priorityId > 2 ? (
                        <ArrowDownOutlined style={{ color: "#1b5e20" }} />
                      ) : (
                        <ArrowUpOutlined style={{ color: "#ff4d4f" }} />
                      )}
                      &nbsp;
                      {priority.priority}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Col>
        </Row>
        <div id="status" style={{ position: "relative" }}>
          <Form.Item
            name="statusId"
            label="Status"
            hasFeedback
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Select
              getPopupContainer={() =>
                document.getElementById("status") as HTMLElement
              }
              placeholder="Select status"
            >
              {status.map((item) => (
                <Select.Option key={item.statusId} value={item.statusId}>
                  {item.statusName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="taskName"
          label="Short Summary"
          hasFeedback
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input placeholder="Summary" />
        </Form.Item>

        <Form.Item label="Description">
          <ReactQuill value={description} onChange={onChangeDescription} />
        </Form.Item>
        <Form.Item name="description" style={{ display: "none" }}>
          <Input />
        </Form.Item>
        <Form.Item label="Reporter">
          <Select disabled defaultValue={"default"}>
            <Select.Option value="default">
              <Avatar size={"small"} src={userInfo?.avatar} />
              &nbsp;
              <span>{userInfo?.name}</span>
            </Select.Option>
          </Select>
        </Form.Item>
        <div id="assignees" style={{ position: "relative" }}>
          <Form.Item
            name="listUserAsign"
            label="Assignees"
            hasFeedback
            rules={[
              {
                required: true,
                message: "This field is required",
              },
            ]}
          >
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Select"
              optionFilterProp="children"
              getPopupContainer={() =>
                document.getElementById("assignees") as HTMLElement
              }
            >
              {userOptions}
            </Select>
          </Form.Item>
        </div>
        <Form.Item
          name="originalEstimate"
          label="Original Estimate (hours)"
          hasFeedback
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <InputNumber
            min={1}
            maxLength={6}
            placeholder="Number"
            style={{ width: "100%" }}
          />
        </Form.Item>
        <Form.Item label="Time Tracking">
          <Slider
            handleStyle={{ display: "none" }}
            defaultValue={timeSpent}
            max={totalTime}
            value={timeSpent}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: 600,
            }}
          >
            <span>{timeSpent}h logged</span>
            <span>{timeRemaining}h estimated</span>
          </div>
        </Form.Item>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              label="Time Spent (hours)"
              name="timeTrackingSpent"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <InputNumber
                min={0}
                maxLength={6}
                onChange={(val) => onChangeTimeSpent(val)}
                value={timeSpent}
                placeholder="Number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="timeTrackingRemaining"
              label="Time Remaining (hours)"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "This field is required",
                },
              ]}
            >
              <InputNumber
                min={0}
                maxLength={6}
                value={timeRemaining}
                onChange={(val) => onChangeTimeRemaining(val)}
                placeholder="Number"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default NewIssue;

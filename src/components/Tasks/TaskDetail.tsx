import { CheckSquareFilled, ExclamationCircleFilled } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LstTaskDeTail } from "../../models/project";
import { getAllTaskType, selectAllType } from "../../store/reducers/taskSlice";
interface TaskDetailProps {
  task: LstTaskDeTail | null;
  visible: boolean;
  onVisible: (val: boolean) => void;
}
const TaskDetail: FC<TaskDetailProps> = ({ task, visible, onVisible }) => {
  const type = useSelector(selectAllType);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState({
    title: false,
  });

  const [val, setVal] = useState("123");
  const menuType = (
    <Menu>
      {type
        .filter((type) => type.id !== task?.taskTypeDetail.id)
        .map((item) => (
          <Menu.Item key={item.id}>
            {item.id === 1 ? (
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
            <span style={{ marginLeft: "8px" }}>
              {item.taskType.toLocaleUpperCase()}
            </span>
          </Menu.Item>
        ))}
    </Menu>
  );

  useEffect(() => {
    dispatch(getAllTaskType());
  }, [task, dispatch]);

  return (
    <Modal visible={visible} onCancel={() => onVisible(!visible)}>
      <div>
        <Dropdown overlay={menuType} trigger={["click"]}>
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
        </Dropdown>
      </div>
      <Paragraph
        editable={{
          tooltip: "click to edit text",
          onChange: function (string) {
            setVal(string);
          },
          onEnd: function () {
            console.log(111);
          },
          triggerType: ["text" as "text"],
        }}
      >
        {val}
      </Paragraph>
    </Modal>
  );
};

export default TaskDetail;

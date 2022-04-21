import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Drawer,
  Form,
  Modal,
  notification,
  Space,
  Tooltip,
} from "antd";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import taskApi from "../../api/taskApi";
import { selectAuth } from "../../store/reducers/authSlice";
import { getProjectDetail } from "../../store/reducers/projectSlice";
import NewIssue from "../Form/NewIssue";

const NavbarLeft: FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { userInfo } = useSelector(selectAuth);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  // const [description, setDescription] = useState<string>("");

  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const toggleModal = () => {
    form.resetFields();
    setIsOpen(!isOpen);
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      taskApi
        .createTask(values)
        .then((result) => {
          notification.success({
            message: "Successfully",
            description: `Create issue successfully!`,
            style: {
              borderLeft: "5px solid #33cc66",
            },
          });
          dispatch(getProjectDetail(result.projectId));
          form.resetFields();
          toggleModal();
        })
        .catch((error) => {
          notification.error({
            message: "Error",
            description: error,
            style: {
              borderLeft: "5px solid #f12c36",
            },
          });
        });
    });
  };

  return (
    <div className="navbar-left">
      <div className="navbar-left-container">
        <Space direction="vertical" size="middle" className="navbar-left-item">
          <svg
            className="navbar-left-logo"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                x1="108.695%"
                x2="12.439%"
                y1="-14.936%"
                y2="45.215%"
                id="uid11-1"
              >
                <stop stopColor="#DEEBFF" stopOpacity="0.4" offset="0%"></stop>
                <stop stopColor="#DEEBFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                x2="91.029%"
                y1="118.55%"
                y2="63.971%"
                id="uid11-2"
              >
                <stop stopColor="#DEEBFF" stopOpacity="0.4" offset="0%"></stop>
                <stop stopColor="#DEEBFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g>
              <path
                d="M15.967 29.362a6.675 6.675 0 0 0 0-9.442l-8.699-8.671-3.957 3.957a1.062 1.062 0 0 0 0 1.5l12.656 12.656zm12.656-14.156L15.967 2.55l-.039.039a6.675 6.675 0 0 0 .028 9.41l8.706 8.667 3.96-3.96a1.062 1.062 0 0 0 0-1.5z"
                fill="currentColor"
              ></path>
              <path
                d="M15.967 11.992a6.675 6.675 0 0 1-.028-9.41L6.91 11.606l4.72 4.721 4.336-4.335z"
                fill="url(#uid11-1"
              ></path>
              <path
                d="M20.295 15.591l-4.328 4.329a6.675 6.675 0 0 1 0 9.442l9.05-9.05-4.722-4.72z"
                fill="url(#uid11-2"
              ></path>
            </g>
          </svg>
          <Tooltip title="Search" placement="right">
            <Button
              type="primary"
              shape="circle"
              icon={<SearchOutlined />}
              onClick={() => setOpenDrawer(!openDrawer)}
            />
          </Tooltip>
          <Tooltip title="Create issue" placement="right">
            <Button
              type="primary"
              shape="circle"
              icon={<PlusOutlined />}
              onClick={toggleModal}
            />
          </Tooltip>
        </Space>
        <Space direction="vertical" className="navbar-left-item">
          <Tooltip title={userInfo?.name} placement="right">
            <Avatar src={userInfo?.avatar} />
          </Tooltip>
        </Space>
      </div>
      <Modal
        title="Create Issue"
        visible={isOpen}
        onCancel={toggleModal}
        footer={[
          <Button key="back" onClick={toggleModal}>
            Cancel
          </Button>,
          <Button
            // key="submit"       //solution 1:Pass instance by id form &
            // form="form-issue" // handle submit inside Form component
            // htmlType="submit" //solution 2: use Form.useForm & handle by Modal
            type="primary"
            onClick={handleSubmit}
          >
            Create issue
          </Button>,
        ]}
      >
        <NewIssue
          // onToggle={toggleModal}
          form={form}
          // description={description}
          // onChangeDescription = {}
        />
      </Modal>
      <Drawer
        title="Search"
        placement="left"
        closable={false}
        onClose={() => setOpenDrawer(!openDrawer)}
        visible={openDrawer}
        key="left"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </div>
  );
};

export default NavbarLeft;

import { SettingOutlined, SketchOutlined } from "@ant-design/icons";
import { Menu, Typography } from "antd";
import React, { FC, useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
const { Title, Text } = Typography;

const Sidebar: FC = () => {
  const { pathname } = useLocation();

  const [activeMenu, setActiveMenu] = useState<string>("project");

  useEffect(() => {
    setActiveMenu(pathname.replace("/", ""));
  }, [pathname]);

  return (
    <div className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-top">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/768px-React-icon.svg.png?20220125121207"
            alt="React"
          />
          <div className="sidebar-top-text">
            <Title level={5}>React Jira Clone</Title>
            <Text>Software Project</Text>
          </div>
        </div>
        <div className="sidebar-menu">
          <Menu
            onClick={(e) => setActiveMenu(e.key)}
            selectedKeys={[activeMenu]}
          >
            <Menu.Item key="project" icon={<SketchOutlined />}>
              <NavLink to="project">Project Management</NavLink>
            </Menu.Item>
            <Menu.Item key="settings" icon={<SettingOutlined />}>
              <NavLink to="settings">Project Settings</NavLink>
            </Menu.Item>
          </Menu>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

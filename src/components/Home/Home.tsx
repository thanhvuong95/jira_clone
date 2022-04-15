import { Layout } from "antd";
import { Content } from "antd/lib/layout/layout";
import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import NavbarLeft from "../Navbar/NavbarLeft";
import Sidebar from "../Sidebar/Sidebar";

const Home: FC = () => {
  return (
    <Layout style={{ minHeight: "100vh", flexDirection: "row" }}>
      <NavbarLeft />
      <Sidebar />
      <Content style={{ padding: "24px", backgroundColor: "#fff" }}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default Home;

import { Breadcrumb } from "antd";
import React, { FC } from "react";

const BreadCrumb: FC<{ subPath: string }> = ({ subPath }) => {
  const breadCrumbs = ["Projects", "React Jira Clone", "Project", subPath];

  return (
    <Breadcrumb style={{ textTransform: "capitalize" }}>
      {breadCrumbs.map((item, i) => (
        <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;

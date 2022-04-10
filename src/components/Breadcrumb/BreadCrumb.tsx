import { Breadcrumb } from "antd";
import React, { FC } from "react";
import { useLocation } from "react-router-dom";

const BreadCrumb: FC = () => {
  const location = useLocation();
  const breadCrumbsDefault = ["Projects", "React Jira Clone", "Project"];
  const breadCrumbsExtra = breadCrumbsDefault.concat(
    location.pathname.split("/").slice(-1) //get last item
  );

  return (
    <Breadcrumb style={{ textTransform: "capitalize" }}>
      {breadCrumbsExtra.map((item, i) => (
        <Breadcrumb.Item key={i}>{item}</Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadCrumb;

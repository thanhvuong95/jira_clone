import { Avatar, Button, Space } from "antd";
import Search from "antd/lib/input/Search";
import Title from "antd/lib/typography/Title";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  getProjectDetail,
  selectProjectDetail,
} from "../../store/reducers/projectSlice";
import BreadCrumb from "../Breadcrumb/BreadCrumb";
import Tasks from "../Tasks/Tasks";

const Board: FC = () => {
  const dispatch = useDispatch();
  const project = useSelector(selectProjectDetail);
  const onSearch = (value: string) => console.log(value);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProjectDetail(Number(id)));
  }, [id, dispatch]);

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <BreadCrumb />
        <Title level={3}>Kanban Board</Title>
        <Space size="middle">
          <Search
            placeholder="Search..."
            onSearch={onSearch}
            enterButton
            allowClear
            loading={false}
            style={{ width: "200px" }}
          />
          <Avatar.Group maxCount={3} size="large">
            {project?.members.map((member) => (
              <Avatar src={member.avatar} size="large" key={member.userId} />
            ))}
          </Avatar.Group>
          <Space>
            <Button type="text">Only My Issues</Button>
            <Button type="text">Ignore Resolved</Button>
          </Space>
        </Space>
        <Tasks />
      </Space>
    </div>
  );
};

export default Board;

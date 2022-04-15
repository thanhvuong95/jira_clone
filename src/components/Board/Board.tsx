import { Avatar, Button, Divider, Space } from "antd";
import Search from "antd/lib/input/Search";
import Title from "antd/lib/typography/Title";
import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LstTask } from "../../models/project";
import { selectAuth } from "../../store/reducers/authSlice";
import {
  getProjectDetail,
  selectProjectDetail,
} from "../../store/reducers/projectSlice";
import BreadCrumb from "../Breadcrumb/BreadCrumb";
import Tasks from "../Tasks/Tasks";

const Board: FC = () => {
  const dispatch = useDispatch();
  const project = useSelector(selectProjectDetail);
  const [sort, setSort] = useState<string>("");

  const onSearch = (value: string) => console.log(value);

  const { id } = useParams();

  useEffect(() => {
    dispatch(getProjectDetail(Number(id)));
  }, [id, dispatch]);

  return (
    <div>
      <Space direction="vertical" size="middle" style={{ width: "100%" }}>
        <BreadCrumb subPath="Issue" />
        <Title level={3}>{project?.projectName}</Title>
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
            <Button type="text" onClick={() => setSort("user")}>
              Only My Issues
            </Button>
            <Button type="text" onClick={() => setSort("doing")}>
              Ignore Resolved
            </Button>
            {sort && (
              <>
                <Divider type="vertical" />
                <Button type="text" onClick={() => setSort("")}>
                  Clear filter
                </Button>
              </>
            )}
          </Space>
        </Space>
        <Tasks sort={sort} />
      </Space>
    </div>
  );
};

export default Board;

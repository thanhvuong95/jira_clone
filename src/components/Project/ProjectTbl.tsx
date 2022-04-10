import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  AutoComplete,
  Avatar,
  Button,
  Empty,
  notification,
  PaginationProps,
  Popconfirm,
  Popover,
  Space,
  Table,
  Tag,
  Tooltip,
} from "antd";
import { FilterValue, SorterResult } from "antd/lib/table/interface";
import Title from "antd/lib/typography/Title";
import React, { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import projectApi from "../../api/projectApi";
import userApi from "../../api/userApi";
import { Member, Project } from "../../models/project";
import { User } from "../../models/user";
import { selectAuth } from "../../store/reducers/authSlice";
import {
  getAllProject,
  selectAllProject,
} from "../../store/reducers/projectSlice";
import { AppDispatch } from "../../store/store";

const ProjectTbl: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const projects = useSelector(selectAllProject);
  const [visible, setVisible] = useState<number | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [userVal, setUserVal] = useState<string>("");
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [sorted, setSorted] = useState<{ sortedInfo: any }>({
    sortedInfo: null,
  });
  const userRef = useRef<any>(null);

  const [users, setUsers] = useState<User[]>([]);

  const { userInfo } = useSelector(selectAuth);

  // filter project by user
  const projectsTmp = projects
    .map((project) => {
      return { ...project, key: project.id };
    })
    .filter((item) => item.creator.id === userInfo?.id);

  const handleChange = (
    pagination: PaginationProps,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<Project & { key: number }>
      | SorterResult<Project & { key: number }>[]
  ) => {
    setSorted({
      sortedInfo: sorter,
    });
  };

  const handleDelete = (id: number) => {
    setConfirmLoading(true);
    projectApi
      .removeById(id)
      .then(() => {
        setVisible(null);
        setConfirmLoading(false);
        openNotification("success", id);
        dispatch(getAllProject());
      })
      .catch((e) => {
        setVisible(null);
        setConfirmLoading(false);
        openNotification("fail");
      });
  };

  const showPopConfirm = (id: number) => {
    setVisible(id);
  };

  const handleCancel = () => {
    setVisible(null);
  };

  let lastIndex = 0;
  const updateIndex = () => {
    lastIndex++;
    return lastIndex;
  };

  const openNotification = (type: string, id: number | string = "") => {
    if (type === "success") {
      notification.success({
        message: "Successfully",
        description: `You have successfully deleted the project ${id}. `,
        style: {
          borderLeft: "5px solid #33cc66",
        },
      });
    } else {
      notification.error({
        message: "Error",
        description: `Delete project failed. Please try again. `,
        style: {
          borderLeft: "5px solid #f12c36",
        },
      });
    }
  };

  // debounce search use useRef hook
  const onSearchUser = (searchText: string) => {
    if (userRef) {
      clearTimeout(userRef.current);
    }
    userRef.current = setTimeout(() => {
      userApi
        .searchUser(searchText)
        .then((data) => {
          setUsers(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 300);
  };

  const onSelectUser = (userId: number, label: string, projectId: number) => {
    setUserVal(label);
    projectApi
      .assignUser({ projectId, userId })
      .then(() => {
        togglePopover();
        setUserVal("");
        dispatch(getAllProject());
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description: `Add member failed!. `,
          style: {
            borderLeft: "5px solid #f12c36",
          },
        });
      });
  };

  const options = users.map((user) => {
    return {
      label: user.name,
      value: user.userId.toString(), //Autocomplete required type string for property value
    };
  });

  const togglePopover = () => {
    setOpen(!open);
  };

  let { sortedInfo } = sorted;
  sortedInfo = sortedInfo || {};
  const columns = projectsTmp.length
    ? [
        {
          title: "*",
          key: "STT",
          render: (text: Project, record: Project, index: number) => (
            <span key={index}>{index + 1}</span>
          ),
        },
        {
          title: "Project Name",
          key: `projectName${updateIndex()}`,
          render: (text: Project) => (
            <Link to={`/project/${text.id}`} key={text.id}>
              {text.projectName}
            </Link>
          ),
          sorter: (a: Project, b: Project) =>
            a.projectName.length - b.projectName.length,
          sortOrder: sortedInfo.columnKey === "projectName" && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: "Category",
          dataIndex: "categoryName",
          key: "categoryName",
          sorter: (a: Project, b: Project) =>
            a.categoryName.length - b.categoryName.length,
          sortOrder:
            sortedInfo.columnKey === "categoryName" && sortedInfo.order,
          ellipsis: true,
        },
        {
          title: "Creator",
          key: "creator",
          dataIndex: "creator",
          sorter: (a: Project, b: Project) =>
            a.creator.name.length - b.creator.name.length,
          sortOrder: sortedInfo.columnKey === "creator" && sortedInfo.order,
          ellipsis: true,
          render: (creator: { id: number; name: string }) => (
            <Tag color="green" key={creator.id}>
              {creator.name.toUpperCase()}
            </Tag>
          ),
        },
        {
          title: "Members",
          key: "members",
          dataIndex: "members",
          render: (members: Member[], record: Project) => (
            <div style={{ display: "flex" }}>
              <Avatar.Group maxCount={3} size="small">
                {members.map((member, index) => (
                  <Avatar size="small" src={member.avatar} key={index} />
                ))}
              </Avatar.Group>
              <Popover
                content={
                  <AutoComplete
                    options={options}
                    style={{ width: "100%" }}
                    onSelect={(
                      value: string,
                      options: { label: string; value: string }
                    ) => onSelectUser(Number(value), options.label, record.id)}
                    onSearch={onSearchUser}
                    placeholder="Search user"
                    value={userVal}
                    onChange={(val) => setUserVal(val)}
                  />
                }
                title="Add user"
                trigger="click"
                placement="bottom"
                visible={open}
                onVisibleChange={togglePopover}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  size="small"
                />
              </Popover>
            </div>
          ),
        },
        {
          title: "Action",
          key: "action",
          render: (_: any, record: Project) => (
            <Space size="small" key={record.id}>
              <Tooltip title="Edit">
                <Button
                  type="primary"
                  shape="circle"
                  size="small"
                  icon={<EditOutlined />}
                />
              </Tooltip>
              <Popconfirm
                title="Are you sure to delete this project?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => handleDelete(record.id)}
                onCancel={handleCancel}
                visible={record.id === visible}
                okButtonProps={{ loading: confirmLoading }}
              >
                <Tooltip title="Delete">
                  <Button
                    type="primary"
                    shape="circle"
                    danger
                    size="small"
                    icon={<DeleteOutlined />}
                    onClick={() => showPopConfirm(record.id)}
                  />
                </Tooltip>
              </Popconfirm>
            </Space>
          ),
        },
      ]
    : undefined;

  useEffect(() => {
    dispatch(getAllProject());
  }, [dispatch]);

  return (
    <>
      <Title
        level={2}
        style={{ textTransform: "uppercase", textAlign: "center" }}
      >
        Project Management
      </Title>
      {projectsTmp.length ? (
        <Table
          columns={columns}
          dataSource={projectsTmp}
          onChange={handleChange}
        />
      ) : (
        <Empty>
          <Button type="primary">Create Now</Button>
        </Empty>
      )}
    </>
  );
};

export default ProjectTbl;

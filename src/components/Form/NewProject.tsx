import { Button, Form, Input, Select } from "antd";
import TextArea from "antd/lib/input/TextArea";
import Title from "antd/lib/typography/Title";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategory, selectCategory } from "../../store/reducers/projectSlice";
import projectApi from "../../api/projectApi";
import BreadCrumb from "../Breadcrumb/BreadCrumb";
import Toast from "../Toast/Toast";

const NewProject: FC = () => {
  const categories = useSelector(selectCategory);
  const [form] = Form.useForm();
  const onSubmit = (project: {
    projectName: string;
    description: string;
    categoryId: number;
  }) => {
    projectApi
      .create(project)
      .then(() => {
        Toast({ type: "success", message: "Create new project successfully." });
        form.resetFields();
      })
      .catch((error) => {
        Toast({ type: "error", message: "Create new project failed." });
      });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);
  return (
    <div>
      <BreadCrumb subPath="New Project" />
      <br />
      <Title level={3}>Create Project</Title>
      <Form
        layout="vertical"
        style={{ maxWidth: 600 }}
        onFinish={onSubmit}
        form={form}
      >
        <Form.Item
          label="Name"
          name="projectName"
          hasFeedback
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <Input placeholder="Project name" />
        </Form.Item>
        <div id="category" style={{ position: "relative" }}>
          <Form.Item
            label="Category"
            name="categoryId"
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
                document.getElementById("category") as HTMLElement
              }
              placeholder="Select category"
            >
              {categories.map((category) => (
                <Select.Option key={category.id} value={category.id}>
                  {category.projectCategoryName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </div>

        <Form.Item
          label="Description"
          name="description"
          hasFeedback
          rules={[
            {
              required: true,
              message: "This field is required",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewProject;

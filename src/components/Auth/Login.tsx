import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import Paragraph from "antd/lib/typography/Paragraph";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, selectAuth } from "../../store/reducers/authSlice";
import Toast from "../Toast/Toast";
const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, error, userInfo } = useSelector(selectAuth);
  const onFinish = (values: { email: string; password: string }) => {
    dispatch(login(values));
  };

  useEffect(() => {
    if (error) {
      Toast({ type: "error", message: error });
    }
  }, [error]);

  useEffect(() => {
    if (userInfo) {
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      navigate("/");
    }
  }, [userInfo, navigate]);

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <Form
        name="normal_login"
        className="login-form"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <div style={{ textAlign: "center" }}>
          <svg
            className="login-form-logo"
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
                <stop stopColor="#40a9ff" stopOpacity="0.4" offset="0%"></stop>
                <stop stopColor="#40a9ff" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="0%"
                x2="91.029%"
                y1="118.55%"
                y2="63.971%"
                id="uid11-2"
              >
                <stop stopColor="#40a9ff" stopOpacity="0.4" offset="0%"></stop>
                <stop stopColor="#40a9ff" offset="100%"></stop>
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
        </div>
        <Paragraph strong style={{ fontSize: "32px", textAlign: "center" }}>
          Sign In
        </Paragraph>
        <Form.Item
          label="Email"
          name="email"
          hasFeedback
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please input valid email!" },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          hasFeedback
          rules={[
            { required: true, message: "Please input your Password!" },
            () => ({
              validator(_, value) {
                const regex =
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
                if (value && regex.test(value)) {
                  return Promise.resolve();
                }
                if (value && !regex.test(value))
                  return Promise.reject(
                    new Error(
                      "Password must be at least 6 characters includes uppercase letter, lowercase letter, number and  special character"
                    )
                  );
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            loading={isLogged}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

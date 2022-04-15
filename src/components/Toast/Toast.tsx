import { notification } from "antd";
interface ToastProp {
  type: string;
  message: string;
}
const Toast = ({ type, message }: ToastProp) => {
  if (type === "success") {
    return notification.success({
      message: "Successfully!",
      description: message,
      style: {
        borderLeft: "5px solid #33cc66",
      },
    });
  }
  return notification.error({
    message: "Error",
    description: message,
    style: {
      borderLeft: "5px solid #f12c36",
    },
  });
};

export default Toast;

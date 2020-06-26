//imports
import styled from "styled-components";
import { Colors } from "./Colors";
require("animate.css");
const React = require("react");
const { store } = require("react-notifications-component");

const CustomNotification = styled.div`
  padding: 8px 15px;
  display: inline-block;
  width: 100%;
  border-radius: 6px;
    ${({ type }) =>
      type === "success" &&
      `background: ${Colors.Status.SuccessStatus}; border-left: 8px solid ${Colors.Status.SuccessStatus}`}
    ${({ type }) =>
      type === "danger" &&
      `background: ${Colors.Status.FailureStatus}; border-left: 8px solid ${Colors.Status.FailureStatus}`}
    ${({ type }) =>
      type === "info" &&
      `background: ${Colors.Status.SystemMessageStatus}; border-left: 8px solid ${Colors.Status.SystemMessageStatus}`}
    ${({ type }) =>
      type === "warning" &&
      `background: ${Colors.Status.WaitingStatus}; border-left: 8px solid ${Colors.Status.WaitingStatus}`};
`;

const Title = styled.div`
  color: ${Colors.White};
  font-weight: 700;
  font-size: 14px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const Message = styled.div`
  color: ${Colors.White};
  max-width: calc(100% - 15px);
  font-size: 14px;
  line-height: 150%;
  word-wrap: break-word;
  margin-bottom: 0;
  margin-top: 0;
`;

export function Notification(title, message, type) {
  type = type.toLowerCase();

  function MyNotification() {
    return (
      <CustomNotification type={type}>
        <Title>{title}</Title>
        <Message>{message}</Message>
      </CustomNotification>
    );
  }

  store.addNotification({
    title,
    message,
    type, //success, danger, info, default, warning
    insert: "top",
    content: MyNotification,
    container: "top-right",
    animationIn: ["animated", "fadeIn"],
    animationOut: ["animated", "fadeOut"],
    width: 280,
    dismiss: {
      duration: 5000,
    },
  });
}

import React from "react";
import "./message.css";

const Message = ({ content, sender }) => {
  console.log(sender);
  return (
    <div
      className={`message ${
        sender === "user" ? "message--user" : "message--bot"
      }`}
    >
      {content}
    </div>
  );
};

export default Message;

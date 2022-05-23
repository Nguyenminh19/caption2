import React from "react";
import "./message.css";

const Message = ({ content, sender, options }) => {
  return (
    <div>
      {content &&
        content.split(". ").map((item, index) => (
          <div
            className={`message ${
              sender === "user" ? "message--user" : "message--bot"
            }`}
            key={index}
          >
            {item}
          </div>
        ))}
      {options && <div>{options()}</div>}
    </div>
  );
};

export default Message;

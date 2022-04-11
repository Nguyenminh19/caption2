import React, { useEffect, useRef, useState } from "react";
import useGetAnswer from "../../hooks/use-getAnswer";
import Message from "../Message/Message";
import "./homepage.css";

const Homepage = () => {
  const [conversation, setConversation] = useState(() => {
    const saved = sessionStorage.getItem("conversation");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const addMessageToConversation = (message) => {
    setConversation((prevState) => [
      ...prevState,
      {
        sender: "bot",
        content: message,
      },
    ]);
  };

  // const { isLoading, error, sendRequest } = useGetAnswer(
  //   addMessageToConversation
  // );

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }

    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  const textRef = useRef();
  const chatboxRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (textRef.current.value) {
      setConversation((prevState) => {
        return [
          ...prevState,
          {
            sender: "user",
            content: textRef.current.value,
          },
        ];
      });
      // sendRequest(textRef.current.value);
    }
  };

  return (
    <div className="chatbox">
      <div className="chatbox-content" ref={chatboxRef}>
        {conversation.map((mess, index) => (
          <Message key={index} sender={mess.sender} content={mess.content} />
        ))}
      </div>
      <div className="chatbox-control">
        <form onSubmit={submitHandler}>
          <div className="input-group">
            <input
              type="text"
              className="input-text"
              placeholder="Enter your message ...."
              ref={textRef}
            />
            <div className="chatbox-action">
              <button>
                <i className="fa-solid fa-microphone"></i>
              </button>
              <button
                type="submit"
                // onClick={(event) => {
                //   submitHandler(event);
                // }}
              >
                <i className="fa-solid fa-circle-arrow-right"></i>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Homepage;

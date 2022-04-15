import React, { useEffect, useRef, useState } from "react";
import useGetAnswer from "../../hooks/use-getAnswer";
import Message from "../Message/Message";
import About from "./About";
import "./homepage.css";
import Service from "./Service";

const Homepage = () => {
  const [conversation, setConversation] = useState(() => {
    const saved = sessionStorage.getItem("conversation");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [userInput, setUserInput] = useState("");

  const addMessageToConversation = (message) => {
    setConversation((prevState) => [
      ...prevState,
      {
        sender: "bot",
        content: message,
      },
    ]);
  };

  const { isLoading, error, sendRequest } = useGetAnswer(
    addMessageToConversation
  );

  useEffect(() => {
    if (conversation.length === 0) {
      sendRequest("hello");
    }
  }, [conversation]);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation]);

  // const textRef = useRef();
  const chatboxRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    if (userInput !== "") {
      setConversation((prevState) => {
        return [
          ...prevState,
          {
            sender: "user",
            content: userInput,
          },
        ];
      });
      sendRequest(userInput);

      setUserInput("");
    }
  };

  return (
    <>
      <About />
      <section className="section" id="section-chatbox">
        <div className="chatbox">
          <div className="chatbox-content" ref={chatboxRef}>
            {conversation.map((mess, index) => (
              <Message
                key={index}
                sender={mess.sender}
                content={mess.content}
              />
            ))}
          </div>
          <div className="chatbox-control">
            <form onSubmit={submitHandler}>
              <div className="input-group">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Enter your message ...."
                  // ref={textRef}
                  value={userInput}
                  onChange={(event) => {
                    setUserInput(event.target.value);
                  }}
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
      </section>

      <Service />
    </>
  );
};

export default Homepage;

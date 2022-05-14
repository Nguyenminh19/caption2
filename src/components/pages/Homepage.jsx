import React, { useEffect, useRef, useState } from "react";
import useGetAnswer from "../../hooks/use-getAnswer";
import Message from "../Message/Message";
import About from "./About";
import "./homepage.css";
import Service from "./Service";
import WFHImage from "../../assets/img/WFH.png";

import benefit1 from "../../assets/img/benefit1.jpg";
import benefit2 from "../../assets/img/benefit2.jpg";
import benefit3 from "../../assets/img/benefit3.jpg";

const benefits = [
  {
    img: benefit1,
    title: "GO LIVEIN MINUTES",
    description:
      "Save development time & cost with chatbots developed by conversational design experts to boost conversion",
  },
  {
    img: benefit2,
    title: "100% CUSTOMISABLE DESIGN",
    description:
      "Customize any element including backgrounds, fonts, colors, buttons or choose from predefined designs.",
  },
  {
    img: benefit3,
    title: "PRE-SET APP INTEGRATIONS",
    description:
      "Sync data in realtime across leading apps with ready to setup integrations available in each chatbot template.",
  },
];

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
      <section className="section" id="section-intro">
        <div className="container">
          <div className="intro__description">
            <h3 className="section-title">About product</h3>
            <p>
              We detect one problem when using Sakai: students meet problems and
              do not know how to use Sakai during the study process. The
              evidence includes students get lagged because of the internet
              connection, are unable to enter Zoom or even have no idea how to
              submit assignments. Additionally, many students do not know how to
              use MyDTU masterfully and some of them get some troubles that they
              do not know how to handle. We saw the above situations on the
              university forum on Facebook.
            </p>
            <p>
              To solve this problem, we decided to create an Chatbot For
              Education. This helps students effectively communicate with the
              teachers by answering all common questions. Doing this enables
              both students and teachers to save their time and make the best of
              their learning experiences. Moreover, it also answers the
              question, gives information as well as a way to handle the
              problems that students want to know during the study process.
            </p>
            <p>
              From which, we create the Chatbot For Education that can answer
              all the questions every time. It helps to save the time that
              students wait to get answers. It also helps lecturers not to
              answer the same question many times or answer too many questions.
            </p>
            <p>
              The Chatbot For Education is smart enough to answer all the
              questions related to Elearning, MyDTU, School.
            </p>
          </div>
          <div className="intro__img">
            <img src={WFHImage} alt="" />
          </div>
        </div>
      </section>

      <section className="section" id="section-benefit">
        <div className="container">
          <div className="section-title text-center">
            Why use a Chatbot For Education?
          </div>
          <div className="benefit-list">
            {benefits.map((item, index) => (
              <div key={index} className="benefit-item">
                <div className="benefit-img">
                  <img src={item.img} alt="" />
                </div>
                <p className="benefit-title">{item.title}</p>
                <p className="benefit-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* <Service /> */}
    </>
  );
};

export default Homepage;

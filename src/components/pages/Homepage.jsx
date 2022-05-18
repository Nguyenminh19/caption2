import React, { useEffect, useRef, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useGetAnswer from "../../hooks/use-getAnswer";
import Message from "../Message/Message";
import About from "./About";
import "./homepage.css";
import Service from "./Service";

const Homepage = () => {
  const {
    transcript,
    listening,
    browserSupportsSpeechRecognition,
    resetTranscript,
  } = useSpeechRecognition();

  const [conversation, setConversation] = useState(() => {
    const saved = sessionStorage.getItem("conversation");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  const [userInput, setUserInput] = useState("");

  const [numberRequest, setNumberRequest] = useState(0);

  const addMessageToConversation = (message) => {
    setConversation((prevState) => [
      ...prevState,
      {
        sender: "bot",
        content: message,
      },
    ]);
  };

  const { isLoading, error, sendRequest, rateOfConfusedAnwser, numberAnwer } =
    useGetAnswer(addMessageToConversation);

  useEffect(() => {
    if (rateOfConfusedAnwser > 0.6 && numberAnwer > 6) {
      addMessageToConversation(
        "Câu trả lời có vẻ như không được chính xác. Bạn có thể nhập câu hỏi bằng chữ để nâng cao sự chính xác của câu trả lời"
      );
    }
  }, [rateOfConfusedAnwser, numberAnwer]);

  useEffect(() => {
    if (numberRequest === 0) {
      setNumberRequest(numberRequest + 1);

      setConversation([
        {
          sender: "bot",
          content: " Hello nhá. Mình là DTUBot, mình có thể giúp gì cho bạn?",
        },
      ]);
    }
  }, []);

  useEffect(() => {
    if (chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
    sessionStorage.setItem("conversation", JSON.stringify(conversation));
  }, [conversation, transcript]);

  const chatboxRef = useRef();

  const setConversationFnc = () => {
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
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (userInput !== "") {
      setConversationFnc();
    }
  };

  useEffect(() => {
    if (transcript !== "" && !listening) {
      setConversation((prevState) => {
        return [
          ...prevState,
          {
            sender: "user",
            content: transcript,
          },
        ];
      });
      sendRequest(transcript);
      setUserInput("");
      resetTranscript();
    }
  }, [listening]);

  return (
    <>
      <About />
      <section className="section" id="section-chatbox">
        <p className="section-noty">
          {!browserSupportsSpeechRecognition &&
            `Chức năng nhập câu hỏi bằng giọng nói hiện chỉ hỗ trợ trên trình duyệt Chrome.`}
        </p>
        <div className="chatbox">
          <div className="chatbox-content" ref={chatboxRef}>
            {conversation.map((mess, index) => (
              <Message
                key={index}
                sender={mess.sender}
                content={mess.content}
              />
            ))}
            {transcript.length !== 0 && (
              <div className="message message--user">{transcript}</div>
            )}
          </div>
          <div className="chatbox-control">
            <form onSubmit={submitHandler}>
              <div className="input-group">
                <input
                  type="text"
                  className="input-text"
                  placeholder="Enter your message ...."
                  value={userInput}
                  onChange={(event) => {
                    setUserInput(event.target.value);
                  }}
                />
                <div className="chatbox-action">
                  {browserSupportsSpeechRecognition && (
                    <button
                      className={listening ? `chatbox-action-micro` : ""}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        SpeechRecognition.startListening({ language: "vi-VN" });
                      }}
                    >
                      <i className="fa-solid fa-microphone"></i>
                    </button>
                  )}
                  <button type="submit">
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

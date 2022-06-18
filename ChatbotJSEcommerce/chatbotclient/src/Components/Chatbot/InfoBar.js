import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { GiCrossMark } from "react-icons/gi";
import "./style.css";

const InfoBar = ({ setOpenBot, openBot, chatList, feedcomp, setfeedcomp }) => {
  const [stop, setStop] = useState(false);
  const closeBot = () => {
    setStop(true);
  };

  const savechat = async (chat) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };

      const { data } = await axios.post(
        `/api/v1/bot/userchat`,
        { chat },
        config
      );
    } catch (error) {
      console.log(error);
    }
  };

  const call = () => {
    if (feedcomp.complain || feedcomp.feedback) {
      savechat(chatList);

      setfeedcomp({
        complain: false,
        feedback: false,
      });
    }
  };

  useEffect(() => {
    if (stop) {
      call();
      setOpenBot(false);
      setStop(false);
    }
  }, [stop]);

  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <div className="chatBotIcon">
          <img
            className="onlineIcon"
            src="https://thumbs.dreamstime.com/z/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-robot-icon-chat-bot-sign-support-service-121644324.jpg"
            alt="chatbot icon"
          />
          <div className="dot"></div>
        </div>
        <div className="chat-detail">
          <h3>Chatbot</h3>
          <p>Online</p>
        </div>
      </div>
      <div className="cross">
        <GiCrossMark onClick={closeBot} color="#fff" />
      </div>
    </div>
  );
};

export default InfoBar;

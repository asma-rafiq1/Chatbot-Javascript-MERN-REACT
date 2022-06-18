import React, { useContext } from "react";
import "./Msg.js";
import "./style.css";

const OpenChatbot = ({ user }) => {
  const [adminMsg, setAdminMsg] = React.useState(
    `Hi! ${user}. How can i help you?`
  );

  setTimeout(() => {
    setAdminMsg("");
  }, 15000);
  return (
    <div className="badge">
      {adminMsg && (
        <div className="messageBox backgroundLights">
          <p className="messageText colorWhite">{adminMsg}</p>
        </div>
      )}
      <img
        className="img-icon-main pr-10"
        src="https://thumbs.dreamstime.com/z/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-robot-icon-chat-bot-sign-support-service-121644324.jpg"
      />
      <span class="icon-button__badge">1</span>
    </div>
  );
};

export default OpenChatbot;

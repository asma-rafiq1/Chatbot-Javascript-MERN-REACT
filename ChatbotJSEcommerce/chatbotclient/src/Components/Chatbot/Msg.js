import React, { useContext } from "react";
import "./style.css";
import { BsDot } from "react-icons/bs";
import profile from "../../images/Profile.png";
import UserContext from "../../Context/createContext";

const Msg = ({ msg, dateSent, userMsg, onSendMsg, user }) => {
  return (
    <div className="msgdisplay">
      {userMsg && (
        <div className="messageContainer justifyEnd">
          <div className="top">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">{userMsg}</p>
            </div>
            <p className="date"> {dateSent}</p>
          </div>
          <img className="img-icon pr-10" src={profile} />
        </div>
      )}

      {msg && (
        <div className="messageContainer justifyStart">
          <img
            className="img-icon pr-10"
            src="https://thumbs.dreamstime.com/z/robot-icon-chat-bot-sign-support-service-concept-chatbot-character-flat-style-robot-icon-chat-bot-sign-support-service-121644324.jpg"
          />
          <div className="sugg">
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">{msg}</p>
            </div>

            {(msg === `Hi! Chatbot here. How can i help you ${user}?` ||
              msg === "I am fine" ||
              msg === "Thanks Bye, is there anything else you want to ask?" ||
              msg === `Great ${user}! How can i help you today?`) && (
              <div className="suggestion">
                <div
                  className="suggestion1"
                  onClick={() => {
                    onSendMsg("I have questions");
                  }}
                >
                  I have questions
                </div>
                <div
                  className="suggestion2"
                  onClick={(e) => {
                    onSendMsg("Want to know about refund policy?");
                  }}
                >
                  Want to know about refund policy
                </div>
                <div
                  className="suggestion3"
                  onClick={(e) => {
                    onSendMsg(`I need help`);
                  }}
                >
                  I need help
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Msg;

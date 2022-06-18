import React, { Fragment, useContext, useEffect, useState } from "react";
import "./Home.css";
import MetaData from "./Components/MetaData";
import ChatBot from "./Components/Chatbot";
import Tick from "./sound/tick.mp3";
import OpenChatbot from "./Components/Chatbot/OpenChatbot";
import { Howl } from "howler";
import axios from "axios";
import UserContext from "./Context/createContext";

const Home = () => {
  const [openBot, setOpenBot] = useState(false);

  const value = useContext(UserContext);
  const { user } = value;
  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  useEffect(() => {
    callMySound(Tick);
  }, []);

  return (
    <Fragment>
      <MetaData title="E-elite Grocery" />

      <div className="banner">
        <p>Welcome to E-Elite Grocery</p>
        <h1>Find Fresh Grocery Items below</h1>

        <a href="#container">
          <button>Scroll</button>
        </a>
      </div>

      <div className="stick">
        <div
          className="chatbotparent"
          onClick={() => {
            setOpenBot(true);
          }}
        >
          {openBot ? (
            <ChatBot user={user} openBot={openBot} setOpenBot={setOpenBot} />
          ) : (
            <OpenChatbot user={user} />
          )}
        </div>
      </div>
    </Fragment>
  );
};

export default Home;

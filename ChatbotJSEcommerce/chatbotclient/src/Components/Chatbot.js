import React, { useState, useContext } from "react";
import "../Components/Chatbot/style.css";
import Msg from "../Components/Chatbot/Msg";
import InfoBar from "../Components/Chatbot/InfoBar";
import ScrollToBottom from "react-scroll-to-bottom";
import { MdRecordVoiceOver } from "react-icons/md";
import { HiArrowCircleRight } from "react-icons/hi";
import Tick from "../sound/tick.mp3";
import { Howl } from "howler";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import UserContext from "../Context/createContext";
import { data } from "../App";

let chats = [];
const ChatBot = ({ setOpenBot, openBot, user }) => {
  let data = [
    {
      question: "hi",
      answer: `Hello ${user}`,
    },
    {
      question: "hello",
      answer: `Hi ${user}`,
    },
    {
      question: "hi bot",
      answer: `Hello ${user}`,
    },
    {
      question: "hello bot",
      answer: `Hi  ${user}`,
    },
    {
      question: "how are you",
      answer: "I am fine. How are you?",
    },
    {
      question: "I am fine good great happy",
      answer: `Great ${user}! How can i help you today?`,
    },
    {
      question: "age",
      answer: "I was developed yesterday",
    },
    {
      question: "name",
      answer: "I am bot",
    },
    {
      question: "company",
      answer:
        "Elite Grocery is a vast Internet-based enterprise that sells vegetables, fruits, spices, herbs, sauces and many other goods, either directly or as the middleman between other retailers and elite grocery millions of customers.",
    },
    {
      question: "help",
      answer: "Please contact us at elitegrocery@gmail.com",
    },
    {
      question: "refund policy damaged, incomplete faulty item",
      answer:
        "Thank you for shopping at Elite Grocery!We offer refund and/or exchange within the first 30 days of your purchase, if 30 days have passed since your purchase, you will not be offered a refund and/or exchange of any kind.",
    },
    {
      question: "best product line?",
      answer: "Our best product line is fresh veges and fruits selling",
    },
    {
      question: "exchange",
      answer:
        "We only replace items if they are defective or damaged. If you need to exchange it for the same item, send us an email at elitegrocery@gmail.com.",
    },
    {
      question: "forgot my password",
      answer:
        "Please reset your password by visiting our website shop login page",
    },
    {
      question: "feedback",
      answer: `Please go ahead ${user}, we will be very happy to hear`,
    },
    {
      question: "located",
      answer:
        "Elite Grocery operates 1,137 fulfillment centers of various types in the U.S. Elite HQ2 is Elites corporate headquarters in Crystal City, Arlington, Virginia and is an expansion of the companys headquarters in Seattle, Washington.",
    },
    {
      question:
        "discount discounts special offers promotion coupon code offer special",
      answer: `Hi ${user}, We’re so happy to have you on board! As a thank you, we’ve got a special 10% discount just for you. Use AYV267. The offer is valid until 10-june-2022. Hope you’ll enjoy it! Best`,
    },
    {
      question: "support",
      answer:
        "Okay — I am connecting you with the next available team member, which should only take a few minutes.",
    },
    {
      question: "terms and conditions",
      answer:
        "You will be responsible for paying for your own shipping costs for returning your item. Shipping costs are non-refundable! If you receive a refund, the cost of return shipping will be deducted from your refund. Please see, we cannot guarantee that we will receive your returned item.",
    },
    {
      question: "support agent",
      answer:
        "In case we get disconnected, what’s a good email address for the team to follow up with you?",
    },
    {
      question: "you are bad good",
      answer: "Thanks, is there anything else you want to ask?",
    },

    {
      question: "yes no",
      answer: "Oh Okay understood!",
    },

    {
      question: "good",
      answer: "Thanks, is there anything else you want to ask?",
    },
    {
      question: "bye",
      answer: "Thanks Bye, is there anything else you want to ask?",
    },
    {
      question: "i love you like",
      answer: "Thanks, I love you too",
    },
    {
      question: "question query",
      answer: "Yes please go ahead. What's your question?",
    },
    {
      question: "haha lol",
      answer: "Hahahahah! You're funny",
    },
    {
      question: "complain",
      answer: "Please write us your Complain",
    },
    {
      question: "thanks",
      answer: "You're welcome",
    },
    {
      question: "thank you",
      answer: "You're welcome",
    },
    {
      question: "ok",
      answer: "Is there anything else?",
    },
    {
      question: "okay",
      answer: "Is there anything else?",
    },
  ];

  //user speech recogition
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const callMySound = (src) => {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  };

  const [listens, setListens] = useState(false);

  const listen = () => {
    setListens((val) => !val);
    if (listens) {
      SpeechRecognition.startListening({ continuous: true });
      return;
    }
    SpeechRecognition.stopListening();
    setUserMsg(transcript);
    return;
  };

  //categories
  const categories = [
    "fruits",
    "vegetable",
    "lentils",
    "bakery Items",
    "diary products",
    "sweets",
    "juices",
  ];

  const [userMsg, setUserMsg] = useState("");
  const [chatList, setChatList] = useState([
    {
      msg: `Hi! Chatbot here. How can i help you ${user}?`,
    },
  ]);

  const [complain, setComplain] = useState("");
  const [feedback, setFeedback] = useState("");

  let keywords = [
    "name",
    "age",
    "hi",
    "hello",
    "bot",
    "hi bot",
    "hello bot",
    "how are you",
    "company",
    "help",
    "still",
    "refund",
    "policy",
    "exchange",
    "forgot",
    "password",
    "damaged",
    "incomplete",
    "faulty",
    "item",
    "best product",
    "feedback",
    "located",
    "discount",
    "discounts",
    "coupon",
    "offer",
    "special",
    "code",
    "promotion",
    "support",
    "agent",
    "terms and conditions",
    "bye",
    "good",
    "Ok",
    "love",
    "bad",
    "okay",
    "good",
    "like",
    "question",
    "query",
    "fine",
    "great",
    "yes",
    "no",
    "hahaha",
    "lol",
    "complain",
    "thanks",
    "thank you",
    "haha",
  ];

  const [feedcomp, setfeedcomp] = useState({
    complain: false,
    feedback: false,
  });

  const getAnswer = async (q, msgSuggestion) => {
    //sound
    callMySound(Tick);

    //user complain
    if (complain === "complain") {
      chats = [
        ...chats,
        {
          msg: "Okay we have noted your complain. Our team will reach out to you soon",
        },
      ];
      setChatList([...chats]);
      setComplain("");
      setfeedcomp({ ...feedcomp, complain: true });
      return;
    }

    //user feedback
    if (feedback === "feedback") {
      chats = [...chats, { msg: "Thanks for your feeback." }];
      setChatList([...chats]);
      setFeedback("");
      setfeedcomp({ ...feedcomp, feedback: true });
      return;
    }

    //user order info
    if (q.toLowerCase().includes("order")) {
      chats = [...chats, { msg: "Please give us your order ID" }];
      setChatList([...chats]);
      return;
    }
    if (q.length === 24) {
      //   dispatch(getOrderDetails(q));
      if (true) {
        chats = [
          ...chats,
          {
            msg: `Your order  has been . For further inquiries you can mail us at elitegrocery@gmail.com`,
          },
        ];
        setChatList([...chats]);
        return;
      }
      if (false) {
        chats = [
          ...chats,
          {
            msg: `No order exist with ID ${q}. For further inquiries you can mail us at elitegrocery@gmail.com`,
          },
        ];
        setChatList([...chats]);
        return;
      }
    }

    //user category related query
    for (let i = 0; i < categories.length; i++) {
      if (
        q.toLowerCase().includes(categories[i]) &&
        q.toLowerCase().includes("find")
      ) {
        chats = [
          ...chats,
          {
            msg: (
              <span>
                {`${user} you can find ${categories[i]} by cliking the follwing link`}{" "}
                <a href="http://localhost:3000/products">
                  {" "}
                  http://localhost:3000/products
                </a>
              </span>
            ),
          },
        ];
        setChatList([...chats]);
        return;
      }

      if (q.toLowerCase().includes(categories[i])) {
        chats = [
          ...chats,
          {
            msg: (
              <span>
                {`${user} you can find ${categories[i]} by cliking the follwing link`}{" "}
                <a href="http://localhost:3000/products">
                  {" "}
                  http://localhost:3000/products
                </a>
              </span>
            ),
          },
        ];
        setChatList([...chats]);
        return;
      }
    }

    //user geenral queries
    if (q) {
      for (let i = 0; i < keywords.length; i++) {
        if (q.toLowerCase().includes(keywords[i])) {
          for (let m = 0; m < data.length; m++) {
            if (data[m].question.includes(keywords[i])) {
              chats = [...chats, { msg: data[m].answer }];
              setChatList([...chats]);

              return;
            }
          }
        }
      }
    }

    //user preset query
    if (msgSuggestion) {
      for (let i = 0; i < keywords.length; i++) {
        if (msgSuggestion.toLowerCase().includes(keywords[i])) {
          for (let m = 0; m < data.length; m++) {
            if (data[m].question.includes(keywords[i])) {
              chats = [...chats, { msg: data[m].answer }];
              setChatList([...chats]);
              return;
            }
          }
        }
      }
    }

    //chatbot advance recommendation for user based on query
    // const copy = q.split(" ");

    // let newarray;
    // let io;
    // copy.forEach((i) => {
    //   newarray = chatbotpro.filter((m) => {
    //     return m.name.toLowerCase().includes(i.toLowerCase());
    //   });

    //   if (newarray.length === 0) {
    //     return;
    //   } else {
    //     newarray = newarray.slice(0, 4);
    //     dispatch({ type: SET_CHATBOT_ITEM, payload: newarray });
    //     io = i;
    //     if (productchatbot && i.length > 3) {
    //       chats = [
    //         ...chats,
    //         {
    //           msg: `Just check below we found ${io} for you `,
    //         },
    //       ];
    //       setChatList([...chats]);
    //       return;
    //     }
    //   }

    //   return;
    // });

    // if (!productchatbot) {
    chats = [
      ...chats,
      {
        msg: "Sorry I did not understand that?",
      },
    ];
    setChatList([...chats]);
    return;
    // }
  };

  const onSendMsg = (msgSuggestion) => {
    resetTranscript("");
    const date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();

    chats = [
      ...chats,
      { userMsg: userMsg || msgSuggestion, dateSent: `${hour}:${min}` },
    ];
    setChatList([...chats]);
    setTimeout(() => {
      getAnswer(userMsg, msgSuggestion);
    }, 1000);
    setUserMsg("");
  };

  return (
    <div className="chatbot">
      <div className="info">
        <InfoBar
          chatList={chatList}
          setOpenBot={setOpenBot}
          openBot={openBot}
          feedcomp={feedcomp}
          setfeedcomp={setfeedcomp}
        />
      </div>
      <ScrollToBottom className="messages">
        {chatList.map((message, i) => (
          <div key={i}>
            <Msg
              msg={message.msg}
              user={user}
              dateSent={message.dateSent}
              userMsg={message.userMsg}
              onSendMsg={onSendMsg}
            />
          </div>
        ))}
      </ScrollToBottom>
      <div className="typeMsgContainer">
        <input
          className="typeMsgBox"
          value={userMsg || transcript}
          type="text"
          placeholder="Type your message here ..."
          onChange={(e) => {
            setUserMsg(e.target.value);

            if (
              chatList[chatList.length - 1].msg ===
              "Please write us your Complain"
            ) {
              setComplain("complain");
              return;
            }

            if (
              chatList[chatList.length - 1].msg ===
              `Please go ahead ${user}, we will be very happy to hear`
            ) {
              setFeedback("feedback");
              return;
            }

            return;
          }}
          onKeyPress={(event) => (event.key === "Enter" ? onSendMsg() : null)}
        />
        <HiArrowCircleRight
          className="sendBtn"
          onClick={() => onSendMsg()}
          size={30}
          color="#A6A941"
        />

        <MdRecordVoiceOver
          className="sendBtn voicee"
          onClick={() => listen()}
          size={30}
          color="#A6A941"
        />
      </div>
    </div>
  );
};

export default ChatBot;

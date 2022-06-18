import React from "react";
import axios from "axios";
import Home from "./Home";
import UserContext from "./Context/createContext";
import Msg from "./Components/Chatbot/Msg";
import ChatBot from "./Components/Chatbot";

const App = () => {
  const [user, setUser] = React.useState();

  const loadUser = async (userInfo) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post("/api/v1/login", userInfo, config);
      setUser(data.user.name);
    } catch (e) {
      console.log(e);
    }
  };

  const userInfo = {
    email: "asma123@gmail.com",
  };
  React.useEffect(() => {
    loadUser(userInfo);
  });

  return (
    <>
      {user && (
        <UserContext.Provider value={{ user }}>
          <>
            <Home />
          </>
        </UserContext.Provider>
      )}
    </>
  );
};

export default App;

const express = require("express");
const app = express();
const connectDB = require("./config/database");
var bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

connectDB();


const chatBotRoute = require("./route/chatbotRoute");
const userRoute = require("./route/userRoute");
app.use("/api/v1", userRoute);
app.use("/api/v1", chatBotRoute);

app.listen(6000, () => {
  console.log("Server running at port 6000");
});

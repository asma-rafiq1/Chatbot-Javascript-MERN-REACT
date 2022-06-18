const mongoose = require("mongoose");

const chatbotSchema = new mongoose.Schema({
  chat: [
    {
      msg: {
        type: String,
      },
      userMsg: {
        type: String,
      },
      dateSent: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("chatbot", chatbotSchema);

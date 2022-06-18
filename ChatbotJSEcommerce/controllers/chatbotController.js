const Chatbot = require("../model/chatbotModel");

exports.saveComplainFeedback = async (req, res, next) => {
  try {
    const chat = await Chatbot.create({
      chat: req.body.chat,
    });

    res.status(200).json({
      success: true,
    });
  } catch (e) {
    console.log(e);
  }
};

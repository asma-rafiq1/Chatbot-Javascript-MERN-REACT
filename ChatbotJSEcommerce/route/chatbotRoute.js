const express=require('express');
const { saveComplainFeedback } = require('../controllers/chatbotController');
const router=express.Router()

router.route("/bot/userchat").post(saveComplainFeedback);

module.exports=router;
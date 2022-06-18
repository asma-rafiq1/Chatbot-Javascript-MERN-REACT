const User = require("../model/userModel");


exports.loginUser = async (req, res, next) => {
 
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    console.log(user);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (e) {
    console.log(e);
  }
};

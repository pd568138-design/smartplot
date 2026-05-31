const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {

      return res.status(400).json({
        message: "User Already Exists"
      });

    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = new User({

      name,
      email,
      password: hashedPassword

    });

    await user.save();

    res.status(201).json({
      message: "Registration Successful"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

exports.login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        message: "Invalid Email"
      });

    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        message: "Invalid Password"
      });

    }

    const token = jwt.sign(

      {
        id: user._id
      },

      "secretkey",

      {
        expiresIn: "1d"
      }

    );

    res.json({

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

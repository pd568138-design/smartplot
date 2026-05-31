
const router = require("express").Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

/* REGISTER */

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {

      return res.status(400).json({
        message: "User already exists"
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

    res.json({
      message: "Registration Successful"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

/* LOGIN */

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await User.findOne({
      email
    });

    if (!user) {

      return res.status(400).json({
        message: "User not found"
      });

    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {

      return res.status(400).json({
        message: "Invalid password"
      });

    }

    const token = jwt.sign(
      { id: user._id },
      "secretkey"
    );

    res.json({
      token,
      message: "Login Successful"
    });

  } catch (error) {

    res.status(500).json({
      message: "Server Error"
    });

  }

});

module.exports = router;


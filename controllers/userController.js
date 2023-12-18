const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

//@desc Post registration
//@route POST /user/registration
//@access public
const registration = asyncHandler(async (req, res) => {
  // we use async function in all the methods because when we interact with mongoDB it returns a promise. async used for handling promises better way
  const { username, email, password } = req.body;
  //   HASHING PASSWORD USING BCRYPT NPM
  const hashedPassword = await bcrypt.hash(password, 10);
  if (!username || !password || !email) {
    res.status(200).json({
      status: 201,
      message: "All fields are required",
    });
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(200).json({
      status: 201,
      message: "User already exists.",
    });
  }
  const registerUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  // console.log("Registered successfully");
  if (registerUser) {
    res.status(201).json({
      status: 201,
      message: "Registered successfully",
      // data: registerUser,
    });
  }
});

//@desc Post registration
//@route POST /user/registration
//@access public
const login = asyncHandler(async (req, res) => {
  // res.status(200).json({ message: "login working fine " });

  // we use async function in all the methods because when we interact with mongoDB it returns a promise. async used for handling promises better way
  const { email, password } = req.body;
  if (!email && !password) {
    res.status(200).json({
      status: 201,
      message: "All fields are required",
    });
  }
  const userExist = await User.findOne({ email });
  // console.log(email, password, userExist.password);
  // console.log(userExist);
  if (!userExist) {
    res.status(200).json({
      status: 201,
      message: "User does not exist",
    });
  }
  const { password: hashedPassword, ...rest } = userExist._doc;
  if (userExist && (await bcrypt.compare(password, userExist.password))) {
    const accessToken = jwt.sign(
      {
        // JWT.sign will return an access token which is created whenever user is logged in and
        //  we will store it in session and we will validate using this token
        user: {
          username: userExist.username,
          email: userExist.email,
          id: userExist._id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.cookie("jwt", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 3600000),
      secure: false,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      status: 201,
      message: "User logged in successfully",
      Token: accessToken,
      data: [rest],
    });
  } else {
    res.status(200).json({
      status: 201,
      message: "Email or password is invalid",
    });
  }
});
//@desc Post registration
//@route POST /user/registration
//@access public
const current = asyncHandler(async (req, res) => {
  // we use async function in all the methods because when we interact with mongoDB it returns a promise. async used for handling promises better way
  res.status(200).json({ message: "user found", data: [req.user] });
});

const validTokenCheck = asyncHandler(async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    // console.log(token);
    if (!token) return res.json(false);
    const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    if (!verified) return res.json(false);
    const user = await User.findById(verified.user.id);
    // console.log(user)
    if (!user) return res.json(false);
    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  registration,
  login,
  current,
  validTokenCheck,
};

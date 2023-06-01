const express = require("express");
const { UserModel } = require("../Model/user.model");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

userRouter.post("/register", async (req, res) => {
  const { name, email, password, address } = req.body;
  const data = await UserModel.find({ email: email });
  try {
    if (data.length > 0) {
      return res.send("User Is Already registered");
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        let userData = new UserModel({
          name,
          email,
          password: hash,
          address,
        });
        await userData.save();
        res.status(201).send("User Registered");
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error while registering user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const data = await UserModel.find({ email: email });
  try {
    if (data.length > 0) {
      bcrypt.compare(password, data[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ email: data[0].email }, process.env.KEY);
          res.send({
            Message: "User Logged in",
            "Your token": token,
          });
        } else {
          res.send("Password is wrong");
        }
      });
    } else {
      res.send("You have to register first");
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error while login");
  }
});

userRouter.patch("/user/:id/reset", async (req, res) => {
  const id = req.params.id;
  const resetPass = req.body.password;
  const currPassword = req.body.currPassword;
  const data = await UserModel.find({ _id: id });
//   res.send(data);
  try {
    if (data.length > 0) {
        console.log("hello")
      bcrypt.compare(currPassword, data[0].password, async(err, result) => {
        let r = data[0].password = resetPass
        if (result) {
          let resetPass = await UserModel.findByIdAndUpdate({_id:id},r)
          res.send("Password reset")
        } else {
          res.send("Password is wrong");
        }
      });
    }else{
        res.send("Something went wrong")
    }
  } catch (error) {
    console.log(error);
    res.status(404).send("Error while reset password");
  }
});

module.exports = {
  userRouter,
};

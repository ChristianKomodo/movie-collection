const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  console.log("trying to sign up", req.body.email);
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          error: err,
        });
      });
  });
});

router.post("/login", (req, res, next) => {
  let fetchedUser;
  // Use the User mongoose model to look for the user
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      // compare the password in the datatase with the one in the token
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      // compare didn't work
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      // we do have a match
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        "there_i_was,_alone_after_dark",
        { expiresIn: "6h" }
      );
      res.status(200).json({
        token: token,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
});

module.exports = router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/user");

exports.userSignup = (req, res, next) => {
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
};

exports.userLogin = (req, res, next) => {
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
        expiresIn: 3600,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Auth failed",
      });
    });
};

exports.deleteMovie = (req, res) => {
  Movie.deleteOne({ _id: req.params.id })
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
        theError: error,
      });
    });
};

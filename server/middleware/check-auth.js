const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "there_i_was,_alone_after_dark");
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

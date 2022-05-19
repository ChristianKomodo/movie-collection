const express = require("express");
const mongoose = require("mongoose");
// .env values through config.js
const { mongoURI } = require("../config");

const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("connected to database!");
  })
  .catch(() => {
    console.log("connection failed!");
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/api/user", userRoutes);
app.use("/api/movies", movieRoutes);

module.exports = app;

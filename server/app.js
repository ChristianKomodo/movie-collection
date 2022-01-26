const express = require("express");
const mongoose = require("mongoose");

const movieRoutes = require("./routes/movies");
const userRoutes = require("./routes/user");

const app = express();

mongoose
  .connect(
    "mongodb+srv://demo:9Cq3cdduBzmx8Q0G@cluster0.dvkan.mongodb.net/movies?retryWrites=true&w=majority"
  )
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

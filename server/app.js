const express = require("express");
const mongoose = require("mongoose");

const Movie = require("./model/movie");

const app = express();

mongoose.connect("mongodb+srv://demo:9Cq3cdduBzmx8Q0G@cluster0.dvkan.mongodb.net/movies?retryWrites=true&w=majority")
  .then(() => {
    console.log('connected to database!');
  })
  .catch(() => {
    console.log('connection failed!');
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

// Load movies
app.get("/api/movies", (req, res, next) => {
  console.log('get movies');
  res.status(200).json({
    message: 'Movies loaded'
  })
});

// Save movie
app.post("/api/movies", (req, res, next) => {
  console.log('req body is', req.body);
  const movie = new Movie({
    imdbid: req.body.imdbid,
    watched: true,
    liked: true
  });
  console.log('post movie', movie);
  movie.save();
  res.status(201).json({
    message: 'Movie added successfully',
    addedMovie: movie
  })
});

module.exports = app;

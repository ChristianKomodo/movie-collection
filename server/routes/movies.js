const express = require("express");

const Movie = require("../model/movie");

const router = express.Router();

// Load movies
router.get("", (req, res, next) => {
  Movie.find().then((documents) => {
    res.status(200).json({
      message: "Movies fetched successfullly.",
      movies: documents,
    });
  });
});

// Save movie
router.post("", (req, res, next) => {
  const movie = new Movie({
    poster: req.body.poster,
    title: req.body.title,
    type: req.body.type,
    year: req.body.year,
    imdbid: req.body.imdbid,
    watched: false,
    liked: false,
  });
  movie.save();
  res.status(201).json({
    message: "Movie added successfully",
    addedMovie: movie,
  });
});

module.exports = router;

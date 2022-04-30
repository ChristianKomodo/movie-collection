const Movie = require("../model/movie");

exports.loadMovies = (req, res, next) => {
  Movie.find().then((documents) => {
    res.status(200).json({
      message: "Movies fetched successfully.",
      movies: documents,
    });
  });
};

exports.saveMovie = (req, res, next) => {
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
};

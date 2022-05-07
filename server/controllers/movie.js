const Movie = require("../model/movie");

exports.loadMovies = (req, res) => {
  Movie.find().then((documents) => {
    res.status(200).json({
      message: "Movies fetched successfully.",
      movies: documents,
    });
  });
};

exports.saveMovie = (req, res) => {
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

exports.deleteMovie = (req, res) => {
  Movie.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ message: "Movie deleted successfully!" });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
        theError: error,
      });
    });
};

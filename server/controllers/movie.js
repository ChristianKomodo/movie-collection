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
  const id = req.body.id;
  console.log("id: " + id);
  res.status(200).json({
    message: "Movie deleted successfully",
  });
  // Movie.findByIdAndDelete(id).then((movie) => {
  //   res.status(200).json({
  //     message: "Movie deleted successfully",
  //     deletedMovie: movie,
  //   });
  // });
};

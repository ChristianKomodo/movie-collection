const mongoose = require("mongoose");

const movieSchema = mongoose.Schema({
  // general
  poster: String,
  title: String,
  type: String,
  year: String,
  // user specific
  imdbid: String,
  watched: Boolean,
  liked: Boolean,
});

module.exports = mongoose.model("Movie", movieSchema);

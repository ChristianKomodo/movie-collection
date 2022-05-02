const express = require("express");

const checkAuth = require("../middleware/check-auth");

const MovieController = require("../controllers/movie");

const router = express.Router();

// Load movies
router.get("", checkAuth, MovieController.loadMovies);
// Save movie
router.post("", checkAuth, MovieController.saveMovie);

module.exports = router;

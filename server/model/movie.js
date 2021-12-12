const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    imdbid: String,
    watched: Boolean,
    liked: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);

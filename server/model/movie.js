const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    id: String,
    imdbid: String,
    watched: Boolean,
    liked: Boolean
});

module.exports = mongoose.model('Movie', movieSchema);

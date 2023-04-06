const mongoose = require('mongoose');



const musicSchema = new mongoose.Schema({
    album : {type: String, required: true}, 
    artist: {type: String, required: true},
    year: {type: Number, required: false},
    artwork: {type: String, required: false},
});

const Album = mongoose.model("Album",musicSchema);

module.exports = Album;
const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema(

    {
        movieTitle: {

            type: String
        },

        moviePoster: {
            type: String
        },

        imdbID: {
            type: String
        },

        rating: {
            type: String
        },

        userID: {
            type: mongoose.Schema.ObjectId,
            ref: "user",
        },
    },
    
    {
        timestamps: true
    }
);

module.exports = mongoose.model("movie", MovieSchema);
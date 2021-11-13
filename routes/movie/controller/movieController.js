const Movie = require('../model/Movie');
const User = require('../../users/model/User');
const errorHandler = require("../../utils/errorHandler");

async function getAllFavoriteMovies(req, res) {

    let allFavoriteMovies = await Movie.find({});
    res.json({ message: "success", allFavoriteMovies })

};

async function addToFavorite(req, res) {

    try {
        
        const decodedData = res.locals.decodedData
        let foundUser = await User.findOne({ email: decodedData.email })
        const { movieTitle, moviePoster, imdbID, rating } = req.body;

        const favoriteMovie = new Movie({
            movieTitle,
            moviePoster,
            imdbID,
            rating,
            userID: foundUser._id
        })

        let savedMovie = await favoriteMovie.save();
       
        foundUser.favoriteMovies.push(savedMovie._id);
        await foundUser.save();
        res.json({ message: "success", favoriteMovie })

    } catch (e) {

        res.status(500).json(errorHandler(e));

    }

};

async function deleteFavorite(req, res) {

    try {

        let deletedMovie = await Movie.findByIdAndRemove(req.params.id);

        if (!deletedMovie) {

            return res.status(404).json({ message: "failure", error: "record not found" })

        } else {

            const decodedData = res.locals.decodedData;

            let foundUser = await User.findOne({ email: decodedData.email });

            let userfavoriteMovies = foundUser.favoriteMovies;

            let filteredMovieArray = userfavoriteMovies.filter(
                (item) => item._id.toString() !== req.params.id);

            foundUser.favoriteMovies = filteredMovieArray;

            await foundUser.save();

            res.json({ message: "success", deletedMovie })

        }

    } catch (e) {

        res.status(500).json(errorHandler(e));

    }

};

module.exports = {
    getAllFavoriteMovies,
    addToFavorite,
    deleteFavorite
}
var express = require('express');
var router = express.Router();

const {
    jwtMiddleware
} = require("../lib/authMiddleware");

const {
    getAllFavoriteMovies,
    addToFavorite,
    deleteFavorite
} = require("./controller/movieController");

router.get('/', jwtMiddleware, getAllFavoriteMovies);

router.post("/add-movie", jwtMiddleware, addToFavorite);

router.delete("/delete-fav-by-id/:id", jwtMiddleware, deleteFavorite);

module.exports = router;
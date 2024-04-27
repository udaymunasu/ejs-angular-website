var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
// const apiKey = '123456789';
const apiBaseUrl = 'http://api.themoviedb.org/3';
// const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

function requireQuery(req, res, next) {
    const searchTerm = req.query.query;

    if(searchTerm) {
        res.json({msg: "Query is requored"})
    } else {
        next()
    }
}

router.get("/movie",(req, res, next) => {
    const searchTerm = req.query.query;
    
} )

module.exports = router;
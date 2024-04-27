var express = require('express');
var router = express.Router();
const request = require('request');

const apiKey = '1fb720b97cc13e580c2c35e1138f90f8';
// const apiKey = '123456789';
const apiBaseUrl = 'http://api.themoviedb.org/3';
// const apiBaseUrl = 'http://localhost:3030';
const nowPlayingUrl = `${apiBaseUrl}/most_popular?api_key=${apiKey}`;
const imageBaseUrl = 'http://image.tmdb.org/t/p/w300';

router.use((req, res, next) => {
  res.locals.imageBaseUrl = imageBaseUrl;
  next()
})

function requireJson(req, res, next) {
  if (!req.is('application/json')) {
    res.json({ msg: 'content type should be application/json' })

  } else {
    next()
  }
}

/* GET home page. */
router.get('/', (req, res, next) => {
  request.get(nowPlayingUrl, (error, response, movieData) => {
    if (error) {
      next(error); // Pass error to error handling middleware
      return;
    }

    const parsedData = JSON.parse(movieData);
    res.render('index', {
      parsedData: parsedData.results,
    });
  });
});



router.get('/movie/:id', (req, res, next) => {
  const movieId = req.params.id;
  const thisMovieUrl = `${apiBaseUrl}/movie/${movieId}?api_key=${apiKey}`;
  request.get(thisMovieUrl, (error, response, movieData) => {
    if (error) {
      next(error);
      return;
    }
    const parsedData = JSON.parse(movieData);
    res.render('single-movie', {
      parsedData
    });
  });
});

router.post('/search', (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${apiBaseUrl}/search/${cat}?query=${userSearchTerm}&api_key=${apiKey}`;
  request.get(movieUrl, (error, response, movieData) => {
    if (error) {
      next(error);
      return;
    }
    let parsedData = JSON.parse(movieData);
    if (cat === "person") {
      parsedData.results = parsedData.results[0].known_for;
    }
    res.render('index', {
      parsedData: parsedData.results
    });
  });
});

router.post('/:movieId/rating',requireJson, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = req.body.values;

  if((userRating < .5) || (userRating > 10)) {
    res.json({msg: "rating bw .5 to 10"})
  } else {
    res.json({
      msg: "thnk you for submitting",
      status_code: 200
    })
  }
});


router.delete('/:movieId/rating',requireJson, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = req.body.values;

 res.json({
  msg: "deleted"
 })
});


module.exports = router;
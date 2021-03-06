const service = require("./movies.service.js");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// Check if movie exists 
async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  };
  next({
    status: 404,
    message: `Movie cannot be found.`,
  });
}; 

// Executive Functions 
async function list(req, res) {
  const isShowing = req.query.is_showing === "true";
  const movies = await service.list(isShowing);
  res.json({ data: movies });
}; 

async function read(req, res) {
  res.json({ data: res.locals.movie });
};

async function playingInTheaters(req, res) {
  const { movie } = res.locals;
  const data = await service.playingInTheaters(movie.movie_id);
  res.json({ data });
};

async function listMovieReviews(req, res) {
  const { movie } = res.locals;
  const data = await service.listMovieReviews(movie.movie_id);
  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
  read: [asyncErrorBoundary(movieExists), asyncErrorBoundary(read)],
  playingInTheaters: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(playingInTheaters),
  ],
  listMovieReviews: [
    asyncErrorBoundary(movieExists),
    asyncErrorBoundary(listMovieReviews),
  ],
};

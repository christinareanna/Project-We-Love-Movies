const db = require("../db/connection");

// Select all movies that is_showing = true
async function list(isShowing) {
  if (isShowing) {
    return await listShowing();
  };
  return db("movies").select("*");
};

// Group movie title and movie id for all movies showing in theaters
function listShowing() {
  return db("movies as m")
    .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
    .select("m.*", "m.movie_id as id")
    .where({ is_showing: true })
    .groupBy("m.title", "m.movie_id");
};

function read(movie_id) {
  return db("movies").select("*").where({ movie_id }).first();
};

function listReviews(movieId) {
  return db("reviews as r")
    .join("movies as m", "m.movie_id", "r.movie_id")
    .join("critics as c", "r.critic_id", "c.critic_id")
    .select("*")
    .where({ "m.movie_id": movieId });
};

module.exports = {
  list,
  listReviews,
  listShowing,
  read,
};

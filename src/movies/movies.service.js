const db = require("../db/connection");
// const mapProperties = require("../utils/map-properties");

// const addCritic = mapProperties({
//     critic_id: "critic.critic_id",
//     preferred_name: "critic.preferred_name",
//     surname: "critic.surname",
//     organization_name: "critic.organization_name",
//     created_at: "critic.created_at",
//     updated_at: "critic.updated_at",
// });


async function list(isShowing) {
  if (isShowing) {
    return await listShowing();
  }
  return db('movies').select("*");
}

// async function list(isShowing = false){
//   if(isShowing){
//       const resp = await db('movies as m')
//       .join('movies_theaters as mt', 'mt.movie_id', 'm.movie_id')
//       .where({'mt.is_showing': true})
//       .groupBy('m.movie_id')
//       ;
//       return resp
//   }else{
//       return knex('movies as m');
//   }
// }


function listShowing() {
  return db('movies as m')
  .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
  .select("m.*", "m.movie_id as id")
  .where({ is_showing: true })
  .groupBy("m.title", "m.movie_id")
}

function read(movie_id) {
  return db('movies')
  .select("*")
  .where({ movie_id }).first();
}


// function listTheaters(movie_id) {
//   return db("theaters as t")
//   .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
//   .join("theaters as t", "mt.theater_id", "t.theater_id")
//   .select("*")
//   .where({ "mt.movie_id": movie_id })
// }

function listReviews(movieId) {
  return db("reviews as r")
  .join("movies as m", "m.movie_id", "r.movie_id")
  .join("critics as c", "r.critic_id", "c.critic_id")
  .select("*")
  .where({ "m.movie_id": movieId})
}




// function update(updatedMovie) {
//   return knex("movies")
//   .select("*")
//   .where({movie_id: updatedMovie.movie_id})
//   .update(updatedPost, "*")
//   .then((updatedMovies) => updatedMovies[0])
// }

// function destroy(movieId) {
//   return knex("movies")
//   .where({ movie_id: movieId }).del();
// }

module.exports = {
  list,
  // listTheaters, 
  listReviews,
  listShowing,
  read,
};
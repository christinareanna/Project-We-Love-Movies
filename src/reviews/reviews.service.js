const db = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
});

function read(review_id) {
  return db("reviews").select("*").where({ review_id }).first();
};

function destroy(review_id) {
  return db("reviews").where({ review_id }).del();
};

function list(movieId) {
  return db("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.movie_id": movieId })
    .then((data) => data.map((i) => addCritic(i)));
};

function listReview(reviewId) {
  return db("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("r.*", "c.*")
    .where({ "r.review_id": reviewId })
    .first()
    .then(addCritic);
};

function update(updatedReview) {
  return db("reviews")
    .select("*")
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, "*")
    .then((updatedReviews) => updatedReviews[0]);
};

module.exports = {
  read,
  list,
  listReview,
  destroy,
  update,
};

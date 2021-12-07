const service = require("./reviews.service");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
  const review = await service.read(req.params.reviewId);
  if (review) {
    res.locals.review = review;
    return next();
  };
  next({ status: 404, message: `Review cannot be found.` });
};

function movieExists(req, res, next) {
  if (req.params.movieId) {
    return next();
  }
  methodNotAllowed(req, res, next);
};

async function list(req, res) {
  const data = await service.list(req.params.movieId);
  res.json({ data });
};

// update data of original review for every specific review (review_id)
async function update(req, res) {
  const updatedReview = {
    ...req.body.data,
    review_id: res.locals.review.review_id,
  };
  await service.update(updatedReview);
  const newData = await service.listReview(res.locals.review.review_id);
  res.json({ data: newData });
};

async function destroy(req, res) {
  await service.destroy(res.locals.review.review_id);
  res.sendStatus(204);
};

module.exports = {
  destroy: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  list: [movieExists, asyncErrorBoundary(list)],
  update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
};

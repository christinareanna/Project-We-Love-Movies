const router = require("express").Router();
const controller = require("./movies.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");
const theatersRouter = require("../theaters/theaters.router")
const reviewsRouter = require("../reviews/reviews.router")

router.use('/:movieId/theaters', theatersRouter)
router.use("/:movieId/reviews", reviewsRouter)

router
  .route('/:movieId')
  .get(controller.read)
  .all(methodNotAllowed);

  router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);




// router
//   .route("/movies/reviews)
//   .get(controller.list)
//   .all(methodNotAllowed);




module.exports = router;




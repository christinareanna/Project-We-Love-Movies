const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");


// router
//   .route('/:theaterId')
//   .get(controller.read)
//   .all(methodNotAllowed);

// router
//   .route("/movies?is_showing=true")
//   .get(controller.list)
//   .all(methodNotAllowed);


router.route("/")
  .get(controller.list)
  .all(methodNotAllowed);



module.exports = router;
const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

// async function theaterExists(req, res, next) {
//   const { theaterId } = req.params;
//   const theaterResult = await service.read(Number(theaterId));
//   if (theaterResult.length === 0 || !theaterId) 
//   return next({ 
//       status: 404, 
//       message: `theater does not exist.`,
//     });
//     res.locals.theater = theaterResult[0];
//     return next();
// };

// async function list(req, res) {
//     const { is_showing } = req.query;
//     const data = is_showing ? await (await service.listShowing())
//     : await service.list()
//     res.status(200).json({ data: data });
//   }


async function list(req, res) {
  const data = await service.list();
  res.json({ data });
}


// async function read(req, res) {
//     res.status(200).json({ data: res.locals.theater.theater_id });
// }

// async function playingInTheaters(req, res, next) {
//     const id = res.locals.theater.theater_id;
//     res.json({ data: await service.playingInTheaters(id)})
// }

// async function listtheaterReviews(req, res, next) {
//     const id = res.locals.theater.theater_id;
//     res.json({ data: await service.listtheaterReviews(id)})
// }
module.exports = {
    list: asyncErrorBoundary(list),
    // read: [asyncErrorBoundary(theaterExists), asyncErrorBoundary(read)],
    // listTheaters: [asyncErrorBoundary(theaterExists)],
    // listReviews: [asyncErrorBoundary(theaterExists)],
}
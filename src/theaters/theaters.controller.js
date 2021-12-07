const service = require("./theaters.service.js");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await service.list();
  res.json({ data });
};

module.exports = {
  list: asyncErrorBoundary(list),
};

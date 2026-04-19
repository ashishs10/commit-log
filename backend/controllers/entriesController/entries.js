import pool from "../../db/pool.js";

async function getEntries(req, res) {
  res.status(200).json({
    status: true,
    message: "fetched all entries",
  });
}

export default {
  getEntries,
};

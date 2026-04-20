import pool from "../../db/pool.js";

async function getEntries(req, res) {
  const user = req.user;

  console.log("User : ", user);

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "No user found",
    });
  }

  const query = `select * from entries where auth0_user_id = $1`;
  const response = await pool.query(query, ["auth0|user123"]);
  console.log(" DB Entries query : ", response);

  if (response.rows.length === 0) {
    return res.status(200).json({
      success: true,
      data: [],
    });
  }

  const entries = response.rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    mood: row.mood,
    github_activity: row.github_activity,
    created_at: row.created_at,
  }));

  res.status(200).json({
    status: true,
    message: "fetched all entries",
    data: entries,
  });
}

export default {
  getEntries,
};

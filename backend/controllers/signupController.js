import pool from "../db/pool.js";
import bcrypt from "bcrypt";

async function signUpController(req, res) {
  const user = req.body;
  const username = user.username;
  const password = user.password;
  const email = user.email;

  if (!username || !password || !email) {
    res.status(400).json({
      success: false,
      message: "required field missing",
    });
    return;
  }

  const hashedPassword = await passwordHash(password);
  const query = `insert into users (username, password_hash, email) values($1, $2, $3) returning username, email`;
  const response = await pool.query(query, [username, hashedPassword, email]);

  console.log("query response ", response.rows);

  const new_user = response.rows[0];

  if (response.rows.length === 0) {
    res.status(400).json({
      success: false,
      message: "something went wrong",
    });
    return;
  }

  res.status(201).json({
    success: true,
    message: "user created successfully",
    data: new_user,
  });
}

async function passwordHash(plainPassword) {
  const saltRound = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRound);
  console.log(hashed);

  return hashed;
}
export default {
  signUpController,
};

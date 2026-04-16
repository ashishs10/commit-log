import pool from "../db/pool.js";
import bcrypt from "bcrypt";

async function loginController(req, res) {
  const user = req.body;
  const username = user.username;
  const password = user.password;

  if (!username || !password) {
    res.status(400).json({
      status: false,
      message: "Username or password missing",
    });
    return;
  }
}

async function signUpController(req, res) {
  const user = req.body;
  const username = user.username;
  const password = user.password;
  const email = user.email;

  const hashedPassword = await passwordHash(password);
  const query = `insert into users (username, passwrod_has, uemail) values($1, $2, $3)`;
}

// password brcypt
async function passwordHash(plainPassword) {
  const saltRound = 10;
  const hashed = await bcrypt.hash(plainPassword, saltRound);
  console.log(hashed);

  return hashed;
}

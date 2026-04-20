import pool from "../db/pool.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  try {
    const loginQuery = `select username, password_hash from users where username = $1`;
    const response = await pool.query(loginQuery, [username]);

    if (response.rows.length === 0) {
      res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    const userDetail = response.rows[0];

    const isMatch = await bcrypt.compare(password, userDetail.password_hash);
    console.log("password match: ", isMatch);

    if (!isMatch) {
      res.status(401).json({
        success: false,
        message: "invalid credentials",
      });
      return;
    }

    const payload = {
      username: userDetail?.username,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      success: true,
      token: `Bearer ${token}`,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
}

export default {
  loginController,
};

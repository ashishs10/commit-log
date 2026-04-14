import "dotenv/config";
import express from "express";
import pool from "./db/pool.js";
import entryRouter from "./routes/entryRouter.js";

const app = express();

app.use(express.json());

// db connection
const testDb = async () => {
  try {
    const response = await pool.query(`SELECT NOW()`);
    console.log("DB Connected ", response.rows);
  } catch (error) {
    console.log(error.message);
  }
};

testDb();

app.get("/health", (req, res) => {
  res.status(200).json({
    ok: true,
  });
});

app.use("/devlog/api", entryRouter);

app.listen(process.env.PORT, () => {
  console.log("server started at port ", process.env.PORT);
});

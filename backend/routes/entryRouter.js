import express from "express";

const router = express.Router();

// health route
router.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

export default router;

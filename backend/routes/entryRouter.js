import express from "express";
import userController from "../controllers/loginController.js";

const router = express.Router();

// health route
router.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

router.post("/login", userController.loginController);

router.post("/signup", userController.signUpController);

export default router;

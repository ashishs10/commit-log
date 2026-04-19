import express from "express";
import loginController from "../controllers/loginController.js";
import signUpController from "../controllers/signupController.js";

const router = express.Router();

// health route
router.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

router.post("/login", loginController.loginController);

router.post("/signup", signUpController.signUpController);

export default router;

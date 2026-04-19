import express from "express";
import loginController from "../controllers/loginController.js";
import signUpController from "../controllers/signupController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import entriesController from "../controllers/entriesController/entries.js";

const router = express.Router();

// health route
router.get("/health", (req, res) => {
  res.status(200).json({
    message: "ok",
  });
});

router.post("/login", loginController.loginController);

router.post("/signup", signUpController.signUpController);

router.get(
  "/entries",
  // authMiddleware.authMiddleware,
  entriesController.getEntries,
);

export default router;

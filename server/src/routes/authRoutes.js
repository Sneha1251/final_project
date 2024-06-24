import express from "express";
import { authentication } from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/page", authMiddleware, (req, res) => {
  res.send("Welcome to home page");
});

router.post("/signup", authentication.signup);
router.post("/login", authentication.login);

export default router;

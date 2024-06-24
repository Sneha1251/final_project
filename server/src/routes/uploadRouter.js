import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import uploads from "../middlewares/uploadMiddleware.js";
import uploadFile from "../controllers/uploadController.js";
const router = express.Router();

router.post("/uploads", uploads, uploadFile.importUser);
export default router;

import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import uploads from "../middlewares/uploadMiddleware.js";
import uploadFile from "../controllers/uploadController.js";
const router = express.Router();

router.post("/uploads", authMiddleware, uploads, uploadFile.importCsvData);
router.get("/Csvdata", authMiddleware, uploadFile.showCsvData);
router.delete("/delete/:id", authMiddleware, uploadFile.deleteCsvData);
router.put("/edit/:id", authMiddleware, uploadFile.editCsvData);

export default router;

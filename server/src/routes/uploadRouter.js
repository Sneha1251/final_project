import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import uploads from "../middlewares/uploadMiddleware.js";
import uploadFile from "../controllers/uploadController.js";

const router = express.Router();

/**
 * @swagger
 * /uploads:
 *   post:
 *     summary: Upload CSV data
 *     description: Uploads CSV data and stores it in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               user_file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Data uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Server error
 */
router.post("/uploads", authMiddleware, uploads, uploadFile.importCsvData);

/**
 * @swagger
 * /Csvdata:
 *   get:
 *     summary: Get CSV data
 *     description: Retrieves all CSV data from the database.
 *     responses:
 *       200:
 *         description: CSV data retrieved successfully
 *       500:
 *         description: Server error
 */
router.get("/Csvdata", authMiddleware, uploadFile.showCsvData);

/**
 * @swagger
 * /delete/{id}:
 *   delete:
 *     summary: Delete CSV data
 *     description: Deletes CSV data by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the data to delete
 *     responses:
 *       200:
 *         description: Data deleted successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server error
 */
router.delete("/delete/:id", authMiddleware, uploadFile.deleteCsvData);

/**
 * @swagger
 * /edit/{id}:
 *   put:
 *     summary: Edit CSV data
 *     description: Edits CSV data by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the data to edit
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Brand:
 *                 type: string
 *               Model:
 *                 type: string
 *               ReleaseYear:
 *                 type: string
 *               Color:
 *                 type: string
 *               Price:
 *                 type: number
 *               Storage:
 *                 type: string
 *               OS:
 *                 type: string
 *     responses:
 *       200:
 *         description: Data edited successfully
 *       404:
 *         description: Data not found
 *       500:
 *         description: Server error
 */
router.put("/edit/:id", authMiddleware, uploadFile.editCsvData);

/**
 * @swagger
 * /data:
 *   post:
 *     summary: Add new data
 *     description: Adds new data to the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Brand:
 *                 type: string
 *               Model:
 *                 type: string
 *               ReleaseYear:
 *                 type: number
 *               Color:
 *                 type: string
 *               Price:
 *                 type: number
 *               Storage:
 *                 type: string
 *               OS:
 *                 type: string
 *     responses:
 *       201:
 *         description: Data added successfully
 *       500:
 *         description: Failed to add data
 */
router.post("/addData", authMiddleware, uploadFile.addData);

export default router;

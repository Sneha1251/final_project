import phoneSchema from "../models/phoneSchema.js";
import bulkSchema from "../models/bulkSchema.js";
import bulkErrorSchema from "../models/bulkErrorSchema.js";
import path from "path";
import csv from "csv-parser";
import fs from "fs";
import Joi from "joi";

class UploadFile {
  async importCsvData(req, res) {
    if (!req.file) {
      return res.status(400).send("No file uploaded");
    }
    const filePath = req.file.path;
    const startTime = new Date();
    let successfulInserted = [];
    let failedDuringInserted = [];
    let correctDataCount = 0;
    let errorDataCount = 0;
    const batchSize = 1000;
    let lineNumber = 0;
    let totalProcessed = 0;
    try {
      const readStream = fs.createReadStream(filePath);
      readStream
        .pipe(csv())
        .on("data", async (data) => {
          lineNumber++;
          totalProcessed++;
          const { error, value } = isValidPhone(data);
          if (!error) {
            correctDataCount++;
            successfulInserted.push(data);
          } else {
            errorDataCount++;
            failedDuringInserted.push({
              fileName: req.file.originalname,
              lineNumber: lineNumber,
              errorMessage: error,
            });
          }

          if (successfulInserted.length >= batchSize) {
            const batch = successfulInserted.slice(0, batchSize);
            successfulInserted = successfulInserted.slice(batchSize);
            await phoneSchema.insertMany(batch).catch((err) => {
              console.error("Error inserting batch data into database:", err);
            });
          }
        })
        .on("end", async () => {
          try {
            const endTime = new Date();
            if (successfulInserted.length > 0) {
              await phoneSchema.insertMany(successfulInserted);
              await bulkSchema.create({
                startTime,
                endTime,
                noOfItems: totalProcessed,
                fileName: req.file.filename,
                correctDataCount,
                errorDataCount,
              });
            }
            if (failedDuringInserted.length > 0) {
              await bulkErrorSchema.insertMany(failedDuringInserted);
            }

            if (
              successfulInserted.length > 0 &&
              failedDuringInserted.length > 0
            ) {
              res
                .status(200)
                .json({ message: "Data uploaded successfully with errors" });
            } else if (successfulInserted.length > 0) {
              res.status(200).json({ message: "Data uploaded successfully" });
            } else if (failedDuringInserted.length > 0) {
              res.status(200).json({ message: "Errors found in data" });
            } else {
              res
                .status(500)
                .json({ message: "No valid data to insert in database" });
            }
          } catch (err) {
            console.error("Error during final processing:", err);
            res
              .status(500)
              .json({ error: "Server error during final processing" });
          }
        })
        .on("error", (err) => {
          console.error("File processing error:", err);
          res.status(500).json({ error: "File processing error" });
        });
    } catch (err) {
      console.error("Server error:", err);
      res.status(500).json({ error: "Server error" });
    }
  }

  async showCsvData(req, res) {
    try {
      const allCsvData = await phoneSchema.find({}).limit(1000);
      return res.send(allCsvData);
    } catch (err) {
      res.status(500).send("Internal Server Error");
    }
  }

  async editCsvData(req, res) {
    try {
      // console.log("id", req.params.id);
      const updatedCsvData = await phoneSchema.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: req.body }
      );
      return res.status(200).json(updatedCsvData);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async deleteCsvData(req, res) {
    try {
      await phoneSchema.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Csv Data deleted successfully" });
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

function isValidPhone(data) {
  const phoneDetailsSchema = Joi.object({
    Brand: Joi.string().required(),
    Model: Joi.string().required(),
    ReleaseYear: Joi.number()
      .integer()
      .min(2010)
      .max(new Date().getFullYear())
      .required(),
    Color: Joi.string().required(),
    Price: Joi.number().positive().integer().min(500).required(),
    Storage: Joi.number().positive().integer().min(50).required(),
    OS: Joi.string().required(),
  });
  return phoneDetailsSchema.validate(data);
}

const uploadFile = new UploadFile();
export default uploadFile;

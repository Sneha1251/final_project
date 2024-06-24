import phoneSchema from "../models/phoneSchema.js";
import bulkSchema from "../models/bulkSchema.js";
import path from "path";
import csv from "csv-parser";
import fs from "fs";

class UploadFile {
  async importUser(req, res) {
    const correctResults = [];
    const errorResults = [];

    try {
      fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", async (data) => {
          correctResults.push(data);

          await phoneSchema.insertMany(correctResults);
        })
        // .on("end", async () => {
        //   try {
        //     //YAHA PE KARWA RHI

        //     res.status(200).json({
        //       message: "CSV file processed successfully.",
        //       correctResults,
        //       errorResults,
        //     });
        //   } catch (dbError) {
        //     console.error("Error saving to database:", dbError);
        //     res.status(500).json({ error: "Error saving to database" });
        //   }
        // })
        .on("error", (err) => {
          console.error("Error processing CSV file:", err);
          res.status(500).json({ error: "Error processing CSV file" });
        });

        res.send("HI");

    } catch (err) {
      console.error("Error handling CSV upload:", err);
      res.status(500).json({ error: "Error handling CSV upload" });
    }
  }
}

const uploadFile = new UploadFile();
export default uploadFile;

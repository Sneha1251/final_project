import mongoose from "mongoose";

const bulkSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  noOfItems: {
    type: Number,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  correctDataCount: {
    type: Number,
    required: true,
  },
  errorDataCount: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("bulkUploads", bulkSchema);

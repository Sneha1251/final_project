import mongoose from "mongoose";

const bulkErrorSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true,
  },
  lineNumber: {
    type: Number,
    required: true,
  },
  errorMessage: {
    type: String,
    required: true,
  },
});

export default mongoose.model("bulkUploadErrors", bulkErrorSchema);

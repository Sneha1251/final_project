import mongoose from "mongoose";
// Brand,Model,Release Year,Color,Price,Storage,OS

const phoneSchema = new mongoose.Schema(
  {
    Brand: {
      type: String,
      required: true,
    },
    Model: {
      type: String,
      required: true,
    },
    ReleaseYear: {
      type: Number,
      required: true,
    },
    Color: {
      type: String,
      required: true,
    },
    Price: {
      type: Number,
      required: true,
    },
    Storage: {
      type: Number,
      required: true,
    },
    OS: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("phoneDetails", phoneSchema);

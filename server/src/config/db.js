import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/FinalProject");
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error.message);
  }
};

export default dbConnection;

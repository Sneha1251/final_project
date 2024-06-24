import serverSetup from "./app.js";
import dbConnection from "./config/db.js";
import dotenv from "dotenv";

dotenv.config();

serverSetup().listen(5000, async () => {
  await dbConnection();
  console.log("Server started on Port 5000");
});

import authRouter from "./routes/authRoutes.js";
import uploadRouter from "./routes/uploadRouter.js";
import cors from "cors";
import setupSwaggerDocs from "./swagger.js";
import express from "express";

const app = express();

const server = () => {
  app.use(express.json());
  app.use(cors());
  app.use("/user", authRouter);
  app.use("/post", uploadRouter);
  setupSwaggerDocs(app);
  return app;
};

export default server;

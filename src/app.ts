import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./app/modules/user/user.route";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import coreSampleRouter from "./app/modules/coreSample/coreSample.route";
import wellRouter from "./app/modules/well/well.route";

const app = express();

//Middlewares
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Health Check Route

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "GeoLog API is running 🚀",
  });
});

// API Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/core-samples", coreSampleRouter);
app.use("/api/v1/wells", wellRouter);

// Error handler
app.use(globalErrorHandler);

export default app;
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./app/modules/user/user.route";
import globalErrorHandler from "./app/errors/globalErrorHandler";
import coreSampleRouter from "./app/modules/coreSample/coreSample.route";
import wellRouter from "./app/modules/well/well.route";
import analyticsRouter from "./app/modules/analytics/analytics.route";

const app = express();

//Middlewares
const allowedOrigins: string[] = [
  "http://localhost:3000",
  process.env.CLIENT_URL,
].filter((origin): origin is string => Boolean(origin));

app.use(
  cors({
    origin: allowedOrigins,
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
app.use("/api/v1/analytics", analyticsRouter);

// Error handler
app.use(globalErrorHandler);

export default app;
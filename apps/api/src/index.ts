import "dotenv/config"; // Load environment variables from .env file
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import cors from "cors";
import appRoutes from "./routes/index.js";
import dashboardRoutes from "./routes/dashboard.js";
import plantRoutes from "./routes/plantlibrary.js";
import pushRoutes from "./routes/push.js";
import { startScheduler } from "./jobs/scheduler.js";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

// Middlewares
const allowedOrigins = ["process.env.CORS_ORIGIN", "http://localhost:5173"];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow no-origin requests (curl, health checks)
      if (!origin) return callback(null, true);

      const allowed = (process.env.CORS_ORIGIN ?? "")
        .split(",")
        .map((s) => s.trim());

      // Exact match against allowed origins
      if (allowed.includes(origin)) return callback(null, true);

      // Allow Vercel preview deployments (*.vercel.app)
      try {
        if (/\.vercel\.app$/.test(new URL(origin).hostname)) {
          return callback(null, true);
        }
      } catch {}

      callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
  }),
);
app.use(express.json());
app.use(clerkMiddleware());

// API Routes
app.use("/api", appRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/plants", plantRoutes);
app.use("/api/auth/register/clerk", express.raw({ type: "application/json" }));
app.use("/api/push", pushRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date(Date.now()).toUTCString(),
  });
});

app.listen(PORT, "0.0.0.0", () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
  startScheduler();
});

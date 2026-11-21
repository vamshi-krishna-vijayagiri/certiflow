import "dotenv/config";
import express from "express";
import cors from "cors";
import { prisma } from "./config/database.js";
import authRoutes from "./routes/authRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Authentication routes
app.use("/api/auth", authRoutes);

// Health check API
app.get("/api/health", async (_req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    return res.status(200).json({
      success: true,
      message: "CertiFlow API is running!",
      database: "Connected",
    });
  } catch (error) {
    console.error("Database connection failed:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
    });
  }
});

// Protected API - Get logged-in user details
app.get("/api/auth/me", authMiddleware, (req, res) => {
  return res.status(200).json({
    success: true,
    message: "User authenticated successfully",
    user: req.user,
  });
});

// Handle invalid JSON and other errors
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error("Server error:", err);

  return res.status(err.status || 500).json({
    success: false,
    message: err.status === 400
      ? "Invalid JSON request body"
      : "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`CertiFlow API running at http://localhost:${PORT}`);
});
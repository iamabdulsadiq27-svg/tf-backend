const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve uploaded media files as static assets at /uploads/*
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
app.use("/uploads", express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".mp4") || filePath.endsWith(".mov") || filePath.endsWith(".webm")) {
      res.setHeader("Accept-Ranges", "bytes");
      res.setHeader("Content-Type", "video/mp4");
    }
  }
}));

// ─── DATABASE ─────────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api", require("./routes/itineraryRoutes"));
app.use("/api", require("./routes/mergepdfroutes"));
app.use("/api", require("./routes/otpRoutes"));
app.use("/api/leads", require("./routes/leadRoutes"));

// ✅ NEW — Media management routes
app.use("/api/media", require("./routes/mediaRoutes"));

// ─── START ────────────────────────────────────────────────────────────────────
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});

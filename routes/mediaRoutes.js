const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const mediaCtrl = require("../controller/mediaController");

// ─── MULTER SETUP (stores uploaded files in /uploads/) ────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, "../uploads")),
  filename: (req, file, cb) => {
  const sanitized = file.originalname
    .replace(/\s+/g, '-')        // spaces → dashes
    .replace(/[()]/g, '')        // remove brackets
    .toLowerCase();              // lowercase
  cb(null, sanitized);
  },
});

const fileFilter = (req, file, cb) => {
  const allowed = /jpeg|jpg|png|webp|gif|mp4|mov|webm/;
  const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
             allowed.test(file.mimetype.split("/")[1]);
  ok ? cb(null, true) : cb(new Error("Only images and videos allowed"));
};

const upload = multer({ storage, fileFilter, limits: { fileSize: 300 * 1024 * 1024 } }); // 300 MB

// ─── ROUTES ───────────────────────────────────────────────────────────────────
// GET  /api/media           → all slots as array (for admin dashboard)
router.get("/", mediaCtrl.getAllMedia);

// GET  /api/media/map       → all slots as key→item map (for frontend)
router.get("/map", mediaCtrl.getAllAsMap);

// GET  /api/media/page/:page → all slots for one page as key→item map
router.get("/page/:page", mediaCtrl.getByPage);

// PATCH /api/media/:key     → update url (+ optional alt) for one slot
router.patch("/:key", mediaCtrl.updateMedia);

// POST /api/media/seed      → bulk upsert (run once on first deploy)
router.post("/seed", mediaCtrl.seedMedia);

// POST /api/media/upload    → upload an image/video file, get back its URL
router.post("/upload", upload.single("file"), mediaCtrl.uploadFile);

module.exports = router;

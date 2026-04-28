const MediaConfig = require("../models/MediaConfig");

// ─── GET ALL (grouped by page for admin UI) ───────────────────────────────────
exports.getAllMedia = async (req, res) => {
  try {
    const all = await MediaConfig.find().sort({ page: 1, section: 1, order: 1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET BY PAGE (used by frontend to load images for a page) ─────────────────
exports.getByPage = async (req, res) => {
  try {
    const items = await MediaConfig.find({ page: req.params.page }).sort({ section: 1, order: 1 });
    // Return as a flat key→url map so frontend can do: media["home_banner_1"]
    const map = {};
    items.forEach((item) => { map[item.key] = item; });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── GET ALL AS MAP (frontend can load all at once) ───────────────────────────
exports.getAllAsMap = async (req, res) => {
  try {
    const all = await MediaConfig.find();
    const map = {};
    all.forEach((item) => { map[item.key] = item; });
    res.json(map);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── UPDATE ONE (admin changes a photo/video) ─────────────────────────────────
exports.updateMedia = async (req, res) => {
  try {
    const { key } = req.params;
    const { url, alt } = req.body;
    if (!url) return res.status(400).json({ error: "url is required" });

    const updated = await MediaConfig.findOneAndUpdate(
      { key },
      { url, ...(alt !== undefined && { alt }) },
      { new: true, upsert: false }
    );
    if (!updated) return res.status(404).json({ error: "Media slot not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── SEED / UPSERT (used once to initialize all slots) ────────────────────────
exports.seedMedia = async (req, res) => {
  try {
    const { items } = req.body; // array of {key, label, page, section, url, mediaType, alt, order}
    if (!Array.isArray(items)) return res.status(400).json({ error: "items[] required" });

    const results = await Promise.all(
      items.map((item) =>
        MediaConfig.findOneAndUpdate({ key: item.key }, item, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        })
      )
    );
    res.json({ seeded: results.length, items: results });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ─── UPLOAD (handles multipart file upload via multer) ────────────────────────
exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    // File saved by multer to /uploads/  — return its public URL
    const url = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    res.json({ url, filename: req.file.filename });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

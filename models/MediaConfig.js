const mongoose = require("mongoose");

// Each document represents ONE named media slot used somewhere on the site
const MediaConfigSchema = new mongoose.Schema(
  {
    // Unique key that identifies WHERE this media is used  e.g. "home_hero_banner_1"
    key: { type: String, required: true, unique: true },

    // Human-readable label shown in admin  e.g. "Home Page – Hero Banner Slide 1"
    label: { type: String, required: true },

    // Page / section grouping so the admin UI can group items
    page: { type: String, required: true },   // "Home", "Ladakh", "About", etc.
    section: { type: String, required: true }, // "Hero Banner", "Group Trip Cards", etc.

    // The currently active media URL (Cloudinary, S3, local /uploads/…)
    url: { type: String, required: true },

    // "image" or "video"
    mediaType: { type: String, enum: ["image", "video"], default: "image" },

    // Short caption / alt text (optional, helps SEO)
    alt: { type: String, default: "" },

    // Display order within its section
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MediaConfig", MediaConfigSchema);

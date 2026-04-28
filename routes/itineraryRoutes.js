const express = require("express");
const router = express.Router();

// 🔥 TEMP HARD TEST (no import)
router.post("/download-itinerary", (req, res) => {
  res.send("Route working");
});

module.exports = router;
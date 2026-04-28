const express = require("express");
const router = express.Router(); // ✅ THIS WAS MISSING

const Enquiry = require("../models/Enquiry");

// 👉 POST (save data)
router.post("/submit", async (req, res) => {
  console.log("📩 Incoming Data:", req.body);

  try {
    const newEnquiry = new Enquiry(req.body);
    await newEnquiry.save();
    res.status(200).json({ message: "Saved successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error saving data" });
  }
});

// 👉 GET all enquiries
router.get("/all", async (req, res) => {
  try {
    const data = await Enquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching data" });
  }
});

// 👉 DELETE enquiry
router.delete("/:id", async (req, res) => {
  try {
    await Enquiry.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Delete failed" });
  }
});

module.exports = router;
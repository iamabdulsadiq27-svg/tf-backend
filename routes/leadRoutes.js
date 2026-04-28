const express = require("express");
const router = express.Router();
const LeadModel = require("../models/LeadModel");

// GET ALL LEADS (OTP USERS)
router.get("/all", async (req, res) => {
  try {
    const data = await LeadModel.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching leads" });
  }
});

module.exports = router;
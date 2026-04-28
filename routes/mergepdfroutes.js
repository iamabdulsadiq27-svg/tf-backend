const express = require("express");
const router = express.Router();
const { mergeItinerary } = require("../controller/mergecontroller");

router.post("/merge-itinerary", mergeItinerary);

module.exports = router;

const generatePDF = require("../services/pdfservice");

exports.downloadItinerary = async (req, res) => {
  try {
    const pdfBuffer = await generatePDF(req.body);

    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=itinerary.pdf",
      "Content-Length": pdfBuffer.length,
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "PDF generation failed" });
  }
};
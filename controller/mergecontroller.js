const { PDFDocument } = require("pdf-lib");
const fs = require("fs");
const path = require("path");
const { log } = require("console");

exports.mergeItinerary = async (req, res) => {
    try {
        const { routes } = req.body;

        console.log("Routes received:", routes);

        if (!routes || routes.length === 0) {
            return res.status(400).json({ message: "No routes selected" });
        }

        const mergedPdf = await PDFDocument.create();

        for (let route of routes) {

    const filePath = path.join(__dirname, "../pdf", `${route.toLowerCase()}.pdf`);
    console.log("Looking for:", `${route.toLowerCase()}.pdf`);

    console.log("👉 Requested route:", route);
    console.log("👉 Looking for file:", filePath);

    if (fs.existsSync(filePath)) {

        console.log("✅ FOUND:", route);

        const pdfBytes = fs.readFileSync(filePath);
        const pdf = await PDFDocument.load(pdfBytes);

        console.log("📄 Pages in file:", pdf.getPageCount());

        const pages = await mergedPdf.copyPages(
            pdf,
            pdf.getPageIndices()
        );

        pages.forEach(page => mergedPdf.addPage(page));

    } else {
        console.log("❌ NOT FOUND:", route);
    }
}

        const finalPdf = await mergedPdf.save();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=Itinerary.pdf");
        res.send(Buffer.from(finalPdf));

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error merging PDFs" });
    }
};


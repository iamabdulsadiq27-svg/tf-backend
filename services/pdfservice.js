const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

const bgImagePath = path.join(__dirname, "../assets/bg.png");
const bgImageBase64 = fs.readFileSync(bgImagePath, {
  encoding: "base64",
});

async function generatePDF(data) {
  try {
    console.log("Generating PDF...");
    console.log("Incoming data:", data);

    // ✅ 1. Load Handlebars template
    const templatePath = path.join(__dirname, "../templates/itenary.hbs");

    if (!fs.existsSync(templatePath)) {
      throw new Error("Template file not found: " + templatePath);
    }

    const htmlTemplate = fs.readFileSync(templatePath, "utf-8");

    // ✅ 2. Compile template
    const template = handlebars.compile(htmlTemplate);
    const finalHTML = template(data);

    // ✅ 3. Launch browser
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Wait until content fully loads
    await page.setContent(finalHTML, { waitUntil: "networkidle0" });

    // ✅ 4. Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    console.log("PDF generated successfully. Size:", pdfBuffer.length);

    return pdfBuffer;

  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  }
}

module.exports = generatePDF;

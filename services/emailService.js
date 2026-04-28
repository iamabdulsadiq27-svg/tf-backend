const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // app password
  },
});

const sendLeadEmail = async (lead) => {
  try {
    const routeText = lead.routes
      ?.map((r, i) => `Day ${i + 1}: ${r.from} → ${r.to}`)
      .join("\n");

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // you receive it
      subject: "🚀 New Itinerary Download Lead",
      text: `
New user downloaded itinerary:

Name: ${lead.name}
Email: ${lead.email}
Phone: ${lead.phone}

Route:
${routeText || "No route"}

Time: ${new Date().toLocaleString()}
      `,
    });

    console.log("📩 Email sent successfully");
  } catch (err) {
    console.error("Email error:", err);
  }
};

module.exports = sendLeadEmail;
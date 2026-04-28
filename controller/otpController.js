const OtpModel = require("../models/OtpModel");
const LeadModel = require("../models/LeadModel");

// ✅ SEND OTP
exports.sendOtp = async (req, res) => {
  try {
    let { phone } = req.body;

    phone = String(phone).trim();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await OtpModel.deleteMany({ phone });

    await OtpModel.create({
      phone,
      otp,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    console.log("OTP:", otp);

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};

// ✅ VERIFY OTP
exports.verifyOtp = async (req, res) => {
  try {
    const { name, email, phone, otp, itineraryId, routes } = req.body;

    const record = await OtpModel.findOne({ phone });

    if (!record) return res.json({ success: false, message: "No OTP" });

    if (record.otp !== otp)
      return res.json({ success: false, message: "Wrong OTP" });

    if (record.expiresAt < Date.now())
      return res.json({ success: false, message: "Expired OTP" });

    // ✅ SAVE USER
    const sendLeadEmail = require("../services/emailService");

    const newLead = await LeadModel.create({
    name,
    email,
    phone,
    itineraryId,
    verified: true,
    routes,
    });

    // 🔥 SEND EMAIL
    await sendLeadEmail(newLead);

    await OtpModel.deleteOne({ phone });

    res.json({ success: true });

  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
};
const db = require("../config/db");
const sendContactEmailNotification = require("../utils/sendContactEmailNotification")

const saveContact = async (req, res) => {
  const { name, number, email, message } = req.body;

  if (!name || !number || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const sql =
    "INSERT INTO contactsus (name, number, email, message) VALUES (?, ?, ?, ?)";

  try {
    console.log("🔥 Before DB insert");

    // PROMISE-BASED QUERY
    await db.query(sql, [name, number, email, message]);

    console.log("🔥 Insert successful");

    // Respond immediately
    res.status(201).json({ message: "Contact saved successfully" });

    // Send email after response
    console.log("📨 Calling email...");
    sendContactEmailNotification({ name, number, email, message });

  } catch (err) {
    console.error("❌ DB Error:", err);
    return res.status(500).json({ error: "Database error" });
  }
};



module.exports = {saveContact}
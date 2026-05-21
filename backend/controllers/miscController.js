const pool = require("../config/db");

// Receive contact messages from public site. For now we log and return success.
exports.receiveContactMessage = async (req, res) => {
  try {
    const { name, email, role, subject, message } = req.body || {};

    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "name, email and message are required" });
    }

    // Try to persist into a lightweight table if present, otherwise just log.
    try {
      await pool.query(
        `INSERT INTO contact_messages (name, email, role, subject, message, created_at)
         VALUES ($1,$2,$3,$4,$5,CURRENT_TIMESTAMP)`,
        [name, email, role || null, subject || null, message],
      );
    } catch (dbErr) {
      // Table might not exist; fall back to logging
      console.warn("contact_messages table not available:", dbErr.message);
      console.log("Contact message:", { name, email, role, subject, message });
    }

    return res.status(201).json({ message: "Message received" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

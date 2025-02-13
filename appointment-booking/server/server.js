require("dotenv").config(); // Load environment variables
const express = require("express");
const mysql = require("mysql2"); // Use mysql2 instead of mysql
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Secure database connection using environment variables
const db = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

// ✅ Handle MySQL connection errors
db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});

// Test API Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

//  API Route: Book an Appointment (POST)
app.post("/api/book-appointment", (req, res) => {
    const { name, email, phone, date, time, reason } = req.body;
  
    if (!name || !email || !phone || !date || !time || !reason) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
  
    const sql = "INSERT INTO appointments (name, email, phone, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)";
  
    db.query(sql, [name, email, phone, date, time, reason], (err, result) => {
      if (err) {
        console.error("❌ Error inserting appointment:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, message: "✅ Appointment booked successfully!" });
    });
  });
  
  // API Route: Get All Appointments (GET)
  app.get("/api/appointments", (req, res) => {
    const sql = "SELECT * FROM appointments ORDER BY created_at DESC";
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error("❌ Error fetching appointments:", err);
        return res.status(500).json({ success: false, message: "Database error" });
      }
      res.json({ success: true, appointments: results });
    });
  });
  
  //  Start Server
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
//  API Route to Book an Appointment
// app.post("/api/book-appointment", (req, res) => {
//   const { name, email, phone, date, time, reason } = req.body;

//   const sql = "INSERT INTO appointments (name, email, phone, date, time, reason) VALUES (?, ?, ?, ?, ?, ?)";
  
//   db.query(sql, [name, email, phone, date, time, reason], (err, result) => {
//     if (err) {
//       console.error("❌ Error inserting appointment:", err);
//       return res.status(500).json({ success: false, message: "Database error" });
//     }
//     res.json({ success: true, message: "Appointment booked successfully!" });
//   });
// });

// //  Start Server
// const PORT = 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

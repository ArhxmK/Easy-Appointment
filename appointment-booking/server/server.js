require("dotenv").config(); // load environment variables
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Secure MySQL Database Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err.message);
  } else {
    console.log("✅ Connected to MySQL Database!");
  }
});

// ✅ Test API Route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// ✅ Middleware to Authenticate Users (Protects Routes)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.log("❌ Unauthorized: No token provided");
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("❌ Invalid Token:", err.message);
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
};

// ✅ User Registration Route
app.post(
  "/api/register",
  [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // ✅ Check if email already exists
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err) {
        console.error("❌ Database Query Error:", err);
        return res.status(500).json({ message: "Database error" });
      }
      if (results.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // ✅ Hash password and insert new user
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name, email, hashedPassword], (err, result) => {
        if (err) {
          console.error("❌ Registration Error:", err);
          return res.status(500).json({ message: "Database error" });
        }
        res.json({ success: true, message: "✅ Registration successful!" });
      });
    });
  }
);

// ✅ User Login Route
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, results) => {
    if (err) {
      console.error("❌ Login Error:", err);
      return res.status(500).json({ message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email } });
  });
});

// ✅ Book an Appointment (POST) - Requires Login
app.post("/api/book-appointment", authenticateToken, (req, res) => {
  const { name, email, phone, date, time, reason } = req.body;

  if (!name || !email || !phone || !date || !time || !reason) {
    console.log("❌ Missing fields in appointment request");
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "INSERT INTO appointments (name, email, phone, date, time, reason, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(sql, [name, email, phone, date, time, reason, req.user.id], (err, result) => {
    if (err) {
      console.error("❌ Error booking appointment:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ success: true, message: "✅ Appointment booked successfully!" });
  });
});

// ✅ Get All Appointments (GET) - Requires Login
app.get("/api/appointments", authenticateToken, (req, res) => {
  const sql = "SELECT * FROM appointments WHERE user_id = ? ORDER BY created_at DESC";
  db.query(sql, [req.user.id], (err, results) => {
    if (err) {
      console.error("❌ Error fetching appointments:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ success: true, appointments: results });
  });
});

// ✅ Update an Appointment (PUT)
app.put("/api/appointments/:id", authenticateToken, (req, res) => {
  const { id } = req.params;
  const { name, email, phone, date, time, reason } = req.body;

  if (!name || !email || !phone || !date || !time || !reason) {
    console.log("❌ Missing fields in update request");
    return res.status(400).json({ message: "All fields are required" });
  }

  const sql = "UPDATE appointments SET name=?, email=?, phone=?, date=?, time=?, reason=? WHERE id=? AND user_id=?";
  db.query(sql, [name, email, phone, date, time, reason, id, req.user.id], (err, result) => {
    if (err) {
      console.error("❌ Error updating appointment:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ success: true, message: "✅ Appointment updated successfully!" });
  });
});

// ✅ Delete an Appointment (DELETE)
app.delete("/api/appointments/:id", authenticateToken, (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM appointments WHERE id = ? AND user_id = ?";
  db.query(sql, [id, req.user.id], (err, result) => {
    if (err) {
      console.error("❌ Error deleting appointment:", err);
      return res.status(500).json({ message: "Database error" });
    }
    res.json({ success: true, message: "✅ Appointment deleted successfully!" });
  });
});

// ✅ Start the Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

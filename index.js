// Main server entry point
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const agriScanRoutes = require("./routes/agriScanRoutes");
const s3ImageRoute = require("./routes/s3ImageRoute");
const s3ImageRouteAnalyzed = require("./routes/s3ImageRouteAnalyzed");
const s3LogsRoute = require("./routes/s3LogsRoute");
const s3DiagnosticsLogsRoute = require("./routes/s3DiagnosticsLogsRoute");

const app = express();

// Middleware for logging all incoming requests
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
  console.log(`Headers:`, req.headers);
  next();
});

// Middleware for CORS
app.use(
  cors({
    origin: "*", // Allow all origins (not recommended for production)
  })
);
console.log("CORS middleware configured to allow all origins.");

// Load environment variables
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

// Log environment variables (sanitized to avoid logging sensitive data)
if (!username || !password) {
  console.error("Missing DB_USERNAME or DB_PASSWORD in environment variables.");
} else {
  console.log("DB_USERNAME and DB_PASSWORD found in environment variables.");
}

// MongoDB Connection
const uri = `mongodb+srv://${username}:${password}@capstone.dhfn8.mongodb.net/?retryWrites=true&w=majority&appName=Capstone`;

mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    console.log("Check your MongoDB URI or credentials.");
  });

// Routes with logging
app.use("/api", (req, res, next) => {
  console.log(`Matched API route: ${req.originalUrl}`);
  next();
});
app.use("/api", agriScanRoutes);
app.use("/api", s3ImageRoute);
app.use("/api", s3ImageRouteAnalyzed);
app.use("/api", s3LogsRoute);
app.use("/api", s3DiagnosticsLogsRoute);

// Catch-all for undefined routes
app.use((req, res, next) => {
  console.log(`Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).send("Route not found.");
});

app.get("/", (req, res) => {
  res.send("Hello, this is the root of the API. Try /api/systems.");
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

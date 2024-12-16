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

// Middleware
app.use(express.json());
const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@capstone.dhfn8.mongodb.net/?retryWrites=true&w=majority&appName=Capstone`;

// MongoDB Connection
mongoose
  .connect(uri)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
app.use("/api", agriScanRoutes);
app.use("/api", s3ImageRoute);
app.use("/api", s3ImageRouteAnalyzed);
app.use("/api", s3LogsRoute);
app.use("/api", s3DiagnosticsLogsRoute);

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

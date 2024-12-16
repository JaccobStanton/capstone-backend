const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Schema for soil sensor data at specific depths
const SoilSensorDataSchema = new mongoose.Schema(
  {
    depth: { type: String, required: true },
    soilMoisture: { type: String, required: true },
    soilTemperature: { type: String, required: true },
    electricalConductivity: { type: String, required: true },
    PAR: { type: String, required: true },
    PPFD: { type: String, required: true },
    DLI: { type: String, required: true },
  },
  { _id: false }
);

// Schema for sensors
const SensorSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4 }, // Unique ID for each sensor
    type: { type: String, required: true }, // Sensor type (e.g., "soilSensor")
    name: { type: String, required: true }, // Sensor name (e.g., "Decagon 5TE")
    data: [SoilSensorDataSchema], // Sensor readings at various depths
  },
  { timestamps: true } // Automatically include createdAt and updatedAt fields
);

// Export the Sensor model
module.exports = mongoose.model("Sensor", SensorSchema);

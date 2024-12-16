const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

// Schema for images
const ImageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    description: { type: String, required: true },
  },
  { _id: false }
);

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
    lora: { type: Number, required: true },
    battery: { type: String, required: true },
  },
  { _id: false }
);

// Schema for sensors
const SensorSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4 },
    type: { type: String, required: true },
    data: [SoilSensorDataSchema],
  },
  { _id: false }
);

// Schema for drones
const DroneSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    batteryPercentage: { type: Number, required: true },
    status: { type: String, required: true },
    signal: { type: String, required: true },
  },
  { _id: false }
);

// Schema for system status
const SystemStatusSchema = new mongoose.Schema(
  {
    operational: { type: Boolean, required: true },
    lastCheck: { type: Date, required: true },
    notes: { type: String },
    garageBattery: { type: Number },
    droneStatus: { type: String },
    missionStatus: { type: String },
    lastReading: { type: String },
    lastMeasurement: { type: String },
    latLong: { type: String },
    cellular: { type: Number },
  },
  { _id: false }
);

// Schema for environmental conditions
const EnvironmentalConditionSchema = new mongoose.Schema(
  {
    temperature: { type: Number, required: true },
    humidity: { type: Number, required: true },
    soilMoisture: { type: Number, required: true },
    windDirection: { type: String },
    windSpeed: { type: Number },
    windGust: { type: Number },
    windChill: { type: Number },
    vaporPressure: { type: Number },
    airPressure: { type: Number },
    solarRadiation: { type: Number },
    lux: { type: Number },
    lighteningStrikes: { type: Number },
    lighteningDistance: { type: Number },
  },
  { _id: false }
);

// Schema for individual systems
const SubSystemSchema = new mongoose.Schema(
  {
    id: { type: String, default: uuidv4 },
    name: { type: String, required: true },
    images: [ImageSchema],
    sensors: [SensorSchema],
    systemStatus: SystemStatusSchema,
    drones: [DroneSchema],
    environmentalConditions: [EnvironmentalConditionSchema],
  },
  { _id: false }
);

// Main system schema
const MainSystemSchema = new mongoose.Schema({
  systemName: { type: String, required: true },
  systems: [SubSystemSchema],
});

module.exports = mongoose.model("AgriScanSystem", MainSystemSchema);

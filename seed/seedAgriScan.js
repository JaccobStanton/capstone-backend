// Script to create the initial document
// The seed folder holds one-time scripts for initializing the database.
// Actual code script to seed database: 'node backend/seed/seedAgriScan.js'

const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const AgriScanSystem = require("../models/AgriScanSystem");
require("dotenv").config({ path: "../.env" });
const express = require("express");

const app = express();

// Middleware
app.use(express.json());

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@capstone.dhfn8.mongodb.net/?retryWrites=true&w=majority&appName=Capstone`;
// Connect to MongoDB

// Connect to MongoDB
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");

    // Creating the main AgriScan System document
    const agriScan = new AgriScanSystem({
      systemName: "AgriScan System",
      systems: [systemOneData, systemTwoData, systemThreeData, systemFourData],
    });

    return agriScan.save();
  })
  .then(() => {
    console.log("AgriScan System document created successfully!");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB or creating document:", err);
    mongoose.connection.close();
  });

// Helper function to generate mock sensor data for soil sensors
const generateSoilSensorData = (sensorId, sensorName) => {
  return {
    id: sensorId,
    name: sensorName,
    type: "soilSensor",
    data: Array.from({ length: 18 }, (_, i) => {
      const depth = `${i * 2}-${i * 2 + 2} inches`;
      return {
        depth,
        soilMoisture: (15 + Math.random() * 10).toFixed(2), // Random value between 15 and 25
        soilTemperature: (20 + Math.random() * 5).toFixed(2), // Random value between 20 and 25
        electricalConductivity: (0.7 + Math.random() * 0.3).toFixed(2), // Random value between 0.7 and 1.0
        PAR: (300 + Math.random() * 700).toFixed(2), // Random PAR value between 300 and 1000 µmol/m²/s
        PPFD: (50 + Math.random() * 100).toFixed(2), // Random PPFD value between 50 and 150 µmol/m²/s
        DLI: (10 + Math.random() * 20).toFixed(2),
        lora: Math.floor(Math.random() * 4) + 1, // Random value between 1 and 4
        battery: `${Math.floor(Math.random() * 100) + 1}%`, // Random percentage between 1% and 100%
      };
    }),
  };
};

// Static list of drone names
const droneNames = [
  "AeroDrone-1",
  "FieldRover-1",
  "SkyScout-1",
  "AgriFlyer-1",
  "CropCruiser-1",
  "TerraWatch-1",
  "AeroDrone-2",
  "FieldRover-2",
  "SkyScout-2",
  "AgriFlyer-2",
  "CropCruiser-2",
  "TerraWatch-2",
];

// Helper function to generate drones
// Sequentially assigns names from the static list
const generateDrones = (count, startIndex) => {
  const statuses = ["active", "charging", "in-flight", "maintenance"];
  const signalStrengths = ["weak", "medium", "strong"]; // New signal levels

  return Array.from({ length: count }, (_, i) => {
    const name = droneNames[startIndex + i]; // Assign name sequentially
    const batteryPercentage = Math.floor(Math.random() * 91) + 10; // Random between 10 and 100
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const signal =
      signalStrengths[Math.floor(Math.random() * signalStrengths.length)]; // Random signal level
    return { id: uuidv4(), name, batteryPercentage, status, signal }; // Include signal in the drone object
  });
};

//-------------------------------------------------------------
// Updated sensors with real-world soil sensor names
const realSoilSensors = [
  "Decagon 5TE",
  "AquaCheck",
  "Sentek Drill & Drop",
  "GroPoint Profile",
  "Teros 12",
  "HydraProbe II",
  "Campbell CS655",
  "Soil Scout",
  "EnviroSCAN",
  "Delta-T ThetaProbe",
  "ECHO EC-5",
  "FieldScout TDR 300",
];

// Data for System One (2 drones)
const systemOneData = {
  id: uuidv4(),
  name: "System One",
  images: [
    {
      url: "system_one_image.jpg",
      description: "An aerial shot of the field.",
    },
  ],
  sensors: [
    generateSoilSensorData("Decagon 5TE", realSoilSensors[0]),
    generateSoilSensorData("AquaCheck", realSoilSensors[1]),
  ],
  systemStatus: {
    operational: true,
    lastCheck: new Date(),
    notes: "All systems running smoothly.",
    garageBattery: 42,
    droneStatus: "Charging",
    missionStatus: "Charging",
    lastReading: "Tuesday, December 10, 2024 at 03:54 PM CST",
    latLong: "38.8098°, -90.1921°",
    cellular: 1,
  },
  drones: generateDrones(2, 0), // 2 drones for the first system
  environmentalConditions: [
    {
      temperature: 23,
      humidity: 40,
      soilMoisture: 20,
      windDirection: "SW",
      windSpeed: 12,
      windGust: 2,
      windChill: 30,
      vaporPressure: 11,
      airPressure: 5,
      solarRadiation: 1,
      lux: 1000,
      lighteningStrikes: 0,
      lighteningDistance: 0,
    },
  ],
};

// Data for System Two (4 drones)
const systemTwoData = {
  id: uuidv4(),
  name: "System Two",
  images: [
    { url: "system_two_image.jpg", description: "Soil sensor close-up." },
  ],
  sensors: [
    generateSoilSensorData("Sentek Drill & Drop", realSoilSensors[3]),
    generateSoilSensorData("Teros-54", realSoilSensors[4]),
    generateSoilSensorData("GroPoint Profile", realSoilSensors[5]),
    generateSoilSensorData("HydraProbe II", realSoilSensors[2]),
  ],

  systemStatus: {
    operational: false,
    lastCheck: new Date(),
    garageBattery: 69,
    notes: "Sensor malfunction, needs repair.",
    droneStatus: "Landed",
    missionStatus: "Landed",
    lastReading: "Sunday, December 15, 2024 at 8:22 PM CST",
    latLong: "38.6020°, -70.2200°",
    cellular: 2,
  },
  drones: generateDrones(4, 2), // 4 drones for the second system
  environmentalConditions: [
    {
      temperature: 32,
      humidity: 40,
      soilMoisture: 20,
      windDirection: "SW",
      windSpeed: 22,
      windGust: 6,
      windChill: 38,
      vaporPressure: 24,
      airPressure: 20,
      solarRadiation: 8,
      lux: 5000,
      lighteningStrikes: 0,
      lighteningDistance: 0,
    },
  ],
};

// Data for System Three (3 drones)
const systemThreeData = {
  id: uuidv4(),
  name: "System Three",
  images: [{ url: "system_three_image.jpg", description: "Weather station." }],
  sensors: [generateSoilSensorData("Teros-12", realSoilSensors[6])],
  systemStatus: {
    operational: true,
    lastCheck: new Date(),
    garageBattery: 5,
    notes: "Running at optimal performance.",
    droneStatus: "In flight",
    missionStatus: "In flight",
    lastReading: "Sunday, December 8, 2024 at 11:05 AM CST",
    latLong: "38.1000°, 80.1011°",
    cellular: 3,
  },
  drones: generateDrones(3, 6), // 3 drones for the third system
  environmentalConditions: [
    {
      temperature: 20,
      humidity: 50,
      soilMoisture: 30,
      windDirection: "N",
      windSpeed: 8,
      windGust: 6,
      windChill: 25,
      vaporPressure: 5,
      airPressure: 20,
      solarRadiation: 4,
      lux: 500,
      lighteningStrikes: 0,
      lighteningDistance: 0,
    },
  ],
};

// Data for System Four (3 drones)
const systemFourData = {
  id: uuidv4(),
  name: "System Four",
  images: [{ url: "system_four_image.jpg", description: "Irrigation system." }],
  sensors: [
    generateSoilSensorData("Delta-T ThetaProbe", realSoilSensors[7]),
    generateSoilSensorData("ECHO EC-5", realSoilSensors[8]),
    generateSoilSensorData("FieldScout TDR 300", realSoilSensors[9]),
    generateSoilSensorData("Atmos 9000", realSoilSensors[10]),
    generateSoilSensorData("Campbell CS655", realSoilSensors[11]),
  ],

  systemStatus: {
    operational: true,
    lastCheck: new Date(),
    garageBattery: 11,
    notes: "Monitoring irrigation efficiency.",
    droneStatus: "In flight",
    missionStatus: "In flight",
    lastReading: "Sunday, December 8, 2024 at 11:05 AM CST",
    latLong: "38.4569°, 875.90281°",
    cellular: 4,
  },
  drones: generateDrones(3, 9), // 3 drones for the last system
  environmentalConditions: [
    {
      temperature: 43,
      humidity: 60,
      soilMoisture: 45,
      windDirection: "SW",
      windSpeed: 12,
      windGust: 2,
      windChill: 30,
      vaporPressure: 11,
      airPressure: 5,
      solarRadiation: 1,
      lux: 1000,
      lighteningStrikes: 0,
      lighteningDistance: 0,
    },
  ],
};

// Creating the main AgriScan System document
const agriScan = new AgriScanSystem({
  systemName: "AgriScan System",
  systems: [systemOneData, systemTwoData, systemThreeData, systemFourData],
});

agriScan
  .save()
  .then(() => console.log("AgriScan System document created successfully!"))
  .catch((err) =>
    console.error("Error creating AgriScan System document:", err)
  );

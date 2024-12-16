// src/seed/sensorSeed.js

const mongoose = require("mongoose");
const Sensor = require("../models/sensor");
require("dotenv").config({ path: "../.env" });

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${username}:${password}@capstone.dhfn8.mongodb.net/test?retryWrites=true&w=majority`;

// Sensor data to be seeded
const sensorData = [
  {
    id: "soilSensorA",
    type: "soilSensor",
    name: "Decagon 5TE",
    data: [
      {
        depth: "0-2 inches",
        soilMoisture: "16.34",
        soilTemperature: "21.67",
        electricalConductivity: "0.75",
        PAR: "370.12",
        PPFD: "78.45",
        DLI: "14.23",
      },
      {
        depth: "2-4 inches",
        soilMoisture: "17.12",
        soilTemperature: "22.34",
        electricalConductivity: "0.88",
        PAR: "390.45",
        PPFD: "72.11",
        DLI: "13.78",
      },
      {
        depth: "4-6 inches",
        soilMoisture: "18.45",
        soilTemperature: "23.12",
        electricalConductivity: "0.82",
        PAR: "365.76",
        PPFD: "69.89",
        DLI: "12.45",
      },
      {
        depth: "6-8 inches",
        soilMoisture: "16.78",
        soilTemperature: "21.90",
        electricalConductivity: "0.81",
        PAR: "380.56",
        PPFD: "75.00",
        DLI: "13.56",
      },
      {
        depth: "8-10 inches",
        soilMoisture: "19.11",
        soilTemperature: "22.78",
        electricalConductivity: "0.85",
        PAR: "400.12",
        PPFD: "80.12",
        DLI: "15.67",
      },
      {
        depth: "10-12 inches",
        soilMoisture: "17.89",
        soilTemperature: "23.45",
        electricalConductivity: "0.83",
        PAR: "375.45",
        PPFD: "78.34",
        DLI: "14.11",
      },
      {
        depth: "12-14 inches",
        soilMoisture: "18.23",
        soilTemperature: "22.67",
        electricalConductivity: "0.84",
        PAR: "385.89",
        PPFD: "74.23",
        DLI: "13.89",
      },
      {
        depth: "14-16 inches",
        soilMoisture: "16.67",
        soilTemperature: "21.34",
        electricalConductivity: "0.79",
        PAR: "360.34",
        PPFD: "70.45",
        DLI: "12.78",
      },
    ],
  },
  {
    id: "soilSensorB",
    type: "soilSensor",
    name: "Sentek Drill & Drop",
    data: [
      {
        depth: "0-2 inches",
        soilMoisture: "19.67",
        soilTemperature: "20.78",
        electricalConductivity: "0.89",
        PAR: "420.56",
        PPFD: "68.90",
        DLI: "13.44",
      },
      {
        depth: "2-4 inches",
        soilMoisture: "18.34",
        soilTemperature: "21.12",
        electricalConductivity: "0.81",
        PAR: "405.34",
        PPFD: "70.67",
        DLI: "12.89",
      },
      {
        depth: "4-6 inches",
        soilMoisture: "17.90",
        soilTemperature: "22.34",
        electricalConductivity: "0.85",
        PAR: "415.78",
        PPFD: "72.56",
        DLI: "13.56",
      },
      {
        depth: "6-8 inches",
        soilMoisture: "19.45",
        soilTemperature: "21.67",
        electricalConductivity: "0.82",
        PAR: "430.12",
        PPFD: "75.89",
        DLI: "14.45",
      },
      {
        depth: "8-10 inches",
        soilMoisture: "18.67",
        soilTemperature: "22.90",
        electricalConductivity: "0.84",
        PAR: "410.34",
        PPFD: "73.23",
        DLI: "13.78",
      },
      {
        depth: "10-12 inches",
        soilMoisture: "17.23",
        soilTemperature: "20.34",
        electricalConductivity: "0.80",
        PAR: "395.12",
        PPFD: "71.45",
        DLI: "12.34",
      },
      {
        depth: "12-14 inches",
        soilMoisture: "19.12",
        soilTemperature: "22.56",
        electricalConductivity: "0.86",
        PAR: "425.56",
        PPFD: "76.12",
        DLI: "14.12",
      },
      {
        depth: "14-16 inches",
        soilMoisture: "18.45",
        soilTemperature: "21.78",
        electricalConductivity: "0.83",
        PAR: "415.89",
        PPFD: "74.89",
        DLI: "13.67",
      },
    ],
  },
  {
    id: "soilSensorC",
    type: "soilSensor",
    name: "Campbell CS655",
    data: [
      {
        depth: "0-2 inches",
        soilMoisture: "17.56",
        soilTemperature: "23.45",
        electricalConductivity: "0.78",
        PAR: "440.23",
        PPFD: "80.12",
        DLI: "16.67",
      },
      {
        depth: "2-4 inches",
        soilMoisture: "18.34",
        soilTemperature: "22.89",
        electricalConductivity: "0.82",
        PAR: "425.56",
        PPFD: "75.78",
        DLI: "15.23",
      },
      {
        depth: "4-6 inches",
        soilMoisture: "19.12",
        soilTemperature: "23.34",
        electricalConductivity: "0.84",
        PAR: "435.12",
        PPFD: "79.45",
        DLI: "16.12",
      },
      {
        depth: "6-8 inches",
        soilMoisture: "18.78",
        soilTemperature: "21.78",
        electricalConductivity: "0.79",
        PAR: "450.67",
        PPFD: "81.23",
        DLI: "17.45",
      },
      {
        depth: "8-10 inches",
        soilMoisture: "17.45",
        soilTemperature: "22.12",
        electricalConductivity: "0.81",
        PAR: "430.78",
        PPFD: "78.34",
        DLI: "15.89",
      },
      {
        depth: "10-12 inches",
        soilMoisture: "18.89",
        soilTemperature: "23.67",
        electricalConductivity: "0.85",
        PAR: "445.34",
        PPFD: "82.45",
        DLI: "16.78",
      },
      {
        depth: "12-14 inches",
        soilMoisture: "19.56",
        soilTemperature: "22.45",
        electricalConductivity: "0.87",
        PAR: "460.12",
        PPFD: "85.34",
        DLI: "17.89",
      },
      {
        depth: "14-16 inches",
        soilMoisture: "18.34",
        soilTemperature: "23.12",
        electricalConductivity: "0.80",
        PAR: "440.89",
        PPFD: "79.12",
        DLI: "16.45",
      },
    ],
  },
];

// Function to seed sensors
async function seedSensors() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Clear existing sensors
    await Sensor.deleteMany({});
    console.log("Cleared existing sensors");

    // Insert new sensors
    const insertedSensors = await Sensor.insertMany(sensorData);
    console.log("Sensors seeded successfully:", insertedSensors);

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding sensors:", error);
    mongoose.connection.close();
  }
}

// Run the seeding function
seedSensors();

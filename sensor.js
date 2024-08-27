// models/Sensor.js

const mongoose = require('mongoose');

const sensorSchema = new mongoose.Schema({
  sensorType: {
    type: String,
    required: true,
  },
  data: {
    type: [Number], // Array of numbers
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Sensor = mongoose.model('Sensor', sensorSchema);

module.exports = Sensor;

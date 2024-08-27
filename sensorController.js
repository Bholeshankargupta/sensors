// controllers/sensorController.js

const Sensor = require('../models/Sensor');

const getSensorData = async (req, res) => {
  const { sensorType } = req.params;
  const { range } = req.query;

  let timeRange;

  switch (range) {
    case '3hours':
      timeRange = new Date(Date.now() - 3 * 60 * 60 * 1000);
      break;
    case '24hours':
      timeRange = new Date(Date.now() - 24 * 60 * 60 * 1000);
      break;
    case '7days':
      timeRange = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      break;
    case '30days':
      timeRange = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      break;
    default:
      timeRange = new Date(Date.now() - 3 * 60 * 60 * 1000);
  }

  try {
    const data = await Sensor.find({ sensorType, timestamp: { $gte: timeRange } }).sort({ timestamp: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = { getSensorData };

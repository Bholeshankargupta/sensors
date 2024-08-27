// routes/sensorRoutes.js

const express = require('express');
const router = express.Router();
const { getSensorData } = require('../controllers/sensorController');

router.get('/sensors/:sensorType', getSensorData);

module.exports = router;

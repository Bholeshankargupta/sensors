// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SensorGraph from './SensorGraph';
import NavBar from './NavBar';

const Dashboard = () => {
  const [sensorType, setSensorType] = useState('internet');
  const [data, setData] = useState([]);

  const fetchData = async (type, range) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/sensors/${type}?range=${range}`);
      setData(response.data[0]?.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(sensorType, '3hours');
  }, [sensorType]);

  return (
    <div>
      <NavBar setSensorType={setSensorType} />
      <h1>{sensorType.charAt(0).toUpperCase() + sensorType.slice(1)} Sensor Data</h1>
      <SensorGraph data={data} sensorType={sensorType} />
      <div>
        <button onClick={() => fetchData(sensorType, '3hours')}>Last 3 hours</button>
        <button onClick={() => fetchData(sensorType, '24hours')}>Last 24 hours</button>
        <button onClick={() => fetchData(sensorType, '7days')}>Last 7 days</button>
        <button onClick={() => fetchData(sensorType, '30days')}>Last 30 days</button>
      </div>
    </div>
  );
};

export default Dashboard;

// // src/components/SensorGraph.js

// import React, { useEffect, useRef } from 'react';
// import Chart from 'chart.js/auto';

// const SensorGraph = ({ data, sensorType }) => {
//   const chartRef = useRef(null);

//   useEffect(() => {
//     if (chartRef.current) {
//       const ctx = chartRef.current.getContext('2d');
//       new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: data.map((entry, index) => `Point ${index + 1}`),
//           datasets: [{
//             label: `${sensorType} Data`,
//             data: data.map(entry => entry),
//             fill: false,
//             backgroundColor: 'rgba(75, 192, 192, 0.2)',
//             borderColor: 'rgba(75, 192, 192, 1)',
//             borderWidth: 1
//           }]
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true
//             }
//           }
//         }
//       });
//     }
//   }, [data, sensorType]);

//   return (
//     <div>
//       <canvas ref={chartRef}></canvas>
//     </div>
//   );
// };

// export default SensorGraph;
import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const SensorGraph = ({ data }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(chartRef.current, {
            type: 'line',
            data: {
                labels: data.map(d => d.timestamp),
                datasets: [{
                    label: 'Sensor Data',
                    data: data.map(d => d.value),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    fill: true,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        });

        // Cleanup function to destroy the chart instance when the component unmounts
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);  // Re-create chart if `data` changes
    // useEffect(() => {
    //     let chartInstance;
    //     if (chartRef && chartRef.current) {
    //         if (chartInstance) {
    //             chartInstance.destroy();
    //         }
    //         chartInstance = new Chart(chartRef.current, {
    //             type: 'line',
    //             data: data,
    //             options: options
    //         });
    //     }
    //     return () => {
    //         if (chartInstance) {
    //             chartInstance.destroy();
    //         }
    //     };
    // }, [data, options]);
    
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default SensorGraph;

// import React, { useEffect, useState, useRef } from 'react';
// import axios from 'axios';
// import Chart from 'chart.js/auto';

// const Charts: React.FC = () => {
//   const chartRef = useRef<HTMLCanvasElement | null>(null);
//   const [chartInstance, setChartInstance] = useState<Chart | null>(null);
//   const [dailyCases, setDailyCases] = useState<number[]>([]);
//   const [dailyDate, setDailyDate] = useState<string[]>([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(
//           'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
//         );
//         const casesData = response.data.cases as Record<string, number>;

//         const casesArray = Object.values(casesData);
//         const datesArray = Object.keys(casesData);

//         setDailyCases(casesArray);
//         setDailyDate(datesArray);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }, []);

//   useEffect(() => {
//     if (dailyCases.length && dailyDate.length && chartRef.current) {
//       if (chartInstance) {
//         chartInstance.destroy();
//       }

//       const ctx = chartRef.current.getContext('2d');
//       const newChartInstance = new Chart(ctx, {
//         type: 'line',
//         data: {
//           labels: dailyDate,
//           datasets: [
//             {
//               label: 'Daily Cases',
//               data: dailyCases,
//               borderColor: 'rgba(75, 192, 192, 0.8)',
//               backgroundColor: 'rgba(75, 192, 192, 0.2)',
//               pointBackgroundColor: 'rgba(75, 192, 192, 1)',
//               pointBorderColor: 'rgba(75, 192, 192, 1)',
//               pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
//               pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
//               borderWidth: 2,
//               pointRadius: 3,
//               pointHoverRadius: 5,
//             },
//           ],
//         },
//         options: {
//           scales: {
//             y: {
//               beginAtZero: true,
//               title: {
//                 display: true,
//                 text: 'Daily Cases',
//               },
//             },
//             x: {
//               title: {
//                 display: true,
//                 text: 'Date',
//               },
//             },
//           },
//           plugins: {
//             legend: {
//               display: false,
//             },
//             tooltip: {
//               backgroundColor: 'rgba(0, 0, 0, 0.8)',
//             },
//           },
//         },
//       });

//       setChartInstance(newChartInstance);
//     }
//   }, [dailyCases, dailyDate]);

//   return (
//     <div className="p-4 bg-white rounded-lg shadow-md">
//      <h1 className="text-2xl font-semibold mb-4 text-center">COVID-19 Cases Fluctuations</h1>
//       <canvas ref={chartRef} className="w-full" />
//     </div>
//   );
// };

// export default Charts;

import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const Charts: React.FC = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);
  const [dailyCases, setDailyCases] = useState<number[]>([]);
  const [dailyDate, setDailyDate] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://disease.sh/v3/covid-19/historical/all?lastdays=all'
        );
        const casesData = response.data.cases as Record<string, number>;

        const casesArray = Object.values(casesData);
        const datesArray = Object.keys(casesData);

        setDailyCases(casesArray);
        setDailyDate(datesArray);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (dailyCases.length && dailyDate.length && chartRef.current) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      const newChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
          labels: dailyDate,
          datasets: [
            {
              label: 'Daily Cases',
              data: dailyCases,
              borderColor: 'rgba(75, 192, 192, 0.8)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              pointBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointBorderColor: 'rgba(75, 192, 192, 1)',
              pointHoverBackgroundColor: 'rgba(75, 192, 192, 1)',
              pointHoverBorderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 2,
              pointRadius: 3,
              pointHoverRadius: 5,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Daily Cases',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [dailyCases, dailyDate]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">COVID-19 Cases Fluctuations</h1>
        <canvas ref={chartRef} width="950" height="500" className="w-full" />
      </div>
    </div>
  );
};

export default Charts;

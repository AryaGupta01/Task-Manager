import React from "react";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
 
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
 
const TaskCompletionRateChart = ({ data }) => {
  console.log(data, "completionrate");
  
  const chartData = {
    labels: data.labels || [], 
    datasets: [
      {
        label: "Completion Rate (%)",
        data: data.completionRates || [],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        tension: 0.1,
      },
    ],
  };
  console.log(chartData,"ChartData");
  
 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true, 
        text: "Task Completion Rate Over Time",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function (value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div> 
      <h2>Task Completion Rate</h2>
      {data ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No completion rate data available.</p>
      )}
    </div> 
  );
};
 
export default TaskCompletionRateChart;
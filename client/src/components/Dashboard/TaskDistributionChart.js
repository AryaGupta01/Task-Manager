import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography, Box } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);

const TaskDistributionChart = ({ data }) => {
  
  if (!data) {
    return <Typography variant="body1">Loading chart data</Typography>;
  }

  // Get array of values from Map
  const valuesArray = Array.from(data.values());
  console.log(valuesArray, "ValuesArray");
  
  // Create a mapping of priority to count
  const valuesMap = valuesArray.reduce((acc, item) => {
    acc[item._id] = item.count;
    return acc;
  }, {});

  // Define priority levels in order
  const priorityLevels = ["High", "Medium", "Low"];

  const chartData = {
    labels: priorityLevels,
    datasets: [
      {
        data: priorityLevels.map((level) => valuesMap[level] || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  

  return (
    <Box sx={{ width: "100%", maxWidth: 400, margin: "auto" }}>
      <Typography variant="h6" gutterBottom align="center">
        Task Distribution by Priority
      </Typography>
      <Pie data={chartData}  />
    </Box>
  );
};

export default TaskDistributionChart;

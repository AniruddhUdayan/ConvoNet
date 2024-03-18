import React from "react";
import {
  CategoryScale,
  Chart as ChartJs,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { getLast7Days } from "@/lib/features";

ChartJs.register(
  CategoryScale,
  Tooltip,
  Filler,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Legend
);

const labels = getLast7Days();

const lineChartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
      },
    },
  },
};

const LineChart = ({ value = [] }) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Revenue",
        fill: true,
        backgroundColor: "rgb(75, 192, 192 , 0.2)",
        borderColor: "5px solid rgba(0,0,0,0.9)",
      },
    ],
  };

  return <Line data={data} options={lineChartOptions} />;
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    cutout:120,
}

const DoughnutChart = ({ value = [] , labels=[]}) => {
  const data = {
    labels,
    datasets: [
      {
        data: value,
        label: "Single Chats vs Group Chats",
        fill: true,
        backgroundColor: [
          "rgb(75, 192, 192 , 0.1)",
          "rgb(75, 192, 192 , 0.4)",
        ],
        borderColor: ["5px solid rgba(0,0,0,0.9)"],
    
      },
    ],
  };
  return <Doughnut style={{zIndex:10}} data={data} options={doughnutChartOptions}/>;
};

export { LineChart, DoughnutChart };

import React, { useEffect, useState } from "react";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const URL = "https://roxiller-back.onrender.com";

const Barchart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const getBarData = async () => {
      try {
        const res = await fetch(`${URL}/api/bar?month=${month}`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        setBarData(data.barChart);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getBarData();
  }, [month]);

  let barArray = [];

  barData.map((each) => {
    barArray.push(each.count);
  });

  const xLabel = [
    "0-100",
    "101-200",
    "201-300",
    "301-400",
    "401-500",
    "501-600",
    "601-700",
    "701-800",
    "801-900",
    " 901-above",
  ];

  const data = {
    labels: xLabel,
    datasets: [
      {
        label: "Month Wise Bar Chart",
        data: barArray,
        backgroundColor: [
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(54, 162, 235, 0.2)", // Blue
          "rgba(75, 192, 192, 0.2)", // Green
          "rgba(54, 162, 235, 0.2)", // Blue
        ],
        borderColor: [
          "rgb(75, 192, 192)", // Green
          "rgb(54, 162, 235)", // Blue
          "rgb(75, 192, 192)", // Green
          "rgb(54, 162, 235)", // Blue
          "rgb(75, 192, 192)", // Green
          "rgb(54, 162, 235)", // Blue
          "rgb(75, 192, 192)", // Green
          "rgb(54, 162, 235)", // Blue
          "rgb(75, 192, 192)", // Green
          "rgb(54, 162, 235)", // Blue
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {};
  return (
    <div className="w-[50%] flex flex-col items-center gap-16">
      <h1 className="text-3xl uppercase">Bar chart - {month}</h1>
      <Bar data={data} options={options} className="" />
    </div>
  );
};

export default Barchart;

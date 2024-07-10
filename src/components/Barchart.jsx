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

  // const data = {
  //   labels: xLabel,
  //   datasets: [
  //     {
  //       label: "Month Wise Bar Chart",
  //       data: barArray,
  //       backgroundColor: [
  //         "rgba(75, 192, 192, 0.2)", // Green
  //         "rgba(54, 162, 235, 0.2)", // Blue
  //         "rgba(75, 192, 192, 0.2)", // Green
  //         "rgba(54, 162, 235, 0.2)", // Blue
  //         "rgba(75, 192, 192, 0.2)", // Green
  //         "rgba(54, 162, 235, 0.2)", // Blue
  //         "rgba(75, 192, 192, 0.2)", // Green
  //         "rgba(54, 162, 235, 0.2)", // Blue
  //         "rgba(75, 192, 192, 0.2)", // Green
  //         "rgba(54, 162, 235, 0.2)", // Blue
  //       ],
  //       borderColor: [
  //         "rgb(75, 192, 192)", // Green
  //         "rgb(54, 162, 235)", // Blue
  //         "rgb(75, 192, 192)", // Green
  //         "rgb(54, 162, 235)", // Blue
  //         "rgb(75, 192, 192)", // Green
  //         "rgb(54, 162, 235)", // Blue
  //         "rgb(75, 192, 192)", // Green
  //         "rgb(54, 162, 235)", // Blue
  //         "rgb(75, 192, 192)", // Green
  //         "rgb(54, 162, 235)", // Blue
  //       ],
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  const data = {
    labels: xLabel,
    datasets: [
      {
        label: "Month Wise Bar Chart",
        data: barArray,
        backgroundColor: [
          "rgba(68, 136, 221, 0.2)", // Chart 1
          "rgba(46, 184, 138, 0.2)", // Chart 2
          "rgba(242, 153, 51, 0.2)", // Chart 3
          "rgba(153, 102, 204, 0.2)", // Chart 4
          "rgba(221, 68, 136, 0.2)", // Chart 5
          "rgba(68, 136, 221, 0.2)", // Chart 1
          "rgba(46, 184, 138, 0.2)", // Chart 2
          "rgba(242, 153, 51, 0.2)", // Chart 3
          "rgba(153, 102, 204, 0.2)", // Chart 4
          "rgba(221, 68, 136, 0.2)", // Chart 5
        ],
        borderColor: [
          "rgb(68, 136, 221)", // Chart 1
          "rgb(46, 184, 138)", // Chart 2
          "rgb(242, 153, 51)", // Chart 3
          "rgb(153, 102, 204)", // Chart 4
          "rgb(221, 68, 136)", // Chart 5
          "rgb(68, 136, 221)", // Chart 1
          "rgb(46, 184, 138)", // Chart 2
          "rgb(242, 153, 51)", // Chart 3
          "rgb(153, 102, 204)", // Chart 4
          "rgb(221, 68, 136)", // Chart 5
        ],
        borderWidth: 2,
      },
    ],
  };

  const options = {};
  return (
    <div className="  w-[90%] md:w-[50%] flex flex-col items-center gap-16">
      <h1 className="text-2xl uppercase">Bar chart - {month}</h1>
      <Bar data={data} options={options} className="" />
    </div>
  );
};

export default Barchart;

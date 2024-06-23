import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  ArcElement
);

import { Doughnut } from "react-chartjs-2";

const URL = "https://roxiller-back.onrender.com";

const PieChart = ({ month }) => {
  const [pieData, setPieData] = useState([]);

  useEffect(() => {
    console.log("nkhkhikhni");
    const getPieData = async () => {
      try {
        const res = await fetch(`${URL}/api/pie?month=${month}`);

        if (!res.ok) {
          throw new Error("Something went wrong");
        }

        const data = await res.json();

        setPieData(data.pieChart);
        console.log("data", data);
      } catch (error) {
        console.log(error);
      }
    };

    getPieData();
  }, [month]);

  const data = {
    labels: pieData?.map((row) => row.category),
    datasets: [
      {
        label: "Month Wise Category Pie Chart",
        data: pieData.map((row) => row.itemCount),
        backgroundColor: [
          "rgb(190 62 255)",
          "rgb(62 127 255)",
          "rgb(100, 51, 226)",
          "rgb(25, 25, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="w-[28%] flex flex-col items-center gap-16">
      <h1 className="text-3xl uppercase">Pie Chart - {month}</h1>
      <Doughnut data={data} />
    </div>
  );
};

export default PieChart;

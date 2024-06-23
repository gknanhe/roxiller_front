import { Table } from "lucide-react";
import React, { useEffect, useState } from "react";
import { ProductsTable } from "./Table";

const Statistics = ({ selectedMonth, search }) => {
  const [statisticsData, setStatisticsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const URL = "https://roxiller-back.onrender.com/";

  /** ------------- call API --------- */
  useEffect(() => {
    const getStatistics = async () => {
      try {
        setLoading(true);

        const res = await fetch(`${URL}/api/statistics?month=${selectedMonth}`);

        if (!res.ok) {
          throw new Error("Failed To fetch");
        }

        const data = await res.json();
        setStatisticsData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getStatistics();
  }, [selectedMonth, search]);

  /*----------- column entities for statistics---------- */
  const statisticsColumns = [
    { label: "MONTH", accessor: "month", cellClassName: " font-semibold " },
    {
      label: "SOLD",
      accessor: "sold",
      cellClassName: "text-green-500 font-semibold",
    },
    {
      label: "NOT SOLD",
      accessor: "notSold",
      cellClassName: "text-red-500 font-semibold",
    },
    {
      label: "TOTAL ITEMS",
      accessor: "totalItems",
      cellClassName: " font-semibold",
    },
    {
      label: "TOTAL PRICE OF PRODUCTS",
      accessor: "totalPriceOfItems",
      cellClassName: " font-semibold",
    },
  ];

  return (
    <div className="flex justify-center items-center   flex-col gap-4 my-4">
      <h1 className="font-bold text-2xl">Transctions Statistics</h1>
      <ProductsTable
        products={[statisticsData]}
        page={""}
        columns={statisticsColumns}
        title="Transctions Statistics"
      />
    </div>
  );
};

export default Statistics;

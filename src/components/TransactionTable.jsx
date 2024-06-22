import useDebounce from "../hooks/useDebounce";
import React, { useState } from "react";
import { DropDown } from "./DropDown";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { ProductsTable } from "./Table";

const TransactionTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("march");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});
  const limit = 10;
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const URL = "http://localhost:8000";

  const debouncedValue = useDebounce(searchValue, 500);

  const handleMonthChange = (month) => {
    setSelectedMonth(month);
  };

  useEffect(() => {
    //fetch transactions
    const transactions = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${URL}/api/all_transactions?month=${selectedMonth}&page=${page}&limit=${limit}&search=${debouncedValue}`
        );

        if (!res.ok) {
          throw new Error("Failed To fetch");
        }

        const data = await res.json();
        setTableData(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    transactions();
  }, [debouncedValue, page, selectedMonth]);

  return (
    <div className="flex justify-center items-center flex-col w-full px-4 py-3 gap-4">
      <div className="flex justify-center items-center w-full gap-4">
        <Input
          type="text"
          placeholder="Search"
          value={searchValue}
          onChange={handleSearchChange}
        />
        <DropDown
          selectedMonth={selectedMonth}
          onMonthChange={handleMonthChange}
        />
      </div>
      <div>
        {tableData.products.length > 0 ? (
          <ProductsTable products={tableData.products} />
        ) : (
          <div className="m-4">
            No product sale found for {selectedMonth} try choosing another month
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionTable;

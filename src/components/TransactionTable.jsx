import useDebounce from "../hooks/useDebounce";
import React, { useState } from "react";
import { DropDown } from "./DropDown";
import { Input } from "./ui/input";
import { useEffect } from "react";
import { ProductsTable } from "./Table";
import Statistics from "./Statistics";
import Barchart from "./Barchart";
import PieChart from "./PieChart";

const TransactionTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("march");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState({});
  const limit = 10;
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const URL = "https://roxiller-back.onrender.com/";

  const debouncedValue = useDebounce(searchValue, 500);

  /** ----------- call api for transactions --------------- */

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
        setTotalPages(data.totalPages);
        // console.log(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    transactions();
  }, [debouncedValue, page, selectedMonth]);

  /** Handle things */
  const handleMonthChange = (month) => {
    setSelectedMonth(month);
    setPage(1);
  };

  // Next Page-------------------------
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prev) => {
        return prev + 1;
      });
    }
  };

  // Prev Page-----------------------------
  const handlePrevPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  //Dynamic table colums for transaction items
  const transactionColumns = [
    { label: "Index", render: (_, index) => index },
    { label: "ID", accessor: "_id" },
    { label: "Title", accessor: "title" },
    { label: "Description", accessor: "description" },
    { label: "Price", accessor: "price", cellClassName: "text-right" },
    { label: "Category", accessor: "category" },
    { label: "Sold", render: (item) => item.sold.toString() },
    {
      label: "Item Image",
      render: (item) => (
        <div className="w-[90px]">
          <img src={item.image} alt="img" />
        </div>
      ),
    },
  ];

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
      {
        /*-------------- Loading -------------*/
        loading ? (
          <div className="mx-14 my-14">
            <div className="dot-spinner">
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
              <div className="dot-spinner__dot"></div>
            </div>
          </div>
        ) : (
          /*----------------tabel data-----------*/
          <div>
            {tableData.products?.length > 0 ? (
              <ProductsTable
                products={tableData.products}
                page={page}
                columns={transactionColumns}
                totalPages={totalPages}
                handlePrevPage={handlePrevPage}
                handleNextPage={handleNextPage}
                title="A list of Transactions"
              />
            ) : (
              /*----------------if no tabel enty matchess -----------*/

              <div className="m-4">
                No product sale found for {selectedMonth} try choosing another
                month
              </div>
            )}
          </div>
        )
      }
      {/*  Statistics  componant */}
      <Statistics selectedMonth={selectedMonth} search={debouncedValue} />

      <Barchart month={selectedMonth} />
      <PieChart month={selectedMonth} />
    </div>
  );
};

export default TransactionTable;

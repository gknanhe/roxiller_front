import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

export function ProductsTable({
  products,
  page,
  columns,
  title,
  handleNextPage,
  handlePrevPage,
  totalPages,
}) {
  return (
    <Table className="border ">
      <TableCaption>
        {" "}
        {/* ---------------------- Pagination -------------------- */}
        <h1>{title}</h1>
        <div className="flex flex-col items-center space-y-4 py-4">
          <div className="">
            {page ? (
              <p>
                Page :{" "}
                <span className="font-semibold text-slate-950">{page}</span>
              </p>
            ) : (
              ""
            )}
          </div>
          {page ? (
            <>
              {" "}
              <div className="flex items-center gap-10">
                <div>
                  <Button
                    className="flex items-center gap-2"
                    onClick={handlePrevPage}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                </div>
                <div>
                  <Button
                    className="flex items-center gap-2"
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
              <div>
                <p>
                  Page Per View :{" "}
                  <span className="font-semibold text-slate-950">10</span>
                </p>
              </div>
            </>
          ) : (
            ""
          )}
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          {columns.map((column, i) => (
            <TableHead key={i} className={column.className}>
              {column.label}
            </TableHead>
          ))}
          {/* <TableHead className="w-[100px]">Index</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>TITLE</TableHead>
          <TableHead>DESCRIPTION</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>SOLD</TableHead>
          <TableHead>ITEM IMAGE</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, prodIndx) => (
          <TableRow key={product._id}>
            {columns.map((column, i) => (
              <TableCell key={i} className={column.cellClassName}>
                {column.render
                  ? column.render(product, prodIndx + 1)
                  : product[column.accessor]}
              </TableCell>
            ))}

            {/* <TableCell>{i + 1}</TableCell>

            <TableCell className="font-medium">{product._id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.sold.toString()}</TableCell>
            <TableCell>
              <div className="w-[90px]">
                <img src={product.image} alt="img" />
              </div>
            </TableCell> */}
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={5}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}

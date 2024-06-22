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

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function ProductsTable({ products }) {
  return (
    <Table className="border-t">
      <TableCaption>List of products .</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Index</TableHead>
          <TableHead>ID</TableHead>
          <TableHead>TITLE</TableHead>
          <TableHead>DESCRIPTION</TableHead>
          <TableHead>PRICE</TableHead>
          <TableHead>CATEGORY</TableHead>
          <TableHead>SOLD</TableHead>
          <TableHead>ITEM IMAGE</TableHead>
          {/* <TableHead className="text-right">Amount</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product, i) => (
          <TableRow key={product._id}>
            <TableCell>{i + 1}</TableCell>

            <TableCell className="font-medium">{product._id}</TableCell>
            <TableCell>{product.title}</TableCell>
            <TableCell>{product.description}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
            <TableCell>{product.category}</TableCell>
            <TableCell>{product.sold}</TableCell>
            <TableCell>
              <div className="w-[90px]">
                <img src={product.image} alt="img" />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  );
}

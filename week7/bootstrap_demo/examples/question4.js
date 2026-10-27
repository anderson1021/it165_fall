const transactions = [
  { id: 101, item: "Laptop", status: "completed", price: 1200 },
  { id: 102, item: "Mouse", status: "cancelled", price: 25 },
  { id: 103, item: "Keyboard", status: "completed", price: 100 },
  { id: 104, item: "Monitor", status: "pending", price: 300 },
  { id: 105, item: "Headphones", status: "completed", price: 150 }
];

const totalRevenue = transactions
  .filter((transaction) => transaction.status !== "cancelled")
  .map((transaction) => ({
    ...transaction,
    taxedAmount: transaction.price * 1.08
  }))
  .reduce((total, transaction) =>
    transaction.status === "completed"
      ? total + transaction.taxedAmount
      : total,
    0
  );

console.log(`Total revenue: $${totalRevenue.toFixed(2)}`);
// Total revenue: $1566.00

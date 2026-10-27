# Week 7 Assignment Answers

Anderson Benitez Ortiz

## Question 1: Block scoping and const

```javascript
const serverConfig = { port: 3000, env: "development" };
serverConfig.port = 8080;     // Allowed: change a property.
serverConfig.timeout = 5000;  // Allowed: add a property.
console.log(serverConfig);
// { port: 8080, env: "development", timeout: 5000 }
// serverConfig = { port: 9000 }; // Uncommenting causes a TypeError.
```

Both property changes succeed without a TypeError. `const` makes the block-scoped variable binding fixed; it does not freeze the referenced object. Reassigning `serverConfig` to a different object is prohibited. The variable is accessible only within its declaring block. `Object.freeze(serverConfig)` would prevent adding or changing its own properties (a shallow freeze).

## Question 2: DOM creation and event delegation

```javascript
// Run after the HTML elements have loaded (use a deferred script).
const input = document.querySelector("#taskInput");
const addButton = document.querySelector("#addTaskBtn");
const taskList = document.querySelector("#taskList");

addButton.addEventListener("click", () => {
  const text = input.value.trim();
  if (!text) return;

  const item = document.createElement("li");
  const label = document.createElement("span");
  label.textContent = text;
  const deleteButton = document.createElement("button");
  deleteButton.type = "button";
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete-task";
  item.append(label, " ", deleteButton);
  taskList.append(item);
  input.value = "";
  input.focus();
});

// One delegated listener also handles buttons added in the future.
taskList.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) return;
  const button = event.target.closest("button.delete-task");
  if (!button || !taskList.contains(button)) return;
  const item = button.closest("li");
  if (item && item.parentElement === taskList) item.remove();
});
```

The click handler creates a list item and its Delete button. Using `textContent` displays input as plain text instead of interpreting it as HTML. Delete clicks bubble to the parent list; the delegated handler finds and removes only the clicked item. Empty input is ignored.

Required HTML (place before the script, or use a deferred external script):

```html
<label for="taskInput">New task</label>
<input id="taskInput" type="text">
<button id="addTaskBtn" type="button">Add task</button>
<ul id="taskList"></ul>
```

## Question 3: Asynchronous order processing

```javascript
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function processOrder(orderId) {
  if (!orderId || orderId < 0) {
    throw new Error("Invalid Order ID");
  }
  await delay(500);
  console.log(`Verifying inventory for order ${orderId}...`);
  await delay(500);
  console.log("Processing payment...");
  await delay(500);
  return {
    orderId,
    status: "SUCCESS",
    timestamp: new Date().toISOString()
  };
}

async function main() {
  try {
    const confirmation = await processOrder(101);
    console.log("Order confirmation:", confirmation);
  } catch (error) {
    console.error("Order failed:", error.message);
  } finally {
    console.log("Order attempt finished.");
  }
}
main();
```

An `async` function always returns a Promise. Throwing before the first `await` immediately rejects that Promise for a falsy or negative ID. Each awaited delay resolves before the next delay begins, so the inventory message appears after about 500 ms, payment after about 1,000 ms, and confirmation after about 1,500 ms. Timer timing is approximate. `catch` handles rejection, and `finally` runs after either success or failure.

## Question 4: Array transformations

```javascript
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
```

`filter` removes the cancelled Mouse. `map` creates new objects with an 8% tax and preserves the original data. `reduce` adds only completed transactions, starting from zero; the pending Monitor contributes nothing. Laptop: $1,296; Keyboard: $108; Headphones: $162. Total: **$1,566.00**. `toFixed(2)` formats the displayed result; floating-point arithmetic can require additional care in production financial systems.


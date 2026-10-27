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

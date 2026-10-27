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

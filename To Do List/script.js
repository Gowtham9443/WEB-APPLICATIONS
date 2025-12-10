function addTask() {
  const task = document.getElementById("taskInput").value.trim();
  const date = document.getElementById("dateInput").value;

  if (task === "" || date === "") {
    alert("Please enter both task and date!");
    return;
  }

  const li = document.createElement("li");
  li.textContent = `${task} (Due: ${formatDate(date)})`;

  document.getElementById("taskList").appendChild(li);
  document.getElementById("taskInput").value = "";
  document.getElementById("dateInput").value = "";
}

function clearTasks() {
  document.getElementById("taskList").innerHTML = "";
}

function exportTXT() {
  const items = getTaskList();
  const blob = new Blob([items.join("\n")], { type: "text/plain" });
  downloadBlob(blob, "tasks.txt");
}

function exportCSV() {
  const items = getTaskList();
  const csvContent = "Task,Due Date\n" + items.map(item => item.replace(" (Due: ", ",").replace(")", "")).join("\n");
  const blob = new Blob([csvContent], { type: "text/csv" });
  downloadBlob(blob, "tasks.csv");
}

function getTaskList() {
  const tasks = document.querySelectorAll("#taskList li");
  return Array.from(tasks).map(li => li.textContent);
}

function downloadBlob(blob, filename) {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split("-");
  return `${day}-${month}-${year}`;
}

// 🌙 Theme Toggle
const themeSwitch = document.getElementById("themeSwitch");
const themeLabel = document.getElementById("themeLabel");

themeSwitch.addEventListener("change", () => {
  document.body.classList.toggle("dark");
  themeLabel.textContent = themeSwitch.checked ? "🌙 Dark Mode" : "☀️ Light Mode";
});

// Select elements
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const progressBar = document.getElementById("progress-bar");
const categorySelect = document.getElementById("category");
const dueDateInput = document.getElementById("due-date");
const searchInput = document.getElementById("search");

// Load tasks when page loads
document.addEventListener("DOMContentLoaded", () => {
    console.log("Page Loaded!");
    loadTasks();
    updateProgressBar();
});

// Add task
function addTask() {
    let taskText = taskInput.value.trim();
    let category = categorySelect.value;
    let dueDate = dueDateInput.value;

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    // Create list item
    let li = document.createElement("li");
    li.innerHTML = `
        <div class="task-content">
            <strong>${taskText}</strong> 
            <span class="category">${category}</span>
            <span class="due-date">${dueDate ? "Due: " + dueDate : ""}</span>
        </div>
        <div class="task-actions">
            <button class="edit-btn" onclick="editTask(this)">✏️</button>
            <button class="delete-btn" onclick="removeTask(this)">❌</button>
        </div>
    `;

    taskList.appendChild(li);
    saveTasks();
    taskInput.value = "";
    updateProgressBar();
}

// Remove task
function removeTask(button) {
    button.closest("li").remove();
    saveTasks();
    updateProgressBar();
}

// Edit task
function editTask(button) {
    let li = button.closest("li");
    let taskContent = li.querySelector("strong");
    let newText = prompt("Edit task:", taskContent.textContent.trim());

    if (newText) {
        taskContent.textContent = newText;
        saveTasks();
    }
}

// Filter tasks based on search input
function filterTasks() {
    let searchQuery = searchInput.value.toLowerCase();
    let tasks = document.querySelectorAll("#task-list li");

    tasks.forEach(task => {
        let taskText = task.querySelector("strong").textContent.toLowerCase();
        task.style.display = taskText.includes(searchQuery) ? "flex" : "none";
    });
}

// Attach event listener to search input
searchInput.addEventListener("keyup", filterTasks);

// Save tasks
function saveTasks() {
    let tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push(task.innerHTML);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskHTML => {
        let li = document.createElement("li");
        li.innerHTML = taskHTML;
        taskList.appendChild(li);
    });
}

// Add task when "Enter" is pressed
taskInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

// Update Progress Bar
function updateProgressBar() {
    let totalTasks = document.querySelectorAll("#task-list li").length;
    let completedTasks = document.querySelectorAll("#task-list li.completed").length;
    let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
    progressBar.style.width = progress + "%";
}

// Debugging Log
console.log("Script Loaded!");


// ----------------------
// LOAD TASKS FROM STORAGE
// ----------------------
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const titleInput = document.getElementById('title');
const descInput = document.getElementById('description');
const prioritySelect = document.getElementById('priority');
const dueDateInput = document.getElementById('dueDate');
const categorySelect = document.getElementById('category');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskListDiv = document.getElementById('task-list');

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ----------------------
// FILTERING & SEARCH
// ----------------------
function applyFilters(task) {
  const search = document.getElementById("searchInput").value.toLowerCase();
  const category = document.getElementById("filterCategory").value;
  const priority = document.getElementById("filterPriority").value;
  const status = document.getElementById("filterStatus").value;
  const startDate = document.getElementById("filterStartDate").value;
  const endDate = document.getElementById("filterEndDate").value;

  if (search &&
      !task.title.toLowerCase().includes(search) &&
      !task.description.toLowerCase().includes(search)) {
    return false;
  }

  if (category && task.category !== category) return false;
  if (priority && task.priority !== priority) return false;

  if (status === "completed" && !task.completed) return false;
  if (status === "pending" && task.completed) return false;

  if (task.dueDate) {
    const taskDate = new Date(task.dueDate);
    if (startDate && taskDate < new Date(startDate)) return false;
    if (endDate && taskDate > new Date(endDate)) return false;
  }

  return true;
}

// ----------------------
// RENDER TASK LIST
// ----------------------
function renderTasks() {
  taskListDiv.innerHTML = '';

  tasks.forEach((task, index) => {
    if (!applyFilters(task)) return;

    const div = document.createElement('div');
    div.className = 'task-item';
    if (task.completed) div.classList.add('completed');

    div.innerHTML = `
      <strong>${task.title}</strong> [${task.priority}]<br>
      ${task.description}<br>
      Due: ${task.dueDate || 'No date'}<br>
      Category: ${task.category}<br>
      <button data-index="${index}" class="complete-btn">
        ${task.completed ? 'Unmark' : 'Mark as completed'}
      </button>
      <button data-index="${index}" class="edit-btn">Edit</button>
      <button data-index="${index}" class="delete-btn">Delete</button>
    `;

    taskListDiv.appendChild(div);
  });

  document.querySelectorAll('.complete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      tasks[idx].completed = !tasks[idx].completed;
      saveTasks();
      renderTasks();
    });
  });

  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      const task = tasks[idx];

      titleInput.value = task.title;
      descInput.value = task.description;
      prioritySelect.value = task.priority;
      dueDateInput.value = task.dueDate;
      categorySelect.value = task.category;

      addTaskBtn.textContent = "Save Changes";
      addTaskBtn.onclick = () => {
        task.title = titleInput.value;
        task.description = descInput.value;
        task.priority = prioritySelect.value;
        task.dueDate = dueDateInput.value;
        task.category = categorySelect.value;

        saveTasks();
        renderTasks();

        addTaskBtn.textContent = "Add Task";
        addTaskBtn.onclick = addTask;

        titleInput.value = "";
        descInput.value = "";
        dueDateInput.value = "";
      };
    });
  });

  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = e.target.getAttribute('data-index');
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    });
  });
}

// ----------------------
// ADD TASK
// ----------------------
function addTask() {
  const task = {
    title: titleInput.value,
    description: descInput.value,
    priority: prioritySelect.value,
    dueDate: dueDateInput.value,
    category: categorySelect.value,
    completed: false,
    notified: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  titleInput.value = "";
  descInput.value = "";
  dueDateInput.value = "";
}

addTaskBtn.onclick = addTask;

// Initial render
renderTasks();

// ----------------------
// FULLCALENDAR INTEGRATION
// ----------------------
document.addEventListener('DOMContentLoaded', function () {
  const calendarEl = document.getElementById('calendar');

  const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    editable: true,
    eventDrop: function(info) {
      const index = info.event.extendedProps.index;
      tasks[index].dueDate = info.event.start.toISOString().slice(0, 16);
      saveTasks();
      renderTasks();
    }
  });

  function loadEvents() {
    calendar.removeAllEvents();

    tasks.forEach((task, index) => {
      if (!applyFilters(task)) return;
      if (task.dueDate) {
        calendar.addEvent({
          title: task.title,
          start: task.dueDate,
          backgroundColor:
            task.priority === "High" ? "red" :
            task.priority === "Medium" ? "orange" :
            "green",
          extendedProps: { index }
        });
      }
    });
  }

  const originalRender = renderTasks;
  renderTasks = function() {
    originalRender();
    loadEvents();
  };

  loadEvents();
  calendar.render();
});

// ----------------------
// REMINDERS (15 MIN BEFORE)
// ----------------------
function checkReminders() {
  const now = new Date();

  tasks.forEach(task => {
    if (!task.dueDate || task.notified) return;

    const taskTime = new Date(task.dueDate);
    const diffMinutes = (taskTime - now) / 1000 / 60;

    if (diffMinutes <= 15 && diffMinutes > 0) {
      alert(`Reminder: "${task.title}" is due in ${Math.round(diffMinutes)} minutes!`);
      console.log(`Simulated email: Task "${task.title}" is due soon.`);
      task.notified = true;
      saveTasks();
    }
  });
}

setInterval(checkReminders, 60000);

// ----------------------
// UPDATE ON FILTER CHANGE
// ----------------------
document.querySelectorAll("#filters input, #filters select").forEach(el => {
  el.addEventListener("input", () => {
    renderTasks();
  });
});

function togglePopup() {
  const popup = document.getElementById("popup");
  if (popup.style.display === "none" || popup.style.display === "") {
    popup.style.display = "block";
  } else {
    popup.style.display = "none";
  }
}

function toggleArchivePopup() {
  const archivePopup = document.getElementById("archivePopup");
  if (
    archivePopup.style.display === "none" ||
    archivePopup.style.display === ""
  ) {
    archivePopup.style.display = "block";
  } else {
    archivePopup.style.display = "none";
  }

  viewArchivePopup();
}

function addTask() {
  const taskTitleInput = document.getElementById("taskname").value;
  const taskDescriptionInput = document.getElementById("taskdescription").value;

  if (taskTitleInput.trim() === "") {
    alert("Task name cannot be empty.");
    return;
  }

  const newTask = {
    id: todoList.length + 1,
    taskTitle: taskTitleInput,
    taskDescription: taskDescriptionInput,
    complete: false,
    archive: false,
  };

  todoList.push(newTask);

  document.getElementById("taskname").value = "";
  document.getElementById("taskdescription").value = "";

  togglePopup();
  renderTodoList();
}

let todoList = [
  {
    id: 1,
    taskTitle: "Sample Task ",
    taskDescription: " Sample Description for Task ",
    complete: false,
    archive: false,
  },
];

renderTodoList();

function deleteTaskById(taskId) {
  let taskIndex = todoList.findIndex((task) => task.id === taskId);

  if (taskIndex !== -1) {
    todoList.splice(taskIndex, 1);
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }

  renderTodoList();
}

function archiveById(taskId) {
  const taskToArchive = todoList.find((task) => task.id === taskId);

  if (taskToArchive) {
    taskToArchive.archive = true;
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }

  renderTodoList();
}

function restoreById(taskId) {
  const taskToArchive = todoList.find((task) => task.id === taskId);

  if (taskToArchive) {
    taskToArchive.archive = false;
  } else {
    console.log(`Task with ID ${taskId} not found.`);
  }

  toggleArchivePopup();
  renderTodoList();
}

function viewArchivePopup() {
  const htmlTemplate = `
   
    ${todoList
      .map((task) => {
        if (task.archive == true) {
          return `
            <div class="card">
              <div class="card-header">
                <input type="text" name="taskName" placeholder="Task name" value="${task.taskTitle}">
              </div>
              <input type="text" name="taskDescription" placeholder="Task description" value="${task.taskDescription}">
              <div class="card-footer ms-auto">
               
                <button onClick="restoreById(${task.id})" class="btn btn-alert text-light" type="submit">Restore</button>
              
              </div>
            </div>
          `;
        }
      })
      .join("")}
  `;

  const containerElement = document.querySelector(".archive");

  containerElement.innerHTML = htmlTemplate;
}

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", handleSearch);

function handleSearch() {
  const searchQuery = searchInput.value.toLowerCase();

  const filteredTasks = todoList.filter((task) => {
    const taskTitle = task.taskTitle.toLowerCase();
    return taskTitle.includes(searchQuery);
  });

  renderTodoList(filteredTasks);
}

function renderTodoList(tasks = todoList) {
  const htmlTemplate = `
      ${tasks
        .map((task) => {
          if (task.archive !== true) {
            return `
              <div class="card task-card-${task.id}">
                <div class="card-header">
                  <input type="text" name="taskName" placeholder="Task name" value="${task.taskTitle}">
                </div>
                <input type="text" name="taskDescription" placeholder="Task description" value="${task.taskDescription}">
                <div class="card-footer ms-auto">
                  <button onClick="doneById(${task.id})" class="btn btn-success text-light" type="submit">Done</button>
                  <button onClick="archiveById(${task.id})" class="btn btn-alert text-light" type="submit">Archive</button>
                  <button onClick="deleteTaskById(${task.id})" class="btn btn-danger text-light" type="submit">Delete</button>
                </div>
              </div>
            `;
          }
        })
        .join("")}
    `;

  const containerElement = document.querySelector(".container.task-body");

  containerElement.innerHTML = htmlTemplate;
}




function doneById(taskId) {
   
    const cardElement = document.querySelector(`.task-card-${taskId}`);
    if (cardElement) {
      cardElement.classList.add('bg-success'); 
    }
  }
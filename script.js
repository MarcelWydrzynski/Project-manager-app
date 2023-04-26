//Tasks and task Containers
const toBeDoneTaskList = document.querySelector(".to-be-done");
const taskConatiners = document.querySelectorAll(".task-list");
const toBeDoneConatiner = document.querySelector(".to-be-done");
const inProgressConatiner = document.querySelector(".in-progress");
const toBeTestedContainer = document.querySelector(".to-be-tested");
const completedContainer = document.querySelector(".completed");
const taskProgreesBtns = document.querySelectorAll(".task-progrees-btn");

//Task Creating form
const form = document.querySelector(".task-creator-form");
const formName = document.querySelector(".form-name");
const formCategory = document.querySelector(".form-category");
const formUser = document.querySelector(".form-user");
const formDeadline = document.querySelector(".form-deadline");
const formCreateTaskBtn = document.querySelector(".task-form-create-btn");

//Function to make tasks draggables
const tasksDraggable = () => {
  const tasks = document.querySelectorAll(".task");

  tasks.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });

    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });
  });

  taskConatiners.forEach((container) => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();

      const bottomTask = insertAboveTask(container, e.clientY);
      const curTask = document.querySelector(".is-dragging");

      if (!bottomTask) {
        container.appendChild(curTask);
      } else {
        container.insertBefore(curTask, bottomTask);
      }
    });
  });

  const insertAboveTask = (container, mouseY, curTask) => {
    const els = container.querySelectorAll(".task:not(.is-dragging)");

    let closestTask = null;
    let closestOffSet = Number.NEGATIVE_INFINITY;

    els.forEach((task) => {
      const { top } = task.getBoundingClientRect();
      const offset = mouseY - top;

      if (offset < 0 && offset > closestOffSet) {
        closestOffSet = offset;
        closestTask = task;
      }
    });

    return closestTask;
  };
};

//function for the task next stage button
const progressTaskFurther = (event) => {
  const ProgreesBtn = event.target;
  const parentContainer = ProgreesBtn.closest(".task-list");
  const parentTask = ProgreesBtn.closest(".task");

  if (parentContainer.classList.contains("to-be-done")) {
    parentContainer.removeChild(parentTask);
    inProgressConatiner.appendChild(parentTask);
  } else if (parentContainer.classList.contains("in-progress")) {
    toBeTestedContainer.appendChild(parentTask);
  } else if (parentContainer.classList.contains("to-be-tested")) {
    completedContainer.appendChild(parentTask);
  }
};

//panel Controls
const addTaskBtn = document.querySelector(".add-task-Btn");
addTaskBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

let id = 1;
let date;
let taskNumber = 1;

//form inputs
let selectedCategoryText;
let selectedUserText;

const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dateFormatted = `${year}-${month}-${day}`;

  date = dateFormatted;
};

const checkInputs = () => {
  const selectedCategory = formCategory.options[formCategory.selectedIndex];
  selectedCategoryText = selectedCategory.text;

  const selectedUser = formUser.options[formUser.selectedIndex];
  selectedUserText = selectedUser.text;
};

const createTask = () => {
  getCurrentDate();
  checkInputs();
  form.style.display = "flex";
  const newTask = document.createElement("div");
  newTask.classList.add("task");
  newTask.setAttribute("id", id);
  newTask.setAttribute("draggable", "true");
  newTask.innerHTML = `
    <h3 class="task-title">#${taskNumber} - ${formName.value}</h3>
    <p class="task-category">Project: <span>${selectedCategoryText}</span></p>
    <p class="task-user">Assigned to: <span>${selectedUserText}</span></p>
    <p class="task-date-created">Created: <span>${date}</span></p>
    <p class="task-deadline">Deadline: <span>${formDeadline.value}</span></p>
    <div class="task-btns">
      <button class="task-edit-btn">Edit</button>
      <button onclick="progressTaskFurther(event)" class="task-progrees-btn">Move to next stage</button>
    </div>
  </div>`;

  toBeDoneTaskList.appendChild(newTask);
  formCategory.selectedIndex = 0;
  formUser.selectedIndex = 0;

  form.style.display = "none";
  id++;
  taskNumber++;
  console.log(id);

  tasksDraggable();
};

formCreateTaskBtn.addEventListener("click", createTask);

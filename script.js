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
const formNameError = document.querySelector(".form-name-error");
const formCategory = document.querySelector(".form-category");
const formCategoryError = document.querySelector(".form-category-error");
const formUser = document.querySelector(".form-user");
const formUserError = document.querySelector(".form-user-error");
const formDeadline = document.querySelector(".form-deadline");
const formDeadlineError = document.querySelector(".form-deadline-error");
const formDescriptionTextArea = document.querySelector(
  ".form-description-textarea"
);
const formDescriptionError = document.querySelector(".form-description-error");
const formCreateTaskBtn = document.querySelector(".task-form-create-btn");
const formTaskError = document.querySelector(".form-task-error");

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

//function that moves the task to the next stage in app
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

//Sets id & date & and task number to null
let id = 0;
let date;
let taskNumber = 0;

//form inputs
let selectedCategoryText;
let selectedUserText;


// function to get today date
const getCurrentDate = () => {
  const currentDate = new Date();
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();
  const dateFormatted = `${year}-${month}-${day}`;

  date = dateFormatted;
};

//function that assigns select option to a variable
const checkSelectedIndex = () => {
  const selectedCategory = formCategory.options[formCategory.selectedIndex];
  selectedCategoryText = selectedCategory.text;

  const selectedUser = formUser.options[formUser.selectedIndex];
  selectedUserText = selectedUser.text;
};

//function that creates a div and adds it to app
const taskCreation = () => {
  getCurrentDate();
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


//Check inputs and create a new task
const CreateTask = () => {
  checkSelectedIndex();

  //check task name input
  if (formName.value == "") {
    formNameError.style.visibility = "visible";
    formNameError.innerHTML = "Task name cannot be empty!";
  } else if (formName.value.length >= 40) {
    formNameError.style.visibility = "visible";
    formNameError.innerHTML = "Task name cannot be longer then 40 characters!";
  } else {
    formNameError.style.visibility = "hidden";
  }

  //check task category
  if (selectedCategoryText == "Please choose a Category") {
    formUserError.style.visibility = "visible";
    formUserError.innerHTML = "A user must be chosen for this task!";
  } else {
    formUserError.style.visibility = "hidden";
  }

  //check task user
  if (selectedUserText == "Please choose a user") {
    formCategoryError.style.visibility = "visible";
    formCategoryError.innerHTML = "A category must be chosen for this task!";
  } else {
    formCategoryError.style.visibility = "hidden";
  }

  //check task deadline
  if (formDeadline.value == "") {
    formDeadlineError.style.visibility = "visible";
    formDeadlineError.innerHTML = "A date must be chosen for this task!";
  } else {
    formDeadlineError.style.visibility = "hidden";
  }

  //check task description
  if (formDescriptionTextArea.value == "") {
    formDescriptionError.style.visibility = "visible";
    formDescriptionError.innerHTML = "Task description cannot be empty!";
  } else {
    formDescriptionError.style.visibility = "hidden";
  }

  if (
    formNameError.style.visibility == "visible" ||
    formUserError.style.visibility == "visible" ||
    formCategoryError.style.visibility == "visible" ||
    formDeadlineError.style.visibility == "visible" ||
    formDescriptionError.style.visibility == "visible"
  ) {
    formTaskError.style.visibility = "visible";
  } else {
    formTaskError.style.visibility = "hidden";
    taskCreation();
    formName.value = "";
    formDeadline.value = "";
    selectedCategoryText = "Please choose a user";
    formDescriptionTextArea.value = "";
  }
};



formCreateTaskBtn.addEventListener("click", CreateTask);

const addTaskBtn = document.querySelector(".add-task-Btn");
addTaskBtn.addEventListener("click", () => {
  form.style.display = "flex";
});
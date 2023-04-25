//Task Containers
const toBeDoneTaskList = document.querySelector(".to-be-done");

//Task Creating form
const form = document.querySelector(".task-creator-form");
const formName = document.querySelector(".form-name");
const formCategory = document.querySelector(".form-category");
const formUser = document.querySelector(".form-user");
const formDeadline = document.querySelector(".form-deadline");

const formCreateTaskBtn = document.querySelector(".task-form-create-btn");

//panel Controls
const addTaskBtn = document.querySelector(".add-task-Btn");

//comment section
const postCommentBtn = document.querySelector(".post-comment-btn");
const textArea = document.querySelector(".text-area");
const taskCommentContainer = document.querySelector(".task-comment-section");

addTaskBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

let id = 5;
let date;

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
  newTask.innerHTML = `
    <h3 class="task-title">#01 ${formName.value}</h3>
    <p class="task-category">Project: <span>${selectedCategoryText}</span></p>
    <p class="task-user">Assigned to: <span>${selectedUserText}</span></p>
    <p class="task-date-created">Created: <span>${date}</span></p>
    <p class="task-deadline">Deadline: <span>${formDeadline.value}</span></p>
    <div class="task-btns">
      <button class="task-edit-btn">Edit</button>
      <button class="task-progrees-btn">Started</button>
    </div>
  </div>`;

  toBeDoneTaskList.appendChild(newTask);
  formCategory.selectedIndex = 0;
  formUser.selectedIndex = 0;

  form.style.display = "none";
  id++;
  console.log(id);

  editTask();
};

formCreateTaskBtn.addEventListener("click", createTask);

const editTask = () => {
  const taskEditBtn = document.querySelectorAll(".task-edit-btn");

  taskEditBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      const clickedTask = btn.closest(".task");
      clickedTask.style.color = "red";
      console.log("click");
    });
  });
};

editTask();

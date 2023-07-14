//Tasks and task Containers
const toBeDoneTaskList = document.querySelector(".to-be-done");
const inProgressConatiner = document.querySelector(".in-progress");
const toBeTestedContainer = document.querySelector(".to-be-tested");
const completedContainer = document.querySelector(".completed");

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
const FormCancelBtn = document.querySelector(".task-form-close-btn");
const formTaskError = document.querySelector(".form-task-error");

//Sets id & date & and task number to null
let id = 1;
let date;
let taskNumber = 1;

//form inputs
let selectedCategoryText;
let selectedUserText;

//function that moves the task to the next stage in app
const progressTaskFurther = (event) => {
  const ProgreesBtn = event.target;
  const parentContainer = ProgreesBtn.closest(".task-list");
  const currentTask = ProgreesBtn.closest(".task");

  if (parentContainer.classList.contains("to-be-done")) {
    parentContainer.removeChild(currentTask);
    inProgressConatiner.appendChild(currentTask);
  } else if (parentContainer.classList.contains("in-progress")) {
    toBeTestedContainer.appendChild(currentTask);
  } else if (parentContainer.classList.contains("to-be-tested")) {
    completedContainer.appendChild(currentTask);
  }
};

////function that moves the task to the previous stage in app
const moveTaskBackward = (event) => {
  const ProgressBtn = event.target;
  const parentContainer = ProgressBtn.closest(".task-list");
  const currentTask = ProgressBtn.closest(".task");

  if (parentContainer.classList.contains("in-progress")) {
    parentContainer.removeChild(currentTask);
    toBeDoneTaskList.appendChild(currentTask);
  } else if (parentContainer.classList.contains("to-be-tested")) {
    inProgressConatiner.appendChild(currentTask);
  } else if (parentContainer.classList.contains("completed")) {
    toBeTestedContainer.appendChild(currentTask);
  }
};

//function to enable task editing
const editTask = (event) => {
  const editBtn = event.target;
  const currentTask = editBtn.closest(".task");
  currentTask.classList.add("task-active");
};

const hideTask = (event) => {
  const saveBtn = event.target;
  const currentTask = saveBtn.closest(".task");
  currentTask.classList.remove("task-active");
  const taskCommentError = currentTask.querySelector(".task-comment-error");
  taskCommentError.style.visibility = "hidden";
  const taskCommentTextArea = currentTask.querySelector(".comment-textarea");
  taskCommentTextArea.value = "";
};

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
  newTask.innerHTML = `
  <div class="task-details">
  <div class="task-text-details">
    <h3 class="task-title">#${taskNumber} - ${formName.value}</h3>
    <p class="task-category">Project: <span>${selectedCategoryText}</span></p>
    <p class="task-user">Assigned to: <span>${formUser.value}</span></p>
    <p class="task-date-created">Created: <span>${date}</span></p>
    <p class="task-deadline">Deadline: <span>${formDeadline.value}</span></p>
    <button onclick="deleteTask(event)" class="task-delete-btn"><i class="fa-solid fa-trash-can"></i></button>
  </div>
</div>
<div class="task-comments">
  <h3>Task comments</h3>
  <div class="comment-section">
    <textarea class="comment-textarea" name="" id="" cols="30" rows="5" placeholder="Type new comment here"></textarea>
    <ul class="comments-container">
      <li class="comment">
        <h4>
          Posted by <span>admin</span> on the day of <span>${date}</span>
        </h4>
        <p>${formDescriptionTextArea.value}</p>
      </li>
    </ul>
  </div>
</div>
<div class="task-btns">
              <button
              onclick="moveTaskBackward(event)"
              class="task-progrees-btn"
            > <i class="fa-solid fa-arrow-left"></i>
              <button onclick="editTask(event)" class="task-edit-btn">Add comment</button>
              <button onclick="hideTask(event)" class="task-save-btn">Save</button>
              <button onclick="postNewComment(event)" class="task-comment-btn">Post comment</button>
              <button
                onclick="progressTaskFurther(event)"
                class="task-progrees-btn"
              ><i class="fa-solid fa-arrow-right"></i>
              </button>
            </div>
<p class="task-comment-error">You cannot post an empty comment!</p>`;

  if (newTask.classList) toBeDoneTaskList.appendChild(newTask);
  form.style.display = "none";
  id++;
  taskNumber++;
};

//Check inputs and create a new task
const CreateTask = () => {
  checkSelectedIndex();

  //check task name input
  if (formName.value == "") {
    formNameError.style.visibility = "visible";
    formNameError.innerHTML = "Task name cannot be empty!";
  } else if (formName.value.length >= 55) {
    formNameError.style.visibility = "visible";
    formNameError.innerHTML = "Task name cannot be longer then 55 characters!";
  } else {
    formNameError.style.visibility = "hidden";
  }

  //check task category
  if (selectedUserText == "Please choose a user") {
    formUserError.style.visibility = "visible";
    formUserError.innerHTML = "A user must be chosen for this task!";
  } else {
    formUserError.style.visibility = "hidden";
  }

  //check task user
  if (selectedCategoryText == "Please choose a Category") {
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
  if (
    formDescriptionTextArea.value == "" ||
    formDescriptionTextArea.value == " "
  ) {
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
    formCategory.selectedIndex = 0;
    formUser.selectedIndex = 0;
    formDeadline.value = "";
    formDescriptionTextArea.value = "";
  }
};

//Function to create and add new comment to task
const postNewComment = (event) => {
  getCurrentDate();

  const commentBtn = event.target;
  const currentTask = commentBtn.closest(".task");

  const commentTextarea = currentTask.querySelector(".comment-textarea");
  const commentsContainer = currentTask.querySelector(".comments-container");
  const taskCommentError = currentTask.querySelector(".task-comment-error");

  if (commentTextarea.value == "") {
    taskCommentError.style.visibility = "visible";
  } else {
    taskCommentError.style.visibility = "hidden";
    const newComment = document.createElement("li");
    newComment.classList.add("comment");
    newComment.innerHTML = `
    <h4>Posted by <span>Admin</span> on the day of<span> ${date}</span>
    </h4>
    <p>${commentTextarea.value}</p>`;
    commentsContainer.prepend(newComment);
    commentTextarea.value = "";
  }

  return currentTask;
};

// Function that deletes the current task
const deleteTask = (event) => {
  const currentTask = event.target.closest(".task");
  currentTask.remove();
};

//Creates a new task
formCreateTaskBtn.addEventListener("click", CreateTask);

const addTaskBtn = document.querySelector(".add-task-Btn");
//Open form to create tasks
addTaskBtn.addEventListener("click", () => {
  form.style.display = "flex";
});

//close form to create tasks and clear inputs
FormCancelBtn.addEventListener("click", (event) => {
  formName.value = "";
  formCategory.selectedIndex = 0;
  formUser.selectedIndex = 0;
  formDeadline.value = "";
  formDescriptionTextArea.value = "";
  form.style.display = "none";
});

const createFormBtn = document.querySelector(".task-form-create-btn");
const toBeDoneTaskList = document.querySelector(".to-be-done");
const taskForm = document.querySelector(".task-creator-form");
const taskNameInput = document.querySelector(".task-form-name");

console.log(createFormBtn, toBeDoneTaskList);



const createTask = () => {
    let id = 0;
    const newTask = document.createElement('div')
    newTask.classList.add('task')
    newTask.innerHTML = `<div class="task" id="1">
    <h3 class="task-title">#01 ${taskNameInput.value}</h3>
    <p class="task-category">Project: <span>Grpahic design</span></p>
    <p class="task-user">Assigned to: <span>Marcel</span></p>
    <p class="task-date-created">Created: <span>21.03.2023</span></p>
    <p class="task-deadline">Deadline: <span>21.05.2023</span></p>
    <div class="task-btns">
      <button class="task-edit-btn">Edit</button>
      <button class="task-progrees-btn">Started</button>
    </div>
  </div>`
   
    toBeDoneTaskList.appendChild(newTask)
}

createFormBtn.addEventListener("click", () => {
  taskForm.style.display = "none";
  createTask()
});

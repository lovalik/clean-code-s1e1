const taskInput = document.querySelector(".todo-app__section-add-item_new-task");
const addButton = document.querySelector(".todo-app__section-add-item_button-add-item");
const incompleteTaskHolder = document.querySelector(".todo-app__section-unfinished-tasks_list");
const completedTasksHolder = document.querySelector(".todo-app__section-finished-tasks_list");

const deleteButtonsCollection = document.querySelectorAll(".todo-app__button-delete");
const editButtonsCollection = document.querySelectorAll(".todo-app__button-edit");
const checkboxButtonsCollection = document.querySelectorAll(".todo-app__input-checkbox");
  
function changeTaskState() {
  const listItem = event.currentTarget.parentElement;
  const label = listItem.getElementsByTagName("label")[0];

  if( event.currentTarget.checked === true ) {
    console.log("Complete Task...");
    listItem.classList.remove("todo-app__section-unfinished-tasks_list-task");
    listItem.classList.add("todo-app__section-finished-tasks_list-task");
    label.classList.add("completed");
    completedTasksHolder.append(listItem);
  } else {
    console.log("Incomplete Task...");
    listItem.classList.remove("todo-app__section-finished-tasks_list-task");
    listItem.classList.add("todo-app__section-unfinished-tasks_list-task");
    label.classList.remove("completed");
    incompleteTaskHolder.append(listItem);
  }
}

function createNewTaskElement(taskString) {
  const listItem = document.createElement("li");
  const checkBox = document.createElement("input");
  const label = document.createElement("label");
  const editInput = document.createElement("input");
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  listItem.className = "todo-app__section-unfinished-tasks_list-task vvvvvvvvv";

  label.innerText = taskString;
  label.className = "todo-app__task-label-not-edit-mode";

  checkBox.type = "checkbox";
  checkBox.className = "todo-app__input-checkbox";
  checkBox.addEventListener("click",changeTaskState);

  editInput.type = "text";
  editInput.className = "todo-app__task-input-not-edit-mode";

  editButton.innerText = "Edit";
  editButton.className = "todo-app__button-edit";
  editButton.addEventListener("click", editTask);

  deleteButton.className = "todo-app__button-delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButtonImg.className = "todo-app__button-delete_image";
  deleteButton.appendChild(deleteButtonImg);
  deleteButton.addEventListener("click", deleteTask);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
}

function addTask() {
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.append(listItem);
  // bindTaskEvents(listItem, taskCompleted);
  taskInput.value = "";
}

//Edit an existing task.

function editTask() {
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem = event.currentTarget.closest(".vvvvvvvvv");

  const label = listItem.getElementsByTagName("label")[0];
  const editInput = listItem.getElementsByTagName("input")[1];
  const editButton = listItem.querySelector(".todo-app__button-edit");

  if (label.classList.contains("todo-app__task-label-not-edit-mode")) {
    editButton.innerText = "Save";

    editInput.value = label.innerText;

    label.classList.remove("todo-app__task-label-not-edit-mode");
    editInput.classList.remove("todo-app__task-input-not-edit-mode");

    label.classList.add("todo-app__task-label-edit-mode");
    editInput.classList.add("todo-app__task-input-edit-mode");
  } else if(label.classList.contains("todo-app__task-label-edit-mode")){
    editButton.innerText = "Edit";

    label.innerHTML = editInput.value;

    label.classList.remove("todo-app__task-label-edit-mode");
    editInput.classList.remove("todo-app__task-input-edit-mode");

    label.classList.add("todo-app__task-label-not-edit-mode");
    editInput.classList.add("todo-app__task-input-not-edit-mode");
  }
}

//Delete task.
function deleteTask() {
  console.log("Delete Task...");
  const listItem = event.currentTarget.closest(".vvvvvvvvv");
  listItem.remove();
}

function ajaxRequest(){
  console.log("AJAX Request");
}

for (let button of deleteButtonsCollection) {
  button.addEventListener("click", deleteTask);
}
  
for (let button of editButtonsCollection) {
  button.addEventListener("click", editTask);
}
  
for (let button of checkboxButtonsCollection) {
  button.addEventListener("click", changeTaskState);
}

addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);

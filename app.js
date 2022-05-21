const taskInput = document.querySelector(".todo-app__new-task");
const addButton = document.querySelector(".section-add-item_button-aad-item");
const incompleteTaskHolder = document.querySelector(".section-unfinished-tasks_list");
const completedTasksHolder = document.querySelector(".section-finished-tasks_list");

const deleteButtonsCollection = document.querySelectorAll(".todo-app__button-delete");

for (let button of deleteButtonsCollection) {
    button.addEventListener("click", deleteTask);
}

function createNewTaskElement(taskString) {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");

    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    label.innerText = taskString;
    label.className = "todo-app__task";

    checkBox.type = "checkbox";
    checkBox.className = "checkbox";

    editInput.type = "text";
    editInput.className = "todo-app__task";

    editButton.innerText = "Edit";
    editButton.className = "todo-app__button-edit";

    deleteButton.className = "todo-app__button-delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);

    listItem.appendChild(checkBox);
    listItem.appendChild(label);
    label.appendChild(editInput);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    return listItem;
}



function addTask() {
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    const listItem = createNewTaskElement(taskInput.value);

    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.

function editTask() {
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");

    const listItem = this.parentNode;

    const editInput = listItem.querySelector("input-text");
    const label = listItem.querySelector("label");
    const editBtn = listItem.querySelector(".todo-app__button-edit");
    const containsClass = listItem.classList.contains("editMode");
    //If class of the parent is .editmode
    if (containsClass) {

        //switch to .editmode
        //label becomes the inputs value.
        label.innerText = editInput.value;
        editBtn.innerText = "Edit";
    } else {
        editInput.value=label.innerText;
        editBtn.innerText = "Save";
    }

    //toggle .editmode on the parent.
    listItem.classList.toggle("editMode");
};


//Delete task.
function deleteTask() {
    console.log("Delete Task...");
    alert("удаляем таск")

    const listItem = this.parentNode;
    const ul = listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);
}

function removeEventListenerFromButtonDelete() {
    event.currentTarget.removeEventListener("click", deleteTask());
    alert("удален обработчик")
}

//Mark task completed
function taskCompleted() {
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


var taskIncomplete=function(){
    console.log("Incomplete Task...");
//Mark task as incomplete.
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//The glue to hold it all together.


//Set the click handler to the addTask function.

// addButton.onclick=addTask;
addButton.addEventListener("click", addTask);
addButton.addEventListener("click", ajaxRequest);


function bindTaskEvents(taskListItem, checkBoxEventHandler) {
    console.log("bind list item events");
//select ListItems children
    var checkBox = taskListItem.querySelector(".checkbox");
    var editButton = taskListItem.querySelector(".todo-app__button-edit");
    var deleteButton = taskListItem.querySelector(".todo-app__button-delete");


    //Bind editTask to edit button.
    editButton.onclick=editTask;
    //Bind deleteTask to delete button.
    deleteButton.onclick = deleteTask;
    //Bind taskCompleted to checkBoxEventHandler.
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
//for each list item
for (var i=0; i<incompleteTaskHolder.children.length;i++){

    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
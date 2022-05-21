const taskInput = document.querySelector(".todo-app__new-task");
const addButton = document.querySelector(".section-add-item_button-add-item");
const incompleteTaskHolder = document.querySelector(".section-unfinished-tasks_list");
const completedTasksHolder = document.querySelector(".section-finished-tasks_list");

const deleteButtonsCollection = document.querySelectorAll(".todo-app__button-delete");
const editButtonsCollection = document.querySelectorAll(".todo-app__button-edit");

for (let button of deleteButtonsCollection) {
    button.addEventListener("click", deleteTask);
}

for (let button of editButtonsCollection) {
    button.addEventListener("click", editTask);
}




function createNewTaskElement(taskString) {

    const listItem = document.createElement("li");
    const checkBox = document.createElement("input");
    const label = document.createElement("label");
    const editInput = document.createElement("input");
    const editButton = document.createElement("button");

    const deleteButton = document.createElement("button");
    const deleteButtonImg = document.createElement("img");

    listItem.className = "section-unfinished-tasks_list-task";

    label.innerText = taskString;
    label.className = "task-label-not-edit-mode";

    checkBox.type = "checkbox";
    checkBox.className = "input-checkbox";

    editInput.type = "text";
    editInput.className = "task-input-not-edit-mode";

    editButton.innerText = "Edit";
    editButton.className = "todo-app__button-edit";
    editButton.addEventListener("click", editTask);

    deleteButton.className = "todo-app__button-delete";
    deleteButtonImg.src = "./remove.svg";
    deleteButton.appendChild(deleteButtonImg);
    deleteButton.addEventListener("click", deleteTask);

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

    incompleteTaskHolder.append(listItem);
    // bindTaskEvents(listItem, taskCompleted);

    taskInput.value = "";
}

//Edit an existing task.

function editTask() {
    // console.log("Edit Task...");
    // console.log("Change 'edit' to 'save'");


    const listItem = event.currentTarget.closest(".section-unfinished-tasks_list-task");
    console.log(`родитель____${listItem.className}`)    

    console.log(`label class_____${listItem.getElementsByTagName("label")[0].className}`)

    const label = listItem.getElementsByTagName("label")[0];
    const editInput = label.getElementsByTagName("input")[0];
    const editButton = listItem.querySelector(".todo-app__button-edit");
    // const containsClass = listItem.classList.contains("editMode");

    // if (!listItem.classList.contains("edit-mode")) {
        console.log(`_____${label.getElementsByTagName("input")[0].className}`)    
        console.log(`+++++${ editInput.className}`)    
    if (label.classList.contains("task-label-not-edit-mode")) {
        console.log(12)
        editButton.innerText = "Save";

        editInput.value = label.innerText;

        console.log("Лэйба не в режиме редактирования")
        console.log(`ИНПУТ___${editInput.value}`)
        console.log(`ЛЭЙБА___${label.innerText}`);

        label.classList.remove("task-label-not-edit-mode");
        editInput.classList.remove("task-input-not-edit-mode");

        label.classList.add("task-label-edit-mode");
        editInput.classList.add("task-input-edit-mode");

        

    } else if(label.classList.contains("task-label-edit-mode")){
        console.log(21)

        editButton.innerText = "Edit";

        label.innerHTML = editInput.value + editInput;
        console.log("Лэйба в режиме редактирования")
        console.log(`ИНПУТ___${editInput.value}`)
        console.log(`ЛЭЙБА___${label.innerText}`);


        label.classList.remove("task-label-edit-mode");
        editInput.classList.remove("task-input-edit-mode");

        label.classList.add("task-label-not-edit-mode");
        editInput.classList.add("task-input-not-edit-mode");

    }

};

//Delete task.
function deleteTask() {
    console.log("Delete Task...");
    const listItem = event.currentTarget.closest(".section-unfinished-tasks_list-task");
    listItem.remove();
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
// addButton.addEventListener("click", ajaxRequest);


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
    // bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}




//cycle over completedTasksHolder ul list items
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    // bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}




// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
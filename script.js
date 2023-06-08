// DRAG FUNCTION
function dragStart(event) {
  event.dataTransfer.setData("Text", event.target.id);
}
function allowDrop(event) {
  event.preventDefault();
}
// DROP FUNCTION
function drop(event) {
  if (event.target.id != "") {
    event.preventDefault();
    const data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
    // todo list
    if (event.target.id == "todo") {
      document
        .getElementById(data)
        .classList.remove("border-warning", "border-success");
      document.getElementById(data).classList.add("border-primary");
      document
        .getElementById(data)
        .getElementsByClassName("project-name")[0]
        .classList.remove("bg-warning", "bg-success");
      document
        .getElementById(data)
        .getElementsByClassName("project-name")[0]
        .classList.add("bg-primary");
    }
    // progress list
    if (event.target.id == "progress") {
      document
        .getElementById(data)
        .classList.remove("border-primary", "border-success");
      document.getElementById(data).classList.add("border-warning");
      document
        .getElementById(data)
        .getElementsByClassName("project-name")[0]
        .classList.remove("bg-primary", "bg-success");
      document
        .getElementById(data)
        .getElementsByClassName("project-name")[0]
        .classList.add("bg-warning");
    }
  }
}
// function to reset containers
function resetContainers() {
  // Clear the second container
  alert("About to clear the on going tasks!");
  const progressContainer = document.getElementById("progress");
  const blankProgress = `<h2>Tasks in progress:</h2>
  <div
    id="inprogresstarget1"
    ondragstart="dragStart(event)"
    draggable="true"
    class="list"
  >
  
    <p class="details">Details of Task 2</p>
    <p class="project-name">Project X</p>
  </div>`;
  progressContainer.innerHTML = blankProgress;

  // Reset the first container
  const todoContainer = document.getElementById("todo");
  const originalTodoContent = `
  <h2>Tasks to do:</h2>
          <div
            id="todotarget1"
            ondragstart="dragStart(event)"
            draggable="true"
            class="list"
          >
            <p class="details">Details of Task 1</p>
            <p class="project-name">Project X</p>
          </div>
          <div
            id="todotarget2"
            ondragstart="dragStart(event)"
            draggable="true"
            class="list"
          >
            <p class="details">Details of Task 1</p>
            <p class="project-name">Project X</p>
          </div>
          <div
            id="todotarget3"
            ondragstart="dragStart(event)"
            draggable="true"
            class="list"
          >
            <p class="details">Details of Task 1</p>
            <p class="project-name">Project X</p>
          </div>
    `;
  todoContainer.innerHTML = originalTodoContent;
}
// FUNCTION TO ADD NEW TASK
function addNewTask() {
  const taskDetailsInput = document.getElementById("taskDetails");
  const projectNameInput = document.getElementById("projectName");

  const taskDetails = taskDetailsInput.value;
  const projectName = projectNameInput.value;

  // Validate input
  if (taskDetails.trim() === "" || projectName.trim() === "") {
    alert("Please enter both task details and project name.");
    return;
  }

  // Clear input fields
  taskDetailsInput.value = "";
  projectNameInput.value = "";

  const containerId = "todo"; // Specify the container ID where the new task will be added

  // Create the new task element
  const container = document.getElementById(containerId);

  const newTask = document.createElement("div");
  newTask.setAttribute(
    "id",
    containerId + "target" + (container.children.length + 1)
  );
  newTask.setAttribute("draggable", "true");
  newTask.setAttribute("class", "list");
  newTask.setAttribute("ondragstart", "dragStart(event)");

  // Create the card body
  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body px-3 py-3");

  // Create the task details
  const taskDetailsElement = document.createElement("div");
  taskDetailsElement.setAttribute("class", "details");
  taskDetailsElement.textContent = taskDetails;

  // Create the project name
  const projectNameElement = document.createElement("div");
  projectNameElement.setAttribute("class", "project-name");
  projectNameElement.textContent = projectName;

  // Append the task details and project name to the card body
  cardBody.appendChild(taskDetailsElement);
  cardBody.appendChild(projectNameElement);

  // Append the card body to the new task element
  newTask.appendChild(cardBody);

  // Append the new task element to the container
  container.appendChild(newTask);
}

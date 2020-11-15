window.onload = startFunctions;

function startFunctions() {
    getLocalStorage();
}

/**
 * Fetches list of objects saved in localStorage
 */
function getLocalStorage() {
    const allTasksLS = localStorage.getItem("completed-tasks")
    const allTasks = JSON.parse(allTasksLS)
    if (localStorage.getItem("completed-tasks")) {
        for (each of allTasks) {
            createDocumentElements(each)
        }
    }
}

/**
 * Creates a div with list of object values and adds to page
 * @param {Object} object
 */
function createDocumentElements(object) {
    const container = document.querySelector("#container");
    const div = document.createElement("div");
    const ul = document.createElement("ul");

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Remove";
    deleteButton.setAttribute("class", "element-button delete-button");

    const completeButton = document.createElement("button");
    completeButton.innerHTML = "Complete";
    completeButton.setAttribute("class", "element-button complete-button");

    container.append(div);
    div.append(ul);
    div.append(deleteButton);
    div.append(completeButton);
    
    for (value of Object.values(object)) {
        if (value) {
            const li = document.createElement("li")
            li.innerHTML = value;
            ul.append(li)
        }
    }
}
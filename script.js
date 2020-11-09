window.onload = startFunctions;

function startFunctions() {
    setEventListeners();
    openAndCloseActivityInputs();
}

function setEventListeners() {
    const activityButton = document.querySelector("#new-activity-button"); 
    const submitButton = document.querySelector("#submit");

    activityButton.addEventListener("click", openAndCloseActivityInputs);
    submitButton.addEventListener("click", function() {
        getInputValues();
        openAndCloseActivityInputs();
    });
}

function openAndCloseActivityInputs() {
    const activityInputs = document.querySelector("#inputs");

    if (activityInputs.style.display == "none") {
        activityInputs.style.display = "unset";
    } else {
        activityInputs.style.display = "none"
    }

}

function getInputValues() {
    const inputs = document.querySelectorAll("input");
    const inputList = [];

    for (i = 0; i < inputs.length; i++) {
        inputList.push(inputs[i].value);
    }

    presentInputValues(inputList);
}

function presentInputValues(inputList) {
    const newDiv = document.createElement("div");
    const uniqueId = Date.now();
    newDiv.setAttribute("id", uniqueId);
    console.log(inputList.value)

    const inputUl = document.createElement("ul");
    for (i = 0; i < inputList.length; i++) {
        if (inputList[i].length >= 1) {
            console.log("input" + inputList[i])
            const li = document.createElement("li");
            li.innerHTML = inputList[i];
            inputUl.appendChild(li);
        }
    }
    newDiv.appendChild(inputUl)
    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove-button")
    removeButton.innerHTML = "Remove activity"

    newDiv.appendChild(removeButton)

    const inputContainer = document.querySelector("#activity-container");
    inputContainer.appendChild(newDiv)

    removeButton.addEventListener("click", removeActivity, removeButton)
}

function removeActivity(button) {
    button.path[2].removeChild(button.path[1]);
}
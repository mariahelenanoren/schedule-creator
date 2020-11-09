window.onload = startFunctions;

function startFunctions() {
    setEventListeners();
}

function setEventListeners() {
    const activityButton = document.querySelector("#new-activity-button"); 
    const submitButton = document.querySelector("#submit");
    
    activityButton.addEventListener("click", openActivityInputs);
    submitButton.addEventListener("click", getInputValues);
}

function openActivityInputs() {
    const activityInputs = document.querySelector("#inputs");

    activityInputs.style.display = "unset";
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
    console.log(inputList);
}
/*
Contains js code for validating the modal form.
just a default check that enable the user to enter  only numerice value .
uses bootstrap class is-valid/is-invalid ,dynamically adding to the inputs.
-------------------------
validation triggers only on clicking submit button inside the modal.
All validation function contains a flag which is set to FALSE on encountering a invalid input , making the whole form
validity FALSE.

function category:
------------------------
Primary:triggered for handling the main event
Secondary:fn to help primary and to render elements in the dom.
Helper: functions  created for doing the repetative task
*/

// Helper:add validation class to input
const addFormClass = (element, valid = true) => {
  if (valid) {
    element.classList += " is-valid";
    element.classList.remove("is-invalid");
    return;
  }
  element.classList += " is-invalid";
  element.classList.remove("is-valid");
  return;
};
//Helper:remove all validation classes from the given element
const removeClasses = (element) => {
  element.classList.remove("is-valid");
  element.classList.remove("is-invalid");
  return;
};
//Secondary:return overall form validation status
const defaultCheck = () => {
  if (validateText() & validateSelect() & validateTimeDate()) return true;
  return false;
};
//Helper:reset the form (uses other helper fn)
const resetForm = () => {
  const form = document.getElementById("vitalForm");
  const inputs = document.querySelectorAll("input[type=text]");
  inputs.forEach((x) => removeClasses(x));
  const inputDate = document.querySelector("input[type=date]");
  const inputTime = document.querySelector("input[type=time]");
  removeClasses(inputDate);
  removeClasses(inputTime);
  const select = document.querySelectorAll("select");
  select.forEach((x) => removeClasses(x));
  form.reset();
};
// Primary:formHandler that process the form on clicking submit
// just return an alert specifying validation status
const formHandler = (event) => {
  event.preventDefault();
  let flag = defaultCheck();
  if (flag) {
    alert("Form Submitted");
    resetForm();
  } else alert("Form not valid");
};
// secondary:populate select input with dummy options
const insertSelect = () => {
  const select = document.querySelectorAll("select");
  var option;
  for (const item of select) {
    for (let i = 1; i <= 10; i++) {
      option = document.createElement("option");
      option.setAttribute("value", i);
      option.textContent = i;
      item.appendChild(option);
    }
  }
};
// secondary:fn validate select input
// valid if the user select anything other than default/selected option
const validateSelect = () => {
  const select = document.querySelectorAll("select");
  let flag = true;
  for (const item of select) {
    if (item.selectedIndex == 0) {
      addFormClass(item, false);
      flag = false;
    } else {
      addFormClass(item);
    }
  }
  return flag;
};
//Secondary:fn  validate the date and time entered by the user
// basically checks for the length of the select date or time
//if empty length returns 0 else returns a value greater than 0
const validateTimeDate = () => {
  let timeFlag = true,
    dateFlag = true,
    flag = true;
  const inputDate = document.querySelector("input[type=date]");
  const inputTime = document.querySelector("input[type=time]");
  let value = inputDate.value;
  value = value.split("-");
  time = inputTime.value;
  time = time.split(":");
  if (value.length > 1) {
    addFormClass(inputDate);
  } else {
    addFormClass(inputDate, false);
    dateFlag = false;
  }

  if (time.length > 1) {
    addFormClass(inputTime);
  } else {
    addFormClass(inputTime, false);
    timeFlag = false;
  }
  flag = dateFlag & timeFlag;
  flag = Boolean(flag);
  return flag;
};
// validate the text inputs for numeric values only
// use Regular expression
const validateText = () => {
  const exp = new RegExp("^[0-9]*$");
  let flag = true;
  const inputs = document.querySelectorAll("input[type=text]");
  for (const element of inputs) {
    if (exp.test(element.value) & (element.value != "")) {
      addFormClass(element);
    } else {
      addFormClass(element, false);
      flag = false;
    }
  }
  return flag;
};

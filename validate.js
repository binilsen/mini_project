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
//Helper:reset the form (uses other helper fn)
const resetForm = (formName) => {
  const form = document.getElementById(formName);
  const inputs = document.querySelectorAll("input[type=text]");
  const select = document.querySelectorAll("select");
  const inputDate = document.querySelector(" input[type=date]");
  const inputTime = document.querySelector("input[type=time]");
  inputs.forEach((x) => removeClasses(x));
  removeClasses(inputDate);
  removeClasses(inputTime);
  select.forEach((x) => removeClasses(x));
  form.reset();
};
// Primary:formHandler that process the form on clicking submit
// just return an alert specifying validation status
function formHandler(event) {
  event.preventDefault();
  const inputs = document.querySelectorAll("input[type=text]");
  const select = document.querySelectorAll("select");
  const inputDate = document.querySelector("input[type=date]");
  const inputTime = document.querySelector("input[type=time]");
  let inputFlag = true,
    selectFlag = true, // flags denoting different types of inputs
    dateFlag = true,
    timeFlag = true;
  // checking validity of different inputs
  dateFlag = validateTimeDate(inputDate, false);
  inputs.forEach((x) => {
    inputFlag = validateText(x) && inputFlag;
  });
  select.forEach((x) => {
    selectFlag = validateSelect(x) && selectFlag;
  });
  timeFlag = validateTimeDate(inputTime);
  //overall form validity
  let formValidity = dateFlag && inputFlag && selectFlag && timeFlag;
  if (formValidity) {
    setTimeout(() => {
      alert("Form Submitted"); // alert user on successful submission and reset form
      resetForm(form);
    }, 500);
  }
}
// Helper:populate select input with dummy options
const insertSelect = (main = true) => {
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
// Helper:fn validate select input
// valid if the user select anything other than default/selected option
const validateSelect = (element) => {
  if (element.selectedIndex >= 1) {
    addFormClass(element);
    return true;
  }
  addFormClass(element, false);
  return false;
};
/*Helper:fn  validate the date and time entered by the user
 basically checks for the length of the select date or time
if empty length returns 0 else returns a value greater than 0
*/
const validateTimeDate = (element, time = true) => {
  let value = element.value;
  if (!time) value = value.split("-");
  else value = value.split(":");
  if (value.length > 1) {
    addFormClass(element);
    return true;
  }
  addFormClass(element, false);
  return false;
};
/* Helper:validate the text inputs for numeric values and length of input
 use Regular expression
 */
const validateText = (element) => {
  const exp = new RegExp("^[0-9]*$");
  if (element.value.length > 0 && exp.test(element.value)) {
    addFormClass(element);
    return true;
  }
  addFormClass(element, false);
  return false;
};

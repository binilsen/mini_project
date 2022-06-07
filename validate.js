const form = document.getElementById("vitalForm");
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
const removeClasses = (element) => {
  element.classList.remove("is-valid");
  element.classList.remove("is-invalid");
  return;
};
const defaultCheck = () => {
  if (validateText() & validateSelect() & validateTimeDate()) return true;
  return false;
};
const resetForm = (form) => {
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

const formHandler = (event) => {
  event.preventDefault();
  let flag = defaultCheck();

  if (flag) {
    alert("Form Submitted");
    resetForm(form);
    return;
  } else alert("Form not valid");
};

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
insertSelect();
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

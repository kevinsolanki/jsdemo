function currentTime() {
  //to get small formated time
  const date = new Date();
  const dt = date.getDate();
  const mt = date.getMonth();
  const yr = date.getFullYear();
  let hh = date.getHours();
  let mm = date.getMinutes();
  let ss = date.getSeconds();
  let session = "AM";

  if (hh == 0) {
    hh = 12;
  }
  if (hh > 12) {
    hh = hh - 12;
    session = "PM";
  }

  hh = hh < 10 ? "0" + hh : hh;
  mm = mm < 10 ? "0" + mm : mm;
  ss = ss < 10 ? "0" + ss : ss;

  return (
    hh +
    ":" +
    mm +
    ":" +
    ss +
    " " +
    session +
    " " +
    dt +
    "/" +
    (mt + 1) +
    "/" +
    yr
  );
}

function getById(id) {
  return document.getElementById(id);
}

function getValById(id) {
  return document.getElementById(id).value;
}

function insertDataAt(newRow, data, cell) {
  const ce = newRow.insertCell(cell);
  ce.innerHTML = data;
}

function onSubmitDisplay(state) {
  getById("submitForm").style.display = state;
  getById("resetForm").style.display = state;
}

function onUpdateDisplay(state) {
  getById("updateForm").style.display = state;
  getById("cancelForm").style.display = state;
}

function checkIfEmpty(arg) {
  return getValById(arg) == "" ? true : false;
}
function focusOn(arg) {
  getById(arg).focus();
}

let warning = "";
// let check = true;
let giveWarningTo = (message, element) => {
  warning = message;
  focusOn(element);
};

const setDropdown = (argName, argId, mainName) => {
  const option = argName;
  const element = document.createElement("option");
  element.textContent = option;
  element.value = argId;
  mainName.appendChild(element);
};

const getDropdownVal = (data, argName, argMain, argId) => {
  const id = data[argName];
  const obj = argMain.find((item) => item[argId] == id);
  return obj[argName];
};

const getMarkedCheckBox = () => {
  const markedCheckbox = document.getElementsByName("hobby");
  let hobbyString = "";
  for (var checkbox of markedCheckbox) {
    checkbox.checked
      ? (hobbyString += checkbox.value + "<br>")
      : (hobbyString += "");
  }
  return hobbyString;
};
const checkGender = (Entries) => {
  Entries.gender == "Male"
    ? (getById("male").checked = true)
    : (getById("female").checked = true);
};
const checkHobby = (Entries) => {
  const hobbyString = Entries.hobby;
  const hobbyArry = hobbyString.split("<br>");
  hobbyArry.pop();
  hobbyArry.forEach((element) => {
    getById(element).checked = true;
  });
};

const getMarkedGender = (formEntries) => {
  return (formEntries["gender"] = getById("male").checked
    ? getValById("male")
    : getValById("female"));
};

export {
  currentTime,
  getById,
  getValById,
  insertDataAt,
  onSubmitDisplay,
  onUpdateDisplay,
  checkIfEmpty,
  focusOn,
  giveWarningTo,
  warning,
  setDropdown,
  getDropdownVal,
  getMarkedCheckBox,
  checkGender,
  checkHobby,
  getMarkedGender,
};

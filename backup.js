import {
  currentTime,
  getById,
  getValById,
  insertDataAt,
  onSubmitDisplay,
  onUpdateDisplay,
  checkIfEmpty,
  giveWarningTo,
  warning,
  setDropdown,
  getDropdownVal,
  getMarkedCheckBox,
  checkGender,
  checkHobby,
  getMarkedGender,
} from "./modules/fun-mod.js";

const formData = [
  {
    name: "Kevin Solanki",
    email: "abc1@gmail.com",
    gender: "Male",
    hobby: "Reading<br>Travelling<br>",
    age: "21",
    state: 101,
    city: 1,
    time: currentTime(),
    index: 1,
  },
  {
    name: "Jhone Doe",
    email: "xyz1@Yahoo.com",
    gender: "Female",
    hobby: "Travelling<br>Sports<br>",
    age: "32",
    state: 102,
    city: 3,
    time: currentTime(),
    index: 2,
  },
];

let indexCounter = 3;

const States = [
  { stateId: 101, state: "Gujarat" },
  { stateId: 102, state: "Maharashtra" },
  { stateId: 103, state: "Uttarpradesh" },
];

const Cities = [
  { cityId: 1, stateId: 101, city: "Surat" },
  { cityId: 2, stateId: 101, city: "Ahemdabad" },
  { cityId: 3, stateId: 102, city: "Mumbai" },
  { cityId: 4, stateId: 102, city: "Pune" },
  { cityId: 5, stateId: 103, city: "Kanpur" },
  { cityId: 6, stateId: 103, city: "Noida" },
];

const selectState = getById("state");
States.forEach((states) => {
  setDropdown(states.state, states.stateId, selectState);
});

const setCities = () => {
  const selectCity = getById("city");
  selectCity.options.length = 1;

  Cities.forEach((cities) => {
    if (selectState.value == cities.stateId) {
      setDropdown(cities.city, cities.cityId, selectCity);
    }
  });
};

onSubmitDisplay("");
onUpdateDisplay("none");

let check = false;
const validateForm = () => {
  const age = +getValById("age");

  switch (true) {
    case checkIfEmpty("name"):
      giveWarningTo("Name cant be empty", "name");
      check = false;
      break;
    case /\d/.test(getValById("name")):
      giveWarningTo("Name cant contain any numbers", "name");
      check = false;
      break;
    case checkIfEmpty("email") || !/^\S+@\S+\.\S+$/.test(getValById("email")):
      giveWarningTo("Email is not in valid formate", "email");
      check = false;
      break;
    case !(age > 1 && age < 100):
      giveWarningTo("Age is not valid", "age");
      check = false;
      break;
    case checkIfEmpty("state"):
      giveWarningTo("State not selected", "state");
      check = false;
      break;
    case checkIfEmpty("city"):
      giveWarningTo("City not selected", "city");
      check = false;
      break;
    default:
      check = true;
      break;
  }
  getById("warn").innerHTML = warning;
  return check;
};

const saveToFormData = (formEntries) => {
  const tempFields = ["city", "state", "age", "email", "name"];
  console.log("formEntries :>> ", formEntries);
  tempFields.forEach((element) => {
    console.log("element :>> ", element);
    formEntries[element] = getValById(element);
  });

  getMarkedGender(formEntries);

  formEntries["hobby"] = getMarkedCheckBox();
  formEntries["time"] = currentTime();
};

const saveData = () => {
  if (validateForm()) {
    const formEntries = {};
    formEntries["index"] = indexCounter;
    indexCounter++;

    saveToFormData(formEntries);
    formData.push(formEntries);
    displayData(formData);

    resetForm();
  }
};

const table = getById("myTable");

const displayData = (mainArray) => {
  const rowCount = table.rows.length;
  for (let i = rowCount - 1; i > 0; i--) {
    table.deleteRow(i);
  }
  mainArray.forEach((data) => {
    const newRow = table.insertRow(table.length);
    const fields = ["index", "name", "email", "gender", "hobby", "age"];
    fields.forEach((element, index) => {
      insertDataAt(newRow, data[element], index);
    });
    insertDataAt(newRow, getDropdownVal(data, "state", States, "stateId"), 6);
    insertDataAt(newRow, getDropdownVal(data, "city", Cities, "cityId"), 7);
    insertDataAt(newRow, data.time, 8);
    insertDataAt(
      newRow,
      '<button class="btn btn-danger btn-lg" onclick="deleteData(this)">Delete</button>',
      9
    );
    insertDataAt(
      newRow,
      '<button class="btn btn-primary btn-lg" onclick="editData(this)">Edit</button>',
      10
    );
  });
};

displayData(formData);

const deleteData = (atr) => {
  const rowInd = atr.closest("tr");
  const id = rowInd.cells[0].innerHTML;
  const Entries = formData.find((item) => item.index == id);
  const indexObj = formData.indexOf(Entries);
  formData.splice(indexObj, 1);
  displayData(formData);

  onUpdateDisplay("none");
  cancel();
  resetForm();
};

let selectedRow;
const editData = (atr) => {
  getById("warn").innerHTML = "";
  resetForm();
  onSubmitDisplay("none");
  onUpdateDisplay("");
  selectedRow = atr.closest("tr");
  const id = selectedRow.cells[0].innerHTML;
  const Entries = formData.find((item) => item.index == id);

  const tempFields = ["name", "email", "age", "state", "city"];
  tempFields.forEach((element) => {
    getById(element).value = Entries[element];
  });
  setCities();
  getById("city").value = Entries.city;
  checkGender(Entries);
  checkHobby(Entries);

  return selectedRow;
};

const updateData = () => {
  if (validateForm()) {
    const id = selectedRow.cells[0].innerHTML;
    const Entries = formData.find((item) => item.index == id);
    saveToFormData(Entries);

    displayData(formData);
    resetForm();

    onSubmitDisplay("");
    onUpdateDisplay("none");
  }
};

function resetForm() {
  getById("warn").innerHTML = "";
  const resetBtn = getById("mainForm");
  resetBtn.reset();
}

const cancel = () => {
  onSubmitDisplay("");
  onUpdateDisplay("none");
  resetForm();
};

const searchData = () => {
  const inputText = getById("myInput");
  const filteredArray = [];
  const filter = inputText.value.toUpperCase();
  formData.filter((input) => {
    const td = input.name.toUpperCase();
    if (td.startsWith(filter)) {
      filteredArray.push(input);
    }
  });
  displayData(filteredArray);
};

const sortData = () => {
  formData.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();
    return nameA > nameB ? -1 : nameA < nameB ? 1 : 0;
  });

  const val = getValById("sort");
  val == "asc" ? displayData(formData.reverse()) : displayData(formData);
};


window.setCities = setCities;
window.deleteData = deleteData;
window.saveData = saveData;
window.editData = editData;
window.updateData = updateData;
window.searchData = searchData;
window.sortData = sortData;
window.cancel = cancel;
// this is changes
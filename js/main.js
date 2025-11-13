
let students = JSON.parse(localStorage.getItem("students") || "[]");
localStorage.setItem("students", JSON.stringify(students));

let tbody = document.getElementById("tbody");
let addBtn = document.getElementById("add-btn");
let outerModal = document.getElementById("outer-modal");
let innerModal = document.getElementById("inner-modal");
let btn = document.getElementById("btn");
let searchInput = document.getElementById("search-input");
let selectAddress = document.getElementById("select-address");
let selectPosition = document.getElementById("select-position");
let closeModal = document.getElementById("close-modal");
let selected = null;

function showStudents(content, data) {
  content.innerHTML = "";
  data.forEach((el, index) => {
    content.innerHTML += `
          <tr class="hover:bg-gray-100 transition">
            <td class="px-6 py-4 font-semibold">${index + 1}</td>
            <td class="px-6 py-4">${el.FirstName}</td>
            <td class="px-6 py-4">${el.LastName}</td>
            <td class="px-6 py-4">${el.Address}</td>
            <td class="px-6 py-4">${el.Birthday}</td>
            <td class="px-6 py-4">${el.Position}</td>
            <td class="px-6 py-4">${el.PositionType}</td>
            <td class="px-6 py-4 text-green-600 font-semibold">${el.Salary}$</td>
            <td class="px-6 py-4">${el.IsMarried ? "Yes" : "No"}</td>
            <td class="px-6 py-4 flex gap-2">
              <button onclick="editStudent(${el.id})" class="bg-black hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs font-semibold">Edit</button>
              <button onclick="deleteStudent(${el.id})" class="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-xs font-semibold">Delete</button>
            </td>
          </tr>`;
  });
}

showStudents(tbody, students);

addBtn.onclick = () => {
  selected = null;
  btn.textContent = "Add";
  outerModal.classList.remove("hidden");
  innerModal.reset();
};

closeModal.onclick = () => {
  outerModal.classList.add("hidden");
  innerModal.reset();
};

innerModal.onclick = (e) => e.stopPropagation();
outerModal.onclick = () => outerModal.classList.add("hidden");

innerModal.onsubmit = (e) => {
  e.preventDefault();
  let data = e.target;
  let studentObj = {
    FirstName: data[0].value,
    LastName: data[1].value,
    Address: data[2].value,
    Birthday: data[3].value,
    Position: data[4].value,
    PositionType: data[5].value,
    Salary: data[6].value,
    IsMarried: data[7].checked,
    id: selected ? selected : Date.now(),
  };

  if (selected) {
    students = students.map((el) => (el.id === selected ? studentObj : el));
  } else {
    students.push(studentObj);
  }

  localStorage.setItem("students", JSON.stringify(students));
  showStudents(tbody, students);
  outerModal.classList.add("hidden");
  innerModal.reset();
};

function deleteStudent(id) {
  students = students.filter((el) => el.id !== id);
  localStorage.setItem("students", JSON.stringify(students));
  showStudents(tbody, students);
}

function editStudent(id) {
  selected = id;
  let student = students.find((el) => el.id === id);
  outerModal.classList.remove("hidden");
  btn.textContent = "Edit Student";
  let inputs = innerModal.elements;
  inputs[0].value = student.FirstName;
  inputs[1].value = student.LastName;
  inputs[2].value = student.Address;
  inputs[3].value = student.Birthday;
  inputs[4].value = student.Position;
  inputs[5].value = student.PositionType;
  inputs[6].value = student.Salary;
  inputs[7].checked = student.IsMarried;
}


searchInput.oninput = (e) => {
  let value = e.target.value.toLowerCase();
  let filtered = students.filter((el) =>
    el.FirstName.toLowerCase().includes(value) ||
    el.LastName.toLowerCase().includes(value)
  );
  showStudents(tbody, filtered);
};


selectAddress.onchange = () => {
  let value = selectAddress.value;
  let filtered = value ? students.filter((el) => el.Address === value) : students;
  showStudents(tbody, filtered);
};

selectPosition.onchange = () => {
  let value = selectPosition.value;
  let filtered = value ? students.filter((el) => el.PositionType === value) : students;
  showStudents(tbody, filtered);
};
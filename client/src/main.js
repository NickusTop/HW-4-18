import "./style.css";

const loadbtn = document.getElementById("get-students-btn");
const tableBody = document.querySelector(".students-tbody");
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const emailInput = document.getElementById("email");
const addbtn = document.querySelector(".add-button");
const idInputU = document.getElementById("id-u");
const nameInputU = document.getElementById("name-u");
const ageInputU = document.getElementById("age-u");
const emailInputU = document.getElementById("email-u");
const updatebtn = document.querySelector(".update-button");
const idInputD = document.getElementById("id-d");
const deletebtn = document.querySelector(".delete-button");


loadbtn.addEventListener("click", loadStudents);
addbtn.addEventListener("click", addStudent);
updatebtn.addEventListener("click", updateStudent);
deletebtn.addEventListener("click", deleteStudent);

fetch("http://localhost:3000/students");

function clearInputs() {
  nameInput.value = "";
  ageInput.value = "";
  emailInput.value = "";
  idInputU.value = "";
  nameInputU.value = "";
  ageInputU.value = "";
  emailInputU.value = "";
  idInputD.value = "";
}

function loadStudents() {
  fetch("http://localhost:3000/students")
    .then((response) => response.json())
    .then((data) => {
      tableBody.innerHTML = "";
      data.forEach((student) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td> 
        <td>${student.email}</td>
    `;
        tableBody.appendChild(row);
      });
    })
    .catch((error) => console.error("Помилка СТУДЕНТІВ!:", error));
}

function addStudent(event) {
  event.preventDefault();
  const student = {
    name: nameInput.value,
    age: ageInput.value,
    email: emailInput.value,
  };

  fetch("http://localhost:3000/students", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      loadStudents();
      clearInputs();
    })
    .catch((error) => console.error("Помилка СТУДЕНТІВ!", error));
}

function updateStudent(event) {
  event.preventDefault();
  const studentId = idInputU.value;
  const updatedStudent = {};

  if (nameInputU.value) updatedStudent.name = nameInputU.value;
  if (ageInputU.value) updatedStudent.age = ageInputU.value;
  if (emailInputU.value) updatedStudent.email = emailInputU.value;

  fetch(`http://localhost:3000/students/${studentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedStudent),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      loadStudents();
      clearInputs();
    })
    .catch((error) => console.error("Помилка СТУДЕНТІВ!", error));
}

function deleteStudent(event) {
  event.preventDefault();
  const studentId = idInputD.value;

  fetch(`http://localhost:3000/students/${studentId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      loadStudents();
      clearInputs();
    })
    .catch((error) => console.error("Помилка СТУДЕНТІВ!!", error));
}

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

async function loadStudents() {
  try {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();
    const markup = data
      .map(
        (student) => `
        <tr>
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.email}</td>
        </tr>
      `
      )
      .join("");
    tableBody.innerHTML = markup;
  } catch (error) {
    console.error("Помилка СТУДЕНТІВ!:", error);
  }
}

async function addStudent(event) {
  event.preventDefault();
  const student = {
    name: nameInput.value,
    age: ageInput.value,
    email: emailInput.value,
  };

  try {
    const response = await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    });
    const data = await response.json();
    console.log(data);
    loadStudents();
    clearInputs();
  } catch (error) {
    console.error(error);
  }
}

async function updateStudent(event) {
  event.preventDefault();
  const studentId = idInputU.value;
  const updatedStudent = {};

  if (nameInputU.value) updatedStudent.name = nameInputU.value;
  if (ageInputU.value) updatedStudent.age = ageInputU.value;
  if (emailInputU.value) updatedStudent.email = emailInputU.value;

  try {
    const response = await fetch(
      `http://localhost:3000/students/${studentId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedStudent),
      }
    );
    const data = await response.json();
    console.log(data);
    loadStudents();
    clearInputs();
  } catch (error) {
    console.error(error);
  }
}

async function deleteStudent(event) {
  event.preventDefault();
  const studentId = idInputD.value;

  try {
    const response = await fetch(
      `http://localhost:3000/students/${studentId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    console.log(data);
    loadStudents();
    clearInputs();
  } catch (error) {
    console.error(error);
  }
}

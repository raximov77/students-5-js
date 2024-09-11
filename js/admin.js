let students = [];

document.addEventListener('DOMContentLoaded', function() {
    const storedStudents = localStorage.getItem('students');
    if (storedStudents) {
        students = JSON.parse(storedStudents);
        renderStudents();
    }
});

function updateProfileImage(event) {
const input = event.target;
if (input.files && input.files[0]) {
const reader = new FileReader();
reader.onload = function(e) {
    document.getElementById('profileImage').src = e.target.result;
};
reader.readAsDataURL(input.files[0]);
}
}

function saveToLocalStorage() {
    localStorage.setItem('students', JSON.stringify(students));
}

function openModal(index = -1) {
    document.getElementById('addStudentModal').classList.remove('hidden');
    if (index >= 0) {
        const student = students[index];
        document.getElementById('rowIndex').value = index;
        document.getElementById('name').value = student.name;
        document.getElementById('email').value = student.email;
        document.getElementById('phone').value = student.phone;
        document.getElementById('enrollNumber').value = student.enrollNumber;
        document.getElementById('dateAdmission').value = student.dateAdmission;
        document.getElementById('image').value = student.imageUrl;
    }
}

function closeModal() {
    document.getElementById('addStudentModal').classList.add('hidden');
    document.getElementById('studentForm').reset();
}

function openMoreModal(student) {
    document.getElementById('moreName').innerText = student.name;
    document.getElementById('moreEmail').innerText = student.email;
    document.getElementById('morePhone').innerText = student.phone;
    document.getElementById('moreEnrollNumber').innerText = student.enrollNumber;
    document.getElementById('moreDateAdmission').innerText = student.dateAdmission;
    document.getElementById('moreImage').src = student.imageUrl;
    document.getElementById('moreStudentModal').classList.remove('hidden');
}

function closeMoreModal() {
    document.getElementById('moreStudentModal').classList.add('hidden');
}

function addStudent(student) {
    students.push(student);
    saveToLocalStorage();
    renderStudents();
}

function updateStudent(index, student) {
    students[index] = student;
    saveToLocalStorage();
    renderStudents();
}

function deleteStudent(index) {
    students.splice(index, 1);
    saveToLocalStorage();
    renderStudents();
}

document.getElementById('studentForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const enrollNumber = document.getElementById('enrollNumber').value;
    const dateAdmission = document.getElementById('dateAdmission').value;
    const imageUrl = document.getElementById('image').value;
    const rowIndex = document.getElementById('rowIndex').value;

    const student = { name, email, phone, enrollNumber, dateAdmission, imageUrl };

    if (rowIndex === '') {
        addStudent(student);
    } else {
        updateStudent(rowIndex, student);
    }

    closeModal();
});

function renderStudents() {
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    students.forEach((student, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-50');
        row.innerHTML = `
            <td class="p-4 text-center"><img src="${student.imageUrl}" alt="Avatar" class="w-10 h-10 rounded-full"></td>
            <td class="p-4 text-center">${student.name}</td>
            <td class="p-4">${student.email}</td>
            <td class="p-4">${student.phone}</td>
            <td class="p-4">${student.enrollNumber}</td>
            <td class="p-4">${student.dateAdmission}</td>
            <td class="p-4 flex space-x-3">
                <button class="text-blue-500 hover:text-blue-600" onclick="openMoreModal(students[${index}])">
                  <img src="./images/three.svg" alt="Edit"></button>
                <button class="text-yellow-500 hover:text-yellow-600" onclick="openModal(${index})"><img src="./images/Vector.svg" alt="Edit"></button>
                <button class="text-red-500 hover:text-red-600" onclick="deleteStudent(${index})"><img src="./images/trash.svg" alt="Delete"></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}


document.getElementById('sortButton').addEventListener('click', function() {
    students.sort((a, b) => a.name.localeCompare(b.name));
    renderStudents();
});

document.getElementById('searchInput').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredStudents = students.filter(student => student.name.toLowerCase().includes(query));
    const tbody = document.querySelector('#studentTable tbody');
    tbody.innerHTML = '';
    filteredStudents.forEach((student, index) => {
        const row = document.createElement('tr');
        row.classList.add('border-b', 'hover:bg-gray-50');
        row.innerHTML = `
            <td class="p-4 text-center"><img src="${student.imageUrl}" alt="Avatar" class="w-10 h-10 rounded-full"></td>
            <td class="p-4 text-center">${student.name}</td>
            <td class="p-4">${student.email}</td>
            <td class="p-4">${student.phone}</td>
            <td class="p-4">${student.enrollNumber}</td>
            <td class="p-4">${student.dateAdmission}</td>
            <td class="p-4 flex space-x-3">
                <button class="text-blue-500 hover:text-blue-600" onclick="openMoreModal(students[${index}])">More</button>
                <button class="text-yellow-500 hover:text-yellow-600" onclick="openModal(${index})"><img src="./images/Vector.svg" alt="Edit"></button>
                <button class="text-red-500 hover:text-red-600" onclick="deleteStudent(${index})"><img src="./images/trash.svg" alt="Delete"></button>
            </td>
        `;
        tbody.appendChild(row);
    });
});
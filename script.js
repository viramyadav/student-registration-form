document.addEventListener('DOMContentLoaded', () => {
    const studentForm = document.getElementById('studentForm');
    const studentsTable = document.getElementById('studentsTable').getElementsByTagName('tbody')[0];

    let students = [];

    studentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const student = {
            id: Date.now(),
            name: studentForm.name.value,
            class: studentForm.class.value,
            address: studentForm.address.value,
            contact: studentForm.contact.value
        };

        students.push(student);
        renderStudents();

        studentForm.reset();
    });

    const renderStudents = () => {
        studentsTable.innerHTML = '';

        students.forEach(student => {
            const row = studentsTable.insertRow();
            row.dataset.id = student.id;

            row.insertCell(0).textContent = student.name;
            row.insertCell(1).textContent = student.class;
            row.insertCell(2).textContent = student.address;
            row.insertCell(3).textContent = student.contact;

            const actionsCell = row.insertCell(4);
            actionsCell.className = 'actions';
            actionsCell.innerHTML = `
                <button class="edit">Edit</button>
                <button class="delete">Delete</button>
            `;

            actionsCell.querySelector('.edit').addEventListener('click', () => editStudent(student.id));
            actionsCell.querySelector('.delete').addEventListener('click', () => deleteStudent(student.id));
        });
    };

    const editStudent = (id) => {
        const student = students.find(student => student.id === id);

        if (student) {
            studentForm.name.value = student.name;
            studentForm.class.value = student.class;
            studentForm.address.value = student.address;
            studentForm.contact.value = student.contact;

            deleteStudent(id);
        }
    };

    const deleteStudent = (id) => {
        students = students.filter(student => student.id !== id);
        renderStudents();
    };
});

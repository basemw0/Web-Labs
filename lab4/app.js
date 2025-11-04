const list = document.querySelector('.todolist');
const addButton = document.querySelector('.Add');
const completebutton = document.querySelector('.completed');
const Activebutton = document.querySelector('.Active');
const inputElement = document.querySelector('.inputform');
const Allbutton = document.querySelector('#All');

let toDoArray = [];

// Central render: filter can be 'all' | 'completed' | 'active'
function render(filter = 'all') {
    list.innerHTML = '';
    toDoArray.forEach((item) => {
        if (filter === 'completed' && !item.completed) return;
        if (filter === 'active' && item.completed) return;

        const divElement = document.createElement('div');
        divElement.className = 'todo-item';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = !!item.completed;
        checkbox.addEventListener('change', () => {
            const idx = toDoArray.findIndex((t) => t.id === item.id);
            if (idx > -1) {
                toDoArray[idx].completed = checkbox.checked;
                render(filter);
            }
        });

        const listElement = document.createElement('li');
        listElement.className = 'todo-text';
        listElement.textContent = item.input;
        if (item.completed) listElement.classList.add('completed');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => {
            const idx = toDoArray.findIndex((t) => t.id === item.id);
            if (idx > -1) {
                toDoArray.splice(idx, 1);
                render(filter);
            }
        });

        divElement.appendChild(checkbox);
        divElement.appendChild(listElement);
        divElement.appendChild(deleteButton);

        list.appendChild(divElement);
    });
}

function Add() {
    const input = inputElement.value.trim();
    if (!input) return; // ignore empty
    toDoArray.push({ id: Date.now(), input, completed: false });
    render('all');
    inputElement.value = '';
    inputElement.focus();
}

// add click + enter support
addButton.addEventListener('click', Add);
inputElement.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') Add();
});

Allbutton.addEventListener('click', () => render('all'));
completebutton.addEventListener('click', () => render('completed'));
Activebutton.addEventListener('click', () => render('active'));

// initial render (empty)
render('all');

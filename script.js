const todoList = JSON.parse(localStorage.getItem('todolist')) || [];

renderTodoList();

document.querySelector('.js-add-todo-button').addEventListener('click', addTodo );

document.querySelectorAll('.js-')

function addTodo() {
  const inputElement = document.querySelector('.js-input-name');
  let name = inputElement.value;
  const dateInputElement = document.querySelector('.js-due-date-input');
  let dueDate = dateInputElement.value;
  
  if(name === '') {
    return;
  }
  
  if(dueDate === '') {
    dueDate = getDate();
  }
  
  todoList.push({
    /*name: name,
    dueDate: dueDate*/
    name,
    dueDate
  });
  localStorage.setItem('todolist', JSON.stringify(todoList));

  inputElement.value = 'abc';
  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach(
    (todoObject, i) => {
      const {name, dueDate} = todoObject;
      todoListHTML += `
      <div class="todo">
        <div class="js-checkmark checkmark" data-index="${i}">
          <img src="unchecked-checkbox.png" alt="unchecked">
        </div>
        <div class="js-text-${i} text">${name}</div>
      </div>
      <div>${dueDate}</div>
      <button
      class="js-delete-todo-button delete-todo-button">
      Delete
      </button>
      `
    }
  )

  const todoElement = document.querySelector('.js-todo-list');
  todoElement.innerHTML = todoListHTML;

  document.querySelectorAll('.js-checkmark').forEach(
    (checkbox, index) => {
      checkbox.addEventListener(
        'click',
        () => {
          document.querySelector(`.js-text-${index}`).classList.toggle('text-line-through')
          if(document.querySelector(`.js-text-${index}`).classList.contains('text-line-through')) {
            checkbox.innerHTML = `<img src="checked-checkbox.png" alt="checked">`;
          } else {
            checkbox.innerHTML = `<img src="unchecked-checkbox.png" alt="unchecked">`;
          }
        }
      )
    }
  )

  document.querySelectorAll('.js-delete-todo-button').forEach(
    (deleteButton, index) => {
      deleteButton.addEventListener(
        'click',
        () => {
          removeFromTodo(index);
        }
      )
    }
  );
}

function removeFromTodo(i) {
  todoList.splice(i, 1);
  localStorage.setItem('todolist', JSON.stringify(todoList));
  renderTodoList();
}

function handleTodoInputKeydown(event) {
  if(event.key === 'Enter') {
    addTodo();
  }
}

function getDate() {
  let today = new Date();
  return today.getFullYear() + '-' + ('0' + (today.getMonth() + 1)).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
}
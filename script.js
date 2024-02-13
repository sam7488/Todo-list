const todoList = JSON.parse(localStorage.getItem('todolist')) || [];

renderTodoList();

document.querySelector('.js-add-todo-button').addEventListener('click', addTodo );

const checkbox = document.querySelectorAll('.js-checkbox');
checkbox.forEach(
  (checkItem) => {
    checkItem.addEventListener(
      'change', 
      () => {
        if(checkItem.checked) {

        }

      }
    )
  }
)

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

  inputElement.value = '';
  renderTodoList();
}

function renderTodoList() {
  let todoListHTML = '';
  todoList.forEach(
    (todoObject, i) => {
      const {name, dueDate} = todoObject;
      todoListHTML += `
      <label class="text" for="checkID-${i}">${name}</label></div>
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
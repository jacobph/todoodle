// utility fxn, not directly related the app
const getDate = function () {
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; // January is 0!
  const yyyy = today.getFullYear();

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }

  return `${mm}/${dd}/${yyyy}`;
};


var todo = {
  init() {
    const addTodo = function () {
      todo.makeNewTodo();
      todo.render();
    };
    // attach click handler to the add-todo button
    document.getElementById('input-todo')
        .addEventListener('keyup', (event) => {
          event.preventDefault();
          if (event.keyCode == 13) {
            addTodo();
          }
        });
    document.getElementById('add-todo').onclick = addTodo;

    // set an empty array to localstorage
    if (localStorage.getItem('doItLater') === null) {
      console.log('no todos found, make empty list');
      localStorage.setItem('doItLater', '[]');
    }
    // call render
    todo.render();
  },
  updateLocalStorage(arr) {
    localStorage.setItem('doItLater', JSON.stringify(arr));
  },
  retrieve() {
    return JSON.parse(localStorage.getItem('doItLater'));
  },
  makeNewTodo() {
    const currentList = this.retrieve();
    currentList.push({
      name: document.getElementById('input-todo').value,
      created: getDate(),
      completed: false,
      details: ''
    });
    this.updateLocalStorage(currentList);

    // clear input value
    document.getElementById('input-todo').value = '';
  },
  removeTodo(index) {
    const currentList = this.retrieve();
    if (index > -1) {
      currentList.splice(index, 1);
    } else {
      console.log('error removing todo, index less than 0');
    }
    this.updateLocalStorage(currentList);
    this.render();
  },
  render() {
    // get #todo-list, empty current contents
    const list = document.getElementById('todo-list');
    while (list.firstChild) {
      list.removeChild(list.firstChild);
    }

    // retrieve todos from localstorage
    const todos = this.retrieve();

    // render them to the DOM
    for (i = 0; i < todos.length; i++) {
      const div = document.createElement('div');
      div.appendChild(document.createTextNode(`${todos[i].name} (${todos[i].created})`));
      list.appendChild(div);
      div.classList.add('todo');

      // create a complete button and attach a click handler to it
      const checkbox = document.createElement('input');
      checkbox.appendChild(document.createTextNode('COMPLETE'));
      checkbox.classList.add('pull-right');
      checkbox.setAttribute('data-todo', i);
      checkbox.setAttribute('type', 'checkbox');

      div.appendChild(checkbox);
      checkbox.onclick = function () {
        const todoIndex = this.getAttribute('data-todo');
        todo.removeTodo(todoIndex);
      };
    }
  }
};

todo.init();


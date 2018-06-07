var todoList = {
  todos: [],
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },

  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },

  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },

  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },

  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    

    // Get number of completed todos.
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    

    // Case 1: If everything’s true, make everything false.
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    // Case 2: Otherwise, make everything true.
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }      
    }
  }
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },

  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },

  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },

  toggleCompleted: function(position) {
    todoList.toggleCompleted(position);
    view.displayTodos();
  },

  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  }  
};


var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var elem = document.createElement('del');
      var input = document.createElement('input');
      input.type = "checkbox";
      input.className = "checkbox"; 
      var todo = todoList.todos[i];
      
      if (todo.completed === true) {
        todoLi.textContent = todo.todoText+'        ';
        
        elem.appendChild(todoLi);
        todoLi.appendChild(input);
        todoLi.appendChild(this.DeleteTodosButton());
          todosUl.appendChild(elem);
      } else {
        todoLi.textContent = todo.todoText+'        ';
        todoLi.appendChild(input);        
        todoLi.appendChild(this.DeleteTodosButton());
          todosUl.appendChild(todoLi);
      }
      
	  todoLi.id = i;
     
    }
  },

  DeleteTodosButton: function(){
		var CreateDeleteButton = document.createElement('button');
		CreateDeleteButton.textContent = 'Delete';
		CreateDeleteButton.className = 'CreateDeleteButton';
		return CreateDeleteButton;
  },
  
	EventListener: function(){
		var TodoUl= document.querySelector('ul');
		TodoUl.addEventListener('click', function(event){
		var clicked = event.target;
		if(clicked.className==='CreateDeleteButton'){
			handlers.deleteTodo(parseInt(event.target.parentNode.id));
    }
 
});
  },
  CheckBox: function(){
    var checkbox = document.querySelector("input[name=checkbox]");

  checkbox.addEventListener( 'change', function(event) {
      if(CheckBox.checked) {
        handlers.toggleCompleted(parseInt(event.target.parentNode.id));
      } 
    }
  );
  }
};

 view.EventListener();
 view.CheckBox();


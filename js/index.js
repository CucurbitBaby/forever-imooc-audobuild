angular
.module('TodoList', [])
.controller('TodosController', ['$scope', function($scope) {
  $scope.setTodos = function(todos) {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  
  $scope.getTodos = function() {
    todos = localStorage.getItem('todos')
    if(todos) {
      todos = JSON.parse(todos)
    } else {
     todos = [] 
    }
    return todos
  }

  $scope.todos = $scope.getTodos();
}])
.controller('AddTodoController', ['$scope', function($scope) {
  $scope.newTodo = '';
  $scope.addTodo = function(newTodo) {
    if(!newTodo) {
      return
    }
    
    $scope.todos.push({
      name: newTodo
    })
    $scope.setTodos($scope.todos)
    $scope.newTodo = '';
  }
}])
.controller('TodoController', ['$scope', function($scope) {
  $scope.deleteTodo = function(deleteTodo) {
    _.remove($scope.todos, function(todo){
      return todo === deleteTodo
    })
    $scope.setTodos($scope.todos)
  }
}])

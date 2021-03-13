module.exports = ['$scope', ($scope) => {
  $scope.setTodos = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos))
  }
  
  $scope.getTodos = () => {
    let todos = localStorage.getItem('todos')
    console.log(todos)
    if(todos) {
      todos = JSON.parse(todos)
    } else {
     todos = [] 
    }
    return todos
  }
 
  $scope.todos = $scope.getTodos();
}]
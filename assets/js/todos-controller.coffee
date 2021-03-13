module.exports = [
    '$scope'
    ($scope) ->

        $scope.setTodos = (todos) ->
            localStorage.setItem 'todos', JSON.stringify(todos)
            return

        $scope.getTodos = ->
            todos = localStorage.getItem('todos')
            if todos
                todos = JSON.parse(todos)
            else
                todos = []
            todos

        $scope.todos = $scope.getTodos()
        return
]

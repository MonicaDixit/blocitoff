'use strict' ;
angular.module('blocitoffApp')
 .factory('TodoService' ,['$firebase', function($firebase){

    var ref = new Firebase('https://intense-heat-425.firebaseio.com/');

    var todolist = $firebase(ref).$asArray();

    return{

      getTasks : function(){
        angular.forEach(todolist, function(todo,id){
          var taskCreateDate= todo.date ;
          var then = moment(taskCreateDate);
          var now = moment();
          var days = now.diff(then, 'days');
          console.log(days);

          if (days > 7){
            todo.isActive = false;
          }
      });
      return todolist;
      },
 
      addTask : function(taskrow){
        todolist.$add(taskrow);
      },

      updateTask : function(todo){
        todolist.$save(todo); 
      },
    
      deleteTask : function(id) {
        todolist.$remove(id);
      }
  } 
}]);
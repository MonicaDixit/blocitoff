'use strict' ;
angular.module('blocitoffApp')
 .factory('TodoService' ,['$firebase', 'User', function($firebase){

    var ref = new Firebase('https://intense-heat-425.firebaseio.com/tasks');

    var todolist = $firebase(ref).$asArray();
    //var authData = ref.getAuth().uid;

   // var authData = user.uid;

    //console.log('authData' + authData);
    
    //$scope.user
    var itemList = ref.child("tasks").$asArray;

    return{

      getTasks : function(User){
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
        //var refUser = ref.child('users').child(userData.uid);
        //var refUser = ref.child('tasks');
          
          
          //ref.push(taskrow);
          //itemList.$add(taskrow);
       
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
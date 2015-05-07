'use strict';

/**
 * @ngdoc overview
 * @name blocitoffApp
 * @description
 * # blocitoffApp
 *
 * Main module of the application.
 */
var blocitoffApp = angular.module('blocitoffApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase',
    'firebase.utils',
    'simpleLogin',
    'ui.bootstrap'
  ]);

// blocitoffApp.constant('FIREBASE_URI' , 'https://intense-heat-425.firebaseio.com/');

 blocitoffApp.controller('Active.controller' , ['$scope', 'TodoService','User',
    function($scope,TodoService, User){


   

    $scope.title = "Current tasks";
    $scope.description = "Task Description";
    $scope.priorityLabel = "Priority" ;
    $scope.activeHeader = "Active Tasks";
    $scope.historyHeader = "Task History";
    $scope.inactiveHeader = "Expired Tasks";

    $scope.sortCurrentCategory = function(category){
      $scope.currentCategory = $scope.category;
    }


    $scope.sortCurrentPriority = function(priority){
      $scope.currentPriority = $scope.priority;
    }

    var now = moment().format("MM-DD-YYYY");
    console.log(now);

    $scope.createdate = now;
    
    $scope.todolist = TodoService.getTasks(User);
    console.log($scope.todolist);

    $scope.addTask = function(){

      var intPriority;
      var ref = new Firebase("https://intense-heat-425.firebaseio.com/");
      var authData = ref.getAuth().uid;
      console.log('User from app' + User);
      //var ref = new Firebase("https://intense-heat-425.firebaseio.com/tasks");

   console.log('authData' + authData);

        if ($scope.priority === 'High'){
          intPriority = 1;

        }

        else if ($scope.priority === 'Medium'){
          intPriority = 2;
        }

        else{
          intPriority = 3;
        }
        var newTaskRow = {
            user: authData,
            taskname:$scope.newtask, 
            priority:$scope.priority,
            date:now,
            isActive:true,
            intPriority : intPriority,
            category:$scope.category,
            isDone:false
        }

        TodoService.addTask(newTaskRow);

        $scope.newtask = " ";
        $scope.priority = " ";
        $scope.category = " ";
        
    };

    $scope.updateTask = function(todo){
        TodoService.updateTask(todo);
    };


    $scope.deleteTask = function(id){
        TodoService.deleteTask(id);
    };

    $scope.expireTask = function(){
        TodoService.expireTask();
    }

}]);

blocitoffApp.filter('todoFilter' , function($location){
  return function(input){
    var filtered = [];
    angular.forEach(input, function(todo,id){
      var path = $location.path();
      if(path === '/active'){
        if (!todo.isDone){
            filtered[id] = todo;
        }
      } else if(path ==='/history'){
          if(todo.isDone){
            filtered[id] = todo;
          }
      }
      else{
        filtered[id] = todo;
      }
    });

    return filtered;
  }

});


blocitoffApp.filter('sortedTasks' , function($location){
  return function(input){
    var expiredTasks = [];
    angular.forEach(input, function(todo,id){
    var taskCreateDate= todo.date ; 
    var then = moment(taskCreateDate); 
    var now = moment();
    var days = now.diff(then, 'days');
    console.log(days);
    if (days > 7){
          expiredTasks[id]= todo;
        }
    });

    return expiredTasks;
  }

});






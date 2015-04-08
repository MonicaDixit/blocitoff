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
    'simpleLogin'
  ]);
console.log('got to app.js');
// blocitoffApp.constant('FIREBASE_URI' , 'https://intense-heat-425.firebaseio.com/');

// blocitoffApp.config(['$stateProvider','$locationProvider' , '$urlRouterProvider', 
//     function($stateProvider, $locationProvider, $urlRouterProvider){
//     // $locationProvider.html5Mode(true);

//     $urlRouterProvider.otherwise('/active');

//     $stateProvider.state('main', {
//       url: '/',
//       //controller: 'Main.controller',
//       templateUrl: '/views/main.html'
//      });

//     $stateProvider.state('active',{
//         url: '/active',
//         controller: 'Active.controller',
//         templateUrl: '/views/active.html'
      
//     });

//     $stateProvider.state('inactive',{
//         url: '/inactive',
//         controller: 'Active.controller',
//         templateUrl: '/views/inactive.html'
//     });

//     $stateProvider.state('history', {
//         url: '/history',
//         controller: 'Active.controller',
//         templateUrl: '/views/history.html'
//     });

//     $stateProvider.state('login', {
//         url: '/login',
//         controller: 'LoginCtrl',
//         templateUrl: '/views/login.html'
//     });

//     $stateProvider.state('account', {
//         url: '/account',
//         controller: 'AccountCtrl',
//         templateUrl: '/views/login.html'
//     });
// }]);

 blocitoffApp.controller('Active.controller' , ['$scope', 'TodoService', 
    function($scope,TodoService){


    $scope.title = "Current tasks";
    $scope.description = "Task Description";
    $scope.priorityLabel = "Priority" ;
    $scope.activeHeader = "Active Tasks";
    $scope.historyHeader = "Task History";
    $scope.inactiveHeader = "Expired Tasks";

    $scope.filters = {};
    var now = moment().format("MM-DD-YYYY");
    console.log(now);

    $scope.createdate = now;

    

    
    $scope.todolist = TodoService.getTasks();
    console.log($scope.todolist);

    $scope.addTask = function(){

      var intPriority;

        if ($scope.priority === 'High'){
          intPriority = 1;

        }

        else if ($scope.priority === 'Medium'){
          intPriority = 2;
        }

        else{
          intPriority = 3;
        }
        var newTaskRow = {taskname:$scope.newtask, 
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

 blocitoffApp.factory('TodoService' ,['$firebase', function($firebase){

   var ref = new Firebase('https://intense-heat-425.firebaseio.com/');

   var todolist = $firebase(ref).$asArray();
   
    var getTasks = function(){
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
    };

    var addTask = function(taskrow){
        todolist.$add(taskrow);
    };

    var updateTask = function(todo){
        console.log(todo);
        todolist.$save(todo); 

    };

    var deleteTask = function(id) {
        todolist.$remove(id);
    };
 

    var expireTask = function(){
     var expiredTasks = [];
      angular.forEach(todolist, function(todo,id){
        var taskCreateDate= todo.date ;
        var then = moment(taskCreateDate);
        var now = moment();
        var days = now.diff(then, 'days');
        console.log(days);

        if (days > 7){
          todo.isActive = false;
        }

        return expiredTasks;
      });
    }

    return {
       getTasks:getTasks,
       addTask:addTask,
       updateTask:updateTask,
       deleteTask:deleteTask,
       expireTask:expireTask
    };

 }] );

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

// blocitoffApp.filter('expiredTasks' , function($location){
//   return function(input){
//     var expiredTasks = [];
//     angular.forEach(input, function(todo,id){
//     var taskCreateDate= todo.date ; 
//     var then = moment(taskCreateDate); 
//     var now = moment();
//     var days = now.diff(then, 'days');
//     console.log(days);
//     if (days > 7){
//           expiredTasks[id]= todo;
//         }
//     });

//     return expiredTasks;
//   }

// });


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






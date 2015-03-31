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
    'ui.router',
    'simpleLogin'
  ]);

//blocitoffApp.constant('FIREBASE_URI' , 'https://intense-heat-425.firebaseio.com/')

blocitoffApp.config(['$stateProvider', '$locationProvider' , '$urlRouterProvider', 
    function($stateProvider, $locationProvider, $urlRouterProvider){
    // $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise('/active');

    $stateProvider.state('main', {
      url: '/',
      //controller: 'Main.controller',
      templateUrl: '/views/main.html'
     });

    $stateProvider.state('active',{
        url: '/active',
        controller: 'Active.controller',
        templateUrl: '/views/active.html'
      
    });

    $stateProvider.state('inactive',{
        url: '/inactive',
        controller: 'Active.controller',
        templateUrl: '/views/inactive.html'
    });

    $stateProvider.state('history', {
        url: '/history',
        controller: 'Active.controller',
        templateUrl: '/views/history.html'
    });
}]);

 blocitoffApp.controller('Active.controller' , ['$scope', 'TodoService', 
    function($scope,TodoService){

    $scope.categories = [
            {"id": 0, "name": "home"},
            {"id": 1, "name": "work"},
            {"id": 2, "name": "Kiddie"},
            {"id": 3, "name": "Study"}
        ];

    $scope.title = "Current tasks";
    $scope.description= "Task Description";
    $scope.priorityLabel= "Priority" ;
    $scope.createdate = new Date();

    

    $scope.todolist = TodoService.getTasks();
    console.log($scope.todolist);

    $scope.addTask = function(){
        var newTaskRow = {taskname:$scope.newtask, 
            priority:$scope.priority,
            date:new Date(),
            // category:$scope.category,
            isDone:false
        }
        TodoService.addTask(newTaskRow);

        $scope.newtask = " ";
        $scope.priority = " ";
        //$scope.currentCategory = " ";
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

    // function setCurrentCategory(category){
    //   $scope.currentCategory = category;
    // }

    // $scope.setCurrentCategory = setCurrentCategory;

}]);

 blocitoffApp.factory('TodoService' ,['$firebase', function($firebase){

   var ref = new Firebase('https://intense-heat-425.firebaseio.com/');

   var todolist = $firebase(ref).$asArray();
   
    var getTasks = function(){
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

     var setCurrentCategory = function(category){

     };

    var expireTask = function(){
     var expiredTasks = [];
      angular.forEach(todolist, function(todo,id){
        var taskCreateDate= todo.date;
        var today = new Date();
        var difference = taskCreateDate.getTime() - today.getTime(); /*milliseconds*/
        var DayMilliseconds = 24 * 60 * 60 * 1000;
        var MonthMilliseconds = 30 * DayMilliseconds ;    
        var months = Math.floor( difference / MonthMilliseconds );
        var remaining = difference % MonthMilliseconds ;
        var days = Math.floor( remaining / DayMilliseconds );

        if (days > 7){
          expiredTasks[i]= todo;
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





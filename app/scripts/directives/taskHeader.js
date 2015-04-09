angular.module('blocitoffApp')
.directive('taskHeader' , function(){
  "use strict";
  return{
    restrict:'E',
    templateUrl : 'views/taskHeader.html',
    scope:{
      header: '@'
    }
  };
});
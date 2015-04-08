angular.module('blocitoffApp')
.directive('taskHeader' , function(){
  return{
    restrict:'E',
    templateUrl : 'views/taskHeader.html',
    scope:{
      header: '@'
    }
  };
});
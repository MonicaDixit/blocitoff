'use strict' ;
angular.module('blocitoffApp')
.filter('todoFilter' , function($location){
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


angular.module('blocitoffApp')
.filter('prioritySortFilter' , function(n){
  return function(input , param){
    var filtered = [];
    angular.forEach(input, function(todo,id){
      
      if(todo.priority === param){
        
            filtered[id] = todo;
       
      } 
    });

    return filtered;
  }

});


angular.module('blocitoffApp')
.filter('categorySortFilter' , function(n){
  return function(input , param){
    var filtered = [];
    angular.forEach(input, function(todo,id){
      if(todo.priority === param){
        
            filtered[id] = todo;
       
      }  
    });

    return filtered;
  }

});

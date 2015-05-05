'use strict'
//angular.module('blocitoffApp');

//app.constant('FIREBASE_URL' , 'https://intense-heat-425.firebaseio.com/');

angular.module('blocitoffApp').factory('User', function($firebaseAuth) {

  var ref = new Firebase("https://intense-heat-425.firebaseio.com/");
  var data = null;

  return {
    set: function(user) {
      data = user;
    },
    get: function() {
      return data;
    },
    login: function() {
      ref.authWithPassword({
        email    : user.email,
        password : user.password
      }, function(error, authData) {
        if (error) {
          console.log('Login Failed!', error);
        } else {
          console.log('Authenticated successfully with payload:', authData);
          $scope.$apply(function() {
            User.set(authData);
            $scope.user = User.get();
            console.log(User, User.get());
          });
        }
      });
    },
    loggedIn: function() {
      if (data) {
        return Object.keys(data).length > 0;
      } else {
        return false;
      }
    }
  };
})
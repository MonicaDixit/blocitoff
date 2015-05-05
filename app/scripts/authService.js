'use strict';
var app = angular.module('blocitoffApp' , ['firebase']);
app.constant('FIREBASE_URL' , 'https://intense-heat-425.firebaseio.com/');


app.factory('Auth', function ($firebaseSimpleLogin, FIREBASE_URL, $rootScope) {
  var ref = new Firebase(FIREBASE_URL);
  var auth = $firebaseSimpleLogin(ref);

  //ref.createUser({})

  ref.authWithPassword({email: 'email goes here', password: 'password'}, function(error, authData) {
    if (error) {

    } else {
      console.log(authData);
    }
  })

  var Auth = {
    register: function (user) {
      return auth.$createUser(user.email, user.password);
    },
    login: function (user) {
      return auth.$login('password', user);
    },
    logout: function () {
      auth.$logout();
    },
    resolveUser: function() {
      return auth.$getCurrentUser();
    },
    signedIn: function() {
      return !!Auth.user.provider;
    },
    user: {}
  };

  $rootScope.$on('$firebaseSimpleLogin:login', function(e, user) {
    console.log('logged in');
    angular.copy(user, Auth.user);
  });
  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    console.log('logged out');
    angular.copy({}, Auth.user);
  });

  return Auth;
});

'use strict'

//angular.module('blocitoffApp').constant('FIREBASE_URL' , 'https://intense-heat-425.firebaseio.com/');


blocitoffApp.controller('UserCtrl', 
  function($scope, $rootScope, $firebaseAuth, User, $location) {

  // Get a reference to the Firebase
  var ref = new Firebase("https://intense-heat-425.firebaseio.com/");

  $scope.signup = function(user) {
    if (user.password === user.passwordConfirmation) {
      ref.createUser({
        email    : user.email,
        password : user.password
      }, function(error, userData) {
        if (error) {
          console.log('Error creating user:', error);
        } else {
          console.log('Successfully created user account with uid:', userData.uid);
          var refUser = ref.child('users').child(userData.uid);
          
          
          refUser.set({
            firstName: 'monica',
            lastName: 'dixit'
          });

        }
      });
      $location.path('/login');
    } else {
      // Password and Confirmation do not match
      console.log('Password & Confirmation do not match!');
    }
  };

  $scope.login = function(user) {
    
    ref.authWithPassword({
      email    : user.email,
      password : user.password
    }, function(error, authData) {
      if (error) {
       
        console.log('Login Failed!', error);
      } else {
        $scope.$apply(function() {
          User.set(authData);
          $rootScope.user = User.get();
          $location.path('/active');
        });
      }
    });
  };

  $scope.logout = function() {
    ref.unauth();
    $scope.user = {};
    $scope.loginData = {};
    $state.go('login');
  };

    //$scope.loggedIn = User.loggedIn();
    //$scope.user.loggedIn = true;

  ref.onAuth(function(authData) {
    if (authData) {
      console.log(authData);
      $scope.user = authData;
      var userAuth = ref.child('users').child($scope.user.uid);
      userAuth.on('value', function(data) {
        angular.extend($scope.user, data.val());
        User.set($scope.user);
        if (User.loggedIn()) {
          $rootScope.loggedIn = true;
          // $state.go('tab.dash');
        }
      });
    }
  });

});
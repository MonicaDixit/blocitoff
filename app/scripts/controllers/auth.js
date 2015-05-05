'use strict';
var app = angular.module('blocitoffApp');

app.controller('AuthCtrl',
  function ($scope, $location, Auth) {
    if (Auth.signedIn()) {
      $location.path('/active');
    }

    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        $location.path('/active')
      })
    };

  $scope.register = function () {
    Auth.register($scope.user).then(function() {
      return Auth.login($scope.user).then(function() {
        user.userEmail = $scope.user.userEmail;
        return Auth.createProfile(user);
      }).then(function(){
         $location.path('/active');
       });
    });
  };
});
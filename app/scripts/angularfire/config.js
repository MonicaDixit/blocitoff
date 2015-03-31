angular.module('firebase.config', [])
  .constant('FBURL', 'https://blocitoff.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password'])

  .constant('loginRedirectPath', '/login');

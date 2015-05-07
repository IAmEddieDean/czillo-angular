'use strict';

angular.module('czillo')
.controller('NavCtrl', function($rootScope, $scope, $state, $firebaseObject, User, $http){

  $scope.afAuth.$onAuth(function(data){
    if(data){
      console.log(data);
      $rootScope.activeUser = data;
      $rootScope.displayName = getDisplayName(data);
      $rootScope.fbUser = $rootScope.fbRoot.child('users/' + data.uid);
      $rootScope.afUser = $firebaseObject($rootScope.fbUser);
      $http.defaults.headers.common.Authorization = 'Bearer ' + data.token;
      User.findOrCreate()
        .then(function(){
          $state.go('home');
        });
    }else{
      $rootScope.activeUser = null;
      $rootScope.displayName = null;
      $rootScope.fbUser = null;
      $rootScope.afUser = null;
      $http.defaults.headers.common.Authorization = null;

    }
    
    $state.go('home');
  });

  $scope.logout = function(){
    User.logout();
  };

  function getDisplayName(data){
    switch(data.provider){
      case 'password':
        return data.password.email.substring(0, data.password.email.indexOf('@'));
      case 'google':
        return data.google.displayName;
      case 'github':
        return data.github.displayName;
    }
  }
});

'use strict';

angular.module('czillo')
.factory('User', function($rootScope, $http, nodeUrl){

  function User(){
  }
  User.oauth = function(provider){
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  };

  User.register = function(user){
    return $rootScope.afAuth.$createUser(user);
  };

  User.login = function(user){
    return $rootScope.afAuth.$authWithPassword(user);
  };

  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };
  
  User.findOrCreate = function(){
    return $http.put(nodeUrl + '/users');
  };

  return User;
});

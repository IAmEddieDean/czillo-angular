'use strict';

angular.module('czillo')
.factory('NeighborHood', function($rootScope, $http, nodeUrl){
  
  function NHood(hood){
    this.name = hood.name;
    this.zipCode = hood.zipCode;
  }
  
  NHood.prototype.save = function(){
    return $http.post(nodeUrl + '/neighborhoods', this);
  };
  
  NHood.retrieve = function(){
    return $http.get(nodeUrl + '/neighborhoods');
  };
  
  NHood.destroy = function(hood){
    return $http.delete(nodeUrl + '/neighborhoods/' + hood._id);
  };
  
  return NHood;
});

'use strict';

angular.module('czillo')
.factory('NeighborHood', function($rootScope, $http, nodeUrl){
  
  function NHood(hood){
    this.name = hood.name;
    this.zipCode = hood.zipCode;
    this.lat = hood.lat;
    this.lng = hood.lng;
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
  
  NHood.edit = function(hood, hoodId){
    return $http.put(nodeUrl + '/neighborhoods/' + hoodId, hood);
  };
  
  NHood.getNHood = function(hoodZipCode){
    return $http.get(nodeUrl + '/neighborhoods/' + hoodZipCode);
  };
  
  return NHood;
});

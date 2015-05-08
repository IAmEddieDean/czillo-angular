'use strict';

angular.module('czillo')
.factory('House', function($rootScope, $http, nodeUrl){
  
  function House(house){
    this.address = house.address;
    this.city = house.city;
    this.state = house.state;
    this.zipCode = house.zipCode;
    this.bedrooms = house.bedrooms;
    this.bathrooms = house.bathrooms;
    this.price = house.price;
    this.photo = house.photo;
    this.lat = house.lat;
    this.lng = house.lng;
    this.sqFt = house.sqFt;
  }
  
  House.prototype.add = function(){
    return $http.post(nodeUrl + '/houses', this);
  };
  House.getHouse = function(houseId){
    return $http.get(nodeUrl + '/houses/one/' + houseId);
  };
  House.getHouses = function(zipCode){
    return $http.get(nodeUrl + '/houses/zip/' + zipCode);
  };
  House.getAllHouses = function(){
    return $http.get(nodeUrl + '/houses/all/');
  };
  House.edit = function(house, houseId){
    return $http.put(nodeUrl + '/houses/' + houseId, house);
  };
  House.destroy = function(house){
    return $http.delete(nodeUrl +'/houses/' + house);
  };
  return House;
});

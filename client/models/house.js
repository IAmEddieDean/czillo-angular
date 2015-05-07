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
  }
  
  House.prototype.add = function(){
    return $http.post(nodeUrl + '/houses', this);
  };
  
  return House;
});

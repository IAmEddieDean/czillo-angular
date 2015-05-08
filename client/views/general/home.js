'use strict';

angular.module('czillo')
.controller('HomeCtrl', function($state, $scope, Map, House, $window){

  
  $scope.houses = [];
  getHouses();

  function getHouses(all){
    all = all || '';
    House.getAllHouses(all)
    .then(function(response){
      $scope.map = Map.create('#map', 39.5, -98.35, 4);
      $scope.houses = response.data;
      $scope.houses.forEach(function(house){
        house.marker = Map.addMarker($scope.map, house.lat, house.lng, house.address, '/assets/pin.png');
      });
    });
  }
  
  $scope.bounceMarker = function(house){
    if(house.marker.getAnimation() !== null){
      house.marker.setAnimation(null);
    }else{
      house.marker.setAnimation($window.google.maps.Animation.BOUNCE);
    }
  };
  
  $scope.showAll = function(){
    getHouses('full');
  };
  
});

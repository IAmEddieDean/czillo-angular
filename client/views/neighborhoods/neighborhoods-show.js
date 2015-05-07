'use strict';

angular.module('czillo')
.controller('NHoodsShowCtrl', function($state, NeighborHood, $scope, Map, House, $window){
  $scope.neighborhood = {};
  
  $scope.houses = [];
  NeighborHood.getNHood($state.params.zipCode)
  .then(function(response){
    $scope.neighborhood = response.data;
    $scope.map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 12);
    getHouses();
    // var map = Map.create('#map', response.data[0].lat, response.data[0].lng, 12);
  });
  //var markers = [];
  function getHouses(){
    House.getHouses($state.params.zipCode)
    .then(function(response){
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
  
});

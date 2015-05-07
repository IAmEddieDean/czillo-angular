'use strict';

angular.module('czillo')
.controller('NHoodsShowCtrl', function($state, NeighborHood, $scope, Map, House){
  $scope.neighborhood = {};
  getHouses();
  $scope.houses = [];
  NeighborHood.getNHood($state.params.zipCode)
  .then(function(response){
    $scope.neighborhood = response.data;
    var map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 12);
    // var map = Map.create('#map', response.data[0].lat, response.data[0].lng, 12);
  });
  function getHouses(){
    House.getHouses($state.params.zipCode)
      .then(function(response){
        $scope.houses = response.data;
        console.log(response.data.sqFt);
    });
  }
});

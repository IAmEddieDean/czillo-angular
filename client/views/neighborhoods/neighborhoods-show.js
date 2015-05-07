'use strict';

angular.module('czillo')
.controller('NHoodsShowCtrl', function($state, NeighborHood, $scope, Map){
  console.log($state.params);
  $scope.neighborhood = {};
  NeighborHood.getNHood($state.params.neighborhood)
  .then(function(response){
    $scope.neighborhood = response.data;
    var map = Map.create('#map', $scope.neighborhood.lat, $scope.neighborhood.lng, 12);
  });


});

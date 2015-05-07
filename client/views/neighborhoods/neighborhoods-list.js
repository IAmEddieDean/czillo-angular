'use strict';

angular.module('czillo')
.controller('NHoodsListCtrl', function($scope, NeighborHood, $window){
  
  retrieveHoods();
  
  $scope.neighorhoods = [];
  $scope.isEditing = false;
  
  function retrieveHoods(){
    NeighborHood.retrieve()
    .then(function(response){
      console.log(response.data);
      $scope.neighborhoods = response.data;
    });
  }
  $scope.editHood = function(hood){
    $scope.nHood = hood;
    $scope.isEditing = true;
  };
  
  $scope.addHood = function(hood){
    console.log('hell yeah');
    var nHood = new NeighborHood(hood);
    nHood.save()
    .then(function(response){
      $scope.neighborhoods.push(response.data);
      $scope.nHood = {};
    });
  };
  
  $scope.deleteHood = function(hood){
    NeighborHood.destroy(hood)
    .then(function(result){
      $window._.remove($scope.neighborhoods, function(n){
        return n._id === result.data._id;
      });
    });
  };
  
});

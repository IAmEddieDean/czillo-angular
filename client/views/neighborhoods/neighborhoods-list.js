'use strict';

angular.module('czillo')
.controller('NHoodsListCtrl', function($scope, NeighborHood, $window, Map){
  
  retrieveHoods();
  
  $scope.neighorhoods = [];
  $scope.isEditing = false;
  
  function retrieveHoods(){
    NeighborHood.retrieve()
    .then(function(response){
      $scope.neighborhoods = response.data;
    });
  }
  $scope.editHood = function(hood){
    $scope.nHood = hood;
    $scope.isEditing = true;
  };
  $scope.saveEdit = function(hood){
    var h = angular.copy(hood);
    delete h.__v;
    delete h._id;
    delete h.createdAt;
    delete h.firebaseId;
    NeighborHood.edit(h, hood._id)
    .then(function(){
      $scope.nHood = {};
      $window.swal({title: 'Neighborhood Saved', text: 'Your neighborhood was succesfully added.', type: 'success'});
      $scope.isEditing = false;
    }).catch(function(){
      $window.swal({title: 'Neighborhood Error', text: 'There was a problem with your neighborhood. Please move.', type: 'error'});
    });
  };
  
  $scope.addHood = function(hood){
    
    Map.geocode(hood.zipCode, function(results){
      if(results && results.length){
        //stop.name = results[0].formatted_address;
        hood.lat = results[0].geometry.location.lat();
        hood.lng = results[0].geometry.location.lng();
        var nHood = new NeighborHood(hood);
        nHood.save()
        .then(function(response){
          $scope.neighborhoods.push(response.data);
          $scope.nHood = {};
        });
      }
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

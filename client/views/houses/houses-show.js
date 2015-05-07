'use strict';

angular.module('czillo')
.controller('HouseShowCtrl', function($scope, $state, $window, House, Map){
  $scope.house = {};
  getHouse();
  function getHouse(){
    House.getHouse($state.params.houseId)
    .then(function(response){
      $scope.house = response.data;
      var map = Map.create('#map', $scope.house.lat, $scope.house.lng, 18);
      Map.addMarker(map, $scope.house.lat, $scope.house.lng, $scope.house.address, '/assets/pin.png');
    });
  }
  $scope.editHouse = function(){
    $state.go('houses.edit', {houseId: $state.params.houseId});
  };
  
  $scope.destroyHouse = function(){
    House.destroy($scope.house._id)
    .then(function(){
      $state.go('neighborhoods.show',{'zipCode': $scope.house.zipCode});
    });
  };
  
  //
  //
  // $scope.preview = function(){
  //   previewFile();
  // };
  // $scope.save = function(house){
  //   var location = house.address + ' ' + house.city + ', ' + house.state + ' ' + house.zipCode;
  //   Map.geocode(location, function(results){
  //     if(results && results.length){
  //       //stop.name = results[0].formatted_address;
  //       house.lat = results[0].geometry.location.lat();
  //       house.lng = results[0].geometry.location.lng();
  //       var h = new House(house);
  //       h.add()
  //       .then(function(response){
  //         console.log(response);
  //         $window.swal({title: 'House Saved', text: 'Your house was succesfully saved.', type: 'success'});
  //         $state.go('neighborhoods.show',{'zipCode': response.data.zipCode});
  //       })
  //       .catch(function(){
  //         $window.swal({title: 'House Error', text: 'There was a problem saving your house. Please renovate.', type: 'error'});
  //       });
  //     }
  //   });
  // };
  //
  // function previewFile () {
  //     var preview = document.querySelector('img');
  //     var file    = document.querySelector('input[type=file]').files[0];
  //     var reader  = new FileReader();
  //
  //     reader.onloadend = function () {
  //       $scope.house.photo = reader.result;
  //       // House.addHouse(house);
  //     };
  //     if (file) {
  //       reader.readAsDataURL(file);
  //     } else {
  //       preview.src = '';
  //     }
  //   }
  
});

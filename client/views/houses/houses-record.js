'use strict';

angular.module('czillo')
.controller('HouseCtrl', function($scope, $state, $window, House, Map, states){
  $scope.house = {};
  $scope.states = states;
  //$scope.editMode = $state.params.houseId ? true : false;
  $scope.camera = false;
  
  if($state.params.houseId){
    getHouse();
  }
  
  
  
  
  
  $window.Webcam.set({width: 200, height: 150});
  
  $scope.cameraOn = function(){
    $window.Webcam.attach('#camera');
    $scope.camera = true;
  };
  $scope.cameraOff = function(){
    $window.Webcam.reset();
    $scope.camera = false;
  };
  $scope.takePhoto = function(){
    $window.Webcam.snap(function(dataUrl){
      $scope.house.photo = dataUrl;
    });
  };
  
  $scope.preview = function(){
    previewFile();
  };
  $scope.save = function(house){
    var location = house.address + ' ' + house.city + ', ' + house.state + ' ' + house.zipCode;
    Map.geocode(location, function(results){
      if(results && results.length){
        //stop.name = results[0].formatted_address;
        house.lat = results[0].geometry.location.lat();
        house.lng = results[0].geometry.location.lng();
        var h = new House(house);
        h.add()
        .then(function(response){
          $window.swal({title: 'House Saved', text: 'Your house was succesfully saved.', type: 'success'});
          $state.go('neighborhoods.show',{'zipCode': response.data.zipCode});
        })
        .catch(function(){
          $window.swal({title: 'House Error', text: 'There was a problem saving your house. Please renovate.', type: 'error'});
        });
      }
    });
  };
  $scope.saveEdit = function(house){//change house out
    var h = angular.copy(house);
    delete h.__v;
    delete h._id;
    delete h.createdAt;
    House.edit(h, house._id)
    .then(function(response){
      $scope.house = {};
      $window.swal({title: 'House Saved', text: 'Your house was succesfully saved.', type: 'success'});
      $state.go('neighborhoods.show',{'zipCode': response.data.zipCode});
    }).catch(function(){
      $window.swal({title: 'House Error', text: 'There was a problem with your house. Please renovate.', type: 'error'});
    });
  };
  function getHouse(){
    House.getHouse($state.params.houseId)
    .then(function(response){
      console.log(response.data);
      $scope.house = response.data;
    }).catch(function(){
      $window.swal({title: 'House Error', text: 'There was a problem saving your house. Please renovate.', type: 'error'});
    });
  }

  function previewFile () {
      var preview = document.querySelector('img');
      var file    = document.querySelector('input[type=file]').files[0];
      var reader  = new FileReader();
      
      reader.onloadend = function () {
        $scope.house.photo = reader.result;
        // House.addHouse(house);
      };
      if (file) {
        reader.readAsDataURL(file);
      } else {
        preview.src = '';
      }
    }
  
});

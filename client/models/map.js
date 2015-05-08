'use strict';

angular.module('czillo')
.factory('Map', function($window){
  
  function Map(){}
  
  Map.geocode = function(address, cb){
    var geocoder = new $window.google.maps.Geocoder();
    geocoder.geocode({address: address}, cb);
  };
  
  Map.addMarker = function(map, lat, lng, name, icon){
    var latLng = new $window.google.maps.LatLng(lat, lng);
    var marker = new $window.google.maps.Marker({
      map: map,
      position: latLng,
      title: name,
      animation: $window.google.maps.Animation.DROP,
      icon: icon
    });
    return marker;
  };
  
  Map.create = function(selector, lat, lng, zoom){
    var options = {
      center: new $window.google.maps.LatLng(lat, lng),
      zoom: zoom,
      mapTypeId: $window.google.maps.MapTypeId.HYBRID,
      styles: [{'featureType':'administrative','elementType':'all','stylers':[{'visibility':'on'},{'lightness':33}]},{'featureType':'landscape','elementType':'all','stylers':[{'color':'#f2e5d4'}]},{'featureType':'poi.park','elementType':'geometry','stylers':[{'color':'#c5dac6'}]},{'featureType':'poi.park','elementType':'labels','stylers':[{'visibility':'on'},{'lightness':20}]},{'featureType':'road','elementType':'all','stylers':[{'lightness':20}]},{'featureType':'road.highway','elementType':'geometry','stylers':[{'color':'#c5c6c6'}]},{'featureType':'road.arterial','elementType':'geometry','stylers':[{'color':'#e4d7c6'}]},{'featureType':'road.local','elementType':'geometry','stylers':[{'color':'#fbfaf7'}]},{'featureType':'water','elementType':'all','stylers':[{'visibility':'on'},{'color':'#acbcc9'}]}]
    };
    
    selector = angular.element(selector).get(0);
    var map = new $window.google.maps.Map(selector, options);
    
    return map;
  };



  return Map;
});

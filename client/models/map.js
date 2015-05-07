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
      styles: [{'featureType':'all','elementType':'geometry','stylers':[{'saturation':'-64'},{'lightness':'31'},{'gamma':'1.65'}]},{'featureType':'all','elementType':'geometry.stroke','stylers':[{'lightness':'-8'},{'saturation':'-7'},{'gamma':'1.52'}]},{'featureType':'all','elementType':'labels.icon','stylers':[{'visibility':'on'},{'hue':'#ff0045'},{'saturation':'3'},{'lightness':'1'}]},{'featureType':'administrative','elementType':'labels.text.fill','stylers':[{'color':'#2f173f'}]},{'featureType':'poi','elementType':'all','stylers':[{'visibility':'off'}]},{'featureType':'road','elementType':'all','stylers':[{'saturation':'-58'},{'lightness':'3'},{'hue':'#b800ff'}]},{'featureType':'road.highway','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'road.arterial','elementType':'labels.icon','stylers':[{'visibility':'off'}]},{'featureType':'transit','elementType':'all','stylers':[{'visibility':'simplified'}]},{'featureType':'water','elementType':'all','stylers':[{'color':'#46bcec'},{'visibility':'on'}]}]
    };
    
    selector = angular.element(selector).get(0);
    var map = new $window.google.maps.Map(selector, options);
    
    return map;
  };



  return Map;
});

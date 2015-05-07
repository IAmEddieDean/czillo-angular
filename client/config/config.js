'use strict';

angular.module('czillo')
.config(function($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {url: '/', templateUrl: '/views/general/home.html'})
  .state('about', {url: '/about', templateUrl: '/views/general/about.html'})
  .state('faq', {url: '/faq', templateUrl: '/views/general/faq.html'})
  .state('contact', {url: '/contact', templateUrl: '/views/general/contact.html'})
  .state('register', {url: '/register', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  .state('login', {url: '/login', templateUrl: '/views/users/users.html', controller: 'UsersCtrl'})
  
  .state('neighborhoods', {url: '/neighborhoods', templateUrl: '/views/neighborhoods/neighborhoods.html', abstract: true})
  .state('neighborhoods.list', {url: '/', templateUrl: '/views/neighborhoods/neighborhoods-list.html', controller: 'NHoodsListCtrl'})
  .state('neighborhoods.show', {url: '/{zipCode}', templateUrl: '/views/neighborhoods/neighborhoods-show.html', controller: 'NHoodsShowCtrl'})
  
  .state('houses', {url: '/houses', templateUrl: '/views/houses/houses.html', abstract: true})
  .state('houses.add', {url: '/new', templateUrl: '/views/houses/houses-record.html', controller: 'HouseCtrl'})
  .state('houses.edit', {url: '/{house}/edit', templateUrl: '/views/houses/houses-record.html', controller: 'HouseCtrl'})
  .state('houses.show', {url: '/{houseId}', templateUrl: '/views/houses/houses-show.html', controller: 'HouseShowCtrl'});
  
  
  
});

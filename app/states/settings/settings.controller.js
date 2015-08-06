angular.module('starter.settings', [])

.controller('Settings', Settings);

Settings.$inject = ['localStorageService'];

function Settings(localStorageService) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  vm.preferredTimeslotOptions = ['Egal', 'Früh', 'Spät'];
  vm.durationOptions = ['Egal', '1,0h', '1,5h', '2,0h'];

  vm.preferredTimeslot = localStorageService.get('preferredTimeslot') || 'Egal';
  vm.duration = localStorageService.get('duration') || 'Egal';
  vm.backToCompany = localStorageService.get('backToCompany') || false;
  vm.dinner = localStorageService.get('dinner') || false;

  vm.onModelChange = function(key, value){
  	localStorageService.set(key, value);
  }
};

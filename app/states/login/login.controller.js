angular.module('starter.login', [])

.controller('LoginCtrl', function() {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //vm.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  // Form data for the login modal
  vm.loginData = {};

  // Triggered in the login modal to close it
  vm.closeLogin = function() {
    vm.modal.hide();
  };



  // Perform the login action when the user submits the login form
  vm.doLogin = function() {
    console.log('Doing login', vm.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      vm.closeLogin();
    }, 1000);
  };
});

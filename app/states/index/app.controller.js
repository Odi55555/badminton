angular.module('starter.app', [])

.controller('App', App);

App.$inject = ['$rootScope', '$ionicModal', '$timeout', 'userService', 'Config'];

function App($scope, $ionicModal, $timeout, userService, Config) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('states/login/login.html', {
    scope: $scope
  }).then(function(modal) {
    vm.modal = modal;
    vm.handleAuthentication()
  });

  // Form data for the login modal
  $scope.loginData = {};

  // Open the login modal
  vm.login = function() {
    vm.modal.show();
  };

  // Triggered in the login modal to close it
  // TODO try this with controllerAs syntax again
  $scope.closeLogin = function() {
    vm.modal.hide();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    userService.login($scope.loginData.username, $scope.loginData.password).then(function() {
      // TODO promise gets resolved even on failed XHR request!
      // TODO handle authentication error
      $scope.closeLogin();

    }, function(error) {
      // TODO show error
    });
  };

  // handle authentication
  vm.handleAuthentication = function() {
    if (!Config.token) {
      vm.login();
    }
  }
}

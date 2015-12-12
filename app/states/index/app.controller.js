angular.module('starter.app', [])

.controller('App', App);

App.$inject = ['$rootScope', '$ionicModal', '$timeout', 'userService', 'Config'];

function App($rootScope, $ionicModal, $timeout, userService, Config) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$rootScope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  $rootScope.$on('showLogin', function(){
    vm.login();
  });

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('states/login/login.html', {
    scope: $rootScope
  }).then(function(modal) {
    vm.modal = modal;
  });

  // Form data for the login modal
  $rootScope.loginData = {};

  // Open the login modal
  vm.login = function() {
    vm.modal.show();
  };

  // Triggered in the login modal to close it
  // TODO try this with controllerAs syntax again
  $rootScope.closeLogin = function() {
    vm.modal.hide();
  };

  // Perform the login action when the user submits the login form
  $rootScope.doLogin = function() {
    console.log('Doing login', $rootScope.loginData);

    userService.login($rootScope.loginData.username, $rootScope.loginData.password).then(function(response) {
      // TODO promise gets resolved even on failed XHR request!
      // TODO handle authentication error
      if (response.status === 200) {
        Config.token = response.data.id;
        Config.username = $rootScope.loginData.username;
        $rootScope.closeLogin();
      }

    }, function() {
      // TODO show error
    });
  };
}

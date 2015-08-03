// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.app', 'config'])

.run(function($ionicPlatform) {
  
  'use strict';

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  
  'use strict';

  $stateProvider
    .state('app', {
    url: '',
    abstract: true,
    templateUrl: 'states/index/menu.html',
    controller: 'App as app',
    // Ionic bug #3058 prevents using the controllerAs key
    // controllerAs: 'appCtrl'
  })

  .state('app.registerGame', {
    url: '/register-game',
    views: {
      'menuContent': {
        templateUrl: 'states/register-game/register-game.html'
      }
    }
  })

  .state('app.gameOverview', {
    url: '/game-overview',
    views: {
      'menuContent': {
        templateUrl: 'states/game-overview/game-overview.html'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'states/settings/settings.html'
      }
    }
  })

  .state('app.administration', {
    url: '/administration',
    views: {
      'menuContent': {
        templateUrl: 'states/administration/administration.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/register-game');
});

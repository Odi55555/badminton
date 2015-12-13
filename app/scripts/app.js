// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'angularMoment', 'ngLodash', 'starter.app', 'config', 'starter.registerGame',
  'starter.settings', 'LocalStorageModule', 'ionic-datepicker', 'starter.administration', 'starter.gameOverview'])

.run(function($ionicPlatform, amMoment) {

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

    amMoment.changeLocale('de');
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
        templateUrl: 'states/register-game/register-game.html',
        controller: 'RegisterGame as regGame'
      }
    }
  })

  .state('app.gameOverview', {
    url: '/game-overview',
    views: {
      'menuContent': {
        templateUrl: 'states/game-overview/game-overview.html',
        controller: 'GameOverview as gameOverview'
      }
    }
  })

  .state('app.settings', {
    url: '/settings',
    views: {
      'menuContent': {
        templateUrl: 'states/settings/settings.html',
        controller: 'Settings as settings'
      }
    }
  })

  .state('app.administration', {
    url: '/administration',
    views: {
      'menuContent': {
        templateUrl: 'states/administration/administration.html',
        controller: 'Administration as admin'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/register-game');
})

// TODO save this in local storage for next session
.constant('Config', {
  token: undefined,
  username: undefined,
  apiUrl: 'http://0.0.0.0:3000/api'
})

.config(function($httpProvider, Config) {
 
  'use strict';
 
  $httpProvider.defaults.useXDomain = true;
  delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $httpProvider.interceptors.push(function($q, $rootScope) {
    return {
     'request': function(config) {
        if (Config.token) {
          config.headers.Authorization = Config.token;
        }
        return config;
      },
    'responseError': function(rejection) {
      if (rejection.status === 401) {
        Config.token = undefined;
        Config.username = undefined;
        // TODO create a login-state and show login with a route change, not with this ugly way
        $rootScope.$emit('showLogin');
      }
      return $q.reject(rejection);
    }
    };
  });
});

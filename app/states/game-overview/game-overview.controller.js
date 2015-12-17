angular.module('starter.gameOverview', [])

.controller('GameOverview', GameOverview);

GameOverview.$inject = ['gameService', 'registrationService', '$scope', 'lodash'];

function GameOverview(gameService, registrationService, $scope, lodash) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  $scope.$on('$ionicView.enter', function() {
    $scope.reloadContent();
  });

  // TODO try to put this on vm
  $scope.reloadContent = function() {
    vm.games = [];
    gameService.getGamesWithRegistrations().then(function(games) {
      lodash.each(games, function(game) {
        if (!moment(game.date).isBefore(new Date(), 'day')) {
          vm.games.push(game);
        }
      });
    }).finally(function() {
       // Stop the ion-refresher from spinning
       $scope.$broadcast('scroll.refreshComplete');
     });
  };
}

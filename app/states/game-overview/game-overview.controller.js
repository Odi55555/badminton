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
  vm.games = [];
  vm.currentGameDate = '';

  $scope.$on('$ionicView.enter', function() {
    gameService.getGames().then(function(games) {
      lodash.each(games, function(game) {
        if (!moment(game.date).isBefore(new Date(), 'day')) {
          vm.games.push(game);
        }
      });
      vm.currentGameDate = moment(vm.games[0].date).format('DD.MM.YYYY');
      registrationService.getRegistrations(vm.games[0].id).then(function(registrations) {
        vm.registrations = registrations;
      });
    });
  });
}

angular.module('starter.gameOverview', [])

.controller('GameOverview', GameOverview);

GameOverview.$inject = ['gameService', '$scope'];

function GameOverview(gameService, $scope) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;
  // TODO get current game date
  vm.currentGameDate = '07.08.2015';

  $scope.$on('$ionicView.enter', function(e) {
    gameService.getPlayers('07.08.2015').then(function(players){
      vm.players = players;
    });
  });
}

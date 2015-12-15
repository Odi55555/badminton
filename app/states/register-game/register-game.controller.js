angular.module('starter.registerGame', [])

.controller('RegisterGame', RegisterGame);

RegisterGame.$inject = ['gameService', 'registrationService', 'lodash', 'Config', 'localStorageService', '$scope'];

function RegisterGame(gameService, registrationService, lodash, Config, localStorageService, $scope) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  $scope.$on('$ionicView.enter', function() {
    vm.games = [];

    vm.preferredTimeslot = localStorageService.get('preferredTimeslot') || 'Egal';
    vm.duration = localStorageService.get('duration') || 'Egal';
    vm.backToCompany = localStorageService.get('backToCompany') || false;
    vm.dinner = localStorageService.get('dinner') || false;

    // remove dates that are before today
    gameService.getGames().then(function(games) {
      lodash.each(games, function(game) {
        if (!moment(game.date).isBefore(new Date(), 'day')) {
          vm.games.push(game);
        }
      });
      vm.selectedGameDate = moment(vm.games[0].date).format('DD.MM.YYYY');
    });
  });



  vm.save = function() {
    registrationService.register({
      gameId: vm.games[0].id,
      userId: Config.userId,
      playGame: vm.playGame,
      preferredTimeslot: vm.preferredTimeslot,
      duration: vm.duration,
      backToCompany: vm.backToCompany,
      passengers: vm.passengers,
      dinner: vm.dinner
    }).then(function() {
      //do something on successful registration
    });
  };
}

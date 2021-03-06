angular.module('starter.registerGame', [])

.controller('RegisterGame', RegisterGame);

RegisterGame.$inject = ['gameService', 'registrationService', 'lodash', 'Config', 'localStorageService', '$scope', '$ionicLoading'];

function RegisterGame(gameService, registrationService, lodash, Config, localStorageService, $scope, $ionicLoading) {

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

    vm.playGame = false;
    vm.preferredTimeslot = localStorageService.get('preferredTimeslot') || 'Egal';
    vm.duration = localStorageService.get('duration') || 'Egal';
    vm.backToCompany = localStorageService.get('backToCompany') || false;
    vm.dinner = localStorageService.get('dinner') || false;

    // remove dates that are before today
    gameService.getGames().then(function(games) {
      lodash.each(games, function(game) {
        if (game.state === 'planned' && !moment(game.date).isBefore(new Date(), 'day')) {
          vm.games.push(game);
        }
      });
      if (vm.games.length > 0) {
        vm.selectedGameDate = moment(vm.games[0].date).format('DD.MM.YYYY');
        registrationService.getRegistration({gameId: vm.games[0].id, userId: Config.userId}).then(function(reg){
          if (reg) {
            vm.regExists = true;
            vm.playGame = true;
            vm.preferredTimeslot = reg.preferredTimeslot;
            vm.duration = reg.duration;
            vm.backToCompany = reg.backToCompany;
            vm.dinner = reg.dinner;
          }
        });
      }
    });
  });

  

  vm.save = function() {
    // TODO show this at least a second
    $ionicLoading.show({
      template: 'Daten werden übermittelt...'
    });
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
      vm.regExists = !!vm.playGame;
      $ionicLoading.hide();
    });
  };
}

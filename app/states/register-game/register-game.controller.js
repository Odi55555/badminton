angular.module('starter.registerGame', [])

.controller('RegisterGame', RegisterGame);

RegisterGame.$inject = ['gameService', 'lodash', 'Config'];

function RegisterGame(gameService, lodash, Config) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;
  // vm.selectedGameDate = '';

  vm.gameDates = [];

  // TODO load defaults from settings

  // remove dates that are before today
  gameService.getGames().then(function(gameDates){
    lodash.each(gameDates, function(gameDate){
      if(!moment(gameDate).isBefore(new Date(), 'day')){
        vm.gameDates.push(gameDate);
      }
    });

  vm.selectedGameDate = moment(vm.gameDates[0]).format('DD.MM.YYYY');
  });

  vm.save = function(){
    gameService.register({
      date: vm.selectedGameDate,
      user: Config.username,
      token: Config.token,
      playGame: vm.playGame,
      preferredTimeslot: vm.preferredTimeslot,
      duration: vm.duration,
      backToCompany: vm.backToCompany,
      passengers: vm.passengers,
      dinner: vm.dinner
    }).then(function(){
      //do something in successful registration
    });
  };
}

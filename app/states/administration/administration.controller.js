angular.module('starter.administration', [])

.controller('Administration', Administration);

Administration.$inject = ['gameService', 'lodash', '$ionicModal'];

function Administration(gameService, lodash, $ionicModal) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;
  vm.gameDates = [];

  // remove dates that are before today
  gameService.getGames().then(function(gameDates) {
    lodash.each(gameDates, function(gameDate) {
      if (!moment(gameDate).isBefore(new Date(), 'day')) {
        vm.gameDates.push(gameDate);
      }
    });
  });

  // TODO Fix disabling existing dates in datepicker

  vm.addNewGameDatePickerCallback = function(val) {
    var dateAlreadyExists = false;
    if (typeof(val) === 'undefined') {      
      console.log('Date not selected');
    } else {
    lodash.each(vm.gameDates, function(gameDate) {
      if (moment(gameDate).isSame(val, 'day')) {
        dateAlreadyExists = true;
      }
    });
    if (!dateAlreadyExists){
      vm.gameDates.push(val);
      gameService.setGames(vm.gameDates);
    }
    }
  };

  vm.startGame = function(gameDate){
    // $ionicModal.show();
    gameService.startGame(gameDate);
  };
}

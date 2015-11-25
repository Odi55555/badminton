angular.module('starter.administration', [])

.controller('Administration', Administration);

Administration.$inject = ['gameService', 'lodash', '$ionicModal', '$scope'];

function Administration(gameService, lodash, $ionicModal, $scope) {

  'use strict';

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  var vm = this;

  $scope.$on('$ionicView.enter', function(e) {
    vm.gameDates = [];

    // remove dates that are before today
    gameService.getGames().then(function(games) {
      vm.gameDates = games;
    });
  });

  // TODO Fix disabling existing dates in datepicker

  vm.addNewGameDatePickerCallback = function(val) {
    var dateAlreadyExists = false;
    if (typeof(val) === 'undefined') {      
      console.log('Date not selected');
    } else {
    lodash.each(vm.gameDates, function(game) {
      if (moment(game.date).isSame(val, 'day')) {
        dateAlreadyExists = true;
      }
    });
    if (!dateAlreadyExists){
      var newGame = {
        date: val,
        state: 'planned'       
      }
      vm.gameDates.push(newGame);
      gameService.createGame(newGame);
    }
    }
  };

  vm.changeGameState = function(gameDate){
    if (gameDate.state === 'running') {
      gameDate.state = 'stopped';
    }
    if (gameDate.state === 'planned') {
      gameDate.state = 'running';
    }
    gameService.changeGameState(gameDate).then(function (response) {
      angular.forEach(vm.gameDates, function (gameDate)  {
        if (gameDate.id === response.id) {
          gameDate = response;
        }
      })
    });
  };

  vm.futureGames = function(games) {
    var futureGames = [];
    
    lodash.each(games, function(game) {
      if (!moment(game.date).isBefore(new Date(), 'day')) {
        futureGames.push(game);
      }
    });
    
    return futureGames;
  };
}

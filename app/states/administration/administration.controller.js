angular.module('starter.administration', [])

.controller('Administration', Administration);

Administration.$inject = ['gameService', 'lodash', '$ionicModal', '$scope', '$ionicPopup'];

function Administration(gameService, lodash, $ionicModal, $scope, $ionicPopup) {

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

    // remove dates that are before today
    gameService.getGames().then(function(games) {
      vm.games = games;
    });
  });

  // TODO Fix disabling existing dates in datepicker
  // TODO forbid on backend to at date twice
  // TODO forbid to change registrations when a game already starts

  vm.addNewGameDatePickerCallback = function(val) {
    var dateAlreadyExists = false;
    if (typeof(val) === 'undefined') {      
      console.log('Date not selected');
    } else {
    lodash.each(vm.games, function(game) {
      if (moment(game.date).isSame(val, 'day')) {
        dateAlreadyExists = true;
      }
    });
    if (!dateAlreadyExists){
      var newGame = {
        date: moment(val).format('YYYY-MM-DD'),
        state: 'planned'       
      };
      vm.games.push(newGame);
      gameService.createGame(newGame);
    }
    }
  };

   vm.showConfirm = function(game) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Spielzustand ändern?',
       template: 'Wenn du das Spiel startest, kann kein Spieler sich mehr an- oder abmelden.<br>Wenn du das Spiel beendest, wird es archiviert.'
     });
     confirmPopup.then(function(res) {
       if(res) {
         vm.changeGameState(game);
       }
     });
   };

  vm.changeGameState = function(game){
    if (game.state === 'running') {
      game.state = 'stopped';
    }
    if (game.state === 'planned') {
      game.state = 'running';
    }
    gameService.changeGameState(game).then(function (response) {
      angular.forEach(vm.games, function (game)  {
        if (game.id === response.id) {
          game = response;
        }
      });
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

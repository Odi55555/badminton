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
  vm.dateAlreadyExists = false;

  $scope.$on('$ionicView.enter', function() {
    vm.games = [];

    // remove dates that are before today
    gameService.getGames().then(function(games) {
      vm.games = games;
    });
  });


  // TODO forbid to change registrations when a game already starts

  vm.addNewGameDatePickerCallback = function(selectedDate) {
    if (typeof(selectedDate) === 'undefined') {      
      console.log('Date not selected');
      return;
    }
    // check if game already exists
    lodash.each(vm.games, function(game) {
      if (moment(game.date).isSame(selectedDate, 'day')) {
        vm.dateAlreadyExists = true;
      }
    });
    if (vm.dateAlreadyExists) {
      return;
    }
    vm.dateAlreadyExists = false;
    var newGame = {
      date: moment(selectedDate).format('YYYY-MM-DD'),
      state: 'planned'       
    };
    gameService.createGame(newGame).then(function(response){
      if (response.status === 422) {
        vm.dateAlreadyExists = true;
        return;
      }
      vm.games.push(newGame);
    });
  };

   vm.showConfirm = function(game) {
     var confirmPopup = $ionicPopup.confirm({
       title: 'Spielzustand ändern?',
       template: 'Wenn du das Spiel startest, kann sich kein Spieler mehr an- oder abmelden.<br>Wenn du das Spiel beendest, wird es archiviert.'
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

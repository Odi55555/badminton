angular
    .module('starter.app')
    .factory('gameService', gameService);

gameService.$inject = ['$http', '$log'];

function gameService($http, logger) {
  return {
    register: register,
    getGames: getGames,
    setGames: setGames,
    startGame: startGame
  };

  function register(game) {
    return $http.post('/games/register', game)
        .then(registerComplete)
        .catch(registerFailed);

    function registerComplete(response) {
      return response.data;
    }

    function registerFailed(error) {
      logger.error('XHR Failed for register.' + error.data);
    }
  }

  function getGames() {
    return $http.get('/games')
        .then(getGamesComplete)
        .catch(getGamesFailed);

    function getGamesComplete(response) {
      return response.data;
    }

    function getGamesFailed(error) {
      logger.error('XHR Failed for getGames.' + error.data);
      return [new Date()]
    }
  }

  function setGames(gameDates) {
    return $http.post('/games', gameDates)
        .then(setGamesComplete)
        .catch(setGamesFailed);

    function setGamesComplete(response) {
      return response.data;
    }

    function setGamesFailed(error) {
      logger.error('XHR Failed for setGames.' + error.data);
    }
  }

  function startGame(gameDate) {
    return $http.post('/games/start', gameDate)
        .then(startGameComplete)
        .catch(startGameFailed);

    function startGameComplete(response) {
      return response.data;
    }

    function startGameFailed(error) {
      logger.error('XHR Failed for startGame.' + error.data);
    }
  }
}

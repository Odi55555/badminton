angular
    .module('starter.app')
    .factory('gameService', gameService);

gameService.$inject = ['$http', '$log', 'Config'];

function gameService($http, logger, Config) {
  var baseUrl = Config.apiUrl + '/Games';

  return {
    getGames: getGames,
    getGamesWithRegistrations: getGamesWithRegistrations,
    createGame: createGame,
    changeGameState: changeGameState
  };

  function getGames() {
    return $http.get(baseUrl + '?filter[order]=date')
        .then(getGamesComplete)
        .catch(getGamesFailed);

    function getGamesComplete(response) {
      return response.data;
    }

    function getGamesFailed(error) {
      logger.error('XHR Failed for getGames.' + error.data.error.message);
    }
  }

  function getGamesWithRegistrations() {
    return $http.get(baseUrl + '/gamesWithRegistrations')
        .then(getGamesComplete)
        .catch(getGamesFailed);

    function getGamesComplete(response) {
      return response.data.games;
    }

    function getGamesFailed(error) {
      logger.error('XHR Failed for getGames.' + error.data.error.message);
    }
  }

  function createGame(game) {
    return $http.post(baseUrl, game)
        .then(createGameComplete)
        .catch(createGameFailed);

    function createGameComplete(response) {
      return response.data;
    }

    function createGameFailed(error) {
      logger.error('XHR Failed for createGame.' + error.data);
      return error;
    }
  }

  function changeGameState(gameDate) {
    return $http.put(baseUrl + '/' + gameDate.id, gameDate)
        .then(changeGameStateComplete)
        .catch(changeGameStateFailed);

    function changeGameStateComplete(response) {
      return response.data;
    }

    function changeGameStateFailed(error) {
      logger.error('XHR Failed for changeGameState.' + error.data);
    }
  }
}

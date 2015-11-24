angular
    .module('starter.app')
    .factory('gameService', gameService);

gameService.$inject = ['$http', '$log', 'Config'];

function gameService($http, logger, config) {
  var baseUrl = config.apiUrl + '/Games';

  return {
    register: register,
    getGames: getGames,
    createGame: createGame,
    startGame: startGame,
    getPlayers: getPlayers
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
    return $http.get(baseUrl)
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

  function createGame(game) {
    return $http.post(baseUrl, game)
        .then(createGameComplete)
        .catch(createGameFailed);

    function createGameComplete(response) {
      return response.data;
    }

    function createGameFailed(error) {
      logger.error('XHR Failed for createGame.' + error.data);
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

  function getPlayers(gameDate) {
    return $http.post('/games/players', gameDate)
        .then(getPlayersComplete)
        .catch(getPlayersFailed);

    function getPlayersComplete(response) {
      return response.data;
    }

    function getPlayersFailed(error) {
      logger.error('XHR Failed for getPlayers.' + error.data);
      // TODO remove mocked data
      return [{name: 'Patrick', backToCompany: true, preferredTimeslot: 'Früh', duration: '1,5h', passengers: 2, dinner: false},
      {name: 'Christian', backToCompany: false, preferredTimeslot: 'Spät', duration: '1,5h', dinner: false}]
    }
  }
}

angular
    .module('starter.app')
    .factory('registrationService', registrationService);

registrationService.$inject = ['$http', '$log', 'Config'];

function registrationService($http, logger, Config) {
  var baseUrl = Config.apiUrl + '/Registrations';

  return {
    register: register,
    getRegistrations: getRegistrations
  };

  function register(gameData) {
    return $http.post(baseUrl + '/register', gameData)
        .then(registerComplete)
        .catch(registerFailed);

    function registerComplete(response) {
      return response.data;
    }

    function registerFailed(error) {
      logger.error('XHR Failed for register.' + error.data);
    }
  }

  function getRegistrations(gameId) {
    return $http.post(baseUrl + '/getRegistrations', {gameId: gameId})
        .then(getRegistrationsComplete)
        .catch(getRegistrationsFailed);

    function getRegistrationsComplete(response) {
      return response.data.registrations;
    }

    function getRegistrationsFailed(error) {
      logger.error('XHR Failed for getRegistrations.' + error.data.error.message);
    }
  }
}

angular
    .module('starter.app')
    .factory('registrationService', registrationService);

registrationService.$inject = ['$http', '$log', 'Config'];

function registrationService($http, logger, Config) {
  var baseUrl = Config.apiUrl + '/Registrations';

  return {
    register: register,
    getRegistration: getRegistration
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

  function getRegistration(data) {
    return $http.post(baseUrl + '/getRegistration', data)
        .then(getRegistrationComplete)
        .catch(getRegistrationFailed);

    function getRegistrationComplete(response) {
      return response.data.getRegistration;
    }

    function getRegistrationFailed(error) {
      logger.error('XHR Failed for getRegistration.' + error.data.error.message);
    }
  }
}

angular
    .module('starter.app')
    .factory('playerService', playerService);

playerService.$inject = ['$http', '$log', 'Config', 'authService', 'localStorageService', 'ENV'];

function playerService($http, logger, Config, authService, localStorageService, ENV) {
  var baseUrl = ENV.apiEndpoint + '/Players';

  return {
    login: login
  };

  function login(username, password) {
    return $http.post(baseUrl + '/login', {username: username, password: password})
        .then(loginComplete)
        .catch(loginFailed);

    function loginComplete(response) {
      Config.token = response.data.id;
      Config.username = username;
      Config.userId = response.data.userId;

      localStorageService.set('token', Config.token);
      localStorageService.set('username', Config.username);
      localStorageService.set('userId', Config.userId);

      authService.loginConfirmed();
      return response;
    }

    function loginFailed(error) {
      Config.token = undefined;
      logger.error('XHR Failed for login.' + error.data);
      return error;
    }
  }
}

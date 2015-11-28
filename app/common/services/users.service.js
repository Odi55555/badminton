angular
    .module('starter.app')
    .factory('userService', userService);

userService.$inject = ['$http', '$log', 'Config'];

function userService($http, logger, Config) {
  var baseUrl = Config.apiUrl + '/Users';

  return {
    login: login,
    getUsers: getUsers
  };

  function login(username, password) {
    return $http.post(baseUrl + '/login', {email: username, password: password})
        .then(loginComplete)
        .catch(loginFailed);

    function loginComplete(response) {
      Config.token = response.data.id;
      return response;
    }

    function loginFailed(error) {
      Config.token = undefined;
      logger.error('XHR Failed for login.' + error.data);
      return error;
    }
  }

  function getUsers() {
    return $http.get('/users')
        .then(getUsersComplete)
        .catch(getUsersFailed);

    function getUsersComplete(response) {
      return response.data;
    }

    function getUsersFailed(error) {
      logger.error('XHR Failed for getUsers.' + error.data);
    }
  }
}

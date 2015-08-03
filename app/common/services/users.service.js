angular
    .module('starter.app')
    .factory('userService', userService);

userService.$inject = ['$http', '$log', 'Config'];

function userService($http, logger, Config) {
  return {
    login: login,
    getUsers: getUsers
  };

  function login(username, password) {
    return $http.post('/users/login', {username: username, password: password})
        .then(loginComplete)
        .catch(loginFailed);

    function loginComplete(response) {
      Config.token = response.data.token;
      return response.data.results;
    }

    function loginFailed(error) {
      Config.token = undefined;
      logger.error('XHR Failed for login.' + error.data);
    }
  }

  function getUsers() {
    return $http.get('/users/getUsers')
        .then(getUsersComplete)
        .catch(getUsersFailed);

    function getUsersComplete(response) {
      return response.data.results;
    }

    function getUsersFailed(error) {
      logger.error('XHR Failed for getUsers.' + error.data);
    }
  }
}

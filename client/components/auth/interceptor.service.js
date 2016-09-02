'use strict';

(function() {

  function authInterceptor($rootScope, $q, $cookies, $injector, Util) {
    var state;
    return {
      // Add authorization token to headers
      request(config) {
        config.headers = config.headers || {};
        config.headers['Accept'] = 'application/json;odata=verbose';
        config.headers['Authorization']='Bearer 123904-affc-131239';
        if ($cookies.get('token') && Util.isSameOrigin(config.url)) {
          config.headers.Authorization = 'Bearer ' + $cookies.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError(response) {
        if (response.status === 401) {
          (state || (state = $injector.get('$state')))
          .go('login');
          // remove any stale tokens
          $cookies.remove('token');
        }
        return $q.reject(response);
      }
    };
  }

  angular.module('recomNodeApp.auth')
    .factory('authInterceptor', authInterceptor);
})();

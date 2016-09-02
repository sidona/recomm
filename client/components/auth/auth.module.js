'use strict';

angular.module('recomNodeApp.auth', ['recomNodeApp.constants', 'recomNodeApp.util', 'ngCookies',
    'ui.router'
  ])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

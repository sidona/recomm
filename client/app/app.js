'use strict';

angular.module('recomNodeApp', ['recomNodeApp.auth',
  'recomNodeApp.admin',
  'recomNodeApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ngMaterial',
  'hm.readmore',
  'ngMdIcons',
  'ngFileUpload',
  'angularFileUpload',
  'ngMessages',
  'md.data.table'

])
  .config(function ($urlRouterProvider, $locationProvider,$compileProvider,$httpProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https|ftp|mailto|chrome-extension|filesystem|filesystem:chrome-extension‌​|blob:chrome-extension|cust-scheme|unsafe):|file/);
    $urlRouterProvider.otherwise('/login');

    $httpProvider.defaults.headers.common = {
      'Authorization':'Bearer 123904-affc-131239',
      'Content-Type': 'application/json'
    };

    $locationProvider.html5Mode(true);
  })
.config(function($mdThemingProvider) {
  var neonRedMap = $mdThemingProvider.extendPalette('cyan', {
    '500': '#507f99',
    'contrastDefaultColor': 'white'
  });
  // Register the new color palette map with the name <code>neonRed</code>
  $mdThemingProvider.definePalette('neonRed', neonRedMap);
  // Use that theme for the primary intentions
  $mdThemingProvider.theme('default')
    .primaryPalette('neonRed');

})



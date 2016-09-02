
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('addJob', {
      url: '/admin/addJob',
      template: '<add-job></add-job>',
      authenticate: 'admin'
    });
  });

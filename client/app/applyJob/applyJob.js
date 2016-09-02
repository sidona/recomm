
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('applyJob', {
      url: '/applyJob',
      template: '<apply-job></apply-job>',
      authenticate: true
    });
    $stateProvider.state('applyJob.opportunity', {
      url: '/:id',
      authenticate: true

    });
  });

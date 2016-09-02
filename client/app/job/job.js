/**
 * Created by sdonose on 7/22/2016.
 */
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('job', {
      url: '/jobs',
      template: '<job></job>',
      authenticate: true
    })
      .state('jobEdit', {
        url: '/admin/job/:id',
        template: '<job-edit></job-edit>',
        authenticate: true
      })
  });

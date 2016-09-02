/**
 * Created by sdonose on 7/29/2016.
 */
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('inactiveJobs', {
      url: '/admin/inactiveJobs',
      template: '<inactive-jobs></inactive-jobs>',
      authenticate: 'admin'
    })

  });

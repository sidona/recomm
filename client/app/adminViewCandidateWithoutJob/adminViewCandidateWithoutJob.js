/**
 * Created by sdonose on 8/17/2016.
 */
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('adminViewCandidate', {
      url: '/admin/adminViewCandidate',
      template: '<admin-view-candidate></admin-view-candidate>',
      authenticate: 'admin'
    })

  });

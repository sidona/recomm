/**
 * Created by sdonose on 7/29/2016.
 */
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('adminView', {
      url: '/admin/adminView',
      template: '<admin-view></admin-view>',
      authenticate: 'admin'
    })

  });

/**
 * Created by sdonose on 7/27/2016.
 */
'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('userRecommend', {
      url: '/userRecommend',
      template: '<user-recommend></user-recommend>',
      authenticate: true
    });
  });

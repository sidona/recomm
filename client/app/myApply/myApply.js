/**
 * Created by sdonose on 8/16/2016.
 */

'use strict';

angular.module('recomNodeApp')
  .config(function($stateProvider) {
    $stateProvider.state('myApply', {
      url: '/myApply',
      template: '<my-apply></my-apply>',
      authenticate: true
    });
  });

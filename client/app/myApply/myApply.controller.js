/**
 * Created by sdonose on 8/16/2016.
 */

'use strict';

(function() {

  class MyApplyController {

    constructor($http, Auth) {
      this.$http = $http;
      this.Auth = Auth;
      this.currentPage = 10;
      this.viewby = 10;
      this.itemsPerPage = this.viewby;
      this.lessText = "less";
      this.moreText = "more";
      this.limit=50;
      this.candidate = this.Auth.getCurrentUser().name;
      this.candidates = [];
      console.log(this.candidate)
    }

    $onInit() {
      this.$http.get('/api/candidates/myApply/' + this.candidate)
        .then(response => {
          this.candidates = response.data;
          console.log(this.candidates);
          this.totalItems = this.candidates.length;
        });
    }

    pageChanged() {
      console.log('Page changed to: ' + this.currentPage);
    };

    setItemsPerPage(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    };

  }
  angular.module('recomNodeApp')
    .component('myApply', {
      templateUrl: 'app/myApply/myApply.html',
      controller: MyApplyController
    });
})();

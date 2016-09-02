/**
 * Created by sdonose on 7/29/2016.
 */
'use strict';

(function() {

  class InactiveJobsController {

    constructor($http,$state) {
      this.$http = $http;
      this.$state=$state;
      this.totalItems='';
      this.currentPage = 10;
      this.viewby = 10;
      this.itemsPerPage = this.viewby;
      this.lessText = "less";
      this.moreText = "more";
      this.limit=50;
      this.dotsClass = "toggle-dots-grey";
      this.linkClass = "toggle-link-yellow";
      this.customFullscreen='';
      this.search={};

      this.inactiveJobs = [];

    }


    $onInit() {
      this.$http.get('/api/jobs/history')
        .then(response => {
          this.inactiveJobs = response.data;
          this.totalItems = this.inactiveJobs.length;
          console.log(this.inactiveJobs)
        });

    }

    pageChanged() {
      console.log('Page changed to: ' + this.currentPage);
    };

    setItemsPerPage(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    };



    deleteJob(job){
      this.$http.delete('/api/jobs/' + job._id)
        .then(() => {
          this.$state.reload();
        })
    }
  }


  angular.module('recomNodeApp')
    .component('inactiveJobs', {
      templateUrl: 'app/inactiveJobs/inactiveJobs.html',
      controller: InactiveJobsController
    });
})();

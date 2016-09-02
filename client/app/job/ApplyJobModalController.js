/**
 * Created by sdonose on 8/10/2016.
 */
'use strict';

class ApplyJobModalController {
  constructor($http, Auth, $location, $mdDialog, $stateParams, jobId,jobTitle,jobAgency) {
    this.$http = $http;
    this.Auth = Auth;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.jobId = jobId;
    this.jobTitle=jobTitle;
    this.jobAgency=jobAgency;
    this.resEmail={};

  }


  hide() {
    this.$mdDialog.hide();
  };

  cancel() {
    this.$mdDialog.cancel();
  };


  confirmApply() {
    if (this.information) {
      this.$http.post('/api/candidates/', {
        information:this.information,
        full_name: this.Auth.getCurrentUser().name,
        recommend_by:this.Auth.getCurrentUser().name,
        skill:'intern',
        cv_file:'intern',
        job:this.jobId,
        for_agency:this.jobAgency

      }).then(() => {
       // this.$mdDialog.hide();
        //this.$location.replace();
       // this.$location.url("/jobs");
        this.$http.get('/api/candidates/send/sendEmail')
          .then(res => {
            this.resEmail = res.data;
          });
      });
      this.information = '';


    }
    this.$mdDialog.hide();

  };
}
angular.module('recomNodeApp')
  .controller('ApplyJobModalController', ApplyJobModalController)

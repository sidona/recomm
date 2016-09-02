/**
 * Created by sdonose on 8/17/2016.
 */

'use strict';

class DeleteJobController {
  constructor($http, Auth, $location, $mdDialog, $stateParams,$state, jobId,jobTitle) {
    this.$http = $http;
    this.Auth = Auth;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$stateParams = $stateParams;
    this.$state=$state;
    this.jobId = jobId;
    this.jobTitle=jobTitle;
  }

  hide() {
    this.$mdDialog.hide();
  };

  cancel() {
    this.$mdDialog.cancel();
  };
  deleteJob(){
    this.$http.delete('/api/jobs/' + this.jobId)
      .then(() => {
        this.$state.reload();
        this.$mdDialog.hide();
      })
  }

}
angular.module('recomNodeApp')
  .controller('DeleteJobController', DeleteJobController);

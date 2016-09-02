/**
 * Created by sdonose on 7/22/2016.
 */
'use strict';

class CommentJobController {
  constructor($http,Auth, $location, $mdDialog,$stateParams,$state,jobId) {
    this.$http = $http;
    this.Auth=Auth;
    this.$location = $location;
    this.$mdDialog = $mdDialog;
    this.$stateParams=$stateParams;
    this.$state=$state;
    this.jobId=jobId;

  }

  hide() {
    this.$mdDialog.hide();
  };

  cancel() {
    this.$mdDialog.cancel();
  };

  commentAdd() {
    if (this.comment) {
      this.$http.post('/api/jobs/'+this.jobId, {
          comment: this.comment,
          author:this.Auth.getCurrentUser().name,


      }).then(() => {
        this.$state.reload();
        this.$mdDialog.hide();
        this.$location.replace();
        this.$location.url("/jobs");

      });
      this.comment='';


    }
    this.$mdDialog.hide();


  };

}

angular.module('recomNodeApp')
  .controller('CommentJobController', CommentJobController)

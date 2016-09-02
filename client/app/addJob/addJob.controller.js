/**
 * Created by sdonose on 7/25/2016.
 */
'use strict';

(function() {

  class AddJobController {

    constructor($http,$state) {
      this.$http = $http;
      this.$state=$state;
      this.job = [];
    }


    jobAdd(){
      if (this.job.title && this.job.skill && this.job.experience  && this.job.priority && this.job.for_agency && this.job.available_places && this.job.contact_person && this.job.description) {
        this.$http.post('/api/jobs/', {
          title: this.job.title,
          skill:this.job.skill,
          experience:this.job.experience,
          client_type:this.job.client_type,
          priority:this.job.priority,
          for_agency:this.job.for_agency,
          available_places:this.job.available_places,
          contact_person:this.job.contact_person,
          description:this.job.description
        }).then(() => {
          this.$state.go('job');
        });
        this.job.title = '';
        this.job.skill = '';
        this.job.experience = '';
        this.job.client_type = '';
        this.job.priority='';
        this.job.for_agency='';
        this.job.available_places='';
        this.job.contact_person='';
        this.job.description='';
      }
    }
    redirectJob(){
      this.$state.go('job');
    }
  }

  angular.module('recomNodeApp')
    .component('addJob', {
      templateUrl: 'app/addJob/addJob.html',
      controller: AddJobController
    });
})();

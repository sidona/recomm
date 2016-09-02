/**
 * Created by sdonose on 7/22/2016.
 */

'use strict';
(function(){

  class JobEditComponent {
    constructor($http,$stateParams,$state) {
      this.$http = $http;
      this.$stateParams=$stateParams;
      this.$state=$state;
      this.job=[];

    }

    $onInit() {
      this.$http.get('/api/jobs/'+this.$stateParams.id)
        .then(response => {
          this.job = response.data;
          console.log('job',this.job)
        });
    }
    updateJob(){
      if (this.job.title && this.job.skill && this.job.experience  && this.job.priority && this.job.available_places && this.job.contact_person && this.job.description && this.job.for_agency) {
        this.$http.put('/api/jobs/'+this.$stateParams.id, {
          title: this.job.title,
          skill:this.job.skill,
          experience:this.job.experience,
          client_type:this.job.client_type,
          priority:this.job.priority,
          available_places:this.job.available_places,
          contact_person:this.job.contact_person,
          description:this.job.description,
          for_agency:[this.job.for_agency]
        }).then(() => {
          this.$state.go('job');
        });
        this.job.title = '';
        this.job.skill = '';
        this.job.experience = '';
        this.job.client_type = '';
        this.job.priority='';
        this.job.available_places='';
        this.job.contact_person='';
        this.job.description='';
        this.job.for_agency=''
      }
    }
    redirectJob(){
      this.$state.go('job');
    }

  }

  angular.module('recomNodeApp')
    .component('jobEdit', {
      templateUrl: 'app/job/jobEdit.html',
      controller: JobEditComponent
    });

})();

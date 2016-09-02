'use strict';

(function () {

  class ApplyJobController {

    constructor($http, $state, $window, Auth, Upload) {
      this.$http = $http;
      this.$state = $state;
      this.$window = $window;
      this.Auth = Auth;
      this.jobId = '';
      this.jobTitle='';
      this.file = '';
      this.Upload = Upload;
      this.alerts = [];
      if (this.$state.params.id) {
        this.jobId = this.$state.params.id;
        this.jobTitle=this.jobTitle.title;
        this.showRecomandare=true;
      }
      else {
        this.jobId = "fara";
        this.jobTitle='fara oportunitate';

      }



    }
    $onInit() {
      if (this.$state.params.id) {
        this.$http.get('/api/jobs/' + this.jobId)
          .then(response => {
            this.jobTitle = response.data;

          });
      }else{
        return null;
      }
    }

    submit() {

      if (this.full_name && this.skill && this.email && this.for_agency && this.experience && this.information && this.relation && this.file) {
        this.$http.post('/api/candidates/', {
          full_name: this.full_name,
          skill: this.skill,
          email: this.email,
          cv_file: this.file.name,
          for_agency: this.for_agency,
          experience: this.experience,
          information: this.information,
          relation: this.relation,
          recommend_by: this.Auth.getCurrentUser().name,
          recommend_for_job: this.jobId,
          job: this.jobId,
          jobTitle:this.jobTitle.title


        }).then(() => {
          this.$state.go('job');
          this.$http.get('/api/candidates/send/sendEmail')
            .then(res => {
              this.resEmail = res.data;
            });
        });
        this.full_name = '';
        this.skill = '';
        this.email = '';
        this.file='';
        this.relation = '';
        this.for_agency = '';
        this.experience = '';
        this.information = '';
        this.relation = '';
        console.log('this.Auth.getCurrentUser', this.Auth.getCurrentUser().name);
        console.log('this.$state.params.id', this.opportunityId);

      }
    }

    submitUpload() {

        this.upload(this.file);
      console.log(this.file)

    }
    upload(file) {
      this.Upload.upload({
        url: '/api/candidates/upload',
        data: {file: file},
        method: 'POST',
        arrayKey: '',
        headers: {'Authorization': 'xxx'}, // only for html5

      }).then(function (resp) {
        //console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
      }, function (resp) {
        //console.log('Error status: ' + resp.status);
      }, function (evt) {
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + progressPercentage + '% ' );
      });
    }

    redirectJob(){
        this.$state.go('job');
    }
  }




  angular.module('recomNodeApp')
    .component('applyJob', {
      templateUrl: 'app/applyJob/applyJob.html',
      controller: ApplyJobController
    });
})();

/**
 * Created by sdonose on 8/17/2016.
 */

'use strict';

(function() {

  class AdminViewCandidateWithoutJobController {

    constructor($http, $state) {
      this.$http = $http;
      this.$state = $state;
      this.totalItems = '';
      this.currentPage = 10;
      this.viewby = 10;
      this.itemsPerPage = this.viewby;
      this.lessText = "less";
      this.moreText = "more";
      this.limit = 25;
      this.dotsClass = "toggle-dots-grey";
      this.linkClass = "toggle-link-yellow";
      this.customFullscreen = '';

      this.search={};


      this.candidates = [];

    }

    $onInit() {
      this.$http.get('/api/candidates/without')
        .then(response => {
          this.candidates = response.data;
          this.totalItems = this.candidates.length;
        })
    }
    downloadFile(candidateCv){
      console.log('candidateCv',candidateCv)
      this.$http({
        method:'GET',
        url:'api/candidates/download/'+candidateCv,
        responseType:'arraybuffer'
        //params:{file:candidateCv}
      }).success(function (data,status,headers) {
        headers = headers();

        var filename = candidateCv;
        var contentType = headers['content-type'];

        var linkElement = document.createElement('a');
        try {
          var blob = new Blob([data], { type: contentType });
          var url = window.URL.createObjectURL(blob);

          linkElement.setAttribute('href', url);
          linkElement.setAttribute("download", filename);
          console.log('filename',filename)

          var clickEvent = new MouseEvent("click", {
            "view": window,
            "bubbles": true,
            "cancelable": false
          });
          linkElement.dispatchEvent(clickEvent);
        } catch (ex) {
          console.log(ex);
        }
      }).error(function (data) {
        console.log(data);
      })

    };



    submitComment(candidateId,comment,status){
      if(comment && status){
        this.$http.put('/api/candidates/'+candidateId ,{
          comment:comment,
          status:status
        });
        console.log(candidateId);
      }
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
    .component('adminViewCandidate', {
      templateUrl: 'app/adminViewCandidateWithoutJob/adminViewCandidateWithoutJob.html',
      controller: AdminViewCandidateWithoutJobController
    });
})();

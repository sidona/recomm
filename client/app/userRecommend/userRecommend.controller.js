/**
 * Created by sdonose on 7/27/2016.
 */
'use strict';

(function() {

  class UserRecommendController {

    constructor($http, Auth) {
      this.$http = $http;
      this.Auth = Auth;
      this.currentPage = 10;
      this.viewby = 10;
      this.itemsPerPage = this.viewby;
      this.candidate = this.Auth.getCurrentUser().name;
      this.lessText = "less";
      this.moreText = "more";
      this.limit=50;
      this.candidates = [];
      console.log(this.candidate)
    }

    $onInit() {
      this.$http.get('/api/candidates/recommend/' + this.candidate)
        .then(response => {
          this.candidates = response.data;
          console.log(this.candidates);
          this.totalItems = this.candidates.length;
        });
    }
    downloadFile(candidateCv){
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

    pageChanged() {
      console.log('Page changed to: ' + this.currentPage);
    };

    setItemsPerPage(num) {
      this.itemsPerPage = num;
      this.currentPage = 1;
    };

  }
  angular.module('recomNodeApp')
    .component('userRecommend', {
      templateUrl: 'app/userRecommend/userRecommend.html',
      controller: UserRecommendController
    });
})();

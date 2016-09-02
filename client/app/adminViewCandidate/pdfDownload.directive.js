/**
 * Created by sdonose on 8/3/2016.
 */
'use strict';

angular.module('recomNodeApp')
  .directive('pdfDownload',function () {

    return {
      restrict: 'E',
      templateUrl: 'app/adminViewCandidate/pdfDownload.html',
      scope: true,
      link: function (scope, element, attr) {
        var anchor = element.children()[0];


        // When the download starts, disable the link
        scope.$on('download-start', function () {
          $(anchor).attr('disabled', 'disabled');
        });

        // When the download finishes, attach the data to the link. Enable the link and change its appearance.
        // scope.$on('downloaded', function (event, data) {
        //   $(anchor).attr({
        //     href: 'data:application/pdf;base64,' + data,
        //     download: attr.filename
        //   })
        //     .removeAttr('disabled')
        //     .text('Save')
        //     .removeClass('btn-primary')
        //     .addClass('btn-success');
        //
        //   // Also overwrite the download pdf function to do nothing.
        //   scope.downloadPdf = function () {
        //   };
        // });
      },
      controller: ['$scope', '$attrs', '$http', function($scope, $attrs, $http) {
        $scope.downloadPdf = function() {
          $scope.$emit('download-start');
          $http.get($attrs.url).then(function(response) {
            $scope.$emit('downloaded', response.data);
          });
        };
      }]
    }

  });

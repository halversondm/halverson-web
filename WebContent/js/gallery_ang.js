'use strict';

var photoGallery = angular.module('photoGallery', ['ui.bootstrap']);
photoGallery.controller('photoGalleryController', ['$scope', '$attrs', '$modal', function ($scope, $attrs, $modal) {
    $scope.photoArray = [];
    $scope.buttons = [];
    $scope.fileprefix = $attrs.fileprefix;
    $scope.filesuffix = $attrs.filesuffix;

    var totalPhotos = Number($attrs.totalphotos);
    var perPage = Number($attrs.perpage);
    // determine the first photo and the last photo to appear on each page/button.
    // the equal division of photos results in the number of buttons needed.
    var firstPhoto = [];
    var lastPhoto = [];
    var go = true;
    var page = 0;
    while (go) {
        if (page === 0) {
            firstPhoto.push(1);
            lastPhoto.push(perPage);
        } else {
            var nextFirst = lastPhoto[page - 1] + 1;
            var nextLast = nextFirst + perPage;
            if (nextLast > totalPhotos) {
                nextLast = totalPhotos;
            }
            firstPhoto.push(nextFirst);
            lastPhoto.push(nextLast);
        }

        $scope.buttons.push(page + 1);
        if (lastPhoto[page] === totalPhotos) {
            go = false;
        } else {
            page++;
        }
    }

    buildArray(1);

    $scope.click = function (pageNumber) {
        buildArray(pageNumber);
    };

    function buildArray(pageNumber) {
        $scope.photoArray = [];
        for (var i = firstPhoto[pageNumber - 1]; i <= lastPhoto[pageNumber - 1]; i++) {
            var source = $scope.fileprefix + i + $scope.filesuffix;
            $scope.photoArray.push(source);
        }
    }

    $scope.open = function (index) {
        $modal.open({
            animation: false,
            templateUrl: 'pictureModal.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                photo: function () {
                    return {
                        "index": index,
                        "photoArray": $scope.photoArray
                    };
                }
            }
        });
    };
}]);

photoGallery.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'photo', function ($scope, $modalInstance, photo) {

    $scope.photo = Number(photo.index);
    $scope.photoArray = photo.photoArray;
    showHideButtons();

    $scope.prev = function () {
        $scope.photo--;
        showHideButtons();
    };

    $scope.next = function () {
        $scope.photo++;
        showHideButtons();
    };

    function showHideButtons() {
        $scope.modalPhoto = $scope.photoArray[$scope.photo];
        if ($scope.photo === 0) {
            $scope.hidePrevious = true;
        } else {
            $scope.hidePrevious = false;
        }
        if ($scope.photo === ($scope.photoArray.length - 1)) {
            $scope.hideNext = true;
        } else {
            $scope.hideNext = false;
        }
    }

}]);

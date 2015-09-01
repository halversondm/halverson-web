'use strict';

var photoGallery = angular.module('photoGallery', ['ui.bootstrap']);
photoGallery.controller('photoGalleryController', ['$scope', '$attrs', '$modal', '$log', function ($scope, $attrs, $modal, $log) {
    $scope.photoCount = [];
    $scope.buttons = [];

    var totalPhotos = Number($attrs.totalphotos);
    var perPage = Number($attrs.perpage);
    // determine # of buttons needed
    $scope.totalPages = Math.round(totalPhotos / perPage);
    for (var button = 1; button <= $scope.totalPages; button++) {
        $scope.buttons.push(button);
    }
    // determine the first photo and the last photo to appear on the page/button
    var firstPhoto = [];
    var lastPhoto = [];
    for (var page = 0; page <= $scope.totalPages; page++) {
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
    }


    $scope.click = function (pageNumber) {
        $scope.photoCount = [];
        $scope.firstPagePhoto = firstPhoto[pageNumber - 1];
        $scope.lastPagePhoto = lastPhoto[pageNumber - 1];
        for (var i = $scope.firstPagePhoto; i <= $scope.lastPagePhoto; i++) {
            $scope.photoCount.push(i);
        }
        $scope.currentTpl = "/generateGallery.html";
    };

    $scope.getTemplate = function () {
        return $scope.currentTpl;
    };

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = false;

    $scope.open = function (size) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'pictureModal.html',
            controller: 'ModalInstanceCtrl',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}]);

photoGallery.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', 'items', function ($scope, $modalInstance, items) {

    $scope.items = items;
    $scope.selected = {
        item: $scope.items[0]
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
}]);

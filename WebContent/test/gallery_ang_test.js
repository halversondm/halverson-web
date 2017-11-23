/**
 * Created by Daniel on 9/1/2015.
 */
'use strict';

describe('Gallery Suite', function () {

    beforeEach(module('photoGallery'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('gallery generation', function () {

        var $scope = {};
        var $attrs = {};
        var $modal = {};
        $attrs.fileprefix = "./photos/photo";
        $attrs.filesuffix = ".jpg";
        $attrs.perpage = 5;

        it('should build a photo array, remainder division for buttons', function () {

            $attrs.totalphotos = "12";

            var controller = $controller('photoGalleryController', {$scope: $scope, $attrs: $attrs, $modal: $modal});

            expect($scope.photoArray.length).toEqual(5);
            expect($scope.buttons.length).toEqual(3);
            expect($scope.photoArray[0]).toEqual("./photos/photo1.jpg");

        });

        it('should build a photo array, no remainder division for buttons', function () {
            $attrs.totalphotos = "10";

            var controller = $controller('photoGalleryController', {$scope: $scope, $attrs: $attrs, $modal: $modal});

            expect($scope.photoArray.length).toEqual(5);
            expect($scope.buttons.length).toEqual(2);
            expect($scope.photoArray[0]).toEqual("./photos/photo1.jpg");

        });

        it('should build a photo array, no remainder division for buttons, next page', function () {
            $attrs.totalphotos = "10";

            var controller = $controller('photoGalleryController', {$scope: $scope, $attrs: $attrs, $modal: $modal});
            $scope.click(2);

            expect($scope.photoArray.length).toEqual(5);
            expect($scope.buttons.length).toEqual(2);
            expect($scope.photoArray[0]).toEqual("./photos/photo6.jpg");

        });

    });

    describe('modal manipulation', function() {

        var $scope = {};
        var $modalInstance = {};
        var photo = {};
        var photoArray = ["./photos/photo1.jpg", "./photos/photo2.jpg", "./photos/photo3.jpg"];

        it('should allow next and previous', function() {
            photo.index = "1";
            photo.photoArray = photoArray;

            var controller = $controller('ModalInstanceCtrl', {$scope: $scope, $modalInstance: $modalInstance, photo: photo});

            expect($scope.modalPhoto).toEqual(photoArray[1]);
            expect($scope.hidePrevious).toBe(false);
            expect($scope.hideNext).toBe(false);
        });

        it('should not allow previous', function() {
            photo.index = "0";
            photo.photoArray = photoArray;

            var controller = $controller('ModalInstanceCtrl', {$scope: $scope, $modalInstance: $modalInstance, photo: photo});

            expect($scope.modalPhoto).toEqual(photoArray[0]);
            expect($scope.hidePrevious).toBe(true);
            expect($scope.hideNext).toBe(false);
        });

        it('should not allow next', function() {
            photo.index = "2";
            photo.photoArray = photoArray;

            var controller = $controller('ModalInstanceCtrl', {$scope: $scope, $modalInstance: $modalInstance, photo: photo});

            expect($scope.modalPhoto).toEqual(photoArray[2]);
            expect($scope.hidePrevious).toBe(false);
            expect($scope.hideNext).toBe(true);
        });

        it('should advance to the next picture', function() {
            photo.index = "0";
            photo.photoArray = photoArray;

            var controller = $controller('ModalInstanceCtrl', {$scope: $scope, $modalInstance: $modalInstance, photo: photo});
            $scope.next();

            expect($scope.modalPhoto).toEqual(photoArray[1]);
            expect($scope.hidePrevious).toBe(false);
            expect($scope.hideNext).toBe(false);
        });

        it('should rewind to the previous picture', function() {
            photo.index = "1";
            photo.photoArray = photoArray;

            var controller = $controller('ModalInstanceCtrl', {$scope: $scope, $modalInstance: $modalInstance, photo: photo});
            $scope.prev();

            expect($scope.modalPhoto).toEqual(photoArray[0]);
            expect($scope.hidePrevious).toBe(true);
            expect($scope.hideNext).toBe(false);
        });
    });

});
/**
 * Created by Daniel on 9/4/2015.
 */


'use strict';
describe('Base64 Suite', function () {

    beforeEach(module('base64'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('controller tests', function() {

        it('should decode', function() {
            var $scope = {};
            var controller = $controller('decoder', {$scope: $scope});
            $scope.decodeInput = 'anBtYzEyMzQ=';
            $scope.goDecode();

            expect($scope.decodeOutput).toEqual('jpmc1234');
        });

        it('should encode', function() {
            var $scope = {};
            var controller = $controller('encoder', {$scope: $scope});
            $scope.encodeInput = 'jpmc1234';
            $scope.goEncode();

            expect($scope.encodeOutput).toEqual('anBtYzEyMzQ=');
        });
    });

});
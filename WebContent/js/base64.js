/**
 * Created by Daniel on 9/4/2015.
 */

'use strict';

var base64 = angular.module('base64', []);
base64.controller('encoder', ['$scope', function($scope) {

    $scope.goEncode = function() {
        $scope.encodeOutput = window.btoa($scope.encodeInput);
    };

    $scope.clear = function() {
        $scope.encodeOutput = "";
        $scope.encodeInput = "";
    };
}]);
base64.controller('decoder', ['$scope', function($scope) {

    $scope.goDecode = function() {
        $scope.decodeOutput = window.atob($scope.decodeInput);
    };

    $scope.clear = function() {
        $scope.decodeOutput = "";
        $scope.decodeInput = "";
    };
}]);
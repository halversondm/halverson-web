/**
 * Created by Daniel on 8/24/2015.
 */
'use strict';
describe('Discount Calculator Suite', function () {

    beforeEach(module('ang_discountCalculator'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('price', function () {
        it('is missing the price', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.labelPrice = "";
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(true);
            expect($scope.successShow).toBe(false);
            expect($scope.calculationMessage[0]).toEqual('Label price is required and must be a number');
        });
        it('has a price', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.labelPrice = 100.23;
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(true);
            expect($scope.successShow).toBe(false);
            expect($scope.calculationMessage[0]).not.toEqual('Label price is required and must be a number');
        })
    });

    describe('discount #1', function () {
        it('is missing the discount', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.discount1 = "";
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(true);
            expect($scope.successShow).toBe(false);
            expect($scope.calculationMessage[1]).toEqual('Discount #1 is required and must be a number');
        });
        it('has a price', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.discount1 = 50;
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(true);
            expect($scope.successShow).toBe(false);
            expect($scope.calculationMessage[1]).not.toEqual('Discount #1 is required and must be a number');
        })
    });

    describe('discount #2', function () {
        it('is an invalid number', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.discount2 = "xyz";
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(true);
            expect($scope.successShow).toBe(false);
            expect($scope.calculationMessage[2]).toEqual('Discount #2 must be a number, if provided');
        });
    });

    describe('full validation', function () {
        it('has two of three variables for calculation', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.labelPrice = 100.23;
            $scope.discount1 = 50;
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(false);
            expect($scope.successShow).toBe(true);
            expect($scope.calculationMessage[0]).toEqual('Your final price is $50.12 plus tax');
        });
        it('has all three variables for calculation', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.labelPrice = 100.23;
            $scope.discount1 = 50;
            $scope.discount2 = 20;
            $scope.ang_calculate();
            expect($scope.errorShow).toBe(false);
            expect($scope.successShow).toBe(true);
            expect($scope.calculationMessage[0]).toEqual('Your final price is $40.09 plus tax');
        });
    });

    describe('initialization', function () {
        it('sets up all of the variables when requested', function () {
            var $scope = {};
            var controller = $controller('discountCalculatorController', {$scope: $scope});
            $scope.ang_clear();
            expect($scope.errorShow).toBe(false);
            expect($scope.successShow).toBe(false);
            expect($scope.discount1).toEqual("");
            expect($scope.discount2).toEqual("");
            expect($scope.labelPrice).toEqual("");
            expect($scope.calculationMessage.length).toEqual(0);
        });
    });
});
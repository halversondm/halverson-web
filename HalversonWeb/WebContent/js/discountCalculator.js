'use strict';

var calculatorService = (function () {

    var discount1 = 0;
    var discount2 = 0;
    var labelPrice = 0.00;
    var error = false;
    var finalPrice = 0.00;
    var message = [];

    function setFirstDiscount(val) {
        discount1 = val;
    }

    function setSecondDiscount(val) {
        discount2 = val;
    }

    function setLabelPrice(val) {
        labelPrice = val;
    }

    function isError() {
        return error;
    }

    function getFinalPrice() {
        return finalPrice;
    }

    function getMessage() {
        return message;
    }

    function calculate() {
        var firstCalc = labelPrice - (labelPrice * (discount1 / 100));
        var newPrice;
        if (discount2 === 0) {
            newPrice = firstCalc;
        } else {
            newPrice = firstCalc - (firstCalc * (discount2 / 100));
        }
        finalPrice = newPrice.toFixed(2);
        message.push('Your final price is $' + finalPrice + ' plus tax');
    }

    function validate(firstDiscount, secondDiscount, labelPriceVal) {
        message = [];
        error = false;
        if (labelPriceVal.length === 0 || isNaN(labelPriceVal)) {
            message.push("Label price is required and must be a number");
            error = true;
        } else {
            labelPrice = labelPriceVal;
        }
        if (firstDiscount.length === 0 || isNaN(firstDiscount)) {
            message.push("Discount #1 is required and must be a number");
            error = true;
        } else {
            discount1 = firstDiscount;
        }
        if (isNaN(secondDiscount)) {
            message.push("Discount #2 must be a number, if provided");
            error = true;
        } else {
            discount2 = secondDiscount;
        }
    }

    return {
        calculate: calculate,
        validate: validate,
        isError: isError,
        setFirstDiscount: setFirstDiscount,
        setSecondDiscount: setSecondDiscount,
        setLabelPrice: setLabelPrice,
        getFinalPrice: getFinalPrice,
        getMessage: getMessage
    };
})();

var ang_discountCalculator = angular.module('ang_discountCalculator', []);
ang_discountCalculator.controller('discountCalculatorController', ['$scope', function ($scope) {
    init();

    $scope.ang_calculate = function () {
        calculatorService.validate($scope.discount1, $scope.discount2,
            $scope.labelPrice);
        if (!calculatorService.isError()) {
            calculatorService.calculate();
            $scope.successShow = true;
        } else {
            $scope.errorShow = true;
        }
        $scope.calculationMessage = calculatorService.getMessage();
    };

    $scope.ang_clear = function () {
        init();
    };

    function init() {
        $scope.errorShow = false;
        $scope.successShow = false;
        $scope.discount1 = "";
        $scope.discount2 = "";
        $scope.labelPrice = "";
        $scope.calculationMessage = [];
    }
}]);
'use strict';

$('#reset').click(function () {
    calculator.clear();
});

$('#calculate').click(
    function () {
        calculator.clear();
        calculator.validate($('#discount1').val(), $('#discount2').val(),
            $('#labelPrice').val());
        if (!calculator.isError()) {
            calculator.calculate();
        }
    });

var calculator = (function () {

    var discount1 = 0;
    var discount2 = 0;
    var labelPrice = 0.00;
    var error = false;
    var finalPrice = 0.00;

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

    function danger(message) {
        $('#alert_placeholder')
            .append(
            '<div class="alert alert-danger alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button><strong>Error! </strong>' + message + '</div>');
    }

    function success(message) {
        $('#alert_placeholder')
            .html(
            '<div class="alert alert-success alert-dismissible" role="alert"><button type="button" class="close" data-dismiss="alert"><span aria-hidden="true">&times;</span></button>' + message + '</div>');
    }

    function clear() {
        $('#alert_placeholder').html('');
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
        success('Your final price is $' + finalPrice + ' plus tax');
    }

    function validate(firstDiscount, secondDiscount, labelPriceVal) {
        error = false;
        if (labelPriceVal.length === 0 || isNaN(labelPriceVal)) {
            danger('Label price is required and must be a number');
            error = true;
        } else {
            labelPrice = labelPriceVal;
        }
        if (firstDiscount.length === 0 || isNaN(firstDiscount)) {
            danger('Discount #1 is required and must be a number');
            error = true;
        } else {
            discount1 = firstDiscount;
        }
        if (isNaN(secondDiscount)) {
            danger('Discount #2 must be a number, if provided');
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
        clear: clear
    };
})();
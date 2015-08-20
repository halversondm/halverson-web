'use strict';

var stockQuote = angular.module('stockQuote', []);
stockQuote.controller('stockQuoteController', ['$scope', '$http', function ($scope, $http) {
    init();

    function init() {
        $scope.stockList = ["MSFT", "AAPL", "JPM", "AMZN", "T", "F"];
        $scope.stocks = [];
        $scope.stockInput = "";
        var date = new Date();
        $scope.year = date.getFullYear();
        for (var i = 0; i < $scope.stockList.length; i++) {
            makeCall($scope.stockList[i]);
        }
    }

    $scope.submit = function () {
        $scope.stockList.push($scope.stockInput);
        makeCall($scope.stockInput);
        $scope.stockInput = "";
    };

    function makeCall(stockSymbol) {
        var url = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol=" + stockSymbol;
        $http.jsonp(url).then(function (response) {
            if (response.data.Message) {
                alert(response.data.Message);
            } else {
                $scope.stocks.push(response.data);
            }
        }, function (response) {
            console.error("http call failed");
            console.dir(response);
        });
    }
}]);

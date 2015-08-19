'use strict';

// Declare app level module which depends on views, and components
var stockQuote = angular.module('stockQuote', []);
stockQuote.controller('stockQuoteController', ['$scope', '$http', function ($scope, $http) {
    $scope.stockList = ["MSFT", "AAPL", "JPM", "AMZN", "T", "F"];
    $scope.stocks = [];
    $scope.stockInput = "";
    var baseUrl = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol=";

    for (var i = 0; i < $scope.stockList.length; i++) {
        makeCall($scope.stockList[i]);
    }

    $scope.submit = function () {
        $scope.stockList.push($scope.stockInput);
        makeCall($scope.stockInput);
        $scope.stockInput = "";
    };

    function makeCall(stockSymbol) {
        var url = baseUrl + stockSymbol;
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

'use strict';

var stockQuote = angular.module('stockQuote', []);
stockQuote.service('StockQuoteRetrieval', ['$http', function ($http) {
    this.call = function (stockSymbol) {
        var url = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol=" + stockSymbol;
        var promise = $http.jsonp(url).then(function (response) {
            console.info(response.data);
            return response.data;
        }, function (response) {
            var message = {};
            message.Message = "The Stock Quote service could not retrieve your stock information at this time. Please try again later."
            return message;
        });
        return promise;
    }
}]);
stockQuote.controller('stockQuoteController', ['$scope', 'StockQuoteRetrieval', function ($scope, StockQuoteRetrieval) {

    $scope.stockList = ["MSFT", "AAPL", "JPM", "AMZN", "T", "F"];
    $scope.stocks = [];
    $scope.stockInput = "";
    var date = new Date();
    $scope.year = date.getFullYear();
    for (var i = 0; i < $scope.stockList.length; i++) {
        StockQuoteRetrieval.call($scope.stockList[i]).then(function (data) {
            $scope.stocks.push(data);
        });
    }

    $scope.submit = function () {
        $scope.stockList.push($scope.stockInput);
        StockQuoteRetrieval.call($scope.stockInput).then(function (data) {
            $scope.stocks.push(data);
        });
        $scope.stockInput = "";
    };
}]);



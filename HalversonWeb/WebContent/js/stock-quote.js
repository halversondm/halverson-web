'use strict';

var stockQuote = angular.module('stockQuote', []);
stockQuote.service('StockQuoteRetrieval', ['$http', function ($http) {
    this.call = function (stockSymbol) {
        var url = "http://dev.markitondemand.com/Api/v2/Quote/jsonp?jsoncallback=JSON_CALLBACK&symbol=" + stockSymbol;
        return $http.jsonp(url).then(function (response) {
            return response.data;
        }, function (response) {
            var message = {};
            message.Message = "The Stock Quote service could not retrieve your stock information at this time. Please try again later.";
            return message;
        });
    };
}]);
stockQuote.controller('stockQuoteController', ['$scope', 'StockQuoteRetrieval', function ($scope, StockQuoteRetrieval) {

    $scope.stockList = ["MSFT", "AAPL", "JPM", "AMZN", "T", "F"];
    $scope.stocks = [];
    $scope.stockInput = "";
    var date = new Date();
    $scope.year = date.getFullYear();
    var makeCall = function(stockSymbol) {
        StockQuoteRetrieval.call(stockSymbol).then(function (data) {
            $scope.stocks.push(data);
        });
    };

    for (var i = 0; i < $scope.stockList.length; i++) {
        makeCall($scope.stockList[i]);
    }

    $scope.submit = function () {
        $scope.stockList.push($scope.stockInput);
        makeCall($scope.stockInput);
        $scope.stockInput = "";
    };


}]);



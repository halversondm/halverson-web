'use strict';

var rpslsApp = angular.module('rpslsApp', []);
rpslsApp.controller('rpslsController', ['$scope', function ($scope) {

    init();

    $scope.human = function (choice) {
        init();
        var player2 = randomizedPickService.getPick();
        gameService.setPlayer1(choice);
        gameService.setPlayer2(player2);
        setPlayer1Class(choice);
        setPlayer2Class(player2 + "2");
        gameService.takeTurn();
        $scope.explanation = gameService.getResult();
        if (gameService.getWinner() === "Player 1") {
            $scope.winner = "You win!";
            $scope.gameSuccess = true;
        } else if (gameService.getWinner() === "Player 2") {
            $scope.winner = "The computer wins!";
            $scope.gameLose = true;
        } else {
            $scope.winner = gameService.getWinner();
            $scope.gameDraw = true;
        }
    };

    function init() {
        $scope.gameSuccess = false;
        $scope.gameDraw = false;
        $scope.gameLose = false;
        $scope.winner = "";
        $scope.explanation = "";
        $scope.rock = false;
        $scope.lizard = false;
        $scope.scissors = false;
        $scope.spock = false;
        $scope.paper = false;
        $scope.rock2 = false;
        $scope.lizard2 = false;
        $scope.scissors2 = false;
        $scope.spock2 = false;
        $scope.paper2 = false;
    }

    function setPlayer1Class(choice) {
        console.info(choice);
        switch (choice) {
            case "rock":
                $scope.rock = true;
                break;
            case "spock":
                $scope.spock = true;
                break;
            case "lizard":
                $scope.lizard = true;
                break;
            case "scissors":
                $scope.scissors = true;
                break;
            case "paper":
                $scope.paper = true;
                break;
        }
    }

    function setPlayer2Class(choice) {
        switch (choice) {
            case "rock2":
                $scope.rock2 = true;
                break;
            case "spock2":
                $scope.spock2 = true;
                break;
            case "lizard2":
                $scope.lizard2 = true;
                break;
            case "scissors2":
                $scope.scissors2 = true;
                break;
            case "paper2":
                $scope.paper2 = true;
                break;
        }
    }
}]);

var randomizedPickService = (function () {
    var pick;

    function getPick() {
        randomPick();
        return pick;
    }

    function randomPick() {
        var picks = ["spock", "lizard", "scissors", "paper", "rock"];
        var randomNumber = Math.floor((Math.random() * 5));
        pick = picks[randomNumber];
    }

    return {
        getPick: getPick
    };
})();


var gameService = (function () {

    var player1;
    var player2;
    var result;
    var winner;

    function setPlayer1(val) {
        player1 = val;
    }

    function setPlayer2(val) {
        player2 = val;
    }

    function getWinner() {
        return winner;
    }

    function getResult() {
        return result;
    }

    function paper() {
        switch (player2) {
            case "spock":
                result = "Paper Disproves Spock";
                winner = "Player 1";
                break;
            case "lizard":
                result = "Lizard Eats Paper";
                winner = "Player 2";
                break;
            case "scissors":
                result = "Scissors Cut Paper";
                winner = "Player 2";
                break;
            case "rock":
                result = "Paper Covers Rock";
                winner = "Player 1";
                break;
        }
    }

    function rock() {
        switch (player2) {
            case "spock":
                result = "Spock Vaporizes Rock";
                winner = "Player 2";
                break;
            case "lizard":
                result = "Rock Crushes Lizard";
                winner = "Player 1";
                break;
            case "scissors":
                result = "Rock Smashes Scissors";
                winner = "Player 1";
                break;
            case "paper":
                result = "Paper Covers Rock";
                winner = "Player 2";
                break;
        }
    }

    function spock() {
        switch (player2) {
            case "rock":
                result = "Spock Vaporizes Rock";
                winner = "Player 1";
                break;
            case "lizard":
                result = "Lizard Poisons Spock";
                winner = "Player 2";
                break;
            case "scissors":
                result = "Spock Bends Scissors";
                winner = "Player 1";
                break;
            case "paper":
                result = "Paper Disproves Spock";
                winner = "Player 2";
                break;
        }
    }

    function lizard() {
        switch (player2) {
            case "rock":
                result = "Rock Crushes Lizard";
                winner = "Player 2";
                break;
            case "spock":
                result = "Lizard Poisons Spock";
                winner = "Player 1";
                break;
            case "scissors":
                result = "Scissors Decapitate Lizard";
                winner = "Player 2";
                break;
            case "paper":
                result = "Lizard Eats Paper";
                winner = "Player 1";
                break;
        }
    }

    function scissors() {
        switch (player2) {
            case "rock":
                result = "Rock Crushes Scissors";
                winner = "Player 2";
                break;
            case "spock":
                result = "Spock Smashes Scissors";
                winner = "Player 2";
                break;
            case "lizard":
                result = "Scissors Decapitate Lizard";
                winner = "Player 1";
                break;
            case "paper":
                result = "Scissors Cut Paper";
                winner = "Player 1";
                break;
        }
    }

    function takeTurn() {
        result = "Draw";
        winner = "No winner. Please try again.";
        switch (player1) {
            case "spock":
                spock();
                break;
            case "rock":
                rock();
                break;
            case "paper":
                paper();
                break;
            case "lizard":
                lizard();
                break;
            case "scissors":
                scissors();
                break;
        }
    }

    return {
        setPlayer1: setPlayer1,
        setPlayer2: setPlayer2,
        getResult: getResult,
        takeTurn: takeTurn,
        getWinner: getWinner
    };
})();
'use strict';

var rpslsApp = angular.module('rpslsApp', []);
rpslsApp.service('rpslsService', [function () {
    var pick;
    var player1;
    var player2;
    var result;
    var winner;
    var PAPER_DISPROVES_SPOCK = "Paper Disproves Spock";
    var LIZARD_EATS_PAPER = "Lizard Eats Paper";
    var SCISSORS_CUT_PAPER = "Scissors Cuts Paper";
    var PAPER_COVERS_ROCK = "Paper Covers Rock";
    var SPOCK_VAPORIZES_ROCK = "Spock Vaporizes Rock";
    var ROCK_CRUSHES_LIZARD = "Rock Crushes Lizard";
    var ROCK_SMASHES_SCISSORS = "Rock Crushes Scissors";
    var LIZARD_POISONS_SPOCK = "Lizard Poisons Spock";
    var SPOCK_BENDS_SCISSORS = "Spock Smashes Scissors";
    var SCISSORS_DECAPITATE_LIZARD = "Scissors Decapitate Lizard";
    var PLAYER_1 = "Player 1";
    var PLAYER_2 = "Player 2";

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
                result = PAPER_DISPROVES_SPOCK;
                winner = PLAYER_1;
                break;
            case "lizard":
                result = LIZARD_EATS_PAPER;
                winner = PLAYER_2;
                break;
            case "scissors":
                result = SCISSORS_CUT_PAPER;
                winner = PLAYER_2;
                break;
            case "rock":
                result = PAPER_COVERS_ROCK;
                winner = PLAYER_1;
                break;
        }
    }

    function rock() {
        switch (player2) {
            case "spock":
                result = SPOCK_VAPORIZES_ROCK;
                winner = PLAYER_2;
                break;
            case "lizard":
                result = ROCK_CRUSHES_LIZARD;
                winner = PLAYER_1;
                break;
            case "scissors":
                result = ROCK_SMASHES_SCISSORS;
                winner = PLAYER_1;
                break;
            case "paper":
                result = PAPER_COVERS_ROCK;
                winner = PLAYER_2;
                break;
        }
    }

    function spock() {
        switch (player2) {
            case "rock":
                result = SPOCK_VAPORIZES_ROCK;
                winner = PLAYER_1;
                break;
            case "lizard":
                result = LIZARD_POISONS_SPOCK;
                winner = PLAYER_2;
                break;
            case "scissors":
                result = SPOCK_BENDS_SCISSORS;
                winner = PLAYER_1;
                break;
            case "paper":
                result = PAPER_DISPROVES_SPOCK;
                winner = PLAYER_2;
                break;
        }
    }

    function lizard() {
        switch (player2) {
            case "rock":
                result = ROCK_CRUSHES_LIZARD;
                winner = PLAYER_2;
                break;
            case "spock":
                result = LIZARD_POISONS_SPOCK;
                winner = PLAYER_1;
                break;
            case "scissors":
                result = SCISSORS_DECAPITATE_LIZARD;
                winner = PLAYER_2;
                break;
            case "paper":
                result = LIZARD_EATS_PAPER;
                winner = PLAYER_1;
                break;
        }
    }

    function scissors() {
        switch (player2) {
            case "rock":
                result = ROCK_SMASHES_SCISSORS;
                winner = PLAYER_2;
                break;
            case "spock":
                result = SPOCK_BENDS_SCISSORS;
                winner = PLAYER_2;
                break;
            case "lizard":
                result = SCISSORS_DECAPITATE_LIZARD;
                winner = PLAYER_1;
                break;
            case "paper":
                result = SCISSORS_CUT_PAPER;
                winner = PLAYER_1;
                break;
        }
    }

    function takeTurn() {
        winner = "Draw";
        result = "No winner. Please try again.";
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
        setPlayer1: setPlayer1,
        setPlayer2: setPlayer2,
        getResult: getResult,
        takeTurn: takeTurn,
        getWinner: getWinner,
        getPick: getPick
    };
}]);
rpslsApp.controller('rpslsController', ['$scope', 'rpslsService', function ($scope, rpslsService) {

    $scope.human = function (choice) {
        init();
        var player2 = rpslsService.getPick();
        rpslsService.setPlayer1(choice);
        rpslsService.setPlayer2(player2);
        setPlayer1Class(choice);
        setPlayer2Class(player2 + "2");
        rpslsService.takeTurn();
        $scope.explanation = rpslsService.getResult();
        if (rpslsService.getWinner() === "Player 1") {
            $scope.winner = "You win!";
            $scope.gameSuccess = true;
        } else if (rpslsService.getWinner() === "Player 2") {
            $scope.winner = "The computer wins!";
            $scope.gameLose = true;
        } else {
            $scope.winner = rpslsService.getWinner();
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

/**
 * Created by Daniel on 8/25/2015.
 */

'use strict';
describe('RPSLS Suite', function () {

    beforeEach(module('rpslsApp'));

    var $controller;
    var rpslsService;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    beforeEach(inject(function ($injector){
        rpslsService = $injector.get('rpslsService');
        spyOn(rpslsService, 'getPick').and.returnValue('spock');
    }));

    describe('Game Scenarios', function () {
        it('has Player 1 as Spock and Player 2 as Rock', function () {
            test_TakeTurn('spock', 'rock', 'Spock Vaporizes Rock', 'Player 1');
        });

        it('has Player 1 as Spock and Player 2 as Scissors', function () {
            test_TakeTurn('spock', 'scissors', 'Spock Smashes Scissors', 'Player 1');
        });

        it('has Player 1 as Scissors and Player 2 as Lizard', function () {
            test_TakeTurn('scissors', 'lizard', 'Scissors Decapitate Lizard', 'Player 1');
        });

        it('has Player 1 as Scissors and Player 2 as Paper', function () {
            test_TakeTurn('scissors', 'paper', 'Scissors Cuts Paper', 'Player 1');
        });

        it('has Player 1 as Paper and Player 2 as Spock', function () {
            test_TakeTurn('paper', 'spock', 'Paper Disproves Spock', 'Player 1');
        });

        it('has Player 1 as Paper and Player 2 as Rock', function () {
            test_TakeTurn('paper', 'rock', 'Paper Covers Rock', 'Player 1');
        });

        it('has Player 1 as Rock and Player 2 as Scissors', function () {
            test_TakeTurn('rock', 'scissors', 'Rock Crushes Scissors', 'Player 1');
        });

        it('has Player 1 as Rock and Player 2 as Lizard', function () {
            test_TakeTurn('rock', 'lizard', 'Rock Crushes Lizard', 'Player 1');
        });

        it('has Player 1 as Lizard and Player 2 as Spock', function () {
            test_TakeTurn('lizard', 'spock', 'Lizard Poisons Spock', 'Player 1');
        });

        it('has Player 1 as Lizard and Player 2 as Paper', function () {
            test_TakeTurn('lizard', 'paper', 'Lizard Eats Paper', 'Player 1');
        });

        it('has Player 1 as Paper and Player 2 as Lizard', function () {
            test_TakeTurn('paper', 'lizard', 'Lizard Eats Paper', 'Player 2');
        });

        it('has Player 1 as Lizard and Player 2 as Lizard', function () {
            test_TakeTurn('lizard', 'lizard', 'No winner. Please try again.', 'Draw');
        });
        function test_TakeTurn(player1, player2, result, winner) {
            rpslsService.setPlayer1(player1);
            rpslsService.setPlayer2(player2);
            rpslsService.takeTurn();
            expect(rpslsService.getResult()).toEqual(result);
            expect(rpslsService.getWinner()).toEqual(winner);
        }
    });

    describe('controller tests', function () {

        it('Player 1 wins', function () {
            var $scope = {};
            var controller = $controller('rpslsController', {$scope: $scope});
            $scope.human('lizard');
            expect($scope.explanation).toEqual('Lizard Poisons Spock');
            expect($scope.winner).toEqual('You win!');
            expect($scope.gameSuccess).toBe(true);
            expect($scope.gameLose).toBe(false);
            expect($scope.gameDraw).toBe(false);
        });
        it('Player 2 wins', function () {
            var $scope = {};
            var controller = $controller('rpslsController', {$scope: $scope});
            $scope.human('rock');
            expect($scope.explanation).toEqual('Spock Vaporizes Rock');
            expect($scope.winner).toEqual('The computer wins!');
            expect($scope.gameSuccess).toBe(false);
            expect($scope.gameLose).toBe(true);
            expect($scope.gameDraw).toBe(false);
        });
        it('Draw', function () {
            var $scope = {};
            var controller = $controller('rpslsController', {$scope: $scope});
            $scope.human('spock');
            expect($scope.explanation).toEqual('No winner. Please try again.');
            expect($scope.winner).toEqual('Draw');
            expect($scope.gameSuccess).toBe(false);
            expect($scope.gameLose).toBe(false);
            expect($scope.gameDraw).toBe(true);
        });
    });

});
/**
 * Created by Daniel on 8/25/2015.
 */

'use strict';
describe('RPSLS Suite', function () {

    beforeEach(module('rpslsApp'));

    var $controller;

    beforeEach(inject(function (_$controller_) {
        $controller = _$controller_;
    }));

    describe('Game Scenarios', function () {
        it('has Player 1 as Spock and Player 2 as Rock', function () {
            test_TakeTurn('spock','rock','Spock Vaporizes Rock', 'Player 1');
        });

        it('has Player 1 as Spock and Player 2 as Scissors', function () {
            test_TakeTurn('spock','scissors','Spock Bends Scissors', 'Player 1');
        });

        it('has Player 1 as Scissors and Player 2 as Lizard', function () {
            test_TakeTurn('scissors', 'lizard', 'Scissors Decapitate Lizard', 'Player 1');
        });

        it('has Player 1 as Scissors and Player 2 as Paper', function () {
            test_TakeTurn('scissors', 'paper', 'Scissors Cut Paper', 'Player 1');
        });

        it('has Player 1 as Paper and Player 2 as Spock', function () {
            test_TakeTurn('paper', 'spock', 'Paper Disproves Spock', 'Player 1');
        });

        it('has Player 1 as Paper and Player 2 as Rock', function () {
            test_TakeTurn('paper', 'rock', 'Paper Covers Rock', 'Player 1');
        });

        it('has Player 1 as Rock and Player 2 as Scissors', function () {
            test_TakeTurn('rock', 'scissors', 'Rock Smashes Scissors', 'Player 1');
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
            test_TakeTurn('lizard', 'lizard', 'Draw', 'No winner. Please try again.');
        });
        function test_TakeTurn(player1, player2, result, winner) {
            gameService.setPlayer1(player1);
            gameService.setPlayer2(player2);
            gameService.takeTurn();
            expect(gameService.getResult()).toEqual(result);
            expect(gameService.getWinner()).toEqual(winner);
        }
    });

});
$('#human :button').click(function () {
    game.clear();
    var player2 = randomizedPick.getPick();
    game.setPlayer1($(this).attr("id"));
    game.setPlayer2(player2);
    $(this).addClass("btn-success");
    $('#' + player2 + '2').addClass("btn-danger");
    game.takeTurn();
    var message = game.getResult() + "</br>";
    var alertStyle = "alert-success";
    if (game.getWinner() === "Player 1") {
        message = message + "<b>You win!</b>";
    } else if (game.getWinner() === "Player 2") {
        message = message + "<b>The computer wins!</b>";
        alertStyle = "alert-danger";
    } else {
        message = message + "<b>" + game.getWinner() + "</b>";
        alertStyle = "alert-warning";
    }
    game.success(message, alertStyle);
});

var randomizedPick = (function () {
    var pick;

    function getPick() {
        randomPick();
        return pick;
    }

    function randomPick() {
        var picks = ["Spock", "Lizard", "Scissors", "Paper", "Rock"];
        var randomNumber = Math.floor((Math.random() * 5));
        pick = picks[randomNumber];
    }

    return {
        getPick: getPick
    }
})();


var game = (function () {

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
        if (player2 === "Spock") {
            result = "Paper Disproves Spock";
            winner = "Player 1";
            return;
        }
        if (player2 === "Lizard") {
            result = "Lizard Eats Paper";
            winner = "Player 2";
            return;
        }
        if (player2 === "Scissors") {
            result = "Scissors Cut Paper";
            winner = "Player 2";
            return;
        }
        if (player2 === "Rock") {
            result = "Paper Covers Rock";
            winner = "Player 1";
        }
    }

    function rock() {
        if (player2 === "Spock") {
            result = "Spock Vaporizes Rock";
            winner = "Player 2";
            return;
        }
        if (player2 === "Lizard") {
            result = "Rock Crushes Lizard";
            winner = "Player 1";
            return;
        }
        if (player2 === "Scissors") {
            result = "Rock Smashes Scissors";
            winner = "Player 1";
            return;
        }
        if (player2 === "Paper") {
            result = "Paper Covers Rock";
            winner = "Player 2";
        }
    }

    function spock() {
        if (player2 === "Rock") {
            result = "Spock Vaporizes Rock";
            winner = "Player 1";
            return;
        }
        if (player2 === "Lizard") {
            result = "Lizard Poisons Spock";
            winner = "Player 2";
            return;
        }
        if (player2 === "Scissors") {
            result = "Spock Bends Scissors";
            winner = "Player 1";
            return;
        }
        if (player2 === "Paper") {
            result = "Paper Disproves Spock";
            winner = "Player 2";
        }
    }

    function lizard() {
        if (player2 === "Rock") {
            result = "Rock Crushes Lizard";
            winner = "Player 2";
            return;
        }
        if (player2 === "Spock") {
            result = "Lizard Poisons Spock";
            winner = "Player 1";
            return;
        }
        if (player2 === "Scissors") {
            result = "Scissors Decapitate Lizard";
            winner = "Player 2";
            return;
        }
        if (player2 === "Paper") {
            result = "Lizard Eats Paper";
            winner = "Player 1";
        }
    }

    function scissors() {
        if (player2 === "Rock") {
            result = "Rock Crushes Scissors";
            winner = "Player 2";
            return;
        }
        if (player2 === "Spock") {
            result = "Spock Smashes Scissors";
            winner = "Player 2";
            return;
        }
        if (player2 === "Lizard") {
            result = "Scissors Decapitate Lizard";
            winner = "Player 1";
            return;
        }
        if (player2 === "Paper") {
            result = "Scissors Cut Paper";
            winner = "Player 1";
        }
    }

    function takeTurn() {
        result = "Draw";
        winner = "No winner. Please try again.";
        if (player1 === "Spock") {
            spock();
            return;
        }
        if (player1 === "Rock") {
            rock();
            return;
        }
        if (player1 === "Paper") {
            paper();
            return;
        }
        if (player1 === "Lizard") {
            lizard();
            return;
        }
        if (player1 === "Scissors") {
            scissors();
        }
    }

    function clear() {
        $('#alert_placeholder').html('');
        $('#computer :button').removeClass("btn-danger");
        $('#human :button').removeClass("btn-success");
    }

    function success(message, alertStyle) {
        var html = '<div class="alert ' + alertStyle + '" role="alert">'
            + message + '</div>';
        $('#alert_placeholder').html(html);
    }

    return {
        setPlayer1: setPlayer1,
        setPlayer2: setPlayer2,
        getResult: getResult,
        takeTurn: takeTurn,
        clear: clear,
        success: success,
        getWinner: getWinner
    };
})();
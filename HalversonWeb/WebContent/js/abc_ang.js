'use strict';

var abcApp = angular.module('abcApp', ['ui.bootstrap', 'checklist-model']);
abcApp.controller('abcController', ['$scope', '$http', '$modal', function ($scope, $http, $modal) {

    $scope.antecedents = ['Given Direction/task, asked to do something', 'Asked to wait', 'Difficulty with task/activity', 'Preferred activity interrupted', 'Activity/Item denied ("told no")', 'Loud, noisy environment', 'Given assistance / correction', 'Transition between locations', 'Attention given to others', 'Attention not given when wanted', 'Left alone (no indiv. attention)'];
    $scope.locations = ['Home', 'School', 'Other'];
    $scope.people = ['Mom', 'Dad', 'Sibling', 'Grandparents', 'Alone', 'Peers'];
    $scope.behaviors = ['Refuse to follow directions', 'Makes verbal threats', 'Grabbing/pulling', 'Crying/Whining', 'Screaming/Yelling', 'Scratching', 'Biting', 'Spitting', 'Kicking', 'Flopping', 'Running Away', 'Destroying property', 'Hitting Self', 'Hitting Others', 'Verbal Refusal'];
    $scope.durations = ['< 1 min', '1 - 5 min', '5 - 10 min', '10 - 30 min', '30 min - 1 hr', '1 - 2 hrs', '2 - 3 hrs', '3+ hrs'];
    $scope.intensities = ['Low', 'Medium', 'High'];
    $scope.consequences = ['Verbal Redirection', 'Physical assist/prompt', 'Ignored problem behavior', 'Kept on demand', 'Verbal reprimand', 'Removed from activity', 'Given a different activity/task', 'Lost Privilege', 'Sent to room', 'Given a time out', 'Left alone'];

    $scope.abc = {};
    $scope.antecedentOtherDisabled = true;
    $scope.peopleOtherDisabled = true;
    $scope.behaviorOtherDisabled = true;
    $scope.consequenceOtherDisabled = true;
    $scope.messages = [];
    $scope.phpHTML = "";

    $scope.save = function (user) {
        $scope.abc = angular.copy(user);
        if (!validSave()) {
            $scope.open();
        } else {
            postToPhp();
        }
    };

    $scope.reset = function () {
        $scope.user = {};
    };

    $scope.reset();

    $scope.getTime = function () {
        var time = new Date();
        $scope.user.when = time.toLocaleString();
    };

    $scope.peopleOtherText = function () {
        if ($scope.peopleOtherDisabled) {
            $scope.peopleOtherDisabled = false;
        } else {
            $scope.peopleOtherDisabled = true;
            $scope.user.peopleOther = "";
        }
    };

    $scope.antecedentOtherText = function (name) {
        if (name === "Other") {
            $scope.antecedentOtherDisabled = false;
        } else {
            $scope.antecedentOtherDisabled = true;
            $scope.user.antecedentOther = "";
        }
    };

    $scope.behaviorOtherText = function () {
        if ($scope.behaviorOtherDisabled) {
            $scope.behaviorOtherDisabled = false;
        } else {
            $scope.behaviorOtherDisabled = true;
            $scope.user.behaviorOther = "";
        }
    };

    $scope.consequenceOtherText = function () {
        if ($scope.consequenceOtherDisabled) {
            $scope.consequenceOtherDisabled = false;
        } else {
            $scope.consequenceOtherDisabled = true;
            $scope.user.consequenceOther = "";
        }
    };

    $scope.open = function () {
        var modalInstance = $modal.open({
            animation: false,
            templateUrl: 'messageModal.html',
            controller: 'ModalInstanceCtrl',
            size: 'lg',
            resolve: {
                messages: function () {
                    return $scope.messages;
                },
                html: function () {
                    return $scope.phpHTML;
                }
            }
        });

        modalInstance.result.then($scope.reset, $scope.reset);
    };

    function postToPhp() {
        $http.post('abc.php', JSON.stringify($scope.abc)).then(function (response) {
            $scope.phpHTML = response.data;
            $scope.open();
        }, function (response) {
            $scope.messages.push(response.data);
            console.log(response);
        });
    }

    function validSave() {
        $scope.messages = [];
        if (!$scope.abc.people || $scope.abc.people.length === 0) {
            $scope.messages.push("At least one Person is required to save.");
        } else {
            if ($scope.abc.people.indexOf("Other") === 0) {
                if (!$scope.abc.peopleOther || $scope.abc.peopleOther === "") {
                    $scope.messages.push("For People - Other, the text description of Other must be entered.");
                }
            } else {
                $scope.abc.peopleOther = "";
            }
        }
        if (!$scope.abc.behavior || $scope.abc.behavior.length === 0) {
            $scope.messages.push("At least one Behavior is required to save.");
        } else {
            if ($scope.abc.behavior.indexOf("Other") === 0) {
                if (!$scope.abc.behaviorOther || $scope.abc.behaviorOther === "") {
                    $scope.messages.push("For Behavior - Other, the text description of Other must be entered.");
                }
            } else {
                $scope.abc.behaviorOther = "";
            }
        }
        if (!$scope.abc.consequence || $scope.abc.consequence.length === 0) {
            $scope.messages.push("At least one Consequence is required to save.");
        } else {
            if ($scope.abc.consequence.indexOf("Other") === 0) {
                if (!$scope.abc.consequenceOther || $scope.abc.consequenceOther === "") {
                    $scope.messages.push("For Consequence - Other, the text description of Other must be entered.");
                }
            } else {
                $scope.abc.consequenceOther = "";
            }
        }
        if (!$scope.abc.antecedent) {
            $scope.messages.push("An Antecedent is required to save.");
        } else {
            if ($scope.abc.antecedent === "Other") {
                if (!$scope.abc.antecedentOther || $scope.abc.antecedentOther === "") {
                    $scope.messages.push("For Antecedent - Other, the text description of Other must be entered.");
                }
            } else {
                $scope.abc.antecedentOther = "";
            }
        }
        if (!$scope.abc.location) {
            $scope.messages.push("A Location is required to save.");
        }
        if (!$scope.abc.duration) {
            $scope.messages.push("A Duration is required to save.");
        }
        if (!$scope.abc.intensity) {
            $scope.messages.push("An Intensity is required to save.");
        }
        if (!$scope.abc.when) {
            $scope.messages.push("The date and time of the ABC is required to save.");
        }

        return $scope.messages.length === 0;
    }

}

])
;

abcApp.controller('ModalInstanceCtrl', ['$scope', '$modalInstance', '$sce', 'messages', 'html', function ($scope, $modalInstance, $sce, messages, html) {
    $scope.messages = messages;
    $scope.phpHtml = $sce.trustAsHtml(html);
}]);
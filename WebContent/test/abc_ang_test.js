/**
 * Created by Daniel on 9/10/2015.
 */

'use strict';

describe('ABC App Suite', function () {

    beforeEach(module('abcApp'));

    var abcController;
    var scope;
    var fakeModal = {
        result: {
            then: function (confirmCallback, cancelCallback) {
                //Store the callbacks for later when the user clicks on the OK or Cancel button of the dialog
                this.confirmCallBack = confirmCallback;
                this.cancelCallback = cancelCallback;
            }
        },
        close: function (item) {
            //The user clicked OK on the modal dialog, call the stored confirm callback with the selected item
            this.result.confirmCallBack(item);
        },
        dismiss: function (type) {
            //The user clicked cancel on the modal dialog, call the stored cancel callback
            this.result.cancelCallback(type);
        }
    };

    beforeEach(inject(function ($modal) {
        spyOn($modal, 'open').and.returnValue(fakeModal);
    }));

    beforeEach(inject(function ($controller, $rootScope, _$modal_) {
        scope = $rootScope.$new();
        var $http = {};
        abcController = $controller('abcController', {
            $scope: scope,
            $http: $http,
            $modal: _$modal_
        });
    }));


    describe('validation of data', function () {

        it('should require an antecedent', function () {
            scope.user = {
                antecedent: "",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ['Mom'],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("An Antecedent is required to save.");
        });

        it('should require a location', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "",
                duration: "< 1 min",
                intensity: "Low",
                people: ['Mom'],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("A Location is required to save.");
        });

        it('should require a duration', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "",
                intensity: "Low",
                people: ['Mom'],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("A Duration is required to save.");
        });

        it('should require a intensity', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "",
                people: ['Mom'],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("An Intensity is required to save.");
        });

        it('should require a person', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: [],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("At least one Person is required to save.");
        });

        it('should require a consequence', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: [],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("At least one Consequence is required to save.");
        });

        it('should require a behavior', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: ['Verbal Redirection'],
                behavior: [],
                when: "9/10/2015, 10:53:18 PM"
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("At least one Behavior is required to save.");
        });

        it('should require a data/time', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: ""
            };
            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("The date and time of the ABC is required to save.");
        });
    });

    describe('Validation of "Other" text fields', function () {
        it('should have a value in the Antecedent Other Text Field', function () {
            scope.user = {
                antecedent: "Other",
                antecedentOther: "",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };

            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("For Antecedent - Other, the text description of Other must be entered.");
        });

        it('should have a value in the People Other Text Field', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Other"],
                peopleOther: "",
                consequence: ['Verbal Redirection'],
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };

            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("For People - Other, the text description of Other must be entered.");
        });

        it('should have a value in the Behavior Other Text Field', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: ['Verbal Redirection'],
                behavior: ['Other'],
                behaviorOther: "",
                when: "9/10/2015, 10:53:18 PM"
            };

            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("For Behavior - Other, the text description of Other must be entered.");
        });

        it('should have a value in the Consequence Other Text Field', function () {
            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: ['Other'],
                consequenceOther: "",
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };

            scope.save(scope.user);
            expect(scope.messages.length).toEqual(1);
            expect(scope.messages[0]).toEqual("For Consequence - Other, the text description of Other must be entered.");
        });
    });

    describe('Validation of scope functions', function () {

        it('should give a value to the user.when variable', function () {

            scope.getTime(); // produces a date so it's difficult to test for.

            expect(scope.user.when).not.toBe(null);
        });

        it('should give a clean user object', function () {

            scope.user = {
                antecedent: "Asked to wait",
                location: "Home",
                duration: "< 1 min",
                intensity: "Low",
                people: ["Mom"],
                consequence: ['Other'],
                consequenceOther: "my other",
                behavior: ['Hitting'],
                when: "9/10/2015, 10:53:18 PM"
            };

            scope.reset();

            expect(scope.user).toEqual({});
        });

        it('should flip true/false the peopleOtherText method', function () {
            expect(scope.peopleOtherDisabled).toBe(true);

            scope.peopleOtherText();

            expect(scope.peopleOtherDisabled).toBe(false);
        });

        it('should flip true/false the antecedentOtherText method', function () {
            expect(scope.antecedentOtherDisabled).toBe(true);

            scope.antecedentOtherText('Other');

            expect(scope.antecedentOtherDisabled).toBe(false);
        });

        it('should flip true/false the behaviorOtherText method', function () {
            expect(scope.behaviorOtherDisabled).toBe(true);

            scope.behaviorOtherText();

            expect(scope.behaviorOtherDisabled).toBe(false);
        });

        it('should flip true/false the consequenceOtherText method', function () {
            expect(scope.consequenceOtherDisabled).toBe(true);

            scope.consequenceOtherText();

            expect(scope.consequenceOtherDisabled).toBe(false);
        });


    });
})
;
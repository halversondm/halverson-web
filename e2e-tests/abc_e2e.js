/**
 * Created by Daniel on 9/13/2015.
 */

'use strict';

describe('ABC application E2E tests', function() {

    beforeEach(function () {
        browser.get('apps/abc_ang.html');
    });

    it('shows the modal with an error for missing Consequence', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[value="Medium"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('At least one Consequence is required to save.');
        });

    });

    it('shows the modal with an error for missing Intensity', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('An Intensity is required to save.');
        });

    });

    it('shows the modal with an error for missing Duration', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="Medium"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('A Duration is required to save.');
        });

    });

    it('shows the modal with an error for missing Behavior', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[value="Medium"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('At least one Behavior is required to save.');
        });

    });

    it('shows the modal with an error for missing People', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[value="Medium"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('At least one Person is required to save.');
        });

    });

    it('shows the modal with an error for missing Location', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[value="Medium"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('A Location is required to save.');
        });

    });

    it('shows the modal with an error for missing Antecedent', function() {
        element(by.id('now')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[value="Medium"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('An Antecedent is required to save.');
        });

    });

    it('shows the modal with an error for missing Date/Time', function() {
        element(by.css('input[value="Given Direction/task, asked to do something"]')).click();
        element(by.css('input[value="Home"]')).click();
        element(by.css('input[id="Mom"]')).click();
        element(by.css('input[id="Refuse to follow directions"]')).click();
        element(by.css('input[value="1 - 5 min"]')).click();
        element(by.css('input[value="Medium"]')).click();
        element(by.css('input[id="Verbal Redirection"]')).click();

        element(by.id('save')).click();

        element.all(by.css('.modal-body li')).then(function(items) {
            expect(items.length).toEqual(1);
            expect(items[0].getText()).toEqual('The date and time of the ABC is required to save.');
        });

    });
});
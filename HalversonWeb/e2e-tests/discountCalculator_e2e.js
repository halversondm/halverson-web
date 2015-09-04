/**
 * Created by Daniel on 9/3/2015.
 */

'use strict';

describe('Discount Calculator Page Tests', function () {

    beforeEach(function () {
        browser.get('apps/discountCalculator.html');
    });

    it('is missing the discount', function () {
        element(by.id('labelPrice')).sendKeys('100.23');
        element(by.id('calculate')).click();

        var messageList = element.all(by.repeater('message in calculationMessage'));
        expect(messageList.count()).toEqual(1);
    });

    it('calculates with one discount', function () {
        element(by.id('labelPrice')).sendKeys('100.23');
        element(by.id('discount1')).sendKeys('50');
        element(by.id('calculate')).click();

        expect(element(by.binding('calculationMessage[0]')).getText()).toContain('Your final price is $50.12 plus tax');
    });

    it('calculates with two discounts', function () {
        element(by.id('labelPrice')).sendKeys('100.23');
        element(by.id('discount1')).sendKeys('50');
        element(by.id('discount2')).sendKeys('20');
        element(by.id('calculate')).click();

        expect(element(by.binding('calculationMessage[0]')).getText()).toContain('Your final price is $40.09 plus tax');
    })
});
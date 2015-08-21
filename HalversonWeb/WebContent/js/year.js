/**
 * Created by Daniel on 8/19/2015.
 */
'use strict';
var yearApp = angular.module('yearApp', []);
yearApp.service('YearService', function() {
    var date = new Date();
    this.year = date.getFullYear();
});
/**
 * Created by Daniel on 8/24/2015.
 */
module.exports = function (config) {
    config.set({
        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        files: [
            'WebContent/bower_components/angular/angular.js',
            'WebContent/bower_components/angular-mocks/angular-mocks.js',
            'WebContent/bower_components/jQuery/dist/jquery.js',
            'WebContent/bower_components/bootswatch-dist/js/bootstrap.js',
            'WebContent/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'WebContent/bower_components/checklist-model/checklist-model.js',
            'WebContent/js/*.js',
            'WebContent/test/*.js'
        ],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
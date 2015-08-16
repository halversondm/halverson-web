'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'build/stock-quote.min.js': ['app/stock-quote.js'],
                    'build/discountCalculator.min.js': ['app/discountCalculator.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'app/*.js'],
            options: {jshintrc: true}
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/bower_components/**/*.min.js', 'app/components/version/*.js'],
                        dest: 'build/js',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/bower_components/**/*.css'],
                        dest: 'build/css',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['app/*.html', 'app/*.css', 'app/*.ico'],
                        dest: 'build/',
                        filter: 'isFile'
                    }
                ],
            },
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');

    // Default task(s).
    grunt.file.delete('build/');
    grunt.registerTask('default', ['jshint:all', 'uglify', 'copy']);

};

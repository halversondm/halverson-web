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
                    'build/js/abc.min.js': ['WebContent/js/abc.js'],
                    'build/js/discountCalculator.min.js': ['WebContent/js/discountCalculator.js'],
                    'build/js/gallery.min.js': ['WebContent/js/gallery.js'],
                    'build/js/rpsls.min.js': ['WebContent/js/rpsls.js']
                }
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'WebContent/js/*.js'],
            options: {jshintrc: true}
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'WebContent/',
                        src: ['**', '!js/*', '!test/**', '!archive/**'],
                        dest: 'build/'
                    }
                ]
            }
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

'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: [{expand: true, cwd: 'WebContent/js/', src: ['**/*.js'], dest: 'build/js/', ext: '.min.js'}]
            }
        },
        jshint: {
            all: ['Gruntfile.js', 'WebContent/js/*.js'],
            options: {jshintrc: true}
        },
        processhtml: {
            options: {
                includeBase: 'WebContent/include/'
            },
            build: {
                files: [{expand: true, cwd: 'build/', src: ['**/*.html'], dest: 'build/', ext: '.html'}]
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            },
            continuous: {
                configFile: 'karma.conf.js',
                singleRun: true,
                browsers: ['PhantomJS']
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        cwd: 'WebContent/',
                        src: ['**', '!js/*', '!test/**', '!include/**'],
                        dest: 'build/'
                    }
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-karma');

    grunt.file.delete('build/');
    grunt.registerTask('default', ['jshint:all', 'karma:continuous', 'uglify', 'copy', 'processhtml']);

};

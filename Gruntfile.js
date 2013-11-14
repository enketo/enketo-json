/*jshint node:true*/
"use strict";

module.exports = function( grunt ) {
    grunt.initConfig( {
        pkg: grunt.file.readJSON( 'package.json' ),
        connect: {
            server: {
                options: {
                    port: 8080
                }
            }
        },
        jsbeautifier: {
            test: {
                src: [ "*.js", "src/js/*.js" ],
                options: {
                    config: "./.jsbeautifyrc",
                    mode: "VERIFY_ONLY"
                }
            },
            fix: {
                src: [ "*.js", "src/js/*.js" ],
                options: {
                    config: "./.jsbeautifyrc"
                }
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [ '*.js', 'src/js/**/*.js' ]
        },
        jasmine: {
            test: {
                src: 'src/FormModelJSON.js ',
                options: {
                    specs: 'test/spec/*.js',
                    helpers: [ 'test/mock/*.js' ],
                    template: require( 'grunt-template-jasmine-requirejs' ),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: 'src',
                            paths: {
                                jquery: '../test/lib/jquery',
                                'jquery.getXPath': '../lib/jquery-xpath/jquery.getXPath'
                            }
                        }
                    }
                },
            }
        }
    } );

    grunt.loadNpmTasks( 'grunt-contrib-connect' );
    grunt.loadNpmTasks( 'grunt-jsbeautifier' );
    grunt.loadNpmTasks( 'grunt-contrib-jasmine' );
    grunt.loadNpmTasks( 'grunt-contrib-jshint' );

    grunt.registerTask( 'test', [ 'jasmine' ] );
    grunt.registerTask( 'default', [ 'uglify', 'test' ] );
    grunt.registerTask( 'test', [ 'jsbeautifier:test', 'jshint', 'jasmine' ] );
    grunt.registerTask( 'server', [ 'connect:server:keepalive' ] );
    grunt.registerTask( 'default', [ 'test' ] );
};

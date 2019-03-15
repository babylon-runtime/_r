const path = require('path');
module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-karma');
    // Project configuration.
    grunt.initConfig({
        karma: {
            options : {
                basePath: './',
                frameworks: ['mocha', 'chai'],
                reporters: ['progress'],
                port: 9876,
                browsers: ['Chrome'],
                singleRun: true,
                files : [
                    'node_modules/babylonjs/babylon.js', 'dist/_r.min.js'
                ]
            },
            cornellBox : {
                files : [
                    { src : [ 'test/patch/test.js'] }]
            },
            selectors : {
                files : [
                    { src : [  'test/selectors/test.js'] },
                ]
            },
            playground : {
                files : [
                    { src : [  'test/playground-paste/test.js'] },
                ]
            },
            nolaunch : {
                files : [
                    { src : [  'test/no-launch/test.js'] },
                ]
            },
            customEvents : {
                files : [
                    { src : [  'test/custom-events/test.js'] },
                ]
            },
            animate : {
                files : [
                    { src : [ 'test/animate/test.js'] }
                ]
            },
            download : {
                files : [
                    { src : [ 'test/download/test.js']}
                ]
            },
            keyEvents : {
                files : [
                    { src : [ 'test/keyEvents/test.js']}
                ]
            }
            /**
             allInPatch : {
                proxies : {
                    'scene.js' : 'test/all-in-patch/scene.js'
                },
                files : [
                    {
                        src : [  'test/all-in-patch/test.js']
                    },
                ]
            }**/
        }
    });
    // Default task(s).
    grunt.registerTask('default', ['karma']);

};
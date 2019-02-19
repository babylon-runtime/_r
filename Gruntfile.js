module.exports = function(grunt) {
    // Load the plugin that provides the "uglify" task.
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
                    'node_modules/babylonjs/babylon.js', 'dist/_r.js'
                ]
            },
            continuous : {
                files : [
                    { src : [ 'test/cornellBox/test.js'] }]
            },
            selector : {
                files : [
                    { src : [  'test/selectors/test.js'] },
                ]
            }

        }
    });
    // Default task(s).
    grunt.registerTask('default', ['karma']);

};
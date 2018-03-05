/*
 * sass-single-import
 * https://github.com/CreativeCollective/sass-import-once
 *
 * Copyright (c) 2018 MultiTracks.com
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({

		// Configuration to be run (and then tested).
		sass_single_import: {
			components: {
				src: ["components/**/*.scss"],
				dest: "page-styles/",
				cwd: "./ex"
			}
		},
		sass: {
			options: {}, 
			dist: {
				files: [{ "ex/css/homepage.css": "ex/page-styles/homepage.scss" }]
			},
		}

	});

	grunt.loadTasks('tasks');
	grunt.loadNpmTasks('grunt-sass');
	grunt.registerTask('default', ['sass_single_import', 'sass']);

};

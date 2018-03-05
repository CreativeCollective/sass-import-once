/*
 * sass-single-import
 * https://github.com/danielcress/grunt
 *
 * Copyright (c) 2018 Dan Cress
 * Licensed under the MIT license.
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

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass_single_import', 'sass']);

};

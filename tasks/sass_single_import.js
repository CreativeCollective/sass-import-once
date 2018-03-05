/*
 * sass-single-import
 * https://github.com/danielcress/grunt
 *
 * Copyright (c) 2018 Dan Cress
 * Licensed under the MIT license.
 */

'use strict';

var color = require('cli-color');
var path = require('path');

module.exports = function (grunt) {
	grunt.registerMultiTask('sass_single_import', 'Better importing with Sass', function () {
		var files = this.data.files,
			lnBr = String.fromCharCode(13),
			header = "$imported-modules: () !default;"
					+ "/// @access public" + lnBr
					+ "/// @param {String} $name - Name of exported module" + lnBr
					+ "/// @param {Bool} $warn [true] - Warn when module has been already imported" + lnBr
					+ "/// @require $imported-modules" + lnBr
					+ "@mixin exports($name, $warn: true) {" + lnBr
						+ "@if (index($imported-modules, $name) == null) {" + lnBr
							+ "$imported-modules: append($imported-modules, $name) !global;" + lnBr
						+ "@content;" + lnBr
						+ "} @else if $warn == true {" + lnBr
							+ "@warn 'Sass Once prevented the duplicate import of: `#{$name}`';" + lnBr
						+ "}" + lnBr
					+ "}" + lnBr
					+ "@include exports({{{filename}}}) {" + lnBr, 
			footer = "}",
			importRegex = /(@import)(\s?)+([("\w\d\s.\/.\-)]+;)/g,
			dest, cwd, fileKey, outFile,
			file, fileText, outputText, pageContent,
			fileName, filePath, bodySass, pageIncludes;

		if (files) {
			for (fileKey in files) {
				doesFileExist(files[file]);
			}
		}

		this.files.forEach(function (myDest) {
			cwd = myDest.cwd || '';

			if (myDest.dest) {
				dest = path.join(cwd, myDest.dest);
			}

			myDest.src.forEach(function (file) {
				filePath = path.join(cwd, file);
				fileName = path.parse(file).base;
				pageContent = grunt.file.read(filePath);

				if (myDest.dest) {
					outFile = path.join(dest, file);
				}

				pageIncludes = pageContent.match(importRegex);
				bodySass = pageContent.replace(importRegex, "");
				fileText = header + bodySass + footer;

				if (pageIncludes) {
					pageIncludes.reverse();
					pageIncludes.forEach(function(pageInclude) {
						fileText = pageInclude + fileText;
					});
				}

				outputText = fileText.replace("{{{filename}}}", "'" + filePath.slice(0, -5) + "'");
				grunt.file.write(outFile, outputText);
				grunt.log.writeln(outFile + " - " + color.green("OK"));
			})
		});
	});

	function doesFileExist(file) {
		if (!grunt.file.exists(file)) {
			throw new Error("Error: '" + file + "' was not found.");
		}
	}
};
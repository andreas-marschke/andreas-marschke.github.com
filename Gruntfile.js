module.exports = function (grunt) {
  var gruntConfig = {
	pkg: grunt.file.readJSON("package.json"),
	uglify: {
	  options: {
		banner: "/* Site Version: <%= pkg.version %> -- Includes: */\n"
	  },
	  default: {
		options: {
		  preserveComments: false,
		  sourceMap: true,
		  compress: {
			sequences: false
		  }
		},
		files: {
		  "assets/js/bundle.min.js": [
			"assets/vendor/highlightjs/highlight.pack.js",
			"assets/js/src/navbar-menu-small-toggle.js",
			"assets/js/src/highlight-init.js"
		  ]
		}
	  }
	},
	cssmin: {
	  default: {
		files: {
		  "assets/css/vendor.min.css": [
			"assets/vendor/highlightjs/styles/github-gist.css",
			"assets/vendor/font-awesome/css/font-awesome.css",
			"assets/vendor/bulma/css/bulma.css"
		  ]
		}
	  }
	},
	copy: {
	  fonts: {
		files: [
		  {
			cwd: "assets/",
			expand: true,
			src: "vendor/fontawesome/fonts/**",
			dest: "fonts/"
		  }
		]
	  }
	}
  };

  grunt.initConfig(gruntConfig);
  
  /* Load Tasks from NPM */
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  
  grunt.registerTask("default", ["cssmin", "copy", "uglify"]);	
};

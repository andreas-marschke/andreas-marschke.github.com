var sass = require("node-sass");

module.exports = function (grunt) {
  var gruntConfig = {
	pkg: grunt.file.readJSON("package.json"),
	uglify: {
	  options: {
		banner: "/* Site Version: <%= pkg.version %> -- Includes: */\n"
	  },
	  sources: {
		options: {
		  preserveComments: false,
		  sourceMap: true,
		  compress: {
			sequences: false
		  }
		},
		files: {
		  "assets/js/bundle.min.js": [
            "assets/vendor/tiny-slider/dist/min/tiny-slider.helper.ie8.js",
            "assets/vendor/tiny-slider/dist/min/tiny-slider.js",
			"assets/vendor/highlightjs/highlight.pack.js",
			"assets/js/src/navbar-menu-small-toggle.js",
			"assets/js/src/highlight-init.js",
            "assets/js/src/index.js"
		  ]
		}
	  }
	},
    sass: {
      options: {
        implementation: sass,
        sourceMap: true
      },
      frontend: {
        files: {
          "assets/css/basic.css": "assets/css/basic.scss"
        }
      }
    },
	cssmin: {
	  default: {
		files: {
		  "assets/css/vendor.min.css": [
			"assets/vendor/highlightjs/styles/github-gist.css",
			"assets/vendor/font-awesome/css/font-awesome.css",
			"assets/vendor/bulma/css/bulma.css",
            "assets/vendor/tiny-slider/dist/tiny-slider.css",
            "assets/css/basic.css"
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
	},
    watch: {
      server: {
        files: ['assets/js/src/**/*.js'],
        tasks: ['uglify'],
        options: {
          spawn: false,
        },
      },
      styles: {
        files: ["assets/css/*.scss"],
        tasks: ["sass", "cssmin"],
        options: {
          spawn: false,
        },
      }
    }
  };

  grunt.initConfig(gruntConfig);
  
  /* Load Tasks from NPM */
  grunt.loadNpmTasks("grunt-contrib-cssmin");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask("default", ["sass:frontend", "cssmin", "copy", "uglify"]);	
};

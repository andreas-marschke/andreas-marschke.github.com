(function(w,d){
    var appRequire = w.requirejs.config({
	baseUrl: "/assets/js/app",
	paths: {
	    // Vendor Packages
	    jquery: "/assets/vendor/jquery/dist/jquery",
	    underscore: "/assets/vendor/underscore/underscore-min",
	    bootstrap: "/assets/vendor/bootstrap/dist/js/bootstrap.min",
	    backbone: "/assets/vendor/backbone/backbone-min",

	    // App
	    app: "router",

	    // Data
	    models: "js/models",
	    collections: "js/collections",

	    // UI
	    pages: "js/views/pages"
	},
	shim: {
	    "backbone": {
		deps: ["underscore", "bootstrap"],
		exports: "Backbone"
	    },
	    "underscore": {
		exports: "_"
	    },
	    bootstrap:  ["jquery"]
	}
    });
    
    appRequire(["app"], function(App) {
	
    });

}(this,this.document));

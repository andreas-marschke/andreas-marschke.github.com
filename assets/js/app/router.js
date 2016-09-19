define(["backbone", "projects", "jobs"], function(Backbone, Projects, Jobs) {
    var Router = Backbone.Router.extend({
	routes: {
	    "jobs/": "jobs",
	    "projects/": "projects",
	    "*path": "main"
	},
	projects: function() {
	    new Projects();
	},
	jobs: function() {
	    new Jobs();
	},
	main: function() {
	    this.navigate("projects/", {trigger: true});
	}
    });

    var router = new Router();
	var hadRouteChange = false;

	router.on("route", function() {
		hadRouteChange = true;
	});
	
	function hook() {
		if (window.BOOMR && BOOMR.version) {
			if (BOOMR.plugins && BOOMR.plugins.Backbone) {
				BOOMR.plugins.Backbone.hook(router, hadRouteChange);
			}
			return true;
		}
	}

	if (!hook()) {
		if (document.addEventListener) {
			document.addEventListener("onBoomerangLoaded", hook);
		} else if (document.attachEvent) {
			document.attachEvent("onpropertychange", function(e) {
				e = e || window.event;
				if (e && e.propertyName === "onBoomerangLoaded") {
					hook();
				}
			});
		}
	}
    Backbone.history.start();
})

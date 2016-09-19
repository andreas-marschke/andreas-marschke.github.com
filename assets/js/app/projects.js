define(["backbone", "jquery", "underscore"], function(Backbone, $, _) {
    return Backbone.View.extend({
	el: $("#app"),
	initialize: function() {
	    var self = this;
	    $.ajax("/assets/js/app/templates/projects.html", {
		success: function (response, status, jqXHR) {
		    self.template = _.template(response);
		    $.ajax("/assets/data/projects.json", {
			success: function(response, status, jqXHR) {
			    self.render(jqXHR.responseJSON);
			}
		    });
		}
	    })
	},
	render: function(data) {
	    var self = this;
	    data.forEach(function(set, index, array) {
		$.ajax(set.description, {
		    success: function(response, status, jqXHR) {
			array[index].description  = response;

			if ((array.length - 1) === index) {
			    self.$el.html(self.template({ projects: data }));
			}
		    }
		});
	    });
	}
    });
});

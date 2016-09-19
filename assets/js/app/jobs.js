define(["backbone", "jquery", "underscore"], function(Backbone, $, _) {
    return Backbone.View.extend({
	el: $("#app"),
	initialize: function() {
	    var self = this;
	    $.ajax("/assets/js/app/templates/jobs.html", {
		success: function (response, status, jqXHR) {
		    self.template = _.template(response);
		    $.ajax("/assets/data/jobs.json", {
			method: "GET",
			success: function(response, status, jqXHR) {
			    console.log(response);
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

			self.$el.html(self.template({ jobs: data }));
		    }
		});
	    });
	}
    });
});

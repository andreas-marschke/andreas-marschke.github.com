(function(w,d){
	var $ = w.$,
	    _ = w._,
		tpl;
	
	$("*[data-type='repository']").hover(function() {
		var e=$(this);
		e.off('hover');
		$.get("/assets/template/popover.html",function(d) {
			console.log(d);
			e.popover({content: d, html: true, placement: "top"}).popover("show");
		});
	});
}(this,this.document));

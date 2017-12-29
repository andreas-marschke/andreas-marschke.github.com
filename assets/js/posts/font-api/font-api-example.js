(function(w, d) {
  /**
   * Set the Performance mark for the given font face with style, weight and stretch as
   * markers to define which exact font was loaded
   * @param fontFace - FontFace object containing the name and style metadata
   */
  function fontfacePromiseResolve(fontFace) {
    window.performance.mark([fontFace.family, fontFace.style, fontFace.weight, fontFace.stretch].join("_"));
  }

  /**
   * If an error occurs log it as Error to the console
   * @param err - Error object
   */
  function exceptionHandling(err) {
    console.error(err);
  }

  // Ensure the Fonts API and `document.fonts.ready` is available in the environment
  // Additionally ensure window.performance.mark is available for UserTiming marks
  if (d.fonts && d.fonts.ready && window.performance && typeof window.performance.mark === "function") {
    try {

	  // fonts.entries() is an iterator we will use to track each font while it's loading
	  var entries = d.fonts.entries(),
	  valueIndex = 0;

	  for(let entry of entries) {
        for (valueIndex = 0; valueIndex < entry.length; valueIndex++) {
		  entry[valueIndex].loaded.then(fontfacePromiseResolve).catch(exceptionHandling);
        }
	  }

	  // document.fonts.ready is a promise we will hook into to tell if we are finished
	  // loading all of the fonts.
	  d.fonts.ready.then(function(fontFaceSet) {
        try {
		  window.performance.mark("FontsLoaded");                        
        }
        catch(ex) {
		  exceptionHandling(ex);
        }
	  }).catch(exceptionHandling);
    }
    catch(ex) {
	  exceptionHandling(ex);
    }

	document.addEventListener("load", function() {
	  var t_str = '<table class="table is-bordered is-striped is-narrow is-fullwidth">';
	  t_str += '<thead> <tr> <th>Name</th> <th>Loaded ms after Navigation Start</th> </tr> </thead>';
	  t_str += '<tbody>';

	  var entries = window.performance.getEntriesByType("mark");

	  for (var i = 0; i < entries.length; i++) {
		var entry = entries[i];
		t_str += "<tr> <td><code>" + entry.name  + "</code></td> <td>" + entry.startTime + "</td> </tr>";
	  }
	  
	  t_str += '</tbody></table>';

	  var el = document.getElementById("fonts-perf-list");
	  el.innerHTML = t_str;
	});
  }
  else {
	var el = document.getElementById("fonts-perf-list");
	el.innerHTML = "<p>Sadly this Browser does not support UserTiming API or Font Loading API. :(</p>"
  }
}(this, this.document));

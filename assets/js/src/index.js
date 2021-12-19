(function(w,d){
  var slideshowQ = d.querySelector(".slideshow");
  if (slideshowQ && slideshowQ.length && slideshowQ.length > 0) {
    var slider = tns({
      container: ".slideshow",
      mode: "gallery",
      items: 1,
      center: true,
      controls: false,
      nav: false,
      speed: 300,
      autoplay: true,
      autoplayButton: false,
      autoplayButtonOutput: false,
      autoplayTimeout: 15000
    });
  }
}(this,this.document));

---
layout: blog
title: "WebFont Performance Tracking with Font API, Boomerang and UserTiming API"
date: 2017-12-29 09:00:00 +0200
author: Andreas Marschke
description: Leveraging UserTiming API we can track how long it takes a user to load all the fonts into a
 site. With Boomerang we can collect this information and track it
categories: web monitoring development
type: article
extrajs_head:
- "/assets/js/posts/font-api/font-api-example.js"
---

Webfonts are widely used across the web to serve fonts not provided by default on all operating systems
and enables websites to show themselves in their individual style.

Often, *however*, WebFonts are also to blame for miserable performance as many webfonts are loading very
slowly, due to optimization problems, size contraints and the bandwidth any given client is working with.

As a result you'll have issues such as these:

![Text flashing into existance]({{ "/assets/img/posts/font-api/flash-of-unstyled-text.gif" | absolute_url }})

To track how long it takes for each font to load into the document on a client we have the [Font Loading API](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Font_Loading_API).

We can leverage the [UserTiming API](https://developer.mozilla.org/en-US/docs/Web/API/User_Timing_API) to track when these timings happen during page load.

### The Snippet

Here we have a small script that will hook into `document.fonts.ready` and `document.fonts.entries` to both track how long it took for each individual
font to load and how long overall font loading took:

```js
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
  }
}(this, this.document));
```

<br/>

Once this is added to the page we can find UserTiming entries in Developer Tools Console:


![Developer Tools User Timing]({{ "/assets/img/posts/font-api/user-timing-api-performance-marks-fonts.png" | absolute_url }})

<br />

*Awesome!* Now for the fun part: Collecting this data!

### Enabling UserTiming

Using [Boomerang](http://github.com/soasta/boomerang) we can now collect this data with the UserTiming plugin. For this you will need the following 2 items in your `plugins.json` file when [building boomerang](http://docs.soasta.com/boomerang-api/tutorial-building.html) Boomerang for your setup:

```json
{
  "plugins": [
    ...
    // UserTiming Compression
    "node_modules/usertiming-compression/src/usertiming-compression.js",  
    // UserTiming Plugin
    "plugins/usertiming.js",  
    ...
  ]
}
```
<br/>

Once we've built Boomerang with our additional plugins we can now add the [boomerang snippet to our site](http://docs.soasta.com/boomerang-api/tutorial-loader-snippet.html) and initialize Boomerang once it arrived on the page with the UserTiming Plugin `enabled`:

```js
(function() {
  function hookBoomerang() {
    if (window.BOOMR && BOOMR.version) {
      if (BOOMR.plugins && BOOMR.plugins.UserTiming) {
        BOOMR.init({
          beacon_url: "/beacons",
          UserTiming: {
            enabled: true
          }
        });
      }
      return true;
    }
  }

  if (!hookBoomerang()) {
    if (document.addEventListener) {
      document.addEventListener("onBoomerangLoaded", hookBoomerang);
    } else if (document.attachEvent) {
      document.attachEvent("onpropertychange", function(e) {
        e = e || window.event;
        if (e && e.propertyName === "onBoomerangLoaded") {
          hookBoomerang();
        }
      });
    }
  }
}());
```
<br/>

Now that we're ready we can use the debug version of Boomerang and check our Developer Tools console log to see that our UserTiming entries are nicely compressed and sent.

## Results

In the console we can now observe Boomerang sending the data back to our servers:

```
boomerang: [debug] Ready to send beacon:
	...
	t_done=2546
	t_other=boomerang|2,boomr_fb|2443,boomr_ld|1165,boomr_lat|1278
	...
	restiming={"http":{"://vpn.andreas-marschke.name/":{...}}}
	u=http://shop.andreas-marschke.name/
	v=1.0.1514544714
	...
	pid=svcbw6yv
	...
	usertiming=0Bungee_normal_400_normal~108.~FontAwesome_normal_normal_normal~1vc.~FontsLoaded~1vd
```
<br/>

The `usertiming=...` entry is the important bit as it contains the compressed data set we were hoping. You can now use the decompression
mechanisms provided by the [UserTimingCompression library from npm](https://www.npmjs.com/package/usertiming-compression)

Using the supplied `cmd.js` in the package we can now put the above entry:

```
0Bungee_normal_400_normal~108.~FontAwesome_normal_normal_normal~1vc.~FontsLoaded~1vd
```
<br/>

into a file eg. `compressed.txt` and decompress the entries:

```
$> node cmd.js decompress compressed.txt | jq .
[
  {
    "name": "Bungee_normal_400_normal",
    "startTime": 1304,
    "duration": 0,
    "entryType": "mark"
  },
  {
    "name": "Bungee_normal_400_normal",
    "startTime": 1304,
    "duration": 0,
    "entryType": "mark"
  },
  {
    "name": "FontAwesome_normal_normal_normal",
    "startTime": 2424,
    "duration": 0,
    "entryType": "mark"
  },
  {
    "name": "FontAwesome_normal_normal_normal",
    "startTime": 2424,
    "duration": 0,
    "entryType": "mark"
  },
  {
    "name": "FontsLoaded",
    "startTime": 2425,
    "duration": 0,
    "entryType": "mark"
  }
]
```
<br/>
As you can see each of the FontFaces is mentioned with their time of arrival (here in startTime) from the start of the page in milliseconds.

### That's it!

I hope that With this information you, the user, can start optimizing your use of webfonts and provide faster visually ready pages to your users!

Happy Hacking!

### Extras

To demo this working in this page as long as `document.fonts` is available, here is a table of marks based on the WebFonts used on this site:
<div id="fonts-perf-list"></div>

---
layout: blog
title: "Boomerang: RUM for Everyone"
date: 2020-07-10 09:00:00 +0200
author: Andreas Marschke
description: Digital Performance Management is an important part of the modern web. Boomerang
 enables Webdevelopers to keep an eye on their performance in the real-world.
categories: web monitoring development
type: article
---

> {{page.description}}

## Where Did Boomerang Come From?

[Boomerang](https://github.com/soasta/boomerang) was developed by
[Philip Tellis](https://github.com/bluesmoon) during his time at Yahoo. The roots
of Boomerang come from a lesser known library dubbed
[netperf.js](https://github.com/bluesmoon/netperf-js). The goal of the first
iteration was to track the bandwidth available to users. Tracing the history of
RUM even further we find [Steve Souders](https://github.com/stevesouders) of
[HTTP Archive](http://httparchive.org) and father of performance monitoring
on the web.

Originally, Boomerang was designed to enable Yahoo to track performance througout a session
and calculate the roundtrip time a typical user would have.

After leaving Yahoo in 2010, Tellis founded a small startup in 2011, called
[LogNormal](www.lognormal.com) with his co-founder [Buddy Brewer](https://twitter.com/bbrewer),
who previously worked for Compuware in the APM and synthetic monitoring sector.
LogNormal specialized in webperformance analytics laying the foundation for what is now known as
[Akamai mPulse](https://www.akamai.com/us/en/products/web-performance/mpulse.jsp).

LogNormal made heavy use of Boomerang and provided the critical insights into
what the perceived performance for real users looked like on sites. These services were
provided to customer  with a Beacon collector(a type of server collecting
analytics data sent by Boomerang) and an Analytics Engine.

Throughout this time another startup called SOASTA founded in 2006 by
[Ken Gardner](https://twitter.com/kennethcgardner) increased it's market share growing from a
rival to the Juggernauts of the LoadTesting providers like HP LoadRunner into it's own SaaS product
serving as a powerful DPM tool to demonstrate the value of validating performance under load.

With the LoadTesting aspect covered the SOASTA team decided to acquire LogNormal in late
[2012](www.lognormal.com/blog/2012/10/01/lognormal-acquired-by-soasta/). With the kings RUM on
their side the DPM portfolio was bound to grow.

## How Does Boomerang Work?

Boomerang works based on a plugin infrastructure providing most of the beaconed data. That
means the `boomerang.js` file without any plugins provides facilities to collect data but does
not collect any data by itself.

By default Boomerang only sends a beacon once `onload` has finished and all plugins have completed their run.
This means we can allow boomerang to wait a little longer or force it to send a beacon at a later point in time based
on the plugins being run.



## What Can I Monitor with Boomerang?

## Boomerang and your Frontend JS



## Links

[Boomerang Project](http://github.com/soasta/boomerang)

[Online Docs](http://docs.soasta.com/boomerang/)

[OSS (Semi-Outdated)](https://soasta.github.io/boomerang/doc/)

[OSS Documentation (Beta)](http://dev.nicj.net/boomerang-doc/index.html)

[Commercial Collections & Aggregation](https://www.akamai.com/us/en/products/web-performance/mpulse.jsp)

#### OSS Projects around Boomerang:

[Boomcatch](https://github.com/springernature/boomcatch)

[Boomerang Express](https://github.com/andreas-marschke/boomerang-express)

#### Presentations based on Boomerang Work/Research

[Measuring Continuity](http://nicj.net/measuring-continuity/)

[Measuring Real User Performance in the Browser](http://nicj.net/measuring-real-user-performance-in-the-browser/)

[Forensic tools for in-depth performance investigation](https://conferences.oreilly.com/velocity/devops-web-performance-ny-2015/public/schedule/detail/44207)

[RUM: Getting Beyond Page Level Metrics](https://conferences.oreilly.com/velocity/velocity2014/public/schedule/detail/35302)

[Presentations by Philip Tellis](https://slideshare.net/bluesmoon/presentations)

[Presentations by Nic Jansma](https://slideshare.net/nicjansma/presentations)

#### OSS Projects used by Boomerang

[UserTiming API Data Compression](https://github.com/nicjansma/usertiming-compression.js)

[ResourceTiming API Data Compression](https://github.com/nicjansma/resourcetiming-compression.js)


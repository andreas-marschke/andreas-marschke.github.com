---
layout: default
title: Blog
permalink: /posts/
---
<div class="column is-8 is-offset-2">
<section class="hero posts">
  <div class="hero-body">
    <div class="container">
      <h1 class="title">
        Blog Posts
        <small class="subtitle">
          All Blog Posts
        </small>
      </h1>
    </div>
  </div>
</section>

<ul class="list list-unstyled posts">
  {% for post in site.posts %}
    <div class="card">
      <div class="card-content">
        <p class="title">
          <a href="{{ post.url }}">{{ post.title }}</a>
        </p>
        <p class="subtitle description">
        <span>{{post.description}}</span>
        </p>
        <p class="subtitle date">
          Posted: <time datetime="{{ post.date | date_to_xmlschema }}" itemprop="datePublished" class="post-time">
          {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %}
          {{ post.date | date: date_format }}
          </time>
        </p>
      </div>
    </div>
  {% endfor %}
</ul>
</div>

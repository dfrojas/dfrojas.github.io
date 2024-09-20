---
layout: page
title: Feel the Groove
permalink: /techno/
order: 4
---

<div markdown="1">
<h1 id="grooveTitle" class="centered-title" data-title="Feel the Groove">Feel the Groove</h1>

<div class="favourite-track-carousel">
  <h2>Favourite Track of Today</h2>
  <div class="track-container">
<iframe width="400" height="100" src="https://www.youtube.com/embed/lylcsb8OhzU?si=dSD5iiHTS-rj2mVW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
</div>

<ul class="post-list">
  {%- for post in site.posts -%}
  {% if post.category == "music" %}
  <li>
    <h1>
      <a class="post-link" href="{{ post.url | relative_url }}">
        {{ post.title | escape }}
      </a>
    </h1>
    {{ post.content }}
    <hr>
  </li>
  {% endif %}
  {%- endfor -%}
</ul>
</div>

<script src="{{ '/assets/js/grooveFonts.js' | relative_url }}"></script>
<link rel="stylesheet" href="{{ '/assets/css/techno.css' | relative_url }}">

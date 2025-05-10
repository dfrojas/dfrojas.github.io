---
layout: page
title: Feel the Groove
permalink: /techno/
order: 4
published: false
---

<div markdown="1">
<h1 id="grooveTitle" class="centered-title" data-title="Feel the Groove">Feel the Groove</h1>

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

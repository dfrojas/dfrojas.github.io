---
layout: page
title: Notes
permalink: /notes/
order: 3
published: false
---

<div markdown="1">
<ul class="post-list">
  {%- for post in site.posts -%}
  {% if post.category == "notes" %}
  <li>
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <span class="post-meta">{{ post.date | date: date_format }}</span>
    <h1>
      <p class="post-link">
        {{ post.title | escape }}
      </p>
    </h1>
    {{ post.content }}
    <hr>
  </li>
  {% endif %}
  {%- endfor -%}


</ul>
</div>

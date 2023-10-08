---
layout: page
title: Ideas
permalink: /ideas/
order: 3
---

<div markdown="1">
<ul class="post-list">
  {%- for post in site.posts -%}
  {% if post.category == "ideas" %}
  <li>
    {%- assign date_format = site.minima.date_format | default: "%b %-d, %Y" -%}
    <span class="post-meta">{{ post.date | date: date_format }}</span>
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

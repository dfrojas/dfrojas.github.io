---
layout: page
title: Software
permalink: /software/
order: 1
---

{% for post in site.categories.software %}
  {% assign date_format = site.minima.date_format | default: "%b %-d, %Y" %}
  <p>
  <span class="post-meta">{{ post.date | date: date_format }}</span>
  <span>
  <a class="list-index-posts" href="{{ post.url | relative_url }}">
      {{ post.title | escape }}
    </a>
  </span>
  </p>
{% endfor %}

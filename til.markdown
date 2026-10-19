---
layout: page
title: TIL
permalink: /til/
order: 3
---

Today I Learned — short notes on things I learn while building software.

{% for post in site.categories.til %}
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

---
layout: page
title: Feel the Groove
permalink: /techno/
order: 4
---

<div markdown="1">
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

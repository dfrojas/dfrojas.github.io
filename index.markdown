---
layout: home
---

<div align="center" markdown="1">

# Hey there! I'm Diego Fernando Rojas 👋.

## A software developer and diver from Colombia 🇨🇴
<br>

</div>

<div class="home-paragraph"  markdown="1">

And I live my life at the intersection of technology, underwater exploration, and the pulsating rhythms of techno music. Here I write ocassionally about:

1. 👨‍💻 **Software:** I like to build and experiment with the technologies I like: Containers, compilers, distributed systems, eBPF, programming languages, internals, etc. In this section, I publish only technical content about software.

2. 🐋 **Diving and ocean conservation:** I publish occasionally the journey of my dives. Join me in the fight to protect our oceans.

3. 💡 **Misc:** In the section "Misc" I write my thoughts, notes, quotes or whatever about software and humanity. Just random opinions. I'm native Spanish speaker, only the content there will be in Spanish.

4. 🎶 **Techno Music:** A curated list of tracks that I like. Feel the groove!

<div align="center" markdown="1">
<br>
<hr>
<br>

# Latest Post

</div>

{% assign latest_posts = site.posts | where_exp: "post", "post.category == 'misc' or post.category == 'software'" %}
{%- for post in latest_posts limit:5 -%}
<div class="container text-center">
  <div class="row">
    <div class="col-md-2"><img src="{{ post.cover }}"></div>
    <div class="col-md-10">
      <h2 class="post-title-list"><a href="{{post.url | absolute_url }}">{{ post.title }}</a></h2>
      <p>{% for tag in post.tags %}
      <span class ="label"> {{ tag }} </span>
      {% endfor %}</p>
      <p class="excerpt">{{ post.summary }}</p>
  </div>
</div>
{%- endfor -%}

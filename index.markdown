---
layout: home
---

<div align="center" markdown="1">

# Hey there! I'm Diego Fernando Rojas 👋.

## A software developer and diver from Colombia 🇨🇴
<br>

</div>

<div class="home-paragraph"  markdown="1">

And I live my life at the intersection of technology, underwater exploration, and the pulsating rhythms of techno music. My journey is a harmonious blend of programming, scuba diving adventures, deep-seated passion for ocean conservation and electronic music. Here, you'll find mainly four types of content:

1. 👨‍💻 **Software:** I like to build and experiment with the technologies I like: Containers, compilers, distributed systems, eBPF, programming languages, internals, etc. In this section, I publish only technical content about software.

2. 🐋 **Diving and ocean conservation:** I publish occasionally the journey of my dives. Join me in the fight to protect our oceans.

3. 💡 **Random thoughts:** In the section “Ideas” I write my thoughts, notes, quotes or whatever about software and humanity. Just random opinions. I'm native Spanish speaker, only the content there will be in Spanish.

4. 🎶 **Techno Music:** A curated list of tracks that I like. Feel the groove!

In this space, you'll find a unique blend of my software development insights, scuba diving tales, techno music recommendations, and updates on my ocean conservation efforts. Welcome to my corner of the internet, where code, water, and music converge to create an extraordinary symphony of life. Together, let's make waves, both in the digital realm and beneath the surface of the deep blue sea. 🌊🌐🎶

<div align="center" markdown="1">

# Latest Post

</div>
{%- assign latest_posts = site.posts -%}
{%- for post in latest_posts limit:5 -%}
    <br><a href="{{post.url}}">{{ post.title }}</a>
{%- endfor -%}

<!--I have made some - small - contributions to CPython (the core behind the Python programming language). I built and I'm maintaining an autoremediation system written in Python. Scuba diving overlaps with my passion for programming and I routinely work on scuba diving software written in Rust. I do all this just for fun and as a hobby.-->

</div>

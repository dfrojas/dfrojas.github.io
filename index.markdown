---
layout: home
---

<div align="center" markdown="1">

<img src="/assets/img/me-zeus.jpeg" class="img-fluid rounded-circle img-thumbnail" width="180px">

<div class="presentation">
<h3>Hi, I’m Diego — a software engineer, diver, and aspiring electronic music producer/DJ.</h3>
<h3>I'm from Colombia 🇨🇴 living in Berlin 🇩🇪.</h3>
</div>

<p class="sub-presentation">I currently work as Software Engineer at GoodYear (contractor).</p>

<p class="sub-presentation">Here you’ll find my experiments and projects across areas of interest like software development, eBPF, distributed systems, performance engineering, programming languages, compilers, containers, AI, etc. I also document <a href="/oceans" target="_blank">my journey through ocean expeditions and conservation.</a>
</p>

</div>

<div class="home-paragraph"  markdown="1">

---

<h2 class="index-section-title">Technical Blog Posts</h2>

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

---

<h2 class="index-section-title">My Open Source Contributions</h2>

<p><strong>Python 3.8:</strong> <a class="list-index-posts" href="https://github.com/python/cpython/pull/12335" target="_blank">bpo-34160: Update news entry for XML order attributes</a></p>

<p><strong>Python 3.8:</strong> <a class="list-index-posts" href="https://github.com/python/cpython/pull/10219" target="_blank">bpo-34160: Preserves order of minidom of Element attributes</a></p>

<p><strong>Kubernetes test infra:</strong> <a class="list-index-posts" href="https://github.com/dfrojas/test-infra/pull/1" target="_blank">[Closed] Automate the bug-triage</a></p>

---

<h2 class="index-section-title">My Hobby Projects</h2>

{% assign sorted_posts = site.posts | sort: "order" %}
{% for post in sorted_posts %}
{% if post.category == "hobbies" %}

<div class="col-md-6 mb-4">
<div class="card">
<div class="row g-0">

<div class="col-3"><img src="{{ post.image }}" class="img-fluid project-card-img"></div>

<div class="col-9">
  <div class="card-body">
    <a href="{{ post.link }}" target="_blank"><strong><u>{{ post.title }}</u></strong></a>
    <p class="mb-0">{{ post.description }}</p>
  </div>
</div>

</div>
</div>
</div>

{% endif %}
{% endfor %}

---
layout: full-width
title: Oceans
permalink: /oceans/
order: 2
---

<body class="oceans-layout">
<div class="ocean-hero">
  <video autoplay loop muted playsinline id="bgVideo">
    <source src="/assets/video/oceans/GH017503-4k.mp4" type="video/mp4">
  </video>
  <script>
    document.getElementById('bgVideo').playbackRate = 0.7; // Half speed
  </script>
  <div class="hero-content">
    <h1>Dive Into a World of Wonder and Urgency</h1>
    <p>Our oceans are the lifeblood of Earth, covering 71% of our planet's surface and holding 97% of its water. They are not just vast bodies of blue – they are the cradle of life, the regulator of our climate, and the frontier of human exploration.</p>
    <button id="watchVideoBtn" class="cta-button">Watch the Video</button>
  </div>
</div>

<div class="ocean-stats">
  <div class="stat">
    <h2>50-80%</h2>
    <p>of Earth's oxygen production comes from the ocean</p>
  </div>
  <div class="stat">
    <h2>3 Billion+</h2>
    <p>people rely on the ocean for their livelihoods</p>
  </div>
  <div class="stat">
    <h2>$2.5 Trillion</h2>
    <p>estimated value of the ocean economy by 2030</p>
  </div>
</div>

<div class="ocean-call-to-action">
  <h2>The Code of Conservation</h2>
  <p>As a software engineer and ocean advocate, I see striking parallels between coding and ocean conservation. Both require:</p>
  <ul>
    <li>Attention to detail</li>
    <li>Systems thinking</li>
    <li>Collaborative problem-solving</li>
    <li>Continuous learning and adaptation</li>
  </ul>
  <p>Just as we debug code to create efficient systems, we must debug our relationship with the ocean to ensure a sustainable future.</p>
</div>

<div class="ocean-projects">
  <h2>Diving into Action: Our Ocean Projects</h2>
  <div class="project-grid">
    {%- for post in site.posts -%}
    {% if post.category == "oceans" %}
      <div class="project-card">
        <a href="{{ post.url }}">
          <img src="{{ post.image }}" alt="{{ post.title }}">
          <div class="project-info">
            <h3>{{ post.title }}</h3>
            <p>{{ post.place }}</p>
          </div>
        </a>
      </div>
    {% endif %}
    {%- endfor -%}
  </div>
</div>

<div class="ocean-pledge">
  <h2>Take the Plunge: Your Ocean Pledge</h2>
  <p>Every line of code can make a difference. Every action can create a ripple effect. Pledge to:</p>
  <ol>
    <li>Reduce your plastic footprint</li>
    <li>Choose sustainable seafood</li>
    <li>Support ocean-friendly businesses</li>
    <li>Educate others about ocean conservation</li>
    <li>Contribute to open-source projects that benefit ocean research</li>
  </ol>
  <a href="#" class="cta-button">Make Your Pledge</a>
</div>

<div class="ocean-quote">
  <blockquote>
    "In the end, we will conserve only what we love, we will love only what we understand, and we will understand only what we are taught."
  </blockquote>
  <p>- Baba Dioum, Senegalese forestry engineer</p>
</div>

<div class="ocean-footer">
  <p>Together, we can write a new chapter for our oceans. Let's debug the problems, optimize our impact, and deploy solutions for a thriving blue planet.</p>
</div>

<div id="videoModal" class="modal">
  <div class="modal-content">
    <span class="close">&times;</span>
    <iframe width="560" height="315" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
  </div>
</div>

</body>

<script>
document.getElementById('watchVideoBtn').onclick = function() {
  var modal = document.getElementById('videoModal');
  var iframe = modal.querySelector('iframe');
  iframe.src = 'https://www.youtube.com/embed/YOUR_VIDEO_ID?autoplay=1';
  modal.style.display = 'block';
}

document.querySelector('.close').onclick = function() {
  var modal = document.getElementById('videoModal');
  var iframe = modal.querySelector('iframe');
  iframe.src = '';
  modal.style.display = 'none';
}

window.onclick = function(event) {
  var modal = document.getElementById('videoModal');
  if (event.target == modal) {
    var iframe = modal.querySelector('iframe');
    iframe.src = '';
    modal.style.display = 'none';
  }
}
</script>

---
layout: mid-full
title: Oceans
permalink: /oceans/
order: 2
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

<div class="container-fluid">
    <h2 class="dive-map-title text-center"><strong>My Diving Expeditions</strong></h2>
    <span class="intro">
    <p>Welcome to my other part of my life: <strong>Oceans!</strong></p>
    <p>Diving is more than a hobby. it's my way of connecting with the ocean and contributing to its protection.
    Through scuba and freediving, I explore and document the beauty and fragility of marine life. This gallery is my small attempt to share those moments and spark conversations about ocean conservation.</p>
    <p>I'm still curating the stories behind each photo, documenting past dives and finding ways to raise awareness about ocean conservation through storytelling.</p>
    <p><a href="https://x.com/dfrojas89" target="_blank">Follow me on Twitter</a> to stay updated.</p>
    </span>
    <div id="diveMap"></div>
</div>

<!-- Expeditions Modal -->
<div class="modal fade" id="diveModal" tabindex="-1" role="dialog" aria-labelledby="diveModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 id="diveTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
          <div class="dive-image-container">
            <img id="diveImage" src="" class="img-fluid" width="100%">
          </div>
          <div class="dive-text-container">
            <p id="diveDescription"></p>
          </div>
      </div>
    </div>
  </div>
</div>

<script>
  var diveInfo = {
    {% assign dives = site.dives %}
    {% for dive in dives %}
      {{ dive.name | jsonify }}: {
        title: {{ dive.title | jsonify }},
        description: {{ dive.description | jsonify }},
        image: {{ dive.image | jsonify }},
        coords: {{ dive.coordinates | jsonify }}
      }{% unless forloop.last %},{% endunless %}
    {% endfor %}
  };

  function initMap() {
    var map = L.map('diveMap', {
      center: [20, 0],
      zoom: 2.5, // Adjust zoom based on screen width
      zoomControl: true,
      dragging: true,
      doubleClickZoom: false,
      scrollWheelZoom: true,
      touchZoom: true,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
      noWrap: true,
      bounds: [[-90, -180], [90, 180]]
    }).addTo(map);

    // Define a custom icon
    var circleIcon = L.divIcon({
      className: 'custom-div-icon',
      html: "<div class='marker-pin throbbing'></div>",
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });

    for (var key in diveInfo) {
      var dive = diveInfo[key];
      L.marker(dive.coords, {icon: circleIcon}, )
        .addTo(map)
        .bindTooltip(dive.title,{
          permanent: false,
          direction: 'top',
        })
        .on('click', function(e) {
          showDiveInfo(this.getTooltip().getContent());
        });
    }
  }

  // Initialize map when the page loads
  window.onload = initMap;

  // Reinitialize map when the window is resized
  window.onresize = initMap;

  function showDiveInfo(title) {
    var dive = Object.values(diveInfo).find(d => d.title === title);
    document.getElementById('diveTitle').textContent = dive.title;
    document.getElementById('diveImage').src = dive.image;
    document.getElementById('diveDescription').textContent = dive.description;
    $('#diveModal').modal('show');
  }
</script>

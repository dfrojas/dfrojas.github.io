---
layout: full-width
title: Oceans
permalink: /oceans/
order: 2
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
<!-- 
<div class="ocean-hero">
  <video autoplay loop muted playsinline id="bgVideo">
    <source src="/assets/video/oceans/GH017503-4k.mp4" type="video/mp4">
  </video>
  <script>
    document.getElementById('bgVideo').playbackRate = 0.7;
  </script>
  <div class="hero-content">
    <h1>Dive Into a World of Wonder and Urgency</h1>
    <p>Our oceans are the lifeblood of Earth, covering 71% of our planet's surface and holding 97% of its water. They are not just vast bodies of blue – they are the cradle of life, the regulator of our climate, and the frontier of human exploration.</p>
  </div>
</div> -->

<div align="center">
<div class="dive-map-container">
  <h2>My Diving Expeditions</h2>
  <div id="diveMap"></div>
</div>
</div>

<!-- Bootstrap Modal -->
<div class="modal fade" id="diveModal" tabindex="-1" role="dialog" aria-labelledby="diveModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="diveTitle"></h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="dive-info-container">
          <div class="dive-image-container">
            <img id="diveImage" src="" alt="Dive location" class="img-fluid">
          </div>
          <div class="dive-text-container">
            <p id="diveDescription"></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
  var diveInfo = {
    nassau: {
      title: "Nassau, Bahamas",
      description: "Explored vibrant coral reefs teeming with tropical fish.",
      image: "/assets/images/dives/nassau.jpg",
      coords: [25.0479, -77.3554]
    },
    guadeloupe: {
      title: "La Ventana, Mexico",
      description: "Encountered majestic sea turtles in crystal clear waters.",
      image: "/assets/images/dives/guadeloupe.jpg",
      coords: [24.048940250475003, -109.9863539559161]
    },
    providencia: {
      title: "Providencia, Colombia",
      description: "Discovered hidden underwater caves and colorful marine life.Discovered hidden underwater caves and colorful marine life.Discovered hidden underwater caves and colorful marine life.Discovered hidden underwater caves and colorful marine life.Discovered hidden underwater caves and colorful marine life.Discovered hidden underwater caves and colorful marine life.",
      image: "/assets/img/oceans/GOPR7355.jpg",
      coords: [13.3486, -81.3739]
    },
    greatBarrierReef: {
      title: "Santa Marta, Colombia",
      description: "Witnessed the breathtaking beauty of the world's largest coral reef system.",
      image: "/assets/images/dives/great-barrier-reef.jpg",
      coords: [11.277925092250461, -74.22311806599735]
    },
    dahab: {
      title: "Dahab, Egypt",
      description: "Witnessed the breathtaking beauty of the world's largest coral reef system.",
      image: "/assets/img/oceans/GOPR7502.jpg",
      coords: [28.511427650376998, 34.52234963152]
    },
    cozumel: {
      title: "Cozumel, Mexico",
      description: "Explored vibrant coral reefs teeming with tropical fish.",
      image: "/assets/images/dives/cozumel.jpg",
      coords: [20.373403717729452, -86.6804092097252]
    },
    // bahiaMagdalena: {
    //   title: "Bahia Magdalena, Mexico",
    //   description: "Explored vibrant coral reefs teeming with tropical fish.",
    //   image: "/assets/images/dives/bahia-magdalena.jpg",
    //   coords: [24.58407372983137, -111.99901301210497]
    // },
    dosOjos: {
      title: "Quintana Roo, Mexico",
      description: "Explored vibrant coral reefs teeming with tropical fish.",
      image: "/assets/images/dives/dos-ojos.jpg",
      coords: [20.32654763783647, -87.39165356123944]
    },
    costaBrava: {
      title: "Costa Brava, Spain",
      description: "Explored vibrant coral reefs teeming with tropical fish.",
      image: "/assets/images/dives/costa-brava.jpg",
      coords: [42.463967817285194, 3.420987546114818]
    },
    gorgona: {
      title: "Gorgona, Colombia",
      description: "Explored vibrant coral reefs teeming with tropical fish.",
      image: "/assets/images/dives/gorgona.jpg",
      coords: [2.970218942284847, -78.19628910413127]
    }
  };

  function initMap() {
    var map = L.map('diveMap', {
      center: [20, 0],
      zoom: window.innerWidth < 768 ? 0 : 2, // Adjust zoom based on screen width
      minZoom: window.innerWidth < 768 ? 0 : 2,
      maxZoom: window.innerWidth < 768 ? 0 : 2,
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      touchZoom: false,
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
      L.marker(dive.coords, {icon: circleIcon})
        .addTo(map)
        .bindPopup(dive.title)
        .on('click', function(e) {
          showDiveInfo(this.getPopup().getContent());
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
    document.getElementById('diveDescription').textContent = dive.description;
    document.getElementById('diveImage').src = dive.image;
    $('#diveModal').modal('show');
  }
</script>
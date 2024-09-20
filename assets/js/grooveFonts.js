const abstractFonts = [
  "Ribeye Marrow", "Miniver",
  'Graffiti', 'Bleeding Cowboys', 'Creepster', 'Eater', 'Freckle Face',
  'Frijole', 'Nosifer', 'Butcherman', 'Finger Paint', 'Hanalei'
];

function getRandomFont() {
  return abstractFonts[Math.floor(Math.random() * abstractFonts.length)];
}

function setRandomTitleFonts() {
  const titleElement = document.getElementById('grooveTitle');
  const titleCharacters = titleElement.dataset.title.split('');
  let newTitle = '';

  titleCharacters.forEach(char => {
    const font = getRandomFont();
    const span = document.createElement('span');
    span.style.fontFamily = font;
    span.textContent = char;
    newTitle += span.outerHTML;
  });

  titleElement.innerHTML = newTitle;
}

// Load fonts
abstractFonts.forEach(font => {
  const link = document.createElement('link');
  link.href = `https://fonts.googleapis.com/css?family=${font.replace(' ', '+')}`;
  link.rel = 'stylesheet';
  document.head.appendChild(link);
});

// Set random fonts on page load
document.addEventListener('DOMContentLoaded', setRandomTitleFonts);

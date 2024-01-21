document.addEventListener('DOMContentLoaded', function() {
  function applyTheme(theme) {
    var style = document.querySelector('.' + theme);
    if (style) {
      document.documentElement.style.display = 'none'; // hide the HTML element
      document.head.querySelector('link[rel="stylesheet"][title]').disabled = true;
      style.disabled = false;
      document.head.querySelector('link[rel="stylesheet"][title]').title = theme;
      setTimeout(function() {
        document.documentElement.style.display = ''; // show the HTML element after a delay
      }, 500); // adjust the delay time as needed
    }

    // Load audio based on the selected theme
    const audio = document.querySelector('audio');
    if (audio) {
      audio.src = `themes/${theme}/${theme}.mp3`;
      audio.volume = themeMusic.volume
      audio.loop = true;
      audio.play();
    }
  }

  let selectedTheme = localStorage.getItem('theme');
  if (!selectedTheme) {
    selectedTheme = 'skdigital';
    localStorage.setItem('theme', selectedTheme);
  }

  const mainStylesheet = document.querySelector('link.main');
  if (mainStylesheet) {
    mainStylesheet.href = `themes/${selectedTheme}/${selectedTheme}.css`;
  }

  const indexStylesheet = document.querySelector('link.index');
  if (indexStylesheet) {
    indexStylesheet.href = `themes/${selectedTheme}/${selectedTheme}index.css`;
  }

  const multiplayerStylesheet = document.querySelector('link.multiplayer');
  if (multiplayerStylesheet) {
    multiplayerStylesheet.href = `themes/${selectedTheme}/${selectedTheme}multiplayer.css`;
  }

  window.addEventListener('load', applyTheme.bind(null, selectedTheme));

  const skdigitalButton = document.querySelector('#skdigital');
  const originalButton = document.querySelector('#original');
  const terrariaButton = document.querySelector('#terraria');
  const skyrimButton = document.querySelector('#skyrim');
  const slimerancherButton = document.querySelector('#slimerancher');
  const tetrisButton = document.querySelector('#tetris');

  skdigitalButton.addEventListener('click', () => {
    localStorage.setItem('theme', 'skdigital');
    location.reload();
  });

  originalButton.addEventListener('click', () => {
    localStorage.setItem('theme', 'original');
    location.reload();
  });

  terrariaButton.addEventListener('click', () => {
    localStorage.setItem('theme', 'terraria');
    location.reload();
  });

  skyrimButton.addEventListener('click', () => {
    localStorage.setItem('theme', 'skyrim');
    location.reload();
  });
  
  slimerancherButton.addEventListener('click', () => {
    localStorage.setItem('theme', 'slimerancher');
    location.reload();
  });
  
  tetrisButton.addEventListener('click', () => {
    localStorage.setItem('theme', 'tetris');
    location.reload();
  });
  
const themeMusic = document.getElementById('bg-music');
const volumeSlider = document.getElementById('volume-slider');

volumeSlider.addEventListener('input', function() {
  themeMusic.volume = volumeSlider.value;
});
themeMusic.load();
themeMusic.play();   
});
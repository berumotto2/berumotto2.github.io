// Cache for sound files
const soundCache = new Map();

// AudioContext (create this only once)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

async function loadSound(url) {
  if (soundCache.has(url)) {
    return soundCache.get(url);
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    soundCache.set(url, audioBuffer);
    return audioBuffer;
  } catch (error) {
    console.error('Error loading sound:', error);
    throw error;
  }
}

function playSound(url) {
  loadSound(url)
    .then(audioBuffer => {
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.start(0);
    })
    .catch(error => console.error('Error playing sound:', error));
}

async function fetchGitHubDirectory(path) {
  const apiUrl = `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/contents/${path}`;
  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

async function setupSoundboard() {
  const soundboard = document.getElementById('soundboard-container');
  
  try {
    const contents = await fetchGitHubDirectory('sounds');
    
    for (const item of contents) {
      if (item.type === 'dir') {
        // It's a subdirectory, create a section
        const section = document.createElement('div');
        section.className = 'sound-section';
        section.innerHTML = `<h2>${item.name}</h2>`;
        soundboard.appendChild(section);
        
        // Fetch sounds in this subdirectory
        const subContents = await fetchGitHubDirectory(item.path);
        for (const subItem of subContents) {
          if (subItem.type === 'file' && subItem.name.endsWith('.mp3')) {
            createSoundButton(subItem, section);
          }
        }
      } else if (item.type === 'file' && item.name.endsWith('.mp3')) {
        // It's an MP3 file in the root sounds directory
        createSoundButton(item, soundboard);
      }
    }
  } catch (error) {
    console.error('Error setting up soundboard:', error);
  }
}

function createSoundButton(item, container) {
  const button = document.createElement('button');
  button.textContent = item.name.replace('.mp3', '');
  button.addEventListener('click', () => playSound(item.download_url));
  container.appendChild(button);
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setupSoundboard);

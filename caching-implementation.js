// Cache sound files in the browser
const soundCache = new Map();

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

// Usage
loadSound('path/to/your/sound.mp3')
  .then(audioBuffer => {
    // Use the audioBuffer
  })
  .catch(error => {
    console.error('Failed to load sound:', error);
  });

// player.js
let currentSource = null;
let currentSoundButton = null;
let isPlaying = false;
let audioContext = null;
let gainNode = null;
let startTime = 0; // Track when the audio started playing
let pauseTime = 0; // Track the time when paused
let audioBuffer = null; // Store the loaded audio buffer

// Initialize the AudioContext and GainNode
function initializeAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
    }
}

// Play sound from a URL
export function playSound(url, button, name) {
    if (currentSource) {
        stopSound(); // Stop any currently playing sound
    }

    initializeAudioContext();

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(buffer => {
            audioBuffer = buffer; // Store the buffer for resuming
            currentSource = audioContext.createBufferSource();
            currentSource.buffer = buffer;
            currentSource.connect(gainNode);
            currentSource.start(0, pauseTime); // Start from the paused time if applicable
            startTime = audioContext.currentTime - pauseTime; // Track start time for progress

            currentSoundButton = button;
            currentSoundButton.classList.add('playing');
            currentSoundButton.innerHTML = `<i class="fas fa-pause"></i> <span>${name}</span>`;
            isPlaying = true;

            // Update currently playing bar
            document.getElementById('current-sound-name').textContent = name;
            document.getElementById('currently-playing').style.display = 'flex';

            // Update progress bar and time display
            currentSource.onended = () => stopSound(); // Stop when audio ends
            requestAnimationFrame(updateProgress); // Start updating progress
        })
        .catch(error => {
            console.error('Error playing sound:', error);
            alert('Failed to load or play the sound. Please try again.');
        });
}

// Pause the currently playing sound
export function pauseSound() {
    if (currentSource && isPlaying) {
        currentSource.stop();
        pauseTime = audioContext.currentTime - startTime; // Store the pause time
        isPlaying = false;
        currentSoundButton.innerHTML = `<i class="fas fa-play"></i> <span>${currentSoundButton.dataset.name}</span>`;
        currentSource = null; // Clean up the source
    }
}

// Resume the paused sound
export function resumeSound() {
    if (audioBuffer && !isPlaying) {
        playSound(currentSoundButton.dataset.url, currentSoundButton, currentSoundButton.dataset.name);
    }
}

// Stop the currently playing sound
export function stopSound() {
    if (currentSource) {
        currentSource.stop();
        currentSource.disconnect();
        currentSource = null;
        isPlaying = false;
        pauseTime = 0; // Reset pause time

        if (currentSoundButton) {
            currentSoundButton.classList.remove('playing');
            currentSoundButton.innerHTML = `<i class="fas fa-play"></i> <span>${currentSoundButton.dataset.name}</span>`;
            currentSoundButton = null;
        }

        document.getElementById('currently-playing').style.display = 'none';
        document.getElementById('progress-bar').style.width = '0%'; // Reset progress bar
        document.getElementById('current-time').textContent = '0:00'; // Reset current time
    }
}

// Set the volume
export function setVolume(volume) {
    if (gainNode) {
        gainNode.gain.value = volume;
    }
}

// Update the progress bar and time display
function updateProgress() {
    if (currentSource && isPlaying) {
        const currentTime = audioContext.currentTime - startTime;
        const duration = currentSource.buffer.duration;
        const progress = (currentTime / duration) * 100;

        // Update progress bar
        document.getElementById('progress-bar').style.width = `${progress}%`;

        // Update time display
        document.getElementById('current-time').textContent = formatTime(currentTime);
        document.getElementById('total-time').textContent = formatTime(duration);

        // Continue updating progress
        requestAnimationFrame(updateProgress);
    }
}

// Format time in minutes and seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}
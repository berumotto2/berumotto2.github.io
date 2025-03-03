// player.js
let currentSource = null;
let currentSoundButton = null;
let isPlaying = false;
let audioContext = null;
let gainNode = null;

export function playSound(url, button, name) {
    if (currentSource) {
        currentSource.stop();
        currentSource = null;
        currentSoundButton.classList.remove('playing');
    }

    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
    }

    fetch(url)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            currentSource = audioContext.createBufferSource();
            currentSource.buffer = audioBuffer;
            currentSource.connect(gainNode);
            currentSource.start(0);

            currentSoundButton = button;
            currentSoundButton.classList.add('playing');
            currentSoundButton.innerHTML = `<i class="fas fa-pause"></i> <span>${name}</span>`;
            isPlaying = true;

            // Update currently playing bar
            document.getElementById('current-sound-name').textContent = name;
            document.getElementById('currently-playing').style.display = 'flex';
        })
        .catch(error => console.error('Error playing sound:', error));
}

export function pauseSound() {
    if (currentSource && isPlaying) {
        currentSource.stop();
        isPlaying = false;
        currentSoundButton.innerHTML = `<i class="fas fa-play"></i> <span>${currentSoundButton.dataset.name}</span>`;
    }
}

export function resumeSound() {
    if (currentSource && !isPlaying) {
        playSound(currentSoundButton.dataset.url, currentSoundButton, currentSoundButton.dataset.name);
    }
}

export function stopSound() {
    if (currentSource) {
        currentSource.stop();
        currentSource = null;
        isPlaying = false;

        if (currentSoundButton) {
            currentSoundButton.classList.remove('playing');
            currentSoundButton.innerHTML = `<i class="fas fa-play"></i> <span>${currentSoundButton.dataset.name}</span>`;
            currentSoundButton = null;
        }

        document.getElementById('currently-playing').style.display = 'none';
    }
}

export function setVolume(volume) {
    if (gainNode) {
        gainNode.gain.value = volume;
    }
}
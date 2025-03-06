// soundboard.js
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

async function fetchGitHubDirectory(path) {
    const apiUrl = `https://api.github.com/repos/berumotto2/berumotto2.github.io/contents/${path}`;
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
                section.className = 'soundboard-section';
                section.id = `section_${item.name}`;
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

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', setupSoundboard);
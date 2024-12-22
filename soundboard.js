// Cache for sound files
const soundCache = new Map();

// AudioContext (create this only once)
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Sections configuration
const sections = [
    {name: "ADS", folder: "ads"},
    {name: "APOLLO", folder: "apollo"},
    {name: "CELEBS", folder: "celebs"},
    {name: "COBALT", folder: "cobalt"},
    {name: "DAN", folder: "dan", note: "(the one rule of the sound board)"},
    {name: "DR U", folder: "dr_u"},
    {name: "FLIGHT REACTS", folder: "flight_reacts", note: "(lower your volume before playing)"},
    {name: "GAMING", folder: "gaming"},
    {name: "HOB", folder: "hob"},
    {name: "MALF", folder: "malf"},
    {name: "MOVIES", folder: "movies"},
    {name: "MUSIC", folder: "music"},
    {name: "NL - Ryan Gary", folder: "nl_ryan_gary"},
    {name: "MISC NOISES", folder: "misc_noises"},
    {name: "SKIP BAYLESS", folder: "skip_bayless"},
    {name: "SPORTS", folder: "sports", note: "(mostly football KKona)"},
    {name: "SQUEEX", folder: "squeex"},
    {name: "STREAMERS", folder: "streamers"},
    {name: "TCG", folder: "tcg"},
    {name: "TIK TOK & VINES", folder: "tiktok_vines"},
    {name: "TV", folder: "tv"},
    {name: "WWE", folder: "wwe"},
    {name: "YOUTUBE", folder: "youtube"}
];

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

function playSound(audioElement) {
    // Resume AudioContext if it's suspended (needed for some browsers)
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }
    
    if (audioElement.paused) {
        audioElement.play();
    } else {
        audioElement.pause();
        audioElement.currentTime = 0;
    }
}

async function createSoundItem(sectionId, soundName, filePath) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'sound-item';

    // Create button
    const button = document.createElement('button');
    button.className = 'sound-button';
    button.textContent = soundName;
    
    // Create player controls div
    const playerControls = document.createElement('div');
    playerControls.className = 'player-controls';
    
    // Create audio element
    const audio = document.createElement('audio');
    audio.controls = true;
    audio.src = filePath;
    
    // Add click handler to button
    button.onclick = () => playSound(audio);
    
    // Create download button
    const downloadButton = document.createElement('a');
    downloadButton.className = 'download-button';
    downloadButton.textContent = 'Download';
    downloadButton.href = filePath;
    downloadButton.download = soundName + '.mp3';

    // Assemble the elements
    itemDiv.appendChild(button);
    playerControls.appendChild(audio);
    playerControls.appendChild(downloadButton);
    itemDiv.appendChild(playerControls);

    // Add to section
    document.getElementById(sectionId).appendChild(itemDiv);
}

async function loadSoundsForSection(section) {
    const sectionId = `soundboard_${section.folder}`;
    const sectionElement = document.getElementById(sectionId);
    
    try {
        const response = await fetch(`https://api.github.com/repos/berumotto2/berumotto2.github.io/contents/sounds/${section.folder}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        if (Array.isArray(data) && data.length > 0) {
            data.forEach(file => {
                if (file.name.toLowerCase().endsWith('.mp3')) {
                    const soundName = file.name.replace('.mp3', '').replace(/_/g, ' ');
                    createSoundItem(sectionId, soundName, file.download_url);
                }
            });
        } else {
            throw new Error('No MP3 files found in this section');
        }
    } catch (error) {
        console.error(`Error loading sounds for ${section.name}:`, error);
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.textContent = `Failed to load sounds for ${section.name}. ${error.message}`;
        sectionElement.appendChild(errorMessage);
    }
}

// Initialize the soundboard
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('soundboard-container');
    const navMenu = document.getElementById('nav-menu');

    // Create navigation menu and sections
    sections.forEach(section => {
        // Add section to navigation menu
        const link = document.createElement('a');
        link.href = `#section_${section.folder}`;
        link.textContent = section.name;
        navMenu.appendChild(link);

        // Create section container
        const div = document.createElement('div');
        div.className = 'soundboard-section';
        div.id = `section_${section.folder}`;
        div.innerHTML = `
            <h2>${section.name}${section.note ? ' ' + section.note : ''}</h2>
            <div id="soundboard_${section.folder}" class="sound-items-grid"></div>
        `;
        container.appendChild(div);
        
        // Load sounds for this section
        loadSoundsForSection(section);
    });
});
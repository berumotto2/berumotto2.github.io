// search.js
export function performSearch(sounds, searchTerm) {
    if (searchTerm === '') {
        // Show all sections and sounds
        document.querySelectorAll('.soundboard-section, .sound-item').forEach(element => {
            element.style.display = 'block';
        });
        return;
    }

    // Hide all sections and sounds initially
    document.querySelectorAll('.soundboard-section, .sound-item').forEach(element => {
        element.style.display = 'none';
    });

    let hasResults = false;

    sounds.forEach(sound => {
        const matches = sound.name.includes(searchTerm);
        sound.element.style.display = matches ? 'flex' : 'none';

        if (matches) {
            hasResults = true;
            const sectionElement = sound.element.closest('.soundboard-section');
            if (sectionElement) {
                sectionElement.style.display = 'block';
            }

            // Highlight the search term in the sound name
            const soundNameElement = sound.element.querySelector('span');
            if (soundNameElement) {
                const soundName = soundNameElement.textContent;
                const highlightedName = soundName.replace(new RegExp(searchTerm, 'gi'), match => `<span class="highlight">${match}</span>`);
                soundNameElement.innerHTML = highlightedName;
            }
        }
    });

    if (!hasResults) {
        const noResultsMsg = document.getElementById('no-results-message') || document.createElement('div');
        noResultsMsg.id = 'no-results-message';
        noResultsMsg.className = 'error-message';
        noResultsMsg.innerHTML = `<i class="fas fa-search"></i> No sounds found matching "${searchTerm}"`;
        document.getElementById('soundboard-container').prepend(noResultsMsg);
    } else {
        const noResultsMsg = document.getElementById('no-results-message');
        if (noResultsMsg) {
            noResultsMsg.style.display = 'none';
        }
    }
}

export function debounce(func, delay) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}
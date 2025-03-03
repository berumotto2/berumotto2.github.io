// navigation.js
export function setupNavigation(sections) {
    const navMenu = document.getElementById('nav-menu');
    const sideNav = document.getElementById('side-nav');

    sections.forEach(section => {
        const link = document.createElement('a');
        link.href = `#section_${section.folder}`;
        link.textContent = section.name;
        navMenu.appendChild(link.cloneNode(true));
        sideNav.appendChild(link);
    });
}
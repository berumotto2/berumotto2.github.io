
const search = document.querySelector('input[type="search"]');
search.addEventListener('input', e => {
	const clips = Array.from(document.querySelectorAll('.button'));
	clips.forEach(clip => clip.removeAttribute('hidden'));
	clips.forEach(clip => {
		const title = clip.querySelector('.label').innerText.toLowerCase();
		if (!title.includes(search.value)) {
			clip.setAttribute('hidden', '');
		}
	})
});


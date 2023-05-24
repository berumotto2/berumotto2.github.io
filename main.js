const audioFiles = [
	"squeex_laughing", "nl_clueless",
];

const CONTAINER = document.getElementById('list-container');
const TEMPLATE = document.getElementById('template');
const AUDIO_DIR = 'audio';

audioFiles.forEach(filename => {
	const node = TEMPLATE.cloneNode(true);
	node.removeAttribute('hidden');
	node.removeAttribute('id');

	const title = node.querySelector('div');
	const source = node.querySelector('source');

	title.innerText = filename.split('.')[0];
	const ext = filename.split('.').pop().toLowerCase();
	let type;
	if (ext === 'mp3') {
		type = 'audio/mpeg';
	} else if (ext === 'wav') {
		type = 'audio/wav';
	}
	source.setAttribute('src', AUDIO_DIR + '/' + filename);
	source.setAttribute('type', type);

	CONTAINER.append(node);
});

const search = document.querySelector('input[type="search"]');
search.addEventListener('input', e => {
	const clips = Array.from(document.querySelectorAll('.audio-clip:not(#template)'));
	clips.forEach(clip => clip.removeAttribute('hidden'));
	clips.forEach(clip => {
		const title = clip.querySelector('.label').innerText.toLowerCase();
		if (!title.includes(search.value)) {
			clip.setAttribute('hidden', '');
		}
	})
});
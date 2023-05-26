const audioFiles = [
	"AIN'T NO WAY.mp3",
	"anatomy lesson.mp3",
	"banned from twitch.mp3",
	"bazinga (1).mp3",
	"bazinga (2).mp3",
	"bazinga (3).mp3",
	"bazinga (4).mp3",
	"bazinga (5).mp3",
	"bazinga (6).mp3",
	"bombs (1).mp3",
	"bombs (2).mp3",
	"Borat my wife.mp3",
	"bozo (1).mp3",
	"bozo (2).mp3",
	"busting a nut.mp3",
	"Clench my ass.mp3",
	"cocka.mp3",
	"Come on mario.mp3",
	"crushed by king whomp.mp3",
	"edging.mp3",
	"eheh.mp3",
	"fuck a fan canceled (1).mp3",
	"fuck a fan canceled (2).mp3",
	"fuck a fan is back on (1).mp3",
	"fuck a fan is back on (2).mp3",
	"goated (1).mp3",
	"goated (2).mp3",
	"GULP.mp3",
	"I am going to cum.mp3",
	"I fuck with you heavy (1).mp3",
	"I fuck with you heavy (2).mp3",
	"I fuck with you heavy (3).mp3",
	"I'm-a going to cum.mp3",
	"IRS.mp3",
	"Jerma confirms Squeex is awesome.mp3",
	"JOI.wav",
	"kiss.mp3",
	"koopas (1).mp3",
	"koopas (2).mp3",
	"koopas (3).mp3",
	"kramer jerry.mp3",
	"late_night_squeexin.mp3",
	"let's go brandon.mp3",
	"Make your bed in the morning (1).mp3",
	"Make your bed in the morning (2).mp3",
	"marker bit eraser.mp3",
	"marker bit.mp3",
	"master gave dobby a sock.mp3",
	"meow.mp3",
	"might be wondering (1).mp3",
	"might be wondering (2).mp3",
	"might be wondering (3).mp3",
	"minecraft punching trees.mp3",
	"minecraft villager.mp3",
	"More at 7 (1).mp3",
	"More at 7 (2).mp3",
	"More at 7 (3).mp3",
	"More at 7 (4).mp3",
	"More at 7 (5).mp3",
	"no cap.mp3",
	"obama sasha malia (1).mp3",
	"obama sasha malia (2).mp3",
	"obama stimulate your economy.mp3",
	"obama y'know.mp3",
	"ohoh.mp3",
	"pamplemousse.mp3",
	"pirate ain't no way.mp3",
	"pirate oh the huge manatee.mp3",
	"pirate oh the misery.mp3",
	"quieres.mp3",
	"right behind me (1).mp3",
	"right behind me (2).mp3",
	"rock hard for whomps.mp3",
	"SAJ.mp3",
	"seinfeld kramer (1).mp3",
	"seinfeld kramer (2).mp3",
	"seinfeld speed walking.mp3",
	"seinfeld what's up with that.mp3",
	"sheesh (1).mp3",
	"sheesh (2).mp3",
	"show us your pants.mp3",
	"Spongebob O sounds.mp3",
	"squeex discovers the soundboard.mp3",
	"Squeex play minecwaf.mp3",
	"Star Wars exsqueeze me.mp3",
	"Star Wars roger roger.mp3",
	"Stardew valley harvesting berries.mp3",
	"testicles.mp3",
	"Thanks for the head.mp3",
	"that just happened (1).mp3",
	"that just happened (2).mp3",
	"This goes out to all the believers.mp3",
	"This is BBC news.mp3",
	"This is my fucking nightmare.mp3",
	"Toad awawawawa.mp3",
	"toomyah.mp3",
	"walkin (1).mp3",
	"walkin (2).mp3",
	"walkin (3).mp3",
	"Wanna go for a ride jump on my hog.mp3",
	"watch me cum.mp3",
	"well gary (1).mp3",
	"well gary (2).mp3",
	"well gary (3).mp3",
	"well gary (4).mp3",
	"witch A.mp3",
	"witch CINNA.mp3",
	"yoda mmm.mp3",
	"yoshi (1).mp3",
	"yoshi (2).mp3",
	"yoshi (3).mp3",
	"zany life.mp3",
	"zoop zoop zoop.mp3",
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

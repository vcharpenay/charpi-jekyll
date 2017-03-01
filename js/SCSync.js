function SCSync(config) {
	var req = SC && Element.prototype.animate;
	if (!req) {
		if (!SC) {
			console.error('Soundcloud Widget API not found...');
		}

		if (!Element.prototype.animate) {
			console.error('Web Animations not supported...')
		}
		return;
	}

	// beats per minute
	if (!config.bpm) config.bpm = 80;
	// number of frames
	if (!config.frames) config.frames = 2;
	// image CSS selector
	if (!config.img) config.img = 'img';
	// Soundcloud iframe CSS selector
	if (!config.snd) config.snd = 'iframe';

	var img = document.querySelector(config.img);
	var snd = document.querySelector(config.snd);

	if (snd) {
		var anim = null;
	
		var player = SC.Widget(snd);
		player.bind(SC.Widget.Events.PLAY, function() {
			if (anim) {
				anim.play();
			} else {
				anim = img.animate([
					{ transform: 'translateX(0)' },
					{ transform: 'translateX(-100%)' }
				], {
					duration: 60 / config.bpm * 1000,
					easing: 'steps(' + config.frames + ', end)',
					iterations: Infinity
				});
			}
		});
		player.bind(SC.Widget.Events.PAUSE, function() {
			anim.pause();
		});
		player.bind(SC.Widget.Events.FINISH, function() {
			anim.finish();
		});
	}
}

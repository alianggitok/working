function audioInit() {
	audiojs.events.ready(function () {
		var as = audiojs.createAll();
	});
};
audioInit();

$(function () {
	var listenbar = $('.listenbar'),
		listenbtn = null,
		listenAudio = null,
		checkStatusTimer = null,
		checkStatusDelay = null,
		isPlaying = null;

	listenbar.each(function () {
		listenbar = $(this);
		listenbtn = listenbar.find('.btn-listen');
		resetAudio = null;

		listenbtn.click(function () {
			clearInterval(checkStatusTimer);
			checkStatusTimer = null;
			clearTimeout(checkStatusDelay);
			checkStatusDelay = null;
			listenAudio = listenbar.find('audio');
			listenAudioJS = listenbar.find('.audiojs');
			resetAudio = function () {
				listenAudioJS.remove();
				listenAudio.prependTo(listenbar);
				audioInit();
				listenbar.removeClass('listenbar-playing');
			};

			isPlaying = listenbar.find('.playing').is('.playing');
			if (!isPlaying) {
				resetAudio();
			};

			listenbar.find('.play-pause').click();

			checkStatusDelay = setTimeout(function () {
				isPlaying = listenbar.find('.playing').is('.playing');
				if (isPlaying) {
					listenbar.addClass('listenbar-playing');
					clearTimeout(checkStatusDelay);
					checkStatusDelay = null;
				} else {
					listenbar.removeClass('listenbar-playing');
				};
			}, 300);
			checkStatusTimer = setInterval(function () {
				isPlaying = listenbar.find('.playing').is('.playing');
				if (!isPlaying) {
					listenbar.removeClass('listenbar-playing');
					clearInterval(checkStatusTimer);
					checkStatusTimer = null;
				};
			}, 500);
		});
	});
});

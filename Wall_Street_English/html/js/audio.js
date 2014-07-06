audiojs.events.ready(function () {
 	var as = audiojs.createAll();
});

$(function () {
	var listenbar = $('.listenbar'),
		listenbtn = null,
		listenAudio = null,
		checkStatusTimer = null,
		isPlaying = null;

	listenbar.each(function () {
		listenbar = $(this);
		listenbtn = listenbar.find('.btn-listen');

		listenbtn.click(function () {
			listenbar.find('.play-pause').click();
			isPlaying = listenbar.find('.playing').is('.playing');
			console.log(isPlaying);
			if (isPlaying) {
				listenbar.addClass('listenbar-playing');
			} else {
				listenbar.removeClass('listenbar-playing');
			};
		});
	});
});

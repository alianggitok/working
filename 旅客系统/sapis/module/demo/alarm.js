;(function($,app,window){
	
	/*演示代码*/
	var player=$(app.elems.alarm).get(0),
		 btn=$('#btn-alarm'),
		 isPlaying=function(){
			 return !player.paused;
		 };

	function btnStyle(){
		if(isPlaying()){
			btn.find('.icon').removeClass('play').addClass('pause');
			btn.find('.text').text('Playing');
		}else{
			btn.find('.icon').removeClass('pause').addClass('play');
			btn.find('.text').text('Stopped');
		}
	}
	btnStyle();

	$('#btn-alarm').click(function(){

		if(isPlaying()){
			/*停止*/
			player.pause();
			player.load();
		}else{
			/*播放*/
			player.volume=1;
			player.play();
		}

		btnStyle();

	});
	/*演示代码*/

})(jQuery,app,window);

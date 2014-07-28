/********** functions **********/
;(function(global){
	var _window=$(window),
		browserAgent=navigator.userAgent,
		browser={
			isIE6: function(){
				return /msie 6/i.test(browserAgent);
			},
			isIE7: function(){
				return /msie 7/i.test(browserAgent);
			},
			isIE9: function(){
				return /msie 9/i.test(browserAgent);
			}
		},
		_header=$('.layout-header'),
		_headerCont=_header.children('.container'),
		_footer=$('.layout-footer');


	global.ui={
		/*fix btn icon position*/
		vAlignMiddleFix: function (obj) {
			$(obj).each(function () {
				var txt = $.trim($(this).parent().text()),
					patch = '<span style="display:inline-block; font-size:0; width:0; overflow:hidden; vertical-align:middle; visibility:hidden">&nbsp;</span>';
				if (browser.isIE9() && txt == '') {
					$(this).before(patch);
				};
			});
		},

		response:function(){
			var triggerWidth=640,
				triggerHeight=580,
				delay=null;
			function exec(){
				if($(window).width()<=triggerWidth){
					_footer.appendTo('body');
				}else{
					_footer.appendTo(_headerCont);
				};
				if($(window).height()<=triggerHeight){
					$('body').addClass('response-height-lte');
				}else{
					$('body').removeClass('response-height-lte');
				};
			}
			exec();
			$(window).off('resize.response').on('resize.response',function(){
				exec();
			});
		}




	};

}(window));


/*********** exec ***********/
$(function () {
	ui.response();
});


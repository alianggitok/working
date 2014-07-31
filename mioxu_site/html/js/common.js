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
			isIE8: function(){
				return /msie 8/i.test(browserAgent);
			},
			isIE9: function(){
				return /msie 9/i.test(browserAgent);
			}
		},
		_header=$('.layout-header'),
		_headerCont=_header.children('.container'),
		_main=$('.layout-main'),
		_mainCont=_main.children('.container'),
		_footer=$('.layout-footer'),
		_gotoTop=$('<a class="btn btn-gototop" title="到顶部" href="#"><i class="ico"></i></a>'),
		effectDuration=150;


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

		/*goto top button effect*/
		gototop:function(obj,ref){
			var delay=null,
				top=0;
			function position(){
				$(obj).hide();
				clearTimeout(delay);
				delay=setTimeout(function(){
					top=$(ref).scrollTop()+$(ref).outerHeight()-$(obj).outerHeight()-parseInt($(obj).css('margin-bottom'));
					$(obj).css({
						'top':top+'px'
					}).stop(false,true).fadeIn('fast');
				},effectDuration);
			};
			position();
			$(ref).off('.gototop').on({
				'scroll.gototop':
				function(){
					position();
				},
				'resize.gototop':
				function(){
					position();
				}
			});
			$(obj).off('click.gototop').on('click.gototop',function(e){
				$(ref===window?'html,body':ref).animate({'scrollTop':'0px'},effectDuration);
				e.preventDefault();
			});
		},

		/*responsive action*/
		response:function(){
			var triggerWidth=640,
				triggerHeight=580,
				delay=null;
			function exec(){
				if($(window).width()<=triggerWidth){
					_footer.appendTo('body');
					$('html').addClass('rsp-lte-w640');
					_gotoTop.appendTo('body');
					ui.gototop('.btn-gototop',window);
				}else{
					_footer.appendTo(_headerCont);
					$('html').removeClass('rsp-lte-w640');
					_gotoTop.appendTo('.layout-main .container');
					ui.gototop('.btn-gototop','.layout-main .container');
				};
				if($(window).height()<=triggerHeight){
					$('html').addClass('rsp-lte-h580');
				}else{
					$('html').removeClass('rsp-lte-h580');
				};
			}
			exec();
			$(window).off('resize.response').on('resize.response',function(){
				if($(window).height()<=triggerHeight&&$(window).width()>triggerWidth){
					_footer.hide();
				};
				clearTimeout(delay);
				delay=setTimeout(function(){
					exec();
					_footer.stop(false,true).fadeIn(effectDuration);
				},effectDuration);
			});
		}


	};

}(window));


/*********** exec ***********/
$(function () {
	ui.response();
});


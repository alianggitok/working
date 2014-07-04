/********** functions **********/
;(function(global){
	var _window=$(window);
	var browserAgent=navigator.userAgent;
	var browser={
		isIE6: function(){
			return /msie 6/i.test(browserAgent);
		},
		isIE7: function(){
			return /msie 7/i.test(browserAgent);
		},
		isIE9: function(){
			return /msie 9/i.test(browserAgent);
		}
	};

	global.ui={
		/*fix btn icon position*/
		vAlignMiddleFix: function (obj) {
			$(obj).each(function () {
				var txt = $.trim($(this).parent().text());
				var patch = '<span style="display:inline-block; font-size:0; width:0; overflow:hidden; vertical-align:middle; visibility:hidden">&nbsp;</span>';
				if (browser.isIE9() && txt == '') {
					$(this).before(patch);
				};
			});
		},

		/*navig initialize*/
		navigInit:function(triggerobj,activeObj){
			var _triggerobj=$(triggerobj), _activeObj=$(activeObj);
			var _bodyChild=$('body').children(':not("header,footer,script,link")');
			//var minHeight=_activeObj.height();
			//var height=0;
			//for (i=0;i<_bodyChild.length;i++){
			//	height+=_bodyChild.eq(i).outerHeight();
			//};
			//if(height>minHeight){
			//	_activeObj.height(height);
			//};
			_triggerobj.off('click.navig').on('click.navig',function(e){
				if(_activeObj.is(':visible')){
					_activeObj.slideUp();
				}else{
					_activeObj.slideDown();
				};
				e.preventDefault();
			});
			$(document).off('click.navig touchend.navig').on('click.navig touchend.navig', function (e) {
				var _objs=$(triggerobj+','+activeObj+' li'+', .layout-navig .nav');
				if (($(e.target).closest(_objs).is(_objs) || $(e.target).is(_objs)) == false) {
					_activeObj.slideUp();
				};
			});
		},

		checkboxInit:function(obj,isSingle){
			var _obj=$(obj);
			var stateChecked='checkbox-checked';
			_obj.off('click.checkbox').on('click.checkbox',function(e){
				if($(this).is('.'+stateChecked)){
					$(this).removeClass(stateChecked);
				}else{
					if(isSingle){
						$(obj).removeClass(stateChecked);
					};
					$(this).addClass(stateChecked);
				};
				e.stopPropagation();
			});
			_obj.parent('label').off('click.checkbox').on('click.checkbox',function(e){
				if($(this).children(obj).is('.'+stateChecked)){
					$(this).children(obj).removeClass(stateChecked);
				}else{
					if(isSingle){
						$(obj).parent('label').children(obj).removeClass(stateChecked);
					};
					$(this).children(obj).addClass(stateChecked);
				};
				e.stopPropagation();
			});
		},

		/*tabbox*/
		tabbox: function (obj, motion) {
			$(obj).each(function () {
				var _obj = $(this);
				var _tabObj = _obj.find('.tabs .tab');
				var _contObj = _obj.find('.conts .cont');

				_contObj.hide();
				_contObj.first().show();
				_tabObj.first().addClass('current').next().addClass('next');

				_tabObj.on(motion, function () {
					var n = $(this).index();
					$(this).siblings().andSelf().removeClass('prev current next');
					$(this).prev().addClass('prev');
					$(this).addClass('current');
					$(this).next().addClass('next');
					_contObj.hide().eq(n).show();
				});

				if (motion == 'click') {
					_tabObj.click(function (e) {
						e.preventDefault();
					});
				};
			});
		}


	};

}(window));


/*********** exec ***********/
$(function(){
	var navigTriggerObj='.layout-header .navig-trigger .ico';

	ui.vAlignMiddleFix('.ico');
	ui.navigInit(navigTriggerObj,'.layout-navig .navig');
	ui.checkboxInit('.options .checkbox',true);
	ui.tabbox('.tabbox-click','click');

	//back to navigation
	$('.layout-navig .nav .nav-backnavig').on('click',function(){
		$(navigTriggerObj).click();
	});

	//list summary fold
	$('.mainlist .summary .trigger').on('click',function(e){
		var _activeObj=$(this).next('');
		if(_activeObj.is(':visible')){
			_activeObj.slideUp();
		}else{
			_activeObj.slideDown();
		};
		e.preventDefault();
	});

});
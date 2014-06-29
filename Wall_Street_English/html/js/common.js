/********** functions **********/
;(function(obj){
	var _window=$(window);

	ui={
		//navig initialize
		navigInit:function(triggerobj,activeObj){
			var _triggerobj=$(triggerobj), _activeObj=$(activeObj);
			var _bodyChild=$('body').children(':not("header,footer,script,link")');
			var minHeight=_activeObj.height();
			var height=0;
			for (i=0;i<_bodyChild.length;i++){
				height+=_bodyChild.eq(i).outerHeight();
			};
			if(height>minHeight){
				_activeObj.height(height);
			};
			_triggerobj.off('click.navig').on('click.navig',function(e){
				if(_activeObj.is(':visible')){
					_activeObj.slideUp();
				}else{
					_activeObj.slideDown();
				};
				e.preventDefault();
			});
			$(document).off('click.navig').on('click.navig', function (e) {
				var _objs=$(triggerobj+','+activeObj+' li'+', .layout-navig .nav');
				if (($(e.target).closest(_objs).is(_objs) || $(e.target).is(_objs)) == false) {
					_activeObj.slideUp();
				};
			});
		},

		checkboxInit:function(obj){
			var _obj=$(obj);
			var stateChecked='checkbox-checked';
			_obj.off('click.checkbox').on('click.checkbox',function(){
				if($(this).is('.'+stateChecked)){
					$(this).removeClass(stateChecked);
				}else{
					$(this).addClass(stateChecked);
				};
			});
			_obj.parent('label').off('click.checkbox').on('click.checkbox',function(){
				if($(this).children(obj).is('.'+stateChecked)){
					$(this).children(obj).removeClass(stateChecked);
				}else{
					$(this).children(obj).addClass(stateChecked);
				};
			});
		}


	};

}(window.ui));


/*********** exec ***********/
$(function(){
	var navigTriggerObj='.layout-header .navig-trigger .ico';

	ui.navigInit(navigTriggerObj,'.layout-navig .navig');
	ui.checkboxInit('.checkbox');

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
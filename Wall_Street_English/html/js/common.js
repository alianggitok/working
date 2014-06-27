/********** functions **********/
;(function(){
	var _window=$(window);

	return ui={
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
			_triggerobj.on('click',function(e){
				if(_activeObj.is(':visible')){
					_activeObj.slideUp();
				}else{
					_activeObj.slideDown();
				};
				e.preventDefault();
			});
		}
	};

}());


/*********** exec ***********/
$(function(){
	ui.navigInit('.layout-header .navig-trigger','.layout-navig .navig')
});
;(function($,app,window){
	
	var trs=$('#datagrid').find('tbody tr');
	trs.on('dblclick',function(){
		app.ui.dialog('#detail');
		trs.removeClass('active');
		$(this).addClass('active');

	});
	
})(jQuery,app,window);

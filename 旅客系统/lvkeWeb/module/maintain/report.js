;(function($,app,window){
	/*演示用代码，开发中请删除或注释*/
	var trs=$('#datagrid').find('tbody tr');
	trs.on('dblclick',function(){
		app.ui.dialog('#detail');
		trs.removeClass('active');
		$(this).addClass('active');

	});
	/*演示用代码结束*/
	
})(jQuery,app,window);

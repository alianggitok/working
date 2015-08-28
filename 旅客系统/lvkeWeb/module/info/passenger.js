;(function($,app,window){
	/*演示用代码，开发中请删除或注释*/
	var trs=$('#datagrid').find('tbody tr');
	trs.on('dblclick',function(){
		app.ui.dialog('#detail-passenger');
		trs.removeClass('active');
		$(this).addClass('active');
	});
	trs.find('.onclick-detail-flight').on('click',function(){
		app.ui.dialog('#detail-flight');
		trs.removeClass('active');
		$(this).closest('tr').addClass('active');
	});
	trs.find('.onclick-detail-class').on('click',function(){
		app.ui.dialog('#detail-class');
		trs.removeClass('active');
		$(this).closest('tr').addClass('active');
	});
	/*演示用代码结束*/

})(jQuery,app,window);

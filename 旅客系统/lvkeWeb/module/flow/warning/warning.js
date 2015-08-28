;(function($,app,window){
	/*演示用代码，开发中请删除或注释*/
	var trs=$('#datagrid').find('tbody tr');
	trs.on('dblclick',function(){
		app.ui.dialog('#dialog-detail');
		trs.removeClass('active');
		$(this).addClass('active');
	});
	$('#btn-add').on('click',function(){
		app.ui.dialog('#dialog-plus');
	});
	$('#btn-delete').on('click',function(){
		app.ui.confirm({
			title:'删除确认',
			msg:'是否删除选中的数据？',
			buttons:[
				'<button class="ui green button approve"><i class="checkmark icon"></i>是</button>',
				'<button class="ui red button deny"><i class="remove icon"></i>否</button>'

			]
		});
	});
	/*演示用代码结束*/

})(jQuery,app,window);

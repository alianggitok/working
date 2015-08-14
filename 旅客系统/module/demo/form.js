;(function($,app,window){

	$('.ui.form').form({
		fields:{
			type:{
				identifier:'type',
				rules:[
					{type:'empty',prompt:'请选择'}
				]
			},
			name:{
				identifier:'name',
				rules:[
					{type:'empty',prompt:'不能为空'}
				]
			},
			email:{
				identifier:'e-mail',
				rules:[
					{type:'email',prompt:'请输入真确的email地址'}
				]
			},
			date:{
				identifier:'date',
				rules:[
					{type:'empty',prompt:'请输入日期'}
				]
			}
		},
		inline : true
	})

})(jQuery,app,window);

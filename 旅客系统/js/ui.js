var app={};

(function($,app,window){

	var elems={
		navigLeftSide:'#navigLeftSide',
		navigTop:'#navigTop',
		btnSidebarTrigger:'#btn-sidebarTrigger',
		mainView:'#mainView'
	};
	
	app.ajax=function(opts,callback){//ajax数据交互方法
//		var buffer=null;
		var dfts={
			url:null,
			data:null,
//			global:true,
			async: true,
			cache:false,
			dataType:'json',
			type: 'POST',
			timeout:15000,
			msg:'处理中……',
			beforeSend:function(){
//				buffer=app.ui.buffer.show({
//					msg:opts.msg
//				});
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				var msg='Ajax过程错误，或联系管理员：\n'+
						 'XMLHttpRequest: '+XMLHttpRequest+'\n'+
						 'textStatus: '+textStatus+'\n'+
						 'errorThrown: '+errorThrown;
				alert(msg);
				console.log(XMLHttpRequest,textStatus,errorThrown);
//				app.ui.buffer.hide(buffer);
			},
			success:function(result){
				callback(result);
			},
			complete:function(){
//				app.ui.buffer.hide(buffer);
			}
		};

		opts=$.extend(dfts,opts);

		callback=((callback||typeof(callback)!=='undefined')?callback:function(){});

		if(!opts.url){
			alert('ajax.exec()，请配置url');
			return;
		}
//		if(!opts.data){
//			alert('ajax.exec()，请配置data');
//			return;
//		}

		$.ajax(opts);

	};

	app.ui={
		init:function(){
			//components
			$('.ui.accordion').accordion();
			$('.ui.dropdown').dropdown();
			$('.popuped').popup({
				inline: false,
				className:{
					popup:'ui inverted mini popup'
				}
			});
			$('.ui.checkbox').checkbox();
			
			//left side
			app.ui.sidebar(elems.navigLeftSide);
			$(elems.navigLeftSide).sidebar('push page');
			$(elems.btnSidebarTrigger).on('click',function(){
				$(elems.navigLeftSide).sidebar('toggle');
			});
			
			//visibility
			$('body').visibility({
				checkOnResize:true,
				checkOnRefresh:true,
				onUpdate:function($element){
					if($element.width>960){
						$(elems.navigLeftSide).removeClass('small');
					}else{
						$(elems.navigLeftSide).addClass('small');
					}
					app.ui.topNav();
				}
			});
			$(elems.navigLeftSide).visibility({
				checkOnResize:true,
				checkOnRefresh:false,
				onRefresh:function(){
					app.ui.sidebar(elems.navigLeftSide);
				}
			});
			
			//call logout
			$('#btn-logout').on('click',function(e){
				app.ui.dialog.confirm({
					title:'',
					msg:'是否退出系统？',
					icon:'huge icon help',
					style:{
						basic:'basic',
						header:'center aligned',
						content:'center aligned',
						actions:'center aligned'
					},
					onApprove:function(){
						alert('退出！');
					}
				});
			});
			
//			app.ui.datagrid('.ui.table');
			
		},
		topNav:function(){
//			console.log('topnav')
			if(parseInt($(elems.mainView).css('margin-top'),10)!==$(elems.navigTop).outerHeight()){
				$(elems.mainView).css({
					'margin-top':$(elems.navigTop).outerHeight()+'px'
				});
			}
		},
		sidebar:function(obj,opts){
			var dfts={
				context:'body',
				transition:'push',
				dimPage:false,
				closable:false,
				duration:500,
				selector:{
					pusher:'.pusher'
				},
				onVisible:function(){
					resize(true);
					$(elems.btnSidebarTrigger).find('.icon').removeClass('indent').addClass('outdent');
				},
				onHide:function(){
					resize(false);
					$(elems.btnSidebarTrigger).find('.icon').addClass('indent').removeClass('outdent');
				}
			};
			opts=$.extend(dfts,opts);
			
			function resize(isVisible){
				var width=isVisible?$(obj).outerWidth()+parseInt($(elems.mainView).css('padding-left'),10):0;
				console.log('sidebar resize:',width);
				
				if((/scale down/g).test(opts.transition)){
					$(elems.navigTop).stop(false,true).animate({'padding-right':width+'px'},opts.duration,function(){
						finished(isVisible);
					});
				}else if((/overlay/g).test(opts.transition)){
					finished(isVisible);
				}else{
					$(elems.mainView).stop(false,true).animate({'padding-right':width+'px'},opts.duration);
					$(elems.navigTop).stop(false,true).animate({'padding-right':width+'px'},opts.duration,function(){
						finished(isVisible);
					});
				}
			}
			
			function finished(isVisible){
				if(isVisible){
					$(elems.navigTop).removeClass('inverted large');
				}else{
					$(elems.navigTop).addClass('inverted large');
				}
				app.ui.topNav();
			}
			
			$(obj).sidebar(opts);
			
			if($(obj).sidebar('is visible')){
				resize(true);
				$(obj).sidebar('push page');
			}
			
		},
		datagrid:function(obj,opts){
			var dfts={
				searching:false,
				lengthChange: false,
				ordering:true,
				paging:true,
				processing:true,
				stateSave: false,
				serverSide:false,
				classes:{
				}
			};
			
			opts=$.extend(dfts,opts);
			$.extend($.fn.dataTableExt.oStdClasses,dfts.classes);
			
			$(obj).DataTable(opts);
		},
		dialog:{
			confirm:function(opts){
				var obj=null;
				var html=null;
				var dfts={
					icon:'help icon',//图标，基于semantic ui
					title:'确认',//标题
					msg:'确认？',//提示内容
					style:{//样式，基于semantic ui
						basic:'small',
						header:'left aligned',
						content:'left aligned',
						actions:'left aligned'
					},
					buttons:[//按钮，基于semantic ui
						'<button class="ui green inverted button approve"><i class="checkmark icon"></i>同意</button>',
						'<button class="ui red inverted button deny"><i class="remove icon"></i>拒绝</button>'
					],
					allowMultiple:false,//是否同时打开多个
					context:'body',//上下文
					closable:true,//点击遮罩区关闭
					transition:'scale',//呈现动画
					blurring:true,//遮罩模糊
					duration:'400',
					selector:{
						approve:'.actions .approve',
						deny:'.actions .deny'
					},
					onHidden:function(){
						if(opts.allowMultiple){
							obj.remove();
						}
					},
					onApprove:function(){
					},
					onDeny:function(){
					},
				};
				
				opts=$.extend(dfts,opts);
				html=''+
					'<div class="ui small coupled modal ui-modal-confirm">'+
					'	<div class="header">'+
					'		<i class="'+opts.icon+'"></i>'+opts.title+
					'	</div>'+
					'	<div class="content">'+
					'		'+opts.msg+
					'	</div>'+
					'	<div class="actions"></div>'+
					'</div>';

				obj=$(html);
				
				obj.addClass(opts.style.basic);
				obj.find('.header').addClass(opts.style.header);
				obj.find('.content').addClass(opts.style.content);
				obj.find('.actions').addClass(opts.style.actions);
				for(var i=0,len=opts.buttons.length; i<len; i+=1){
					obj.find('.actions').append(opts.buttons[i]);
				}
				
				obj.appendTo(opts.context).modal(opts);
				obj.modal('show');
				
				return obj;
			},
			alert:function(opts){
			}
		}
	};
	
})(jQuery,app,window);



$(function(){
	app.ui.init();
});
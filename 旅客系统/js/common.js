;(function($,app,window){

	var elems={
		leftSide:'#leftSide',
		top:'#top',
		leftSideTrigger:'#leftSideTrigger',
		main:'#main',
		btnLogout:'#btn-logout',
		pageBuffer:'#pageBuffer',
		pageCont:'#pageCont',
	};
	
	app.cookie=function(data){
		//usage: app.cookie({key:value});
		var key=null;
		for(key in data){
			$.cookie(key, data[key], {
				path:app.path.root
			});
		}
	};
	
	app.ajax=function(opts,callback){//ajax数据交互方法
		var buffer=null;
		var dfts={
			url:null,
			data:null,
			global:false,
			async: true,
			cache:false,
			dataType:'json',
			type: 'POST',
			timeout:app.settings.timeout,
			buffer:true,
			bufferContext:'body',
			bufferMsg:'处理中……',
			beforeSend:function(){
				if(opts.buffer){
					buffer=app.ui.buffer.show({
						msg:opts.bufferMsg,
						context:opts.bufferContext
					});
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				var msg='Ajax过程错误，或联系管理员：\n'+
						 'XMLHttpRequest: '+XMLHttpRequest+'\n'+
						 'textStatus: '+textStatus+'\n'+
						 'errorThrown: '+errorThrown;
				alert(msg);
				console.log(XMLHttpRequest,textStatus,errorThrown);
				if(opts.buffer){
					app.ui.buffer.hide(buffer);
				}
			},
			success:function(result){
				callback(result);
			},
			complete:function(){
				if(opts.buffer){
					app.ui.buffer.hide(buffer);
				}
			}
		};

		opts=$.extend(dfts,opts);

		callback=((callback||typeof(callback)!=='undefined')?callback:function(){});

		if(!opts.url){
			alert('app.ajax()，请配置url');
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
			$('.ui-popup').popup({
				inline: false,
				exclusive:true,
				className:{
					popup:'ui inverted mini popup'
				}
			});
			$('.ui.checkbox').checkbox();
			
			//visibility
			$('body').visibility({
				once:true,
				continuous:false,
				checkOnRefresh:true,
				onRefresh:function(){
					app.ui.response();
					app.ui.draw();
				}
			});
			$('body').visibility('refresh');
			$(elems.leftSide).sidebar('show');
			
			//events call
			$(elems.btnLogout).off('click.logout').on('click.logout',function(){
				app.ui.confirm({
					title:'',
					msg:'是否退出系统？',
					icon:'huge help circle icon',
					style:{
						basic:'basic small',
						header:'center aligned',
						content:'center aligned',
						actions:'center aligned',
						buttons:'inverted'
					},
					onApprove:function(){
						alert('退出！');
					}
				});
			});
			
			$(elems.leftSideTrigger).off('click.leftsidetrigger').on('click.leftsidetrigger',function(){
				$(elems.leftSide).sidebar('toggle');
			});
			
//			app.ui.datagrid('.ui.table');
			
			//navig build
			if(!$(elems.leftSide).find('.item').length){
				app.ui.navigLeftBuild(app.settings.menuItems);
			}
			
			//first load page
			if($(elems.pageBuffer).length){
				$(elems.pageBuffer).dimmer({
					closable:false,
					duration:{
						hide:app.settings.duration
					},
					onHide:function(){
						window.setTimeout(function(){
							$(elems.pageBuffer).remove();
							app.ui.draw();
						},app.settings.duration);
					}
				});
				$(elems.pageBuffer).dimmer('hide');
			}
			
		},
		response:function(){
			var width=$(window).width();
			if(width>960){
				console.log('response: medium');
				$(elems.leftSide).addClass('large').removeClass('small labeled icon');
				$('.ui.table').removeClass('small');
				$(elems.top).find('.header').html(app.info.fullTitle);
			}else if(width<=960&&width>=680){
				console.log('response: small');
				$(elems.leftSide).addClass('small').removeClass('large labeled icon');
				$('.ui.table').addClass('small');
				$(elems.top).find('.header').html(app.info.title);
			}else if(width<680){
				console.log('response: tiny');
				$(elems.leftSide).addClass('labeled icon').removeClass('small large');
				$('.ui.table').addClass('small');
				$(elems.top).find('.header').html(app.info.sortTitle);
			}
			app.ui.sidebar(elems.leftSide);
		},
		draw:function(leftSideVisibled){
			var bodyWidth=$('body').outerWidth(),
				 visibled=(leftSideVisibled!==undefined)?leftSideVisibled:$(elems.leftSide).sidebar('is visible'),
				 leftSideWidth=visibled?$(elems.leftSide).outerWidth():0;
//			console.log(visibled,leftSideWidth,topWidth);
			
			$(elems.top).stop(false,true).animate({
				'width':bodyWidth-leftSideWidth+'px',
			},0,function(){
				if(visibled){
					$(elems.top).removeClass('inverted');
				}else{
					$(elems.top).addClass('inverted');
				}
				$(elems.main).stop(false,true).animate({
					'padding-top':$(elems.top).outerHeight()+'px',
					'margin-right':leftSideWidth+'px'
				},app.settings.duration);
			});
			
		},
		buffer:{
			show:function(opts){
				var dfts={
						context:'body',
						msg:'处理中……',
						size:'medium',//mini,small,medium,large
						inverted:false,//反色
						closable:false,//点击留白关闭
						duration:app.settings.duration,//动画持续时间
						opacity:0.7//透明
					};
					opts=$.extend(dfts,opts);
				var html=''+
					 '<div class="ui page dimmer">'+
					 '	<div class="ui text visible loader">'+opts.msg+'</div>'+
					 '</div>',
					 obj=$(html),
					 loader=obj.find('.ui.loader');

				if(opts.inverted){
					obj.addClass('inverted');
				}
				loader.addClass(opts.size);
				
				$(opts.context).append(obj);
				
				obj.dimmer({
					closable:opts.closable,
					duration:{
						show:opts.duration,
						hide:opts.duration
					},
					opacity:opts.opacity,
					onChange:function(){
//						var paddingTop=parseInt($(opts.context).css('padding-top'),10);
						obj.css({
//							'margin-top':paddingTop+'px',
//							'height':$(window).height()-paddingTop+'px'
							'height':$(window).height()+'px'
						});
					},
					onHide:function(){
						window.setTimeout(function(){
							obj.remove();
							app.ui.draw();
						},opts.duration);
					}
				});
				obj.dimmer('show');
				
				console.log(opts.msg);
				return obj;
			},
			hide:function(obj){
				$(obj).dimmer('hide');
			}
		},
		navigLeftBuild:function(data){
			var html='',
				 obj=$(elems.leftSide),
				 currentNavigID=$.cookie('currentNavigID');
			
			(function build(i,data){
				if(i>=data.length){
					return;
				}
				
				var iconHtml=data[i].icon?'<i class="icon '+data[i].icon+'"></i>':'',
					 childData=data[i].children,
					 childLen=(typeof childData==='undefined'||!childData)?0:childData.length;
					 
				if(childLen){
					html+=''+
						'<div class="item">'+
						'	'+iconHtml+
						'	<div class="title">'+data[i].text+'</div>'+
						'	<div class="menu content">';
					build(0,data[i].children);
					html+=''+
						'	</div>'+
						'</div>';
				}else{
					iconHtml=data[i].icon?'<i class="icon '+data[i].icon+'"></i>':'';
					html+='<a href="'+data[i].href+'" class="item" data-id="'+data[i].id+'">'+iconHtml+data[i].text+'</a>';
				}
				i+=1;
				build(i,data);
			})(0,data);
			
			obj.append(html);
			
			var navigItem=obj.find('.item'),
				 currentNavigItem=navigItem.filter('[data-id='+currentNavigID+']');
			
			navigItem.on('click',function(e){
				e.preventDefault();
				var href=$(this).attr('href'),
					 id=$(this).attr('data-id'),
					 activeNavigItem=$(this);
				console.warn('loading href:',href);
				
				if(!href||href==='#'){
					return;
				}
				
				app.cookie({
					currentNavigID:id
				});
				
				$('.'+app.settings.dimmerName.modals).remove();
				$('.'+app.settings.dimmerName.dialogs).remove();
				$(window).scrollTop(0);
				
				app.ajax({
					dataType:'html',
					type:'GET',
					bufferContext:elems.main,
					url:href
				},function(html){
					var parents=activeNavigItem.parents('.item');
					$(elems.pageCont).html(html);
					navigItem.removeClass('active');
					activeNavigItem.addClass('active');
					parents.addClass('active');
					navigItem.children('.title,.content').removeClass('active');
					parents.children('.title,.content').addClass('active');
					app.ui.init();
				});
			});
			
			console.warn('currentNavigID in cookie:',currentNavigID);
			if(!$.cookie('currentNavigID')||currentNavigItem.length===0){
				navigItem.first().click();
			}else{
				currentNavigItem.click();
			}
			
			
		},
		sidebar:function(obj,opts){
			var dfts={
				context:'body',
				transition:'push',
				dimPage:false,
				closable:false,
				duration:app.settings.duration,
				selector:{
					pusher:elems.main
				},
				onShow:function(){
					$(elems.leftSideTrigger).find('.icon').removeClass('indent').addClass('outdent');
					app.ui.draw(true);
				},
				onHide:function(){
					$(elems.leftSideTrigger).find('.icon').addClass('indent').removeClass('outdent');
					app.ui.draw(false);
				},
				onChange:function(){
					$('.ui-popup').popup('hide all');
				}
			};
			opts=$.extend(dfts,opts);

			$(obj).sidebar(opts);
			
			if($(elems.leftSide).sidebar('is visible')){
				$(obj).sidebar('push page');
			}

		},
		modal:function(opts){
			var obj=null;
			var dfts={
				icon:'help icon',//图标，基于semantic ui
				title:'title',//标题
				msg:'msg',//提示内容
				style:{//样式，基于semantic ui
					basic:'',//basic, size
					header:'left aligned',
					content:'left aligned',
					actions:'right aligned',
					buttons:''//inverted
				},
				buttons:[],//按钮，基于semantic ui
				allowMultiple:true,//是否同时打开多个
				context:'body',//上下文
				closeBtn:false,//是否显示关闭按钮
				closable:false,//点击遮罩区关闭
				transition:'scale',//呈现动画
				blurring:true,//遮罩模糊
				duration:app.settings.duration,
				selector:{
					approve:'.actions .approve',
					deny:'.actions .deny',
					close:'.actions .close,.ui-dialog-close'
				},
				dimmerSettings:{
					dimmerName:app.settings.dimmerName.modals
				},
				onHidden:function(){
					if(!opts.allowMultiple){
						obj.remove();
					}
					app.ui.draw();
				},
				html:''+
					'<div class="ui coupled modal">'+
					'	<div class="header">'+
					'		'+opts.title+
					'	</div>'+
					'	<div class="content">'+
					'		'+opts.msg+
					'	</div>'+
					'	<div class="actions"></div>'+
					'</div>'
			};
			opts=$.extend(dfts,opts);

			obj=$(opts.html);
			
			if(opts.icon){
				obj.children('.header').prepend('<i class="'+opts.icon+'"></i>');
			}
			if(opts.closeBtn){
				obj.prepend('<i class="close icon ui-dialog-close"></i>');
			}

			obj.addClass(opts.style.basic);
			obj.find('.header').addClass(opts.style.header);
			obj.find('.content').addClass(opts.style.content);
			obj.find('.actions').addClass(opts.style.actions);
			for(var i=0,len=opts.buttons.length; i<len; i+=1){
				obj.find('.actions').append($(opts.buttons[i]).addClass(opts.style.buttons));
			}

			obj.modal(opts);

			return obj;
		},
		confirm:function(opts){
			var obj=null;
			var dfts={
				title:'确认',
				msg:'是否？',
				icon:'help icon',
				style:{
					basic:'small',//basic,size
					header:'left aligned',
					content:'center aligned',
					actions:'right aligned',
					buttons:''//inverted
				},
				buttons:[//按钮，基于semantic ui
					'<button class="ui green button approve"><i class="checkmark icon"></i>同意</button>',
					'<button class="ui red button deny"><i class="remove icon"></i>拒绝</button>'
				],
				onApprove:function(){
				},
				onDeny:function(){
				}
			};
			opts=$.extend(dfts,opts);
			
			obj=app.ui.modal(opts);
			obj.modal('show');
		},
		alert:function(opts){
			var obj=null;
			var dfts={
				title:'提示',
				msg:'提示！',
				icon:'info icon',
				style:{
					basic:'small',//basic,size
					header:'left aligned',
					content:'center aligned',
					actions:'right aligned',
					buttons:''//inverted
				},
				buttons:[//按钮，基于semantic ui
					'<button class="ui green button approve"><i class="checkmark icon"></i>好</button>'
				],
				onApprove:function(){
				},
				onDeny:function(){
				}
			};
			opts=$.extend(dfts,opts);
			
			obj=app.ui.modal(opts);
			obj.modal('show');
		},
		msg:function(opts){
			var obj=null;
			var dfts={
				msg:'消息。'
			};
			opts=$.extend(dfts,opts);
			
			
		},
		dialog:function(obj,opts){
			var dfts={
				style:{//样式，基于semantic ui
					basic:'fullscreen',//small,large,fullscreen
					header:'left aligned',
					content:'left aligned',
					actions:'right aligned',
				},
				allowMultiple:true,//是否同时打开多个
				context:'body',//上下文
				closeBtn:true,//是否显示关闭按钮
				closable:true,//点击遮罩区关闭
				transition:'scale',//呈现动画
				blurring:false,//遮罩模糊
				duration:app.settings.duration,
				selector:{
					approve:'.actions .approve',
					deny:'.actions .deny',
					close:'.actions .close,.ui-dialog-close'
				},
				dimmerSettings:{
					dimmerName:app.settings.dimmerName.dialogs
				},
				onHidden:function(){
					if(!opts.allowMultiple){
						$(obj).remove();
					}
					app.ui.draw();
				},
				onApprove:function(){
				},
				onDeny:function(){
				}
			};
			opts=$.extend(dfts,opts);

			if(opts.closeBtn){
				$(obj).prepend('<i class="close icon ui-dialog-close"></i>');
			}

			$(obj).addClass(opts.style.basic);
			$(obj).find('.header').addClass(opts.style.header);
			$(obj).find('.content').addClass(opts.style.content);
			$(obj).find('.actions').addClass(opts.style.actions);
			
			$(obj).modal(opts);
			$(obj).modal('show');

			return $(obj);
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
		}
	};
	
})(jQuery,app,window);



$(function(){
	app.ui.init();
});
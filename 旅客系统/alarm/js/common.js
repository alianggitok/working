;(function($,ng,app,window,document){

	app.elems={
		alarm:'#alarm',
		btnLogout:'#btn-logout',
		pageBuffer:'#pageBuffer',
		searchForm:'#form-search',
		chartBlocks:'#chart-blocks .ui-chart-block'
	 };
	
	var elems=app.elems,
		 animateDuration=app.settings.animationDuration,
		 bufferOpacity=app.settings.bufferOpacity,
		 dimmerOpacity=app.settings.dimmerOpacity;
	
	app.checkRE=function(){
		var userAgent=window.navigator.userAgent,
			 regexp=/chrome\/[\d\.]+/ig,
			 isMatch=regexp.test(userAgent),
			 matchedInfo=null,
			 version=null;

		console.warn('check client:',isMatch);
		if(isMatch){
			matchedInfo=userAgent.match(regexp)[0];
			version=matchedInfo.match(/\d+/ig)[0];
			if(version<40){
//				app.ui.alert({
//					title:'运行环境检测',
//					msg:'您当前使用的版本号较低，请更换较新版本的浏览器！'
//				});
				alert('当前浏览器版本较低，请更换较新的版本，推荐版本号：40+。');
			}
		}else{
//			app.ui.alert({
//				title:'运行环境检测',
//				msg:'您当前使用的浏览器不是 Chrome，将无法正常使用，请更换浏览器！'
//			});
			alert(app.info.name+' 无法在当前浏览器上正常运行，请更换为 Chrome 浏览器！');
		}

	};

	app.cookie={
		setting:{
			path:app.path.root
		},
		set:function(param){
			//usage: app.cookie.set({key:value});
			var key=null;
			console.log('set cookies');
			for(key in param){
				$.cookie(key, param[key], app.cookie.setting.path);
			}
		},
		removeAll:function(){
			//usage: app.cookie.removeAll();
			var cookies=$.cookie(),
				 key=null;
			console.log('remove all cookies');
			for(key in cookies){
				$.removeCookie(key, app.cookie.setting.path);
			}
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
			timeout:app.settings.resourceTimeout,
			buffer:true,
			bufferContext:'body',
			bufferMsg:'处理中',
			bufferOpacity:bufferOpacity,
			beforeSend:function(){
				if(opts.buffer){
					buffer=app.ui.buffer.show({
						msg:opts.bufferMsg,
						context:opts.bufferContext,
						opacity:opts.bufferOpacity
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
			
			console.log('initialize');
			
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
			
			$('.ui-datapicker').datetimepicker({
				lang:'zh',
				timepicker:false,
				format:'Y/m/d',
				closeOnDateSelect:true,
				closeOnWithoutClick:true,
				defaultSelect:false,
				mask:false,
				scrollInput:false,
				scrollMonth:false
			});
			
		},
		response:function(){
			var width=$(window).width();
			if(width>960){
				console.log('response: medium');
//				$(elems.leftSide).addClass('large').removeClass('small labeled icon');
				$('.ui.table').removeClass('very compact small');
//				$(elems.top).find('.header').html(app.info.fullTitle);
			}else if(width<=960&&width>680){
				console.log('response: small');
//				$(elems.leftSide).addClass('small').removeClass('large labeled icon');
				$('.ui.table').addClass('small').removeClass('very compact');
//				$(elems.top).find('.header').html(app.info.title);
			}else if(width<=680){
				console.log('response: tiny');
//				$(elems.leftSide).addClass('labeled icon').removeClass('small large');
				$('.ui.table').addClass('very compact');
//				$(elems.top).find('.header').html(app.info.sortTitle);
			}
//			app.ui.draw();
		},
		draw:function(){
			console.warn('draw');
		},
		buffer:{
			show:function(opts){
				var dfts={
						html:''+
						 '<div class="ui dimmer">'+
						 '	<div class="ui text loader"></div>'+
						 '</div>',
						context:'body',
						msg:'处理中',
						size:'medium',//mini,small,medium,large
						inverted:false,//反色
						closable:false,//点击留白关闭
						duration:animateDuration,//动画持续时间
						opacity:bufferOpacity//透明
					};
					opts=$.extend(dfts,opts);
				
				var obj=$(opts.html),
					 loader=obj.find('.ui.loader');

				if(opts.inverted){
					obj.addClass('inverted');
				}
				loader.addClass(opts.size).html(opts.msg);

				$(opts.context).append(obj);
				
				obj.dimmer({
					closable:opts.closable,
					duration:{
						show:opts.duration,
						hide:opts.duration
					},
					opacity:opts.opacity
				});
				obj.dimmer('show');
				
				console.log(opts.msg);
				return obj;
			},
			hide:function(obj){
				$(obj).dimmer('hide');
				var duration=$(obj).dimmer('get duration');
				window.setTimeout(function(){
					obj.remove();
					app.ui.draw();
				},duration);
			}
		},
		loadModule:function(opts){
			var dfts={
				obj:elems.module,
				href:'/',
				bufferContext:'body',
				bufferOpacity:bufferOpacity,
				scrollToTop:true,
				success:function(){}
			};
			opts=$.extend(dfts,opts);
			
			if(opts.scrollToTop){
				$(window).scrollTop(0);
			}
			
			$(opts.obj).empty();
			//destory dimmers
			$('.ui.dimmer.modals').remove();
			//destory datetimepicker
			$('.ui-datapicker').datetimepicker('destroy');
			$(window).off('resize.xdsoft');
			$('.xdsoft_datetimepicker').remove();

			app.ajax({
				dataType:'html',
				type:'GET',
				bufferContext:opts.bufferContext,
				bufferOpacity:opts.bufferOpacity,
				url:opts.href
			},function(html){
				console.warn('loading href:',opts.href);
				var contObj=$(html);
				app.module.currentObj=contObj;
				$(opts.obj).empty();
				$(opts.obj).append(contObj);
				opts.success();
				app.ui.init();
			});
		},
		ngInit:function(opts){
			var dfts={
				obj:app.module.currentObj,
				ngModule:''
			};
			opts=$.extend(dfts,opts);

//			console.log(opts.obj)
			if(opts.obj&&opts.ngModule){
				ng.element(opts.obj.get(0)).ready(function () {
					ng.bootstrap(opts.obj.get(0), [opts.ngModule]);
					console.log('angular module initialization:',opts.obj);
				});
			}
		},
		modal:function(opts){
			var obj=null;
			var dfts={
				icon:'help',//图标，基于semantic ui
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
				allowMultiple:false,//是否同时打开多个
				context:'body',//上下文
				closeBtn:false,//是否显示关闭按钮
				closable:false,//点击遮罩区关闭
				transition:'scale',//呈现动画
				blurring:true,//遮罩模糊
				duration:animateDuration,
				selector:{
					approve:'.actions .approve',
					deny:'.actions .deny',
					close:'.actions .close,.ui-dialog-close'
				},
				dimmerSettings:{
					opacity:dimmerOpacity,
					onChange:function(){
						app.ui.draw();
					}
				},
				onHidden:function(){
					if(!opts.allowMultiple){
						obj.remove();
					}
				},
				html:''+
					'<div class="ui coupled modal">'+
					'	<i class="close icon ui-dialog-close"></i>'+
					'	<div class="header"></div>'+
					'	<div class="content"></div>'+
					'	<div class="actions"></div>'+
					'</div>'
			};
			opts=$.extend(dfts,opts);

			obj=$(opts.html);
			
			if(opts.icon){
				obj.children('.header').prepend('<i class="'+opts.icon+' icon"></i>');
			}
			
			if(!opts.blurring){
				$(opts.context).removeClass('blurring');
			}
			
			if(!opts.closeBtn){
				obj.find('.ui-dialog-close').hide();
			}

			obj.addClass(opts.style.basic);
			obj.children('.header').first().addClass(opts.style.header).append(opts.title);
			obj.children('.content').first().addClass(opts.style.content).append(opts.msg);
			obj.children('.actions').first().addClass(opts.style.actions);
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
				icon:'help',
				allowMultiple:false,
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
				icon:'info',
				allowMultiple:false,
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
		dialog:function(obj,opts){
			var dfts={
				style:{//样式，基于semantic ui
					basic:'small',//small,large,fullscreen
					header:'left aligned',
					content:'left aligned',
					actions:'right aligned',
				},
				observeChanges:true,
				allowMultiple:true,//是否同时打开多个
				context:'body',//上下文
				closeBtn:true,//是否显示关闭按钮
				closable:false,//点击遮罩区关闭
				transition:'scale',//呈现动画
				blurring:false,//遮罩模糊
				duration:animateDuration,
				selector:{
					approve:'.actions .approve',
					deny:'.actions .deny',
					close:'.actions .close,.ui-dialog-close'
				},
				dimmerSettings:{
					opacity:dimmerOpacity,
					onChange:function(){
						app.ui.draw();
					}
				},
				onHidden:function(){
					if(!opts.allowMultiple){
						$(obj).remove();
					}
				},
				onApprove:function(){
				},
				onDeny:function(){
				}
			};
			opts=$.extend(dfts,opts);
			
			if(!opts.blurring){
				$(opts.context).removeClass('blurring');
			}

			if(!opts.closeBtn){
				obj.find('.ui-dialog-close').hide();
			}

			$(obj).addClass(opts.style.basic);
			$(obj).children('.header').first().addClass(opts.style.header);
			$(obj).children('.content').first().addClass(opts.style.content);
			$(obj).children('.actions').first().addClass(opts.style.actions);

			$(obj).modal(opts);
			$(obj).modal('show');

			return $(obj);
		},
		message:function(opts){
			var dfts={
				type:'info',//success,info,warning,error
				size:'small',
				msg:'消息',
				closeBtn:true,
				icon:'smile',//warning,idea,announcement,comment,info,checkmark,remove,ban,frown,meh,smile
				html:''+
					'<div class="ui icon hidden message">'+
					'	<i class="close icon ui-message-close"></i>'+
					'	<div class="content"></div>'+
					'</div>',
				context:elems.module,
				autoHide:false
			};
			opts=$.extend(dfts,opts);
			
			var obj=$(opts.html).addClass(opts.type),
				 closeBtnObj=obj.find('.ui-message-close');
			
			function hide(){
				obj.transition('fade up',function(){
					obj.remove();
					app.ui.draw();
				});
			}
			
			if(opts.autoHide){
				window.setTimeout(function(){
					hide();
				},opts.autoHide);
			}
			if(opts.closeBtn){
				closeBtnObj.on('click',function(){
					hide();
				});
			}else{
				closeBtnObj.hide();
			}
			if(opts.icon){
				obj.prepend('<i class="'+opts.icon+' icon"></i>');
			}
			obj.find('.content').html(opts.msg);
			
			$(opts.context).prepend(obj);
			obj.transition('fade down',function(){
				app.ui.draw();
			});

		}
	};
	
	
	//dom ready
	$(function(){
		
		app.checkRE();

		app.ui.init();
		
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

		//logout
		$(elems.btnLogout).off('click.logout').on('click.logout',function(){
			app.ui.confirm({
				title:'',
				msg:'是否退出系统？',
				icon:'huge help circle',
				style:{
					basic:'basic small',
					header:'center aligned',
					content:'center aligned',
					actions:'center aligned',
					buttons:'inverted'
				},
				onApprove:function(){
					app.cookie.removeAll();
					alert('退出！');
				}
			});
		});

		//first load page
		$(elems.pageBuffer).transition('fade out',function(){
			$(elems.pageBuffer).remove();
			$('body').removeClass('dimmed');
			app.ui.draw();
		});
		
		/*演示代码，开发中请删除或注释*/
		var trs=$('#alarm-list').find('tr'),
			 player=$(app.elems.alarm).get(0);
		
		//call dialogs
		trs.find('.ui-btn-unlock').not('.grey').on('click',function(){
			app.ui.dialog('#dialog-unlock');
		});
		
		trs.on('dblclick',function(){
			app.ui.dialog('#dialog-alarming');
			trs.removeClass('active');
			$(this).addClass('active');
		});
		trs.on('click',function(){
			$(this).siblings().removeClass('active');
			$(this).toggleClass('active');
		});
		
		//alarm
		player.play();
	
		/*演示代码，结束*/
	
	});
	
	
})(jQuery,angular,app,window,document);




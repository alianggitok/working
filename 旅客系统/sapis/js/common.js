;(function($,ng,app,window,document){

	app.elems={
			leftSide:'#leftSide',
			top:'#top',
			leftSideTrigger:'#leftSideTrigger',
			btnLogout:'#btn-logout',
			pageBuffer:'#pageBuffer',
			module:'#module',
			alarm:'#alarm',
			main:'#main',
			header:'#header',
			topNavig:'#topNavig',
			contents:'#contents',
			searchLabel:'#labels-search',
			searchForm:'#form-search'
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
			
			var forms=$(elems.searchForm).find('.form'),
				 labels=$(elems.searchLabel).find('.label');
			forms.hide();
			forms.eq(0).show();
			$(elems.searchLabel).find('.label').off('click').on('click',function(){
				var n=$(this).index('.label'),
					 activeClass='blue bottom pointing';
				forms.hide();
				forms.eq(n).show();
				labels.removeClass(activeClass);
				labels.eq(n).addClass(activeClass);
			});

		},
		response:function(){
			var width=$(window).width();
			if(width>960){
				console.log('response: medium');
				$(elems.leftSide).addClass('large').removeClass('small labeled icon');
				$('.ui.table').removeClass('very compact small');
				$(elems.top).find('.header').html(app.info.fullTitle);
			}else if(width<=960&&width>680){
				console.log('response: small');
				$(elems.leftSide).addClass('small').removeClass('large labeled icon');
				$('.ui.table').addClass('small').removeClass('very compact');
				$(elems.top).find('.header').html(app.info.title);
			}else if(width<=680){
				console.log('response: tiny');
				$(elems.leftSide).addClass('labeled icon').removeClass('small large');
				$('.ui.table').addClass('very compact');
				$(elems.top).find('.header').html(app.info.sortTitle);
			}
			app.ui.sidebar(elems.leftSide);
//			app.ui.draw();
		},
		draw:function(leftSideVisibled){
			console.warn('draw');
			var bodyWidth=$('body').outerWidth(),
				 visibled=(leftSideVisibled!==undefined)?leftSideVisibled:$(elems.leftSide).sidebar('is visible'),
				 leftSideWidth=visibled?$(elems.leftSide).outerWidth():0;
			$(elems.top).stop(false,true).animate({
				'width':bodyWidth-leftSideWidth+'px',
			},animateDuration,function(){
				$(elems.main).stop(false,true).animate({
					'padding-top':$(elems.top).outerHeight()+'px'
				},animateDuration);
			});
			$(elems.main).stop(false,true).animate({
				'margin-right':leftSideWidth+'px'
			},animateDuration,function(){
				if(visibled){
					$(elems.top).removeClass('inverted');
				}else{
					$(elems.top).addClass('inverted');
				}
			});
			
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
		navigBuild:function(data){
			var obj=$(elems.leftSide),
				 items=null,
				 tempItems=null,
				 tempHtml='',
				 tempData=null,
				 currentItem=null,
				 cookieItemID=$.cookie('currentNavigID');
			
			while(data.length){
				tempData=data.splice(0,1)[0];
//				console.log(tempData);
				tempHtml+='<a class="item" href="'+tempData.href+'" data-intro="'+tempData.intro+'" data-icon="'+tempData.icon+'" data-pid="'+tempData.pid+'" data-id="'+tempData.id+'"><i class="icon '+tempData.icon+'"></i>'+tempData.text+'</a>';
			}
			
			tempItems=$(tempHtml);
			//first
			
			obj.html(tempItems.filter('[data-pid=0]'));
			items=obj.find('.item');
			
			(function bulid(){
				for(var i=0,ilen=items.length;i<ilen;i+=1){
					var pid=items.eq(i).attr('data-id'),
						 matchItems=tempItems.filter('[data-pid='+pid+']'),
						 matchItemsLen=matchItems.length,
						 itemsWrapper=$('<div class="menu"></div>');
					if(matchItemsLen){
						matchItems.appendTo(itemsWrapper);
//						console.log(itemsWrapper);
						itemsWrapper.insertAfter(items[i]);
					}
				}
			})();
			
			items=obj.find('.item');
			currentItem=function(){
				return items.filter('[data-id="'+cookieItemID+'"]');
			};
			
			items.on('click',function(e){
				e.preventDefault();
				var href=$(this).attr('href'),
					 id=$(this).attr('data-id'),
					 icon=$(this).attr('data-icon'),
					 title=$(this).text(),
					 intro=$(this).attr('data-intro'),
					 activeItem=$(this);
				
				obj.find('.menu').stop(true,false).slideUp(animateDuration);
				activeItem.next('.menu').stop(true,false).slideDown(animateDuration,function(){
					$(this).css('height','auto');
				});

				if(!href||href==='#'){
					return;
				}
				
				app.cookie.set({
					currentNavigID:id
				});
				
				if(!icon||icon==='undefined'){
					$(elems.header).find('.header').html(title);
				}else{
					$(elems.header).find('.header').html('<i class="'+icon+' icon"></i>'+title);
				}
				$(elems.header).find('.intro').html('&nbsp;'+intro);
				
				(function tabsBuild(){
					var pid=activeItem.attr('data-id'),
						 matchItems=tempItems.filter('[data-pid='+pid+']'),
						 matchItemsLen=matchItems.length;
					console.log('tabs:',matchItemsLen);
					if(matchItemsLen){
						matchItems.find('.icon').hide();
						$(elems.topNavig).html(matchItems).show();
					}else{
						$(elems.topNavig).empty().hide();
					}
				})();
					
				items.removeClass('active');
				activeItem.addClass('active');
				activeItem.parent('.menu').stop(false,true).show();
				
				app.ui.loadModule({
					obj:elems.contents,
					href:href,
					bufferContext:elems.main,
//					bufferOpacity:0.6,
					success:function(){
						app.ui.tabNavig();
					}
				});
			});
			
			//first level action
			obj.children('.item').on({
				'mouseenter':
				function(){
//					console.log(animateDuration)
					obj.find('.menu').stop(true,false).delay(animateDuration).slideUp(animateDuration);
					$(this).next('.menu').stop(true,false).delay(animateDuration).slideDown(animateDuration,function(){
						$(this).css('height','auto');
					});
				}
			});
			obj.on({
				'mouseleave':
				function(){
					obj.find('.menu').stop(true,false).slideUp(animateDuration);
					obj.find('.active').parent('.menu').stop(true,false).slideDown(animateDuration,function(){
						$(this).css('height','auto');
					});
				}
			});

			console.warn('currentNavigID in cookie:',cookieItemID);
			if(!cookieItemID||currentItem().length===0){
				items.first().click();
			}else{
				currentItem().click();
			}
			
		},
		tabNavig:function(){
			var obj=$(elems.topNavig),
				 cookieTabNavigID=parseInt($.cookie('currentTabNavigID'),10);

			var items=obj.find('.item'),
				 currentItem=items.filter('[data-id="'+cookieTabNavigID+'"]');
			
			items.on('click',function(e){
				e.preventDefault();
				
				var href=$(this).attr('href'),
					 id=$(this).attr('data-id'),
					 activeItem=$(this);

				if(!href||href==='#'){
					return;
				}
				
				app.cookie.set({
					currentTabNavigID:id
				});
				items.removeClass('active');
				activeItem.addClass('active');
				
				app.ui.loadModule({
					obj:elems.contents,
					href:href,
					bufferContext:elems.main,
//					bufferOpacity:0.6
				});
			});
			
			console.warn('currentTabNavigID in cookie:',cookieTabNavigID);
			if(!cookieTabNavigID||currentItem.length===0){
				items.first().click();
			}else{
				currentItem.click();
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

//			console.log(obj)
			if(opts.obj&&opts.ngModule){
				ng.element(opts.obj.get(0)).ready(function () {
				ng.bootstrap(opts.obj.get(0), [opts.ngModule]);
					console.log('angular initialization!');
				});
			}
		},
		sidebar:function(obj,opts){
			var dfts={
				context:'body',
				transition:'push',
				dimPage:false,
				closable:false,
				duration:animateDuration,
				selector:{
					pusher:elems.main
				},
				onVisible:function(){
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

		$(elems.leftSide).sidebar('show');

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

		//left side trigger
		$(elems.leftSideTrigger).off('click.leftsidetrigger').on('click.leftsidetrigger',function(){
			$(elems.leftSide).sidebar('toggle');
		});

		//navig build
		app.ui.navigBuild(app.settings.menuItems);

		//app.ui.datagrid('.ui.table');

		//first load page
		$(elems.pageBuffer).transition('fade out',function(){
			$(elems.pageBuffer).remove();
			$('body').removeClass('dimmed');
			app.ui.draw();
		});
		
	});

	
})(jQuery,angular,app,window,document);




/*
YouAn Liao Liao UI common
Code by Warren Chen 2014
*/
var windowObj=$(window),
	browserAgent=navigator.userAgent,
	browser={
		isIE6: function(){
			return (/msie 6/i).test(browserAgent);
		},
		isIE7: function(){
			return (/msie 7/i).test(browserAgent);
		},
		isIE8: function(){
			return (/msie 8/i).test(browserAgent);
		},
		isIE9: function(){
			return (/msie 9/i).test(browserAgent);
		}
	};

;(function(global){

	var header=$('.layout-header'),
		main=$('.layout-main'),
		left=main.find('.layout-left'),
		right=main.find('.layout-right'),
		constant=main.find('.layout-constant');
	var chatbody=main.find('.chatbody'),
		oppositestate=chatbody.find('.oppositestate'),
		chatlist=chatbody.find('.chatlist'),
		chatform=chatbody.find('.chatform');
	var contactbody=$('.contactbody'),
		selfstate=contactbody.find('.selfstate'),
		contactlistTabs=contactbody.find('.contactlist').find('.tabs'),
		chatstate=contactbody.find('.chatstate'),
		contactlistConts=contactbody.find('.contactlist').find('.conts');

	/**********functions**********/
	global.uaLLUI={
		resizeLayout: function(){/*resize*/

			var mainPaddingY=main.outerHeight()-main.height(),
				chatlistPaddingY=chatlist.outerHeight()-chatlist.height(),
				contactlistContsPaddingY=contactlistConts.outerHeight()-contactlistConts.height(),
				minWidth=$('body').width(),
				minHeight=$('body').height();

			$('html').css('overflow-x',windowObj.width()<minWidth?'auto':'hidden');
			$('html').css('overflow-y',windowObj.height()<minHeight?'auto':'hidden');

			main.find('.container').height(windowObj.height()-header.outerHeight()-mainPaddingY);
			chatlist.height(chatbody.height()-oppositestate.outerHeight()-chatform.outerHeight()-chatlistPaddingY);
			contactlistConts.height(contactbody.height()-selfstate.outerHeight()-contactlistTabs.outerHeight()-chatstate.outerHeight()-contactlistContsPaddingY);

			constant.removeClass('clearPaddingLeft clearPaddingRight');
			if(!left.is(':visible')){
				constant.addClass('clearPaddingLeft');
			}
			if(!right.is(':visible')){
				constant.addClass('clearPaddingRight');
			}

		},

		/*fix btn icon position*/
		icoPositionFix: function(obj){
			$(obj).each(function () {
				var txt = $.trim($(this).parent().text()),
					patch = '<span style="display:inline-block; font-size:0; width:0; overflow:hidden; vertical-align:middle; visibility:hidden">&nbsp;</span>';
				if (browser.isIE7() && txt === '') {
					$(this).before(patch);
				}
			});
		},

		soundPlay: function(soundURL){
			soundURL = typeof(soundURL)==='undefined' ? 'sound/dingdong.mp3' : soundURL;
			var soundPlayerHTML='';
			if(browser.isIE7()||browser.isIE6()){
				soundPlayerHTML='<embed class="soundplayer" src="'+soundURL+'" autostart="true"/>';
			}else{
				soundPlayerHTML='<audio class="soundplayer" src="'+soundURL+'" autoplay="true" preload></audio>';
			};
			var soundPlayer=$(soundPlayerHTML);
			soundPlayer.css({
				'position':'absolute',
				'top':0,
				'width':0,
				'height':0,
				'overflow':'hidden'
			});
			//var soundPlayer=$();
			$('body').append(soundPlayer);
			var timer=setTimeout(function(){
				soundPlayer.remove();
				timer=null;
			},3000);
		},

		/*multi button*/
		multiBtn: function(triggerObj,obj){
			$(triggerObj).each(function(){
				var _trigger=$(this),
					_objItem=$(obj).find('li');
				_objItem.on('click.multiBtn',function(){
					$(this).addClass('selected').siblings().removeClass('selected');
					$(obj).hide(0,function(){
						_trigger.removeClass('btn-current');
					});
				});
				_trigger.find('.pointer').off('click.multiBtn').on('click.multiBtn',function(){
					_trigger.addClass('btn-current');
					$(obj).show(0,function(){
						$(this).offset({
							top:_trigger.offset().top-$(this).outerHeight()-3,
							left:_trigger.offset().left+_trigger.outerWidth()-$(this).outerWidth()
						});
						$(document).on('click.multiBtn',function(e){
							targetObj=triggerObj+', '+triggerObj+' .pointer, '+obj;
							//console.log(e.target.className+', '+e.target);
							if(!($(e.target).closest(targetObj).is(targetObj)||$(e.target).is(targetObj))){
								$(obj).hide(0,function(){
									_trigger.removeClass('btn-current');
								});
							}
						});
					});
				});
			});
		},


		/*textarea*/
		textareaInit: function(obj){
			$(obj).each(function(){
				var height=$(this).height(),
					textarea=$(this).find('textarea'),
					textareaPaddingY=textarea.outerHeight()-textarea.height();

				textarea.height(height-textareaPaddingY);
			});
		},

		chatHistoryFix: function(){
			var obj=$('.ua-floatbox-chathistory');
			obj.each(function(){
				obj=$(this).closest('.simplemodal-container');
				var constant=obj.find('.layout-constant'),
					left=obj.find('.layout-left');
				/*
				obj.css({
					'top':(windowObj.height()-obj.outerHeight())/2+'px',
					'left':(windowObj.width()-obj.outerWidth())/2+'px'
				});
				*/

				constant.removeClass('clearPaddingLeft clearPaddingRight');
				if(!left.is(':visible')){
					constant.addClass('clearPaddingLeft');
				}
				if(!right.is(':visible')){
					constant.addClass('clearPaddingRight');
				}
			});
		},

		drag: function(dragObj,triggerObj){
			dragObj=$(dragObj);
			triggerObj=dragObj.find(triggerObj);
			var x=0,y=0,oX=0,oY=0,
				fixX=0,fixY=0;
	//		var minX=minY=0;
			var dragPointer=$('<div class="ua-dragPointer"></div>'),
				islteIE9=browser.isIE6()||browser.isIE7()||browser.isIE8()||browser.isIE9();
	//		var maxX=windowObj.width();
	//		var maxY=windowObj.height();
			function dragPointerInit(){
				$('body').append(dragPointer);
				dragPointer.css({
					'position':'absolute',
					'top':dragObj.offset().top+'px',
					'left':dragObj.offset().left+'px',
					'background-color':'#999',
					'border':'1px solid #000',
					'width':dragObj.outerWidth()-2+'px',
					'height':dragObj.outerHeight()-2+'px',
					'cursor':'move',
					'z-index':5000
				}).fadeTo(1,0.5);
			}
			function selectSwitchOff(){
				islteIE9?$('body').on('selectstart.drag',function(){return false;}):$('body').addClass('noselect onmove');
			}
			function selectSwitchOn(){
				islteIE9?$('body').off('selectstart.drag'):$('body').removeClass('noselect onmove');
			}
			function draging(x,y){
				//console.log('draging, x:'+x+', y:'+y);
				dragPointer.css({'left':x+'px','top':y+'px'});
			}
			function reposition(x,y){
				dragObj.css({'left':x+'px','top':y+'px'});
			}
			function dragStart(){
				//console.log('dragstart');
				selectSwitchOff();
				dragPointerInit();
				oX=parseInt(dragObj.css('left'),10)+windowObj.scrollLeft();
				oY=parseInt(dragObj.css('top'),10)+windowObj.scrollTop();
				$(document).on({
					'mousedown.drag':
					function(e){
						$(this).click();
						fixX=e.pageX-oX;
						fixY=e.pageY-oY;
						x=e.pageX-fixX;
						y=e.pageY-fixY;
					},
					'mousemove.drag':
					function(e){
						x=e.pageX-fixX;
						y=e.pageY-fixY;
						if(e.pageX<0){
							x=-fixX;
						}else if(e.pageX>$('body').width()){
							x=$('body').width()-fixX;
						}
						if(e.pageY<0){
							y=-fixY;
						}else if(e.pageY>$('body').height()){
							y=$('body').height()-fixY;
						}
						draging(x,y);
					},
					'mouseup.drag':
					function(){
						x=x-windowObj.scrollLeft();
						y=y-windowObj.scrollTop();
						dragOver();
					}
				});
			}
			function dragOver(){
				$(document).off('mousemove.drag mousedown.drag mouseup.drag');
				if(x!==0){
					reposition(x,y);
				}
				dragPointer.remove();
				selectSwitchOn();
				//console.log('dragover');
			}

			triggerObj.mousedown(function(){
				dragStart();
			});


		},

		tabbox: function(obj,motion){/*tabbox*/
			$(obj).each(function() {
				var obj=$(this),
					tabObj=obj.find('.tabs .tab'),
					contObj=obj.find('.conts .cont');

				contObj.hide();
				contObj.first().show();
				tabObj.first().addClass('current').next().addClass('next');
				tabObj.on(motion,function(){
					var n=$(this).index();
					$(this).siblings().andSelf().removeClass('prev current next');
					$(this).prev().addClass('prev');
					$(this).addClass('current');
					$(this).next().addClass('next');
					contObj.hide().eq(n).show();
				});
				if(motion=='click'){
					tabObj.click(function(e){
						e.preventDefault();
					});
				}
			});
		},

		orderInfoGoodsChange: function(){/*order info goods change*/
			var obj=$('.mod-block-orderinfo .goods');
			obj.each(function() {
				var itemObj=$(this).find('.list li'),
					itemLen=itemObj.length,
					prevObj=obj.find('.page .btn_prev'),
					nextObj=obj.find('.page .btn_next'),
					infoObj=obj.find('.page .info'),
					n=0,
					effectDuration=300;

				itemObj.not(':first').hide();
				infoObj.html(1+'/'+itemLen);
				nextObj.click(function(e){
					if (n<itemLen-1){
						n++;
						itemObj.stop(false,true).hide();
						itemObj.eq(n).stop(false,true).fadeTo(effectDuration,1);
						infoObj.html(n+1+'/'+itemLen);
					}
					e.preventDefault();
				});
				prevObj.click(function(e){
					if(n>0){
						n--;
						itemObj.stop(false,true).hide();
						itemObj.eq(n).stop(false,true).fadeTo(effectDuration,1);
						infoObj.html(n+1+'/'+itemLen);
					}
					e.preventDefault();
				});
			});

		},

		popup: function(obj,triggerObj,motion){
			var effectDuration='fast';
			$(obj).hide();
			$(triggerObj).each(function(){
				$(this).on(motion,function(e){
					if($(obj).is(':visible')){
						$(obj).slideUp(effectDuration);
					}else{
						$(obj).slideDown(effectDuration);
					}
					e.preventDefault();
				});
			});
			$(document).on('click',function(e){
				targetObj=obj+','+triggerObj;
				if(($(e.target).closest(targetObj).is(targetObj)||$(e.target).is(targetObj))===false){
					$(obj).slideUp(effectDuration);
				}
			});
		},

		foldInit: function(obj,mainObj,subObj){/*fold*/
			$(obj).each(function(){
				$(this).not('.unfold').addClass('fold').find(subObj).hide();
				$(this).find(mainObj).on({
					'click':
					function(e){
						if($(this).next(subObj).is(':visible')){
							$(this).next(subObj).hide();
							$(this).closest(obj).removeClass('unfold').addClass('fold');
						}else{
							$(this).next(subObj).show();
							$(this).closest(obj).removeClass('fold').addClass('unfold');
						}
						e.preventDefault();
					}
				});
			});

		},

		closeWindow: function(){/*close window*/
			window.opener=null;
			window.open('','_self');
			if(confirm('关闭“优安聊聊”吗？')){
				window.close();
			}
		},

		sendChat: function(who,date,chatwhat,state){/*send*/
			chatwhat=chatwhat.replace(/</g,'&lt;').replace(/>/g,'&gt;');
			var chartListObj=$('.chatbody .chatlist .list'),
				chatItem=''+
					'<li class="self clearfix">'+
					'	<div class="face"><img src="images/temp/34-34_sel.jpg" alt=""></div>'+
					'	<div class="wrapper">'+
					'		<i class="ico ico-pointer"></i>'+
					'		<div class="who">'+
					'			<span class="name">'+who+'</span>'+
					'			<span class="date">'+date+'</span>'+
					'		</div>'+
					'		<div class="what">'+chatwhat+'</div>'+
					'	</div>'
					'</li>';
			if(state){
				chartListObj.append(chatItem);
			}else{
				uaLLUI.chatSentInfoInit('.sysinfo','系统提示','发送失败！',4000);
				return false;
			}
			uaLLUI.chatBodyScroll();
		},

		chatBodyScroll: function(){
			var obj=$('.chatbody .chatlist'),
				listObj=obj.find('.list:visible');
			obj.stop(false,true).animate({'scrollTop':listObj.height()});
		},

		chatSentInfoInit: function(title,date,info,delayToHide){
			var objClass='sysinfo';
			if(date===''||date===null){
				var dateObj=new Date(),
					dateNow=''+
						dateObj.getFullYear()+'-'+
						(dateObj.getMonth()+1)+'-'+
						dateObj.getDate()+'-('+
						dateObj.getHours()+':'+
						dateObj.getMinutes()+':'+
						dateObj.getSeconds()+')';
				date=dateNow;
			}
			var html=''+
				'<div class="'+objClass+'">'+
				'	<div class="title"><span class="tit">'+title+'</span><br><span class="date">'+date+'：</span></div>'+
				'	<div class="content">'+info+'</div>'+
				'</div>';
			$('body').append(html);
			function fix(){
				var top=(windowObj.outerHeight()-$('.'+objClass).outerHeight())/2,
					left=(windowObj.outerWidth()-$('.'+objClass).outerWidth())/2;
				$('.'+objClass).css({
					'top':top,
					'left':left
				});
			}
			windowObj.resize(function(){
				fix();
			});
			fix();
			$('.'+objClass).fadeIn(300);
			function hide(){
				$('.'+objClass).delay(delayToHide).fadeOut(600,function(){
					$(this).remove();
				});
			}
			hide();
		},

		loadingEffectShow: function(refObj,loaderHTML){
			refObj=(typeof refObj==='undefined'?window:refObj);
			if(typeof loaderHTML==='undefined'){
				loaderHTML='<img class="pageloader-img" src="images/loading.gif" width="56" height="21">';
			}else{
				loaderHTML=''+
					'<div class="pageloader-info">'+
					'	<div class="content">'+loaderHTML+'</div>'+
					'</div>'
			};
			var objHtml=''+
					'<div class="pageloader">'+
					'	<div class="pageloader-masker"></div>'+
					'	<!--[if IE 6]><iframe class="pageloader-masker" style="filter:alpha(opacity=0)" scrolling="no" frameborder="0"></iframe><![endif]-->'+
					'	<div class="pageloader-box"></div>'+
					'</div>',
				_obj=$(objHtml),
				_masker=_obj.find('.pageloader-masker'),
				_box=_obj.find('.pageloader-box'),
				_loader=$(loaderHTML),
				_ref=$(refObj);

			function init(){
				_box.css({
					'position':'absolute'
				}).append(_loader);
				_masker.css({
					'position':'absolute'
				});
				_obj.css({
					'position':'absolute',
					'dispaly':'none'
				}).prependTo('body');
			};
			function fix(){
				var refTop=refObj===window?0:_ref.offset().top,
					refLeft=refObj===window?0:_ref.offset().left,
					refWidth=_ref.outerWidth(),
					refHeight=_ref.outerHeight(),
					loaderWidth=_loader.outerWidth(),
					loaderHeight=_loader.outerHeight();
				_masker.css({
					'top':refTop+'px',
					'left':refLeft+'px',
					'width':refWidth+'px',
					'height':refHeight+'px'
				});
				_box.css({
					'top':(refHeight-loaderHeight)/2+'px',
					'left':(refWidth-loaderWidth)/2+'px'
				});
			};

			function show(){
				init();
				fix();
				_obj.show();
				_masker.fadeTo(0,0.4);
				$(window).off('resize.pageloader').on('resize.pageloader',function(){
					fix();
				});
			};

			show();


		},

		loadingEffectHide:function(){
			$('.pageloader').fadeOut(300,function(){
				$(this).remove();
			});
		}


	};

}(window));


/**********execute**********/
$(function(){
	/*初始化*/
	uaLLUI.resizeLayout();
	/*
	uaLLUI.loadingEffectShow('body','正在为您接入【xx在线客服】，请稍后……');
	uaLLUI.loadingEffectHide();
	*/
	uaLLUI.tabbox('.ua-tabbox-click','click');
	uaLLUI.orderInfoGoodsChange();
	uaLLUI.foldInit('.chatbody .oppositestate .transferlist dl' ,'dt','dd');
	uaLLUI.foldInit('.chathistory .mod-block-contactlist .list dl' ,'dt','dd');
	uaLLUI.foldInit('.layout-right .mod-block' ,'.title','.content');
	uaLLUI.popup('.chatbody .oppositestate .transferlist','.chatbody .oppositestate .btn_transfer','click');
	uaLLUI.icoPositionFix('.btn .ico');
	uaLLUI.textareaInit('.ua-textarea');
	uaLLUI.multiBtn(
		'.chatbody .chatform .exec .btn_send',
		'.chatbody .chatform .exec .send-keyset'
	);
	uaLLUI.multiBtn(
		'.chatbody .chatform .toolbar .btn_chathistory .btn',
		'.chatbody .chatform .toolbar .goto-chathistory'
	);
	//uaLLUI.soundPlay();

	$('.ua-date .ua-text').calendar({format:'yyyy/MM/dd HH:mm:ss'});

	/*评分*/
	$('.chatform .toolbar .btn_rate').click(function(){
		var obj=$('.ua-floatbox-rate');
		obj.modal({
			autoPosition:true,
			onShow:function(){
				uaLLUI.drag(obj.closest('.simplemodal-container'),'.ua-floatbox-title');/*drag*/
			}
		});
	});

	/*关闭优安聊聊*/
	$('.layout-header .windowtool .btn_close').click(function(){
		uaLLUI.closeWindow();
	});

	/*聊天发送*/
	/*
	$('.chatform .btn_send').click(function(){
		var valObj=$(this).closest('.chatform').find('.ua-textarea-chartwhat textarea'),
			val=valObj.val();
		if(!val||val==''||val=='undefinded'||val==null){
			uaLLUI.chatSentInfoInit('系统提示',null,'请输入内容！',3500);
			valObj.focus();
			return false;
		};
		uaLLUI.sendChat(val,true);
	});
	*/

	/*对象聊天记录*/
	$('.chatbody .chatform .toolbar .goto-chathistory li:eq(0)').click(function(){
		var obj=$('#chathistory_current');
		obj.modal({
			onShow:function(){
				uaLLUI.chatHistoryFix();
				uaLLUI.drag(obj.closest('.simplemodal-container'),'.ua-floatbox-title');/*drag*/
			}
		});
	});

	/*本人全部聊天记录*/
	$('.chatbody .chatform .toolbar .goto-chathistory li:eq(1)').click(function(){
		var obj=$('#chathistory_allforuser');
		obj.modal({
			onShow:function(){
				uaLLUI.chatHistoryFix();
				uaLLUI.drag(obj.closest('.simplemodal-container'),'.ua-floatbox-title');/*drag*/
			}
		});
	});

	/*关闭聊天记录*/
	$('.ua-floatbox-chathistory .btn_close').click(function(){
		$('.ua-floatbox-chathistory').stop(false,true).fadeOut(300);
	});


});

/*resize*/
if(browser.isIE6()){
	var resizeTimer = null;
	window.onresize=function(){
		if (resizeTimer) {
			clearTimeout(resizeTimer);
		}
		resizeTimer = setTimeout(function(){
			uaLLUI.resizeLayout();
			//uaLLUI.chatHistoryFix();
		}, 10);
	};
}else{
	windowObj.resize(function(){
		uaLLUI.resizeLayout();
		//uaLLUI.chatHistoryFix();
	});
}


/*simple modal setting*/
$.extend($.modal.defaults, {
	//fixed:false,
	opacity:50,
	overlayCss: {backgroundColor:"#000"},
	autoResize:false,
	modal:false
});

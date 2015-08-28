#SAPIS Javascript Library API

*—— Warren* in *2015-8-18*

基于：

- jQuery
- [Semantic UI](http://semantic-ui.com/)
- [jquery.datatimepicker](http://xdsoft.net/jqplugins/datetimepicker/)

支持 Chrome 40.0+

&nbsp;
##sys
###app.checkRE()
- **说明：** 检测浏览器，默认检测是否为 chrome，且版本不低于40+。
- **参数：** 无
- **示例：**

		app.checkRE();

&nbsp;
##cookie
###app.cookie.set()
- **说明：** 以键值对形式设置一个或多个 cookie 项。
- **参数：** param（object，键值对）
	- key:value
- **示例：**

		app.cookie.set({
			key:value,
			...
		});

###app.cookie.removeAll()
- **说明：** 清除所有本 app 相关的 cookie。
- **参数：** 无
- **示例：**

		app.cookie.removeAll();

&nbsp;
##ajax
###app.ajax()
- **说明：** 对 jQuery 的 ajax 方法的封装。
- **参数：** opts（object，配置参数），callback（function）
	- **opts**：配置参数
		- url：ajax请求地址，必选
		- data：请求参数，object
		- dataType：请求类型，默认 'json'
		- type：默认POST
		- bufferContext：缓冲UI出现位置的上下文选择器，默认 'body'
		- bufferMsg：缓冲UI中的提示文本，默认 '处理中'
	- **callback**：请求成功后的回调
- **示例：**

		app.ajax({
			url:'/action/do',
			data:{
				id:11,
				action:'delete'
			}
		});

&nbsp;
##初始化
###app.ui.init()
- **说明：** 初始化应用，通常将前端框架（如 Semantic-UI）的组件初始化方法放在这里。慎用，除非页面或模块重载，否则避免重复调用。
- **参数：** 无
- **示例：**

		$(function(){
			app.ui.init();
		});

&nbsp;
##app.ui.buffer
执行缓冲 UI，也就是Loading，对 ajax 等需要用户长时间等待响应的操作给予反馈。
###app.ui.buffer.show()
- **说明：** 显示 buffer，并返回该 buffer DOM对象。
- **参数：** opts（object，配置参数，可选）
	- **opts**
		- context：上下文选择器，用来确定 buffer 覆盖范围，默认 'body'
		- msg：提示文本的内容，默认 '处理中'
		- size：尺寸，默认值 'medium'，可选值有：mini、small、medium、large
		- opacity：遮罩层透明度设置，默认值0.7
- **示例：**

		var buffer=app.ui.buffer.show({
			context:'.container',
			msg:'读取中'
		});

###app.ui.buffer.hide()
- **说明：** 隐藏 buffer 对象。
- **参数：** obj（由app.ui.buffer.show() 返回的 buffer 对象）
- **示例：**

		var buffer=app.ui.buffer.show();
		app.ui.buffer.hide(buffer);

&nbsp;
##导航
###app.ui.navigBuild()
- **说明：** 生成导航（左侧一二级 menu，右侧三级 tabs），通常在页面载入时调用一次。慎用，无需重复调用。
- **参数：** data（菜单数据，数组形式，详细见 config.js中的模拟菜单数据）
- **示例：**

		app.ui.navigBuild(data);

&nbsp;
##模块加载
###app.ui.loadModule()
- **说明：** 读取模块内容。
- **参数：** opts（object，配置参数）
	- **opts** 
		- obj：指定内容注入的目标选择器，被读出的内容将注入其中，在注入前会清空其中的内容，必选
		- href：请求内容的地址，必选
		- bufferContext：缓冲UI的上下文选择器，默认 'body'，慎用
		- scrollToTop：载入前是否将载体滚动到顶部，默认 true
		- success：成功后的回调，function
- **示例：**

		app.ui.loadModule({
			obj:'.moduleWrapper',
			href:'/module/demo.html',
			success:function(){
				alert('success!');
			}
		});

&nbsp;
##模态弹窗
###app.ui.confirm()
- **说明：** 确认弹窗。
- **参数：** opts（object，配置参数）
	- **opts** 
		- title：弹窗标题，默认 '确认'
		- msg：提示文本
		- icon：图标名称，默认 'help'
		- buttons：array，按钮的 html，将会被插入到 actions 层
		- onApprove：function，点击 approve（同意、是） 类型按钮后的回调
		- onDeny：function，点击 deny（拒绝、否） 类型按钮后的回调
- **示例：**

		app.ui.confirm({
			title:'是否删除',
			msg:'您是否要删除本条数据？',
			onApprove:function(){
				delete();
			}
		});

###app.ui.alert()
- **说明：** 提示弹窗。
- **参数：** opts（object），说明参照 app.ui.confirm()
- **示例：**

		app.ui.alert({
			icon:'warning',
			msg:'您有三条未读的短消息！'
		});

&nbsp;
##对话框
###app.ui.dialog()
- **说明：** 初始化对话框，并显示，返回该对话框 DOM对象。对话框内容包括标题、按钮事先都在 html 中书写好，html 结构参考相关页面。
- **参数：** obj（对象选择器，建议用id），opts（object，配置参数）
	- **opts** 
		- style：
			- basic：窗体样式，默认 'small'，可选参数：'small'、'large'、'fullscreen'
		- closeBtn：是否显示右上角关闭按钮，默认 true
		- closeable：点击遮罩层是否关闭，默认 false
		- blurring：遮罩层是否高斯模糊，默认false
		- dimmersettings：
			- opacity：遮罩层透明度，默认0.6
- **示例：**

		app.ui.dialog('#dialog',{
			style:{
				basic:'fullscreen'
			}
		});

&nbsp;
##消息
###app.ui.message()
- **说明：** 显示一个消息层。
- **参数：** 
	- **opts** 
		- type：消息类型，默认 'info'，可选值有：'success'、'info'、'warning'、'error'
		- size：尺寸，默认 'small'
		- msg：消息内容文本
		- closeBtn：是否显示关闭按钮，默认 true
		- icon：图标名称，默认 'smile'
		- context：消息层出现位置的上下文
		- autoHide：自动关闭时间，如4000，表示4秒后关闭，默认 false
- **示例：**

		app.ui.message({
			msg:'成功啦！',
			closeBtn:false,
			autoHide:3000
		});

&nbsp;
##Angular
###app.ui.ngInit(opts)
- **说明：** 初始化指定 html，多用在对 jQuery 动态加载的 html 做 ng 初始化，是业务模块必须的，通常在业务模块 js 的最后调用一次。
- **参数：**
	- **opts** 
		- obj：DOM 对象
		- ngModule：ng 模块名,字符串
- **示例：**

		app.ui.ngInit({
			obj: $('#contents'),
			ngModule: 'app'
		});


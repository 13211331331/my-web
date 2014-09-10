$.fn.extend({
	//判断对象是否可见
	visible:function(){return this.is(':visible');},
	//替换CSS
	cssR:function(c1,c2){this.removeClass(c1);this.addClass(c2);},
	//在对象内部存入数据
	htm:function(s){if(this.length==0)return false;if($.no(s))return this[0].innerHTML;for(var i=0;i<this.length;i++)this[i].innerHTML=s;return true;},
	//焦点延迟处理
	f:function(){var t=this,f=function(){t.focus()};setTimeout(f,100);}
});

$.extend({
	_:function(s){if($.no(s))s=$.t();document.title=s;},
	//获取对象(不带缓存)
	$:function(o){return $.isS(o)?$('#'+o):$(o);},
	//获取对象(带缓存)
	o:function(o){if(!$.isS(o))return $(o);var obj=$.os[o];if(obj)return obj;obj=$('#'+o);if(obj.length>0)$.os[o]=obj;return obj;},os:{},
	//获取对象值
	v:function(o,v){if(v)$.$(o).val(v);else{return $.trim($.$(o).val());}},
	//返回当前时间
	t:function(){return $.d().getTime();},
	//返回当前时间对象
	d:function(t){if(t)return new Date(t);return new Date()},
	//转换成整数
	n:function(s){return parseInt(s);},
	//转换成浮点数
	f:function(s){return parseFloat(s);},
	//判断对象是否存在
	no:function(){var as=arguments;for(var i=0;i<as.length;i++)if(as[i]==null || as[i]==undefined)return true;return false;},
	//判断对象类型
	isS:function(o){return typeof o=="string"},
	isN:function(o){return typeof o=="number"},
	isB:function(o){return typeof o=="boolean"},
	isO:function(o){return typeof o=="object"},
	isInt:function(o){return $.isN(o)&&Math.round(o)==o},
	//是否包含指定内容
	cc:function(cs,c,n){var e=!$.no(n);for(var i=0;i<cs.length;i++)if((e && cs[i][n]==c) || (!e && cs[i]==c))return i;return -1;},
	//返回RegExp
	re:function(s,c){var r=new RegExp(s);if(c)return r.test(c);return r;},
	//是否IE浏览器
	ie:function(v){if(!$.browser.msie)return false;if(v)return $.browser.version==v || $.browser.version.indexOf(v+'.')==0;return true;},
	//创建DOC对象
	ceok:false,
	ce:function(n){return $(document.createElement(n));},
	winPos:function(timestamp){return window.location.href+(timestamp?+"?t="+new Date().valueOf():"")},
	//从字符串中获取第一个数值
	nv:function(s,sv){var si=-1,ei=-1,i=0;if(sv){i=s.indexOf(sv);if(i<0)i=0;}for(;i<s.length;i++)if(si==-1){if(s.charAt(i)>='0' && s.charAt(i)<='9')si=i;}else{if(s.charAt(i)<'0' || s.charAt(i)>'9'){ei=i;break;}}return $.n(si==-1 && ei==-1 ? -1 : (ei==-1 ? s.substr(si) : s.substring(si,ei)));},
	//数值四舍五入
	round:function(n,mantissa){if(!mantissa)mantissa=0;if(mantissa<=0)return Math.round(n);var v=1;for(var i=0;i<mantissa;i++)v*=10;return Math.round(n*v)/v;},
	//金额格式化
	formatMoney : function(num,n) {
	    num = String(num.toFixed(n?n:2));
	    var re = /(-?\d+)(\d{3})/;
	    while(re.test(num)) num = num.replace(re,"$1,$2")
	    return n?num:num.replace(/^([0-9,]+\.[1-9])0$/,"$1").replace(/^([0-9,]+)\.00$/,"$1");;
	},
	//字符串替换
	replace:function(s,s1,s2){return s.replace(new RegExp(s1,'g'),s2);},
	//字符串长度(中文算2个)
	strlen:function(s){return s.replace(/[^\x00-\xff]/g,"**").length},
	//字符串是否包含中文
	strch:function(s){return /[^\x00-\xff]+/.test(s)},
	//清除字符串中的'"字符和头尾空格
	clear:function(){var as=arguments,s;if(as.length<1)return '';s=as[0];if(as.length<2)as=[s,"'",'"'];for(var i=1;i<as.length;i++)s=$.replace(s,as[i],'');return $.trim(s);},
	//cookie操作
	getCookie:function(name,dv){var d=document.cookie;var il1=d.indexOf(name+'=');if(il1==-1)return $.no(dv) ? null : dv;il1+=name.length+1;var il2=d.indexOf(';',il1);if(il2==-1)il2=d.length;return decodeURI(d.substring(il1,il2));},
	setCookie:function(name,value,expires,path,domain,secure){var s=new Text()._(name)._('=')._(encodeURI(value));if(!expires || (expires && expires!='temp')){var day=60*60*24*1000;if(expires=='day')expires=$.d($.t()+day);else if(expires=='week')expires=$.d($.t()+day*7);else if(expires=='month')expires=$.d($.t()+day*30);else if(expires=='year')expires=$.d($.t()+day*365);else{expires=$.d($.t()+day*365*100);}s._(';expires=')._(expires.toGMTString());}if(path)s._(';path=')._(path);if(domain)s._(';domain=')._(domain);if(secure)s._(';secure=')._(secure);document.cookie=s;},
	delCookie:function(name,path,domain){var s=new Text()._(name)._('=null;expires=')._($.d($.t()-100000000).toGMTString());if(path)s._(';path=')._(path);if(domain!=null)s._(';domain=')._(domain);document.cookie=s;},
	clrCookie:function(path,domain){var ds=document.cookie.split(';');for(var i=0;i<ds.length;i++)$.delCookie($.trim(ds[i].split('=')[0]),path,domain);},
	//获取Flash对象
	getFlash:function(name){if($.ie())return window[name];else if($.browser.mozilla)return document[name+'-1'];else{var fl=window[name+'-1'];if(!fl)fl=window[name];if(!fl)fl=document[name+'-1'];return fl;}},
	//初始化对象
	init:function(o,dv){if(!o)return dv;for(i in dv)if($.no(o[i]))o[i]=dv[i];return o;},
	stringify  : function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // simple data type
            if (t == "string") obj = '"' + obj + '"';
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
 
            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = '"' + v + '"'; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }
            }
            return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
        }
    }
});
function Text(){this.s;this.b=[];};Text.prototype={
	_:function(s){var t=this;t.b.push(s);t.s=null;return t;},
	clear:function(){this.b=[];this.s=null;},
	length:function(){return this.ts().length;},
	toHtml:function(o){o=$.$(o);if(o.length==0)return;o[0].innerHTML=this.ts();},
	toString:function(){var t=this;if(!t.s)t.s=t.b.join('');return t.s;},
	ts:function(){return this.toString();}
};
var X={
	//收藏网站
	fav:function(){var u='index.htm'/*tpa=http://www.yztz.com/*/,n='赢在投资网';try{external.addFavorite(u,n);}catch(e){try{sidebar.addPanel(n,u,'');}catch(e){X.dialog.alert("请使用 Ctrl+D 收藏本站",1);}}},
	//返回当前可用z-index值
	zi:function(){return X._zi++;},_zi:10001,
	//ajax标准请求
	ajax:function(url,data,suc){var s={url:url,cache:false,success:suc?suc:X.as,error:X.ae};if(data){s.type='POST';s.data=data;}$.ajax(s);},
	//ajax请求成功处理
	as:function(d){d=$.trim(d),t=d.charAt(0);if(t==':'){X.dialog.alert(d.substr(1),1);return true;}if(t=='*'){eval(d.substr(1));return true;}return false;},
	//ajax请求错误处理
	aec:0,
	ae:function(){setTimeout(function(){X.dialog.alert('请求发生异常，请重试或稍后再试',3);$("input[type='button']:disabled").each(function(){X.form.enableBtn($(this));});},500);},
	ae_:function(r,s,t){$._('['+(++X.aec)+']请求发生异常['+s+'/'+t+']');},
	//返回页面空间
	pso:null,
	ps:function(){if(X.pso)return X.pso;X.wdb();X.pso={width:X.win.width(),height:X.win.height(),left:X.doc.scrollLeft(),top:X.doc.scrollTop()};return X.pso;},
	//设置内容高度
	h:function(obj,oy,min,max,auto){var o=$.$(obj),h=X.ps().height+(oy?oy:0)-37-15-15,ch;if(min||max){if(min&&h<min)h=min;else if(max&&h>max)h=max;o.css('height',h+'px');}else{ch=$(o.children()[0]).height();o.css('height',ch<h?(h+'px'):'auto');}if(!auto)X.hs.push([o,oy,min,max]);},hs:[],
	hr:function(){for(var i=0;i<X.hs.length;i++)X.h(X.hs[i][0],X.hs[i][1],X.hs[i][2],X.hs[i][3],true);},
	//初始化WinDocBody
	win:null,doc:null,body:null,
	wdb:function(){if(!X.win){X.win=$(window);X.doc=$(document);X.body=$(document.body);}},
	//回到顶部
	topo:null,
	top:function(init){
		var p=X.ps(),t=p.top,o=X.topo,a,b,l;
		if(t<300){
			if(o)o.hide();
		}else{
			if(!o){
				if(!$.ceok)return;
				X.topo=o=$.ce('div');
				o.addClass('top');
				o.attr('title','回到顶部');
				o.on('click',function(e){X.doc.scrollTop(0)});
				a=true;
			}
			if(a||init){
				b=$.o('helpCenter');
				if(b.length>0)
				{
					l=b.offset().left+b.width()+2;
					if(l+40+2>p.width){
						l=p.width-40-2;
					}
					o.css('left',l+'px');
					o.css('right','auto');
				}
			}
			if(a)X.body.append(o);else{o.show();}
		}
	},
	init:function(){
		//初始化基本事件
		X.wdb();
		//X.dialog.confirm('提醒：接受续约后无法再取消','',{title:'您确定要接受续约吗',width:260});
		X.win.bind({
			resize:function(e){X.pso=null;X.hr();X.dialog.resize();X.top(true);},
			scroll:function(e){X.pso=null;X.top();}
		});
	}
};

X.domain = "http://www.yztz.com/res/js/.yztz.com";

X.code = {
		argument		:	"301",
		unauthorized	:	"405",
		nameUnsettled	:	"407",
		notifyInterval	:	"601",
		schemeError		:	"700",
		balanceShortage	:	"800",
		rebate			:	"801",
		system			:	"900"
		
};

X.kf={
	init:function(){
		var o=$.ce('div');
		o.addClass('kf');
		o.attr('title','客服');
		o.click(function(){
			X.kf.showDialog();
		});
		X.body.append(o);
		o.show();
	},
	showDialog:function(){
		window.open('http://wpa.b.qq.com/cgi/wpa.php?ln=1&key=XzkzODAxNTUxOV8xNDA5NzBfNDAwODgyOTg2Nl8yXw','在线客服','height=405,width=500,top=200,left=200,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
	}
};
X.marquee={
	tim:3000,timer:"",m:null,
	init:function(obj,ps){
		var t=this,o=$.$(obj);
		t.m=o;
		o.hover(function () {
			clearTimeout(t.timer);
		}, function () {
			t.timer = setTimeout(t.start, t.tim);
		});
		setTimeout(t.start, t.tim);
		//t.start();
	},
	start:function(){
		clearTimeout(X.marquee.timer);
		var ul = X.marquee.m.find("ul:first");
		var d = ul.find("li:first").outerHeight();
		ul.animate({
			marginTop: -d
		}, 500, function () {
			ul.find("li:first").appendTo(ul);
			ul.css({
				marginTop: 0
			})
		});
		X.marquee.timer = setTimeout(X.marquee.start, X.marquee.tim);
	},
	stop:function(){
		var t=this;
		clearTimeout(t.timeout);
	}
};

X.slideUP={
		tim:3000,timer:500,timeout:"",currIndex:0,slider:[],len:0,
		init:function(obj,ps){
			var t=this,o=$.$(obj);
			t.slider=o.find("ul"),t.len=t.slider.length;
			o.hover(function () {
				clearTimeout(t.timeout);
			}, function () {
				if (t.len > 1) {
					t.timeout = setTimeout(t.start, t.tim);
				}
			});
			setTimeout(t.start, t.tim);
			//t.start();
		},
		start:function(){
			clearTimeout(X.slideUP.timeout);
			var nextIndex = X.slideUP.currIndex+1;
			if (nextIndex >= X.slideUP.len) {
	            nextIndex = 0;
	        };
			X.slideUP.slider.eq(X.slideUP.currIndex).animate({top:'-60px'},X.slideUP.timer);
			X.slideUP.slider.eq(nextIndex).css("top","60px").animate({top:'0px'},X.slideUP.timer);
			X.slideUP.currIndex++;
			if (X.slideUP.currIndex >= X.slideUP.len) {
	            X.slideUP.currIndex = 0;
	        };
			X.slideUP.timeout = setTimeout(X.slideUP.start, X.slideUP.tim);
		},
		stop:function(){
			var t=this;
			clearTimeout(t.timeout);
		}
	};

	X.slidebox={
		timer:null,
		ee:0,
		init:function(s){
			var ts = this;
			var b = $(s.box);
			var r = $(s.menu);
			var g = $(s.con);
			var o = g.length - 1;
			var q = g.width();
			b.hover(function () {
				clearInterval(ts.timer);
	            ts.showArrow("in")
	        }, function () {
				ts.setSlideTime(s.stay);
	            ts.showArrow("out")
	        });
			
			r.click(function () {
				var u = $(this).attr("data-type");
				var t = u == "right";
				var e = ts.ee;
				if (t && e == o) {
					g.eq(e).stop(true, false).animate({
						left: -q
					}, s.s, s.effect || "");
					ts.ee = 0;
					g.eq(ts.ee).css("left", q).stop(true, false).animate({
						left: 0
					}, s.s, s.effect || "")
				} else {
					if (!t && e == 0) {
						g.eq(e).stop(true, false).animate({
							left: q
						}, s.s, s.effect || "");
						ts.ee = o;
						g.eq(ts.ee).css("left", -q).stop(true, false).animate({
							left: 0
						}, s.s, s.effect || "")
					} else {
						g.eq(e).stop(true, false).animate({
							left: t ? -q : q
						}, s.s, s.effect || "");
						g.eq(e + (t ? 1 : -1)).css("left", t ? q : -q).stop(true, false).animate({
							left: 0
						}, s.s, s.effect || "");
						t ? ts.ee++ : ts.ee--
					}
				}
			})
			ts.setSlideTime(s.stay);
		},
		setSlideTime: function (g) {
			this.timer = setInterval(function () {
				$("#slide_right").click()
			}, g)
		},
		showArrow: function (o) {
			var g = o == "in" ? 0 : -32;
			var q = o == "in" ? 0 : 200;
			setTimeout(function () {
				$("#slide_left").stop(true, false).animate({
					left: g
				}, 200);
				$("#slide_right").stop(true, false).animate({
					right: g
				}, 200)
			}, q)
		}
	};

	X.slide={
		stay:6,fade:0.7,msec:1000,timer:400,timeout:"",currIndex:0,slider:[],slideindex:true,subslider:[],len:0,
		init:function(obj,ps){
			var t=this,o=$.$(obj),s=new Text();
			t.slider=o.find("li"),t.len=t.slider.length;
			if(t.slideindex){
				s._('<div id="slide-list" class="slide-list"><ul>');
				for(var i=1; i<=t.len; i++){
					s._('<li '+(i == 1 ? 'class="curr"' : '')+'>'+i+'</li>');
				}
				s._('</div></ul>');
			}
			o.after(s.ts());
			t.subslider=$('.slide-list').find('li');
			t.subslider.first().addClass('curr');
			t.subslider.bind('click', function () {
				t.currIndex = t.subslider.index($(this));
				clearTimeout(t.timeout);
				t.changePlay(t.currIndex);
				
			});
			o.hover(function () {
				clearTimeout(t.timeout)
			}, function () {
				if (t.len > 1) {
					t.timeout = setTimeout(t.autoPlay, t.stay * t.msec)
				}
			});
			if (t.len > 1) {
				t.autoPlay();
			}
		},
		changePlay:function(index){
			var t=this;
	        t.slider.eq(index).fadeIn('slow').siblings().fadeOut('slow');
	        t.subslider.eq(index).addClass('curr').siblings().removeClass('curr');
		},
		autoPlay:function () {
	        clearTimeout(X.slide.timeout);
	        X.slide.changePlay(X.slide.currIndex);
			X.slide.currIndex++;
	        if (X.slide.currIndex >= X.slide.len) {
	            X.slide.currIndex = 0;
	        };
	        X.slide.timeout = setTimeout(X.slide.autoPlay, X.slide.stay * X.slide.msec)
	    }
	};

///表单处理
X.form={
		//表单控件是否有处在焦点
		focus:false,
		//带提示输入框
		inputR:function(obj,remind,dc,rc,ffs){
			var o=$.$(obj),dfs;
			if(!dc)dc='#333';
			if(!rc)rc='#666';
			if(ffs)dfs=o.css('fontSize');
			o[0].r=remind;
			if($.v(o)=='')
			{
				o.css('color',rc);
				o.val(remind);
			}
			o.bind({
				focus:function(e){X.form.focus=true;if($.clear(o.val())==o[0].r)o.val('');o.css('color',dc);if(ffs)o.css('fontSize',ffs);},
				blur:function(e){X.form.focus=false;if($.clear(o.val()).length==0){o.val(o[0].r);o.css('color',rc);if(dfs)o.css('fontSize',dfs);}}
			});
		},
		//密码框
		inputPw:function(obj,retype){
			var o=$.$(obj);
			o.bind({
				focus:function(e){X.form.focus=true;if($.clear(o.val()).length==0)o.cssR('ui-input-pwd'+retype,'ui-input');},
				blur:function(e){X.form.focus=false;if($.clear(o.val()).length==0)o.cssR('ui-input','ui-input-pwd'+retype);}
			});
		},
		//单选框
		radio:function(save){
			var so=$.$(save),os=[],as=arguments,cs;
			for(var i=1;i<as.length;i++)
			{
				os[i-1]=$.$(as[i]);
				if(!cs)cs=os[i-1].hasClass('rab')||os[i-1].hasClass('rab-c')?['rab','rab-c']:['rab-14','rab-14-c'];
				os[i-1].on('click',function(e){for(var i=0;i<os.length;i++)if(os[i].length>0 && os[i][0]==this){so.val(os[i].attr('value'));os[i].cssR(cs[0],cs[1]);}else{os[i].cssR(cs[1],cs[0]);}});
			}
		},
		//复选框
		check:function(save,obj){
			var so=$.$(save),o=$.$(obj);
			o.on('click',function(e){if(so.val()==''){so.val(o.attr('value'));o.cssR('ui-chbox','ui-chbox-1');}else{so.val('');o.cssR('ui-chbox-1','ui-chbox');}});
		},
		tipInp:function(inp,tinp){
			inp = $.$(inp),tinp = $.$(tinp);
			if($.no(inp) || $.no(tinp))return;
			inp.bind({
				focus:function(){
					tinp.hide();
				},
				blur:function(){
					if(inp.attr('type')=='password'){
						if(inp.val()==""){
							tinp.show();
						}else{
							tinp.hide();}
					}else{
						if($.clear($.v(inp))==""){tinp.show();}else{tinp.hide();}
					}
					
				}
			});
			tinp.click(function(){
				inp.focus();
			});
		},
		disableBtn:function(btn,ps){
			var btn=$.$(btn);
			if(!btn)return;
			var dtxt=btn.attr('dis-text'),dcls=btn.attr('class');
			if(/btn\-\w+\-disable/.test($.trim(dcls))){
				return;
			}
			btn.data('ftext',btn.val());
			btn.data('cls',dcls);
			btn.attr({'class':dcls.replace(/(btn\-\w+)(?:\-\w+)*/,"$1-disable")});
			btn.val($.no(dtxt)?(ps&&ps.dtext?ps.dtext:'处理中...'):dtxt);
			btn.attr('disabled',true);
		},
		enableBtn:function(btn){
			var btn=$.$(btn);
			if(!btn)return;
			btn.attr('disabled',false);
			if(''!=$.trim(btn.data('cls'))){
				btn.attr({'class':btn.data('cls')});
			}
			if(''!=$.trim(btn.data('ftext'))){
				btn.val(btn.data('ftext')).removeData(['ftext','cls']);
			}
		},
		timeoutBtn:function(btn,msg,sec,ps){
			var btn = $.$(btn);
			if(btn&&btn.length>0){
				if(btn&&''==$.trim(btn.data('ftext'))){
					var dcls = btn.attr('class');
					btn.data("ftext",ps&&ps.ftext?ps.ftext:btn.val());
					btn.data('cls',dcls).attr("class",dcls.replace(/(btn\-\w+)(?:\-\w+)*/,"$1-disable"));
				}
				if(sec>0){
					var interval = ps&&ps.interval?ps.interval:1000;
					btn.val($.replace(msg,'{time}',sec--)).attr('disabled',true);
					var result = setTimeout("X.form.timeoutBtn('"+btn.attr("id")+"','"+msg+"',"+sec+",{interval:"+interval+"});",interval);
					btn.data("timeout",result);
				}else{
					btn.val(btn.data('ftext')).attr('disabled',false).attr("class",btn.data('cls'));
					btn.removeData("cls");
					btn.removeData("ftext");
				}
			}
		},
		uploadBtn:function(btn,interval,msg,ps){
			var btn = $.$(btn);
			if(btn&&btn.length>0){
				if(btn&&''==$.trim(btn.data('ftext'))){
					var dcls = btn.attr('class')
					btn.data("ftext",ps&&ps.ftext?ps.ftext:btn.val())
					.data('cls',dcls)
					.attr({'class':dcls.replace(/(btn\-\w+)(?:\-\w+)*/,"$1-disable")});
				}
				X.ajax(ctx.home+"/status/uploadProgress.htm", {t:new Date().getTime()}, function(data){
					data = $.parseJSON(data);
					if(!$.isEmptyObject(data)){
						btn.val($.replace(msg,'{progress}',data.progress)).attr('disabled',true);
					}
					var result = setTimeout("X.form.uploadBtn('"+btn.attr("id")+"',"+interval+",'"+msg+"');",parseInt(interval,10));
					btn.data("timeout",result);
				});
			}
		},
		timeoutToggleBtn:function(btn,msgs,interval){
			var btn = $.$(btn);
			if(btn&&btn.length>0){
				if(btn&&''==$.trim(btn.data('ftext'))){
					btn.data("ftext",btn.val());
					btn.data("itext",0);
					var cls = btn.attr('class');
					btn.data('cls',cls).attr({'class':cls.replace(/(btn\-\w+)(?:\-\w+)*/,"$1-disable")});
					
				}
				if(interval>0){
					if(!$.isArray(msgs)){
						msgs = $.parseJSON(msgs);
					}
					var itext = btn.data("itext");
					btn.val(msgs[itext]).attr('disabled',true);
					var result = setTimeout("X.form.timeoutToggleBtn('"+btn.attr("id")+"','"+$.stringify(msgs)+"',"+interval+")",interval);
					btn.data("timeout",result);
					btn.data("itext",(itext+1)%msgs.length);
				}
			}
		},
		timeoutBtnBreak:function(btn){
			var btn = $.$(btn);
			if(btn&&btn.length>0){
				if(btn.data("timeout")){
					clearTimeout(btn.data("timeout"));
					if(btn.data("ftext")){
						X.form.enableBtn(btn);
					}
				}
			}
		}
	};

//对话框
X.dialog={
		//打开的对话框、提示框、选择框、消息框、加载框索引
		dbs:[],pbs:[],sel:null,mbs:[],ls:[],
		//打开对话框 ps:topic(对话框主题名称),width,notify
		//标准内容间距，控件上下20/左右30，文字四周30，带topic的上15
		open:function(content,ps){
			ps=$.init(ps,{topic:'',width:400,notify:null});
			var t=this,w=ps.width,bgi=X.zi(),di=X.zi(),db=[di,w],p=X.ps(),ww=p.width,wh=p.height,w1=w-14-25,w2=w-15,dl=$.round((ww-w)/2),dt=-30,s=new Text();
			if(dl<6)dl=6;
			s._('<div class="db-bg-in">');
			if(ps.topic)s._('<div class="db-t"><div class="db-close" onclick="X.dialog.close(')._(di)._(')";></div>')._(ps.topic)._('</div>');
			s._('<div class="db-m">');
			if(content)s._($.replace(content,'#di#',di));
			s._('</div></div>');
			db[3]=$.ce('div');
			db[3].addClass('db-bg');
			db[3].css('zIndex',bgi);
			db[3].css('width',ww+'px');
			db[3].css('height',wh+'px');
			db[3].attr('id','dialog-bg-'+di);
			db[4]=$.ce('div');
			db[4].addClass('db');
			db[4].css('zIndex',di);
			db[4].css('width',w+'px');
			db[4].css('left',dl+'px');
			db[4].css('display','none');
			db[4].attr('id','dialog-'+di);
			db[4].htm(s);
			db[5]=ps.notify;
			X.body.append(db[3],db[4]);
			db[2]=db[4].height();
			dt=$.round((wh-db[2])/2+dt);
			if(dt<6)dt=6;
			if(!$.ie(6)){db[4].css('top',dt+'px');}
			db[4].show();
			db[4].find('input:first').focus();
			t.dbs.push(db);
		},
		//提醒对话框 ps:title,msg,icon,width,btn(按钮名称),notify
		alert:function(msg,icon,ps){
			ps=$.init(ps,{title:'',msg:msg,icon:icon,width:400,btn:'确定'});
			if(ps.width<150)ps.width=150;
			var t=this,is=['info','help','error','ok'],s=new Text();
			s._('<div class="db-alt-close" onclick="X.dialog.close(#di#)";></div>');
			s._('<table width="100%"><tr>');
			if(ps.title)
			{
				if(ps.icon==0)
					s._('<td width="1" rowspan="2" align="left"></td>');
				else
					s._('<td width="40" rowspan="2" align="left" valign="top"><div class="db-')._(is[ps.icon-1])._('"></div></td>');
				s._('<td height="20" align="left" valign="top" class="f16 b">');
				s._(ps.title);
				s._('</td></tr><tr><td height="30" align="left" class="f16 h24">');
				s._(msg);
				s._('</td></tr><tr><td></td><td style="padding-top:16px;" align="center" valign="bottom">');
			}
			else
			{
				if(ps.icon==0)
					s._('<td width="1" height="30" align="left"></td>');
				else
					s._('<td width="45" valign="top" style="padding-right:20px;"><div class="db-icon db-icon-')._(is[ps.icon-1])._('"></div></td>');
				s._('<td align="left" valign="top" style=" line-height:150%; color:#333333;padding-right:40px;">');
				s._(msg);
				s._('</td>');
			}
			s._('</tr></table>');
			s._('<div style="padding-top:20px; text-align:center;">');
			t.addBtn(s,ps.btn,'a',1);
			if(ps.cfm)
				t.addBtn(s,ps.btn1,'b',2,true);
			s._('</div>');
			t.open(s.ts(),ps);
		},
		//确认对话框 ps:title,msg,icon,width,btn(按钮名称),btn1(第二个按钮名称),notify
		confirm:function(msg,icon,ps){
			ps=$.init(ps,{msg:msg,icon:icon,btn1:'取消'});
			ps.cfm=true;
			this.alert(msg,icon,ps)
		},
		//添加按钮代码(对话框按钮)
		addBtn:function(s,name,bt,nt,space){
			var style=space?'margin-left:10px;':null;
			var css = nt==2?'btn btn-l-grey':'btn btn-l';
			this.addButton(s,{id:'dialog-btn-'+bt+'-#di#',name:name,css:css,style:style,click:'X.dialog.close(#di#,'+nt+');'});
		},
		//添加按钮代码 ps:id,name,css(按钮CSS),style,click(点击事件),effects(点击效果CSS),type(是按钮或者连接样式)
		addButton:function(s,ps){
			s._('<input type="button"');
			if(ps.id)
				s._(' id="')._(ps.id)._('"');
			if(ps.name)
				s._(' value="')._(ps.name)._('"');
			if(ps.css)
				s._(' class="')._(ps.css)._('"');
			if(ps.style)
				s._(' style="')._(ps.style)._('"');
			if(ps.click)
				s._(' onclick="')._(ps.click)._('"');
			if(ps.effects && ps.css)
				s._(' onmousedown="$(this).cssR(&quot;')._(ps.css)._('&quot;,&quot;')._(ps.effects)._('&quot;);" onmouseup="$(this).cssR(&quot;')._(ps.effects)._('&quot;,&quot;')._(ps.css)._('&quot;);" onmouseout="$(this).cssR(&quot;')._(ps.effects)._('&quot;,&quot;')._(ps.css)._('&quot;);"');
			s._('>');
		},
		addTips:function(s,ps){
			var icons=['help','info','error','ok','warning'];
			s._('<div class="db-tips"><table width="100%"><tr>');
			if(ps.icon){
				s._('<td width="40" valign="top"><span class="icon icon-')._(icons[ps.icon])._('"></span></td>');
			}
			s._('<td style="padding:5px 5px 5px 0px;">')._(ps.info)._('</td>');
			s._('</tr></table></div>');
		},
		//操作通知
		notify:function(di,nt){
			var db=this.get(di);
			if(db[5])db[5]($.no(nt)?0:nt);
		},
		//关闭对话框或提示框(0不关闭,1关闭,2关闭并关闭上级对话框)
		close:function(di,nt){
			var t=this,b,l,c=1,cn,cv;
			if($.no(nt))nt=0;
			if(!$.no(di))
			{
				b=t.get(di);
				if(b)
				{
					if($.isN(di))
					{
						if(b[5]){c=b[5](nt);if($.no(c))c=1;}
						if(c>0){t.get(di,true);b[4].remove();b[3].remove();}
						if(c<2)return;
					}
					else
					{
						if(b[6]){c=b[6](nt);if($.no(c))c=1;}
						if(c>0){t.get(di,true);if(b[3]){cn='PROMPT';cv='['+b[0]+']';l=$.getCookie(cn,'');if(l.indexOf(cv)<0)$.setCookie(cn,l+cv,null,'/');}b[5].slideUp(function(){b[5].remove();});}
						return;
					}
				}else{return;}
			}
			//关闭最后打开的对话框
			l=t.dbs.length;
			if(l>0)t.close(t.dbs[l-1][0],0);
		},
		//返回对话框
		get:function(di,del){
			var t=this,bs=$.isN(di)?t.dbs:t.pbs,b;
			for(var i=0;i<bs.length;i++)
				if(bs[i][0]==di)
				{
					b=bs[i];
					if(del)
						bs.splice(i,1);
					break;
				}
			return b;
		},
		//调整大小位置
		resize:function(){
			var t=this,dbs=t.dbs,pbs=t.pbs,mbs=t.mbs;
			if(dbs.length==0 && pbs.length==0 && mbs.length==0)
				return;
			var p=X.ps(),ww=p.width,wh=p.height,dl,dt,top=-30,o,obj;
			if($.ie(6))top+=p.top;
			for(var i=0;i<dbs.length;i++)
			{
				o=dbs[i];
				dl=$.round((ww-o[1])/2);
				if(dl<6)dl=6;
				dt=$.round((wh-o[2])/2+top);
				if(dt<6)dt=6;
				o[3].css('width',ww+'px');
				o[3].css('height',wh+'px');
				o[4].css('top',dt+'px');
				o[4].css('left',dl+'px');
			}
			for(var i=0;i<pbs.length;i++)
			{
				o=pbs[i];
				obj=$.$(o[4]);
				if(obj.length>0)
				{
					p=obj.offset();
					ww=p.left+obj.width()/2;
					wh=p.top+obj.height()+5;
					if(o[2]%2==1)ww-=15;else{ww-=o[1]-15;}
					o[5].css('top',wh+'px');
					o[5].css('left',ww+'px');
				}
			}
			for(var i=0;i<mbs.length;i++)
			{
				o=mbs[i];
				if(o!=null && o.length>4)
				{
					dl=$.round((ww-o[5])/2);
					o[4].css('left',dl+'px');
				}
			}
		}
	};
	//选型卡g='异步数据请求方法名'
	X.tab={
		init:function(id){
			id=id||'tab1';
			var tab=$.$(id),tts=tab.find('div.tabtitle span'),tis=tab.find('div.tabcon div.subtab');
			tts.first().addClass('curr');
			tis.first().show().siblings().hide();
			tts.click(function(){
				var i = tts.index(this),currTab = tts.eq(i),currTabCon=tis.eq(i),g=currTab.attr('g');
				if(currTab.hasClass('curr'))return;
				currTab.addClass('curr').siblings().removeClass('curr');
				if(g){eval(g);}
				currTabCon.show().siblings().hide();
			});
		}
	};
	
	X.suggest={
			//datas[联想输入文本框，输入内容，匹配数据，提示框，选择数据]
			focus:false,datas:[],keyCount:0,
			bind:function(inp){
				var t=this;
				inp=$.$(inp);
				inp.bind({
					focus:function(e){t.focus=true;t.change(inp);},
					blur:function(e){t.focus=false;},
					keyup:function(e){var k=e.keyCode;if(k==13)t.go();else if(k<37||k>40)t.change(inp);else if(k==38||k==40)return false;},
					keydown:function(e){var k=e.keyCode;if(k==38||k==40){t._ud(k==38);return false;}}
				});
			},
			//搜索内容变化处理
			change:function(inp){
				var t=this,ds=t.datas,o=ds[3],v=$.clear(inp.val()),s=new Text();
				ds[0]=inp,ds[1]=v,p=inp.offset(),ps=X.ps(),iet=$.ie(6)||$.ie(7);
				var mails=t.createEd(v);
				if(v.length==0 || mails.length==0){if(o)o.hide();return;}		
				if(!o)
				{
					o=$.ce('div');
					o.addClass('suggest-box');
					o.css('zIndex',X.zi());
					ds[3]=o;
					//inp.after(o);
					$(document.body).append(o);
				}
				//显示结果框
				o.css('left',p.left+'px');
				o.css('top',(p.top+inp.innerHeight())+'px');
				if(mails.length>0){
					s._('<ul>');
					for(i in mails){
						s._('<li class="')._(i==0?'selected':'')._('" onmouseover="X.suggest._ud(')._(i)._(');" onclick="X.suggest.go();">')._(mails[i])._('</li>');
					}
					s._('</ul>');
					o.show();
				}
				o.htm(s);
			},
			//创建Email联想数据
			createEd:function(v){
				var v1=v.substring(v.lastIndexOf('@')+1),v2=v.substring(0,v.lastIndexOf('@')+1);
				var mails=['http://www.yztz.com/res/js/qq.com','http://www.yztz.com/res/js/163.com','http://www.yztz.com/res/js/126.com','http://www.yztz.com/res/js/189.cn','http://www.yztz.com/res/js/sina.com','http://www.yztz.com/res/js/hotmail.com','http://www.yztz.com/res/js/gmail.com','http://www.yztz.com/res/js/sohu.com','http://www.yztz.com/res/js/21cn.com'],ds=[];
				for(i in mails){
					if(v.indexOf('@')!=-1 && mails[i].indexOf(v1)!=-1){ds.push(v2+mails[i]);}
				}
				return ds;
			},
			//搜索结果上下选择
			_ud:function(up){
				var t=this,ds=t.datas,c='selected',n=$.isN(up),os,o=ds[3];
				if(!o||!o.visible())return;
				os=o.children().children('li');if(os.length<=1)return;
				
				for(var i=0;i<os.length;i++)
				{
					o=$(os[i]);
					if(o.hasClass(c))
					{
						if(n&&i==up)return;
						o.removeClass(c);
						if(n)o=$(os[up]);else{o=$(os[up?(i==0?os.length-1:i-1):(i==os.length-1?0:i+1)]);}
						o.addClass(c);
						break;
					}
				}
			},
			resize:function(){
				var t=this,ds=t.datas,o=ds[3],inp=ds[0];
				if(!o)return;
				//显示结果框
				var p=inp.offset();
				o.css('left',p.left+'px');
				o.css('top',(p.top+inp.innerHeight())+'px');
			},
			//搜索结果执行
			go:function(){
				var t=this,ds=t.datas,o=ds[0],v=ds[1],bo=ds[3];
				if(!v)return;
				o.val(bo.find('li.selected').text());
				t.close(true);
			},
			//关闭搜索结果框
			close:function(abs){
				var t=this,ds=t.datas;if((abs||!t.focus)&&ds[3]){ds[3].hide();}
			}
		};
	
	//重点提示框 ps:dire(提示指针方向),width,close(关闭是否允许),remem(记住关闭到Cookie),delay,zIndex,notify
	X.prompt={
		dbs:[],
		init:function(obj,msg,ps){
			ps=$.init(ps,{dire:0,width:200,close:true,remem:false,reget:false,delay:1000,ox:0,oy:0});
			var t=this,o=$.$(obj),cn,cv;
			if(!o)return;
			if(!ps.close){
				o.css('cursor','pointer');
				o.bind({
					mouseover:function(){
						var b = t.get(obj);
						if(!b){
							t.open(obj,'',ps);
							b = t.get(obj);
						}
						if(ps.reget){
							var pobj = t.getPosition(o,ps.dire,b[1].width(),b[1].height());
							b[1].css('left',pobj.left+ps.ox+'px');
							b[1].css('top',pobj.top+ps.oy+'px');
						}
						b[1].show();
					},
					mouseout:function(){
						var b = t.get(obj);
						if(!b)return;
						b[1].hide();
					}
				});
			}else{
				if(ps.remem){cn='PROMPT';cv='[db-p-'+obj+']';if($.getCookie(cn,'').indexOf(cv)>=0)return;}
				t.open(obj,msg,ps);
				var b = t.get(obj);
				b[1].show();
			}
		},
		open:function(obj,msg,ps){
			var o=$.$(obj);
			if(!o)return;
			var cls='db-p-'+ps.dire,db=['db-p-'+obj],s=new Text();
			
			if(ps.close){
				s._('<em></em><span></span><div class="db-p-con">')._(msg)._('</div>');
				s._('<div class="db-p-close" onclick="X.prompt.close(\'')._(obj)._('\')"></div>');
			}else{
				s._('<em></em><span></span><div class="db-p-con">')._(o.attr('data-text'))._('</div>');
			}
			db[1]=$.ce('div');
			db[1].addClass('db-p');
			db[1].addClass(cls);
			db[1].css('width',ps.width+'px');
			db[1].css('display','none');
			db[1].html(s.ts());
			$(document.body).append(db[1]);
			
			var pobj = this.getPosition(o,ps.dire,db[1].width(),db[1].height());
			db[1].css('left',pobj.left+ps.ox+'px');
			db[1].css('top',pobj.top+ps.oy+'px');
			this.dbs.push(db);
			//db[1].show();
		},
		getPosition:function(obj,dire,w,h){
			var p=obj.offset(),W=obj.width(),H=obj.height(),L=p.left,T=p.top,l,t;
			if(dire==0){
				l=Math.round(L+W/2-w/2),t=T+H+9;
				return {'left':l,'top':t};
			}
			if(dire==1){
				l=Math.round(L+W/2+25-w),t=T+H+9;
				return {'left':l,'top':t};
			}
			if(dire==2){
				l=L-9-w,t=Math.round(T+H/2-h/2);
				return {'left':l,'top':t};
			}
			if(dire==3){
				l=Math.round(L+W/2+25-w),t=T-9-h;
				return {'left':l,'top':t};
			}
			if(dire==4){
				l=Math.round(L+W/2-w/2),t=T-9-h;
				return {'left':l,'top':t};
			}
			if(dire==5){
				l=Math.round(L+W/2-25),t=T-9-h;
				return {'left':l,'top':t};
			}
			if(dire==6){
				l=L+W+9,t=Math.round(T+H/2-h/2);
				return {'left':l,'top':t};
			}
			if(dire==7){
				l=Math.round(L+W/2-25),t=T+H+9;
				return {'left':l,'top':t};
			}
		},
		//返回对话框
		get:function(id){
			var t=this,bs=t.dbs,b;
			for(var i=0;i<bs.length;i++)
				if(bs[i][0]=='db-p-'+id)
				{
					b=bs[i];
					break;
				}
			return b;
		},
		close:function(id){
			var b=this.get(id),cn,cv,l;
			if(b){
				cn='PROMPT';
				cv='['+b[0]+']';
				l=$.getCookie(cn,'');
				if(l.indexOf(cv)<0){
					$.setCookie(cn,l+cv);
				}
				b[1].remove();
			}
		}
	}

	//执行引擎
	X.engine={
		//引擎ID
		id:null,
		//执行间隔
		interval:222,
		//任务列表
		tasks:[],
		//启动引擎
		start:function(){
			if(this.id || this.tasks.length==0)
				return;
			this.exec();
			this.id=setInterval(function(){X.engine.exec();},this.interval);
		},
		//停止引擎
		stop:function(){
			clearInterval(this.id);
			this.id=null;
		},
		//执行任务
		exec:function(){
			for(var i=0;i<this.tasks.length;i++)
				this.tasks[i].exec();
		},
		//绝对执行
		absExec:function(type){
			for(var i=0;i<this.tasks.length;i++)
				this.tasks[i].exec(type);
		},
		//添加任务
		addTask:function(t){
			return this.tasks.push(t)-1;
		}
	};
	
  function Update(){
	//执行间隔
	this.interval=10000;
	//执行时间
	this.execTime=$.t();
  };
  Update.prototype={
	exec:function(){
		var t=this,ct=$.t();
		if(ct-t.execTime<t.interval)
			return false;
		t.execTime=ct;
		t.upd();
	},
	upd:function(){
		var t=this;
		var s=new Text();
		$.get("sectorNews.htm"/*tpa=http://www.yztz.com/sectorNews.htm*/,{},function(data){
			for(var i=0; i<3; i++){
				$('#gpInfo').find('tr').eq(1).remove();
			}
			var decr = data.decr, incr = data.incr;
			for(var i=0; i<decr.length; i++){
				s._('<tr>');
				s._('<td><a target="_blank" href="http://quote.yztz.com/quote/sector_')._(incr[i].id)._('">')._(incr[i].name)._('</a></td>');
				s._('<td>')._(incr[i].data)._('</td>');
				s._('<td><a target="_blank" href="http://quote.yztz.com/quote/sector_')._(decr[i].id)._('">')._(decr[i].name)._('</a></td>');
				s._('<td class="text-right">')._(decr[i].data)._('</td>');
				s._('</tr>')
			}
			$('#gpInfo').append(s.ts());
			t.updColor();
		},"json");
		
	},
	updColor:function(){
		for(var i=1; i<4; i++){
			var td = $('#gpInfo').find('tr').eq(i).find('td');
			if(td.eq(1).text().indexOf('+')>-1)td.eq(1).addClass('c_up');
			if(td.eq(1).text().indexOf('-')>-1)td.eq(1).addClass('c_down');
			if(td.eq(3).text().indexOf('+')>-1)td.eq(3).addClass('c_up');
			if(td.eq(3).text().indexOf('-')>-1)td.eq(3).addClass('c_down');
		}
	}
  };
  function updateQuote(id,p,r){
		var c=r.charAt(0),udt=c=='+'?'c_up':(c=='-'?'c_down':''),s=new Text();
		s._('<i class="ml15 fs16 ')._(udt)._('">')._(p)._('</i><i class="ml15 fs16 ')._(udt)._('">')._(r)._('</i>');
		$("#g_"+id).html(s.ts());
  }
	
	X.keypress={
		numKeyPress:function(e){
			var k = e.keyCode || e.which;
			if(k>=48&&k<=57||k==8){
				return true;
			}
			return false;
		}
	}
	X.uc={};

X.user={
	loginCallback:$.no,
	account:{
			balance:null,
			borrowRebate:null,
			loanRebate:null
	},
	/**
	 * 是否登录
	 */
	isLogin:function(callback,reloadHead){
		if(callback){
			X.ajax(ctx.sso+"/login.htm",{action:"checkLogin",balance:true},function(data){
				var data = $.parseJSON(data);
				if(data&&data.authenticated){
					X.user.account.balance=data.balance;
				}else{
					X.user.account.balance=0;
				}
				callback(data);
				if(reloadHead){
					loadPageHeader();
				}
			});
		}else{
			return /^\d+$/.test($.getCookie('userId',X.domain));
		}
	},
	getUserId:function(){
		return $.getCookie("userId",null);
	},
	getUsername:function(){
		return $.getCookie("username",null);
	},
	clearUserCookie:function(){
		$.delCookie("userId","/",X.domain);
		$.delCookie("username","/",X.domain);
	},
	/**
	 * 
	 */
	checkAndShowLogin:function(callback){
		if(!this.isLogin()){
			this.login(function(){
				if(X.user.loginCallback){
					X.user.loginCallback();
				}
				if(callback){
					callback();
				}
			});
			return false;
		}else{
			this.loadPageHeader();
			return true;
		}
	},
	loadBalance:function(callback){
		X.ajax(ctx.pay+"/global/assets.htm", {
			action : 'getBalance'
		}, function(data) {
			data = $.parseJSON(data);
			if (data.success) {
				X.user.account.balance=/^\d{1,}(.\d{1,})?$/.test(data.balance)?parseFloat(data.balance):0;
				X.user.account.borrowRebate = /^\d{1,}(.\d{1,})?$/.test(data.borrowRebate)?Math.floor(parseFloat(data.borrowRebate)):0;
				X.user.account.loanRebate = /^\d{1,}(.\d{1,})?$/.test(data.loanRebate)?Math.floor(parseFloat(data.loanRebate)):0;
				if(callback){
					var ast = {};
					ast.balance = X.user.account.balance;
					ast.balanceFormal = data.balanceFormal;
					ast.borrowRebate = X.user.account.borrowRebate;
					ast.loanRebate = X.user.account.loanRebate;
					ast.fundIn = data.fundIn;
					callback(ast);
				}
			}
		});
	},
	/**
	 * 加载登录头
	 */
	loadPageHeader:function(callback){
		$.get(ctx.sso+"/login.htm",{action:"header",t:new Date().getTime()},function(data){
			$("#yztz_header").html(data);
			if(callback){
				callback();
			}
		},'text');
	},
	login:function(callback){
		var t=this,d=X.dialog,f=X.form,s=new Text(),r='用户名/手机号/邮箱';
		var xname = $.trim($.getCookie("X-NAME"));
		s._('<div class="login-box">');
		s._('<div class="login-box-in"><input id="username" type="text" class="ui-input"><span class="icon head"></span>')._(''==xname?'':'<div class="login-clear" onClick="X.user.clear();"></div>')._('</div>');
		s._('<div class="login-box-in"><input id="password" type="password" class="ui-input-pwd"><span class="icon lock"></span></div>');
		s._('</div>');
		s._('<div class="login-box-in" style="padding-bottom:20px"><input id="login-btn" type="button" class="btn btn-xl" dis-text="登录中..." onclick="X.dialog.notify(#di#,1);" value="登 录"/></div>');
		s._('<div style="line-height:100%; padding:0px 20px;"><a href="http://www.yztz.com/res/js/user/')._(ctx.sso)._('/forget.htm" class="fr">忘记密码</a><a href="http://www.yztz.com/res/js/user/')._(ctx.sso)._('/register.htm">免费注册</a></div>');
		
		d.open(s.ts(),{topic:'用户登录',width:354,notify:function(nt){
			if(nt==0)return;
			var uo=$('#username'),po=$('#password'),bo=$('#login'),un=$.v(uo),pw=$.v(po),b=$.v(bo),ad;
			if(un==r || un.length==0){d.alert('请填写用户名、手机号或邮箱',0,{notify:function(){uo.f();}});return;}
			if(pw.length==0){d.alert('请输入登录密码',0,{notify:function(){po.f();}});return;}
			
			X.form.disableBtn("login-btn");
			X.ajax(ctx.sso+"/yztz_user_login_check",{username:un,password:pw,remeber:true,authencationType:"AJAX"},function(data){
				data = $.parseJSON(data);
				if(data.authenticated){
					X.user.loadPageHeader(callback);
					d.close();
				}else{
					X.form.enableBtn("login-btn");
					d.alert(data.resultMsg,1,{notify:function(){uo.f();}});
				}
			});
		}});
		
		$.v("username",xname);
		f.inputR('username',r);
		f.inputPw('password',true);
		
		$("#username").keyup(function(e){
			if(e.keyCode==13){
				$("#password").focus();
			}
		});
		$("#password").keyup(function(e){
			if(e.keyCode==13){
				$("#login-btn").click();
			}
		});
		
		if(''==xname){
			$("#username").focus();
		}else{
			$("#password").focus();
		}
	},clear:function(){
		$('.login-clear').remove();
		$('#username').val('').focus();
		$.delCookie("X-NAME","/",X.domain);
	},register:function(step){
		var t=this,d=X.dialog;
		if(step==1){
			checkNickName(function(success){
				if(success){
					if(checkPwd() && checkPwdSure()){
						if($("#agreeBox").attr('checked')!='checked'){
							X.dialog.alert("请先阅读并同意赢在投资网站服务协议",1);
							return;
						}
						X.form.disableBtn("surebtn");
						X.ajax(ctx.sso+"/register.htm",{action:"validateStep1",username:$("#username").val(),password:$("#password").val(),type:$("#role").val()},
							function(data){
								data = $.parseJSON(data);
								if(data.success){
									$('#regForm').submit();
								}else{
									X.form.enableBtn("surebtn");
									X.dialog.alert(data.resultMsg,1);
								}
							}
						);
					}
				}
			});
		}else if(step==2){
			checkMobile(function(success){
				if(success){
					if(checkVCode()){
						var uo=$('#mobile'),un=$.v(uo),code=$('#vCode'),cn=$.v(code),tipb=$("#reg-b-tips");
						X.form.disableBtn("sure");
						X.ajax(ctx.sso+"/register.htm",{action:"checkRegisterCode",mobile:un,checkCode:cn},function(data){
							data = $.parseJSON(data);
							if(data.success){
								X.ajax(ctx.sso+"/register.htm",{action:"doRegister",mobile:un,username:$('#username').val(),password:$('#password').val(),type:$('#type').val()},function(_data){
									_data = $.parseJSON(_data);
									if(_data.success){
										window.location.href=ctx.sso+"/register.htm?action=happy";
									}else{
										X.form.enableBtn("sure");
										X.dialog.alert(_data.resultMsg,1);
									}
								});
							}else{
								X.form.enableBtn("sure");
								tipb.html('<em class="icon"></em>'+data.resultMsg);
								code.addClass('error');
							}
						});
					}
				}
			});
		}
	},
	getRegCheckCode:function(){
		checkMobile(function(success){
			if(success){
				X.form.timeoutBtn("regCodeBtn","{time}秒后重新获取",60);
				X.ajax(ctx.sso+"/register.htm",{action:"getRegisterCode",mobile:$('#mobile').val()},function(data){
					data = $.parseJSON(data);
					if(data.success){
						//d.alert('验证码已经发送至您的手机，请注意查收',4); 
					}else{
						X.form.timeoutBtnBreak("regCodeBtn");
						if(X.code.notifyInterval==$.trim(data.code)){
							X.form.timeoutBtn("regCodeBtn","{time}秒后重新获取",data.interval);
						}else{
							X.dialog.alert(data.resultMsg,1);
						}
					}
				});
			}
		});
	},
	initReg:function(step){
		var t=this,f=X.form;
		var h = $(window).height();
		if(step==1){
			f.inputR('username','用户名');
			f.inputPw('password','');
			f.inputPw('passsure','-s');
		}else if(step==2){
			f.inputR('mobile','手机号');
			f.inputR('vCode','验证码');
		}else if(step==3){
			$('.reg-wrap-out').height(h>560?h-160:400);
		}
	},
	loginPage:function(){
		var t=this,uo=$('#username'),po=$('#password'),un=$.v(uo),pw=$.v(po),tip=$('#login-tips'),lbtn=$('#login-btn');
		if($.clear(un).length==0 || un=='用户名/手机号/邮箱'){tip.htm('请输入用户名/手机号/邮箱');uo.addClass('error').focus();return false;}
		if($.clear(pw).length==0){tip.htm('请输入登录密码');po.addClass('error').focus();return false;}
		
		X.form.disableBtn("login-btn");
		X.ajax(ctx.sso+"/yztz_user_login_check",{username:un,password:pw,remeber:true,entrance:$.v("entrance"),authencationType:'AJAX'},function(data){
			data = $.parseJSON(data);
			if(data.authenticated){
				window.location.href=data.entrance;
			}else{
				X.form.enableBtn("login-btn");
				tip.htm(data.resultMsg);
			}
		});
	},
	loginPageInit:function(){
		var t=this,f=X.form,p=$('.login-con-wrap').find('p.tip-text'),uo=$('#username'),r='用户名/手机号/邮箱';
		var xname = $.trim($.getCookie("X-NAME"));
		f.inputR('username',r);
		f.inputPw('password','');
		
		if(''!=xname){
			$.v("username",xname);
			$("#username").blur();
			$("#password").focus();
		}else{
			$(".login-clear").remove();
			$("#username").focus();
		}
		
		$("#username").keyup(function(e){
			if(e.keyCode==13){
				$("#password").focus();
			}
		});
		$("#password").keyup(function(e){
			if(e.keyCode==13){
				$("#login-btn").click();
			}
		});
	},
	getForgetCheckCode:function(){
		var uo=$('#mobile'),un=$.v(uo),tipa=$('#forget-a-tips');
		if(checkMobile()){
			X.form.timeoutBtn("forgetPwdGetCode","{time}秒后重新获取",60);
			X.ajax(ctx.sso+"/forget.htm",{action:"forgetCode",mobile:un},function(data){
				data = $.parseJSON(data);
				if(data.success){
					//d.alert('验证码已经发送至您的手机，请注意查收',4); 
				}else{
					X.form.timeoutBtnBreak("forgetPwdGetCode");
					if(X.code.notifyInterval==$.trim(data.code)){
						X.form.timeoutBtn("forgetPwdGetCode","{time}秒后重新获取",data.interval);
					}else{
						tipa.html('<em class="icon"></em>'+data.resultMsg);
						uo.addClass('error');
					}
				}
			});
		}
	},
	forget:function(step){
		var t=this,d=X.dialog;
		if(step==1){
			var uo=$('#mobile'),un=$.v(uo),code=$('#vCode'),cn=$.v(code),tipb=$('#forget-b-tips');
			if(checkMobile() && checkVCode()){
				X.form.disableBtn("nextbtn");
				X.ajax(ctx.sso+"/forget.htm",{action:"checkCode",checkCode:cn,mobile:un},function(data){
					data = $.parseJSON(data);
					if(data.success){
						window.location.href = ctx.sso+"/forget.htm?action=step2";
					}else{
						X.form.enableBtn("nextbtn");
						tipb.html('<em class="icon"></em>'+data.resultMsg);
						code.addClass('error');
					}
				});
			}
		}else if(step==2){
			var po=$('#password'),pw=$.v(po),spo=$('#passsure'),spw=$.v(spo),tipa=$('#forget-a-tips'),tipb=$('#forget-b-tips'),s=new Text();
			if(checkPassword() && checkPasssure()){
				X.form.disableBtn("nextbtn");
				X.ajax(ctx.sso+"/forget.htm",{action:"resetForgetPassword",mobile:$.v("mobile"),password:pw},function(data){
					data = $.parseJSON(data);
					if(data.success){
						window.location=ctx.sso+"/forget.htm?action=happy";
					}else{
						X.form.enableBtn("nextbtn");
						X.dialog.alert(data.resultMsg,3);
					}
				});
			}
		}
	},
	initForget:function(step){
		var t=this,f=X.form;
		var h = $(window).height();
		if(step==1){
			f.inputR('mobile','手机号');
			f.inputR('vCode','验证码');
		}else if(step==2){
			f.inputPw('password','-n');
			f.inputPw('passsure','-s');
		}else if(step==3){
		}
	},
	loadLoginPageH:function(){
		var h=$(window).height();
		if(h>570){
			$('div.login-wrap-out').css({'padding':((h-570)/2+1)+'px 20px'});
		}
	},bbs:function(){
		var t=this,d=X.dialog,f=X.form,s=new Text(),r='请输入手机号或邮箱',r1='请填写留言内容';
		s._('<div class="db-con-0">');
		s._('<div class="ui-sub-form"><select id="type" class="sel-b" style="width:340px;">');
		s._('<option>意见反馈</option><option>天天赢问题</option><option>股票配资问题</option>');
		s._('<option>功能使用问题</option><option>其他问题</option></select></div>');
		s._('<div class="ui-sub-form"><input id="contact" type="text" class="ui-input" style="width:328px;"/></div>');
		s._('<div class="ui-sub-form"><textarea id="content" style="width:328px;height:96px;color:#666666;padding:5px;">请填写留言内容</textarea></div>');
		s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><a href="#" onclick="X.dialog.notify(#di#,1);" class="btn btn-l">提交</a></div>');
		s._('</div>');
		var od = X._zi-1;
		d.open(s.ts(),{topic:'填写留言内容',width:450,notify:function(nt){
			if(nt!=1){return;}
			var type= $.v("type");
			var content = $.v("content");
			var contact = $.v("contact");
			
			contact = "请输入手机号或邮箱"==contact?"":contact;
			content = "请填写留言内容"==content?"":content;
			
			if(''==type){
				X.dialog.alert('请选择留言类型',1);
				return;
			}
			if(contact == ''){
				X.dialog.alert("请填写联系方式",1,{notify:function(){$("#contact").focus();}});
				return;
			}
			if(!/^1[3-9]\d{9}$/.test(contact)&&!/^[0-9a-zA-Z\-_]+@[0-9a-zA-Z\-_]+\.\w{1,5}(\.\w{1,5})?$/.test(contact)){
				X.dialog.alert("联系方式必须是手机或者邮箱",1,{notify:function(){$("#contact").focus();}});
				return;
			}else if($.trim(contact).length>20){
				X.dialog.alert("联系方式必须在20个字以内",1,{notify:function(){$("#contact").focus();}});
				return;
			}
			
			if(''==content){
				X.dialog.alert('请填写留言内容',1,{notify:function(){$("#content").focus();}});
				return;
			}
			if(content.length>3000){
				X.dialog.alert('留言内容请控制在3000字以内',1,{notify:function(){$("#content").focus();}});
				return;
			}
			$("#subButton").attr("disabled", true).val("提交中...");
			X.ajax(ctx.user+"/anonyMessager.htm",{action:"postMsg",type:type,content:content,contact:contact},function(data){
				$("#subButton").attr("disabled", false).val("提交");
				data = $.parseJSON(data);
				if(data.success){
					d.close();
					X.dialog.alert("留言成功",4);
				}else{
					X.dialog.alert(data.resultMsg,3);
				}
			});
		}});
		f.inputR('contact',r);
		f.inputR('content',r1);
		
		$("#contact").focus();
	}
};
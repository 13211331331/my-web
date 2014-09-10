X.uc.user = {
		/**
		 * 用户留言
		 */
		postMsg:function(type,content,contact){
			if(!type||''==type){
				X.dialog.alert('请选择留言类型',1);
				return false;
			}
			if(!content||''==$.trim(content)){
				X.dialog.alert('请填写留言内容',1,{notify:function(){$("#content").focus();}});
				return false;
			}
			if(content.length>3000){
				X.dialog.alert('留言内容请控制在3000字以内',1,function(){$("#content").focus();});
				return false;
			}
			if($.trim(contact)!=''&&$.trim(contact).length>20){
				X.dialog.alert("联系方式必须在20个字以内",1,{notify:function(){$("#content").focus();}});
				return false;
			}
			X.form.disableBtn("subButton");
			X.ajax(ctx.user+"/messager.htm",{action:"post",type:type,content:content,contact:contact},function(data){
				X.form.enableBtn("subButton");
				
				data = $.parseJSON(data);
				if(data.success){
					X.dialog.alert("留言成功",4,{notify:function(){window.location.reload();}})
				}else{
					X.dialog.alert(data.resultMsg,3);
				}
			});
		},
		/**
		 * 留言信息分页跳转
		 */
		msgPageJump:function(page){
			X.ajax(ctx.user+"/messager.htm",{action:"msgPage",page:page,pageSize:2,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#msgDatas").html(data);
			});
		},
		/**
		 * 删除留言信息
		 */
		deleteMsg:function(id){
			X.dialog.confirm('您确定要删除该留言吗',2,{notify:function(nt){
				if(nt==1){
					X.ajax(ctx.user+"/messager.htm",{id:id,action:'delete'},function(data){
						data = $.parseJSON(data);
						if(data.success){
							X.dialog.alert("留言删除成功",4,{notify:function(){window.location.reload();}});
						}else{
							X.dialog.alert(data.resultMsg,3);
						}
					});
				}
			}});
		},
		updateInfo:function(data){
			data.action="modifyUserInfo";
			X.form.disableBtn("modifyBtn");
			X.ajax(ctx.user+"/userInfo.htm",data,function(data){
				X.form.enableBtn("modifyBtn");
				data = $.parseJSON(data);
				if(data.success){
					X.dialog.alert("用户信息修改成功",4,{notify:function(){window.location.href=ctx.user+"/userInfo.htm";}});
				}else{
					X.dialog.alert(data.resultMsg,3);
				}
			});
		},
		//验证身份证
		legalizeID:function(pic,callback){
			var t=this,d=X.dialog,text=new Text();
			var s=new Text();
			text._('<div style=" line-height:150%;">为了您的股票投资及资金安全，请先实名认证<br>');
			text._('实名信息提交后不可修改，请务必认真填写真实资料<br>');
			text._('如遇到问题，请联系客服 <b>4008-270-866</b></div>');
			d.addTips(s,{icon:4,info:text.ts()});
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form" style="padding-top:20px";><label class="ui-label">真实姓名</label><input type="text" id="name" class="ui-input" style="width:240px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">身份证号</label><input type="text" id="idNumber" class="ui-input" style="width:240px;"/></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="提交"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			d.open(s.ts(),{topic:'实名认证',width:500,notify:function(nt){
				if(nt==0)return;
				var name = $.v("name");
				var idNumber = $.trim($("#idNumber").val()).toUpperCase();
				if(!X.valid.isChinaName(name)){
					X.dialog.alert("请认真填写真实姓名",1,{notify:function(){$("#idNumber").focus();}});
					return false;
				}
				if(!X.valid.isIdentityNumber(idNumber)){
					X.dialog.alert("身份证号码填写错误",1,{notify:function(){$("#idNumber").focus();}});
					return false;
				}
				X.form.disableBtn("sure");
				X.ajax(ctx.user+"/security.htm",{action:"updateRealname",name:$.trim(name),idNumber:$.trim(idNumber)},function(data){
					data = $.parseJSON(data);
					if(data.success){
						d.close();
						if(pic){
							t.legalizeIMG(true);
						}
						if(callback){
							callback($.trim(name),$.trim(idNumber));
						}
					}else{
						X.form.enableBtn("sure");
						X.dialog.alert(data.resultMsg,3);
					}
				});
				
			}});
		},
		/**
		 * 绑定到新手机
		 */
		verifyPhoneNew:function(){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">新手机号码</label><input type="text" id="_mobile_new" class="ui-input" style="width:180px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">验证码</label><input type="text" id="checkCode" class="ui-input mr10" style="width:180px;"/><input id="mobileBindCodeGet" onclick="X.dialog.notify(#di#,2);" type="button" class="btn-normal" value="获取验证码"></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="提交"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			d.open(s.ts(),{topic:'绑定新手机',width:500,notify:function(nt){
				if(nt==0)return;
				if(nt==2){
					var mobile=$("#_mobile_new").val();
					if(!X.valid.isMobile(mobile)){
						X.dialog.alert("手机号码填写错误",1,{notify:function(){$("#_mobile_new").focus();}});
						return false;
					}
					X.form.timeoutBtn("mobileBindCodeGet","{time}秒后重新获取",60);
					X.ajax(ctx.user+"/security.htm",{action:"mobileBindCode",mobile:mobile},function(data){
						data = $.parseJSON(data);
						if(data.success){
							//d.alert('验证码已发送到您的手机，请注意查收',4);
						}else{
							X.form.timeoutBtnBreak("mobileBindCodeGet");
							if(X.code.notifyInterval==$.trim(data.code)){
								X.form.timeoutBtn("mobileBindCodeGet","{time}秒后重新获取",data.interval);
							}else{
								d.alert(data.resultMsg,3);
							}
						}
					});
					return;
				}
				if(nt==1){
					var mobile=$.trim($("#_mobile_new").val());
					if(mobile==''){
						X.dialog.alert("请填写手机号码",1,{notify:function(){$("#_mobile_new").focus();}});
						return false;
					}
					if(!X.valid.isMobile(mobile)){
						X.dialog.alert("手机号码填写错误",1,{notify:function(){$("#_mobile_new").focus();}});
						return false;
					}
					var checkCode = $("#checkCode").val();
					if(''==$.trim(checkCode)){
						X.dialog.alert("请填写验证码",1,{notify:function(){$("#checkCode").focus();}});
						return false;
					}
					
					var dz = X._zi-1;
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"bindMobile",mobile:mobile,checkCode:checkCode},function(data){
						data = $.parseJSON(data);
						if(data.success){
							d.close(dz);
							X.dialog.alert("手机绑定成功",4,{notify:function(){window.location.reload();}});
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3);
						}
					});
					return;
				}
			}});
		},
		//解绑手机
		unbindPhone:function(){
			var t=this,d=X.dialog,s=new Text();
			
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">原手机号码</label><span id="_old_mobile"></span></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">验证码</label><input type="text" id="checkCode" class="ui-input mr10" style="width:150px;"/><input id="unbindGetCode" onclick="X.dialog.notify(#di#,2);" type="button" class="btn-normal" value="获取验证码"></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="下一步"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			d.open(s.ts(),{topic:'修改绑定手机',width:500,notify:function(nt){
				if(nt==0)return;
				if(nt==2){
					X.form.timeoutBtn("unbindGetCode","{time}秒后重新获取",60);
					X.ajax(ctx.user+"/security.htm",{action:"mobileUnbindCode"},function(data){
						data = $.parseJSON(data);
						if(data.success){
							//d.alert('验证码已发送到您的手机，请注意查收',4);
						}else{
							X.form.timeoutBtnBreak("unbindGetCode");
							if(X.code.notifyInterval){
								X.form.timeoutBtn("unbindGetCode","{time}秒后重新获取",data.interval);
							}else{
								d.alert(data.resultMsg,3);
							}
						}
					});
				}
				if(nt==1){
					var checkCode = $("#checkCode").val();
					if(''==$.trim(checkCode)){
						X.dialog.alert("请填写验证码",1,{notify:function(){$("#checkCode").focus();}});
						return;
					}
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"unbindMobile",checkCode:checkCode},function(data){
						data = $.parseJSON(data);
						if(data.success){
							d.close();
							t.verifyPhoneNew(true);
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3,{notify:function(){$("#checkCode").focus();}});
						}
					});
				}
			}});
			X.ajax(ctx.user+"/security.htm",{action:"maskBindMobile"},function(data){
				data=$.parseJSON(data);
				if(data.success){
					$("#_old_mobile").text(data.maskMobile);
				}
			});
			
			$("#unbindGetCode").click();
		},
		//验证照片
		legalizeIMG:function(nameAuthen){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con-1">');
			s._('<form id="nameAuth" method="post" action="'+ctx.user+'/security.htm" enctype="multipart/form-data" target="updateResult">');
			s._('<input type="hidden" name="action" value="verifyRealNamePics"/> ');
			s._('<div class="ui-sub-form" style="padding-top:20px;"><label class="ui-label">身份证正面照片</label><input type="file" class="inp-b w200" id="frontPic" name="frontPic"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">身份证背面照片</label><input type="file" class="inp-b w200" id="backPic" name="backPic"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">手持身份证照片</label><input type="file" class="inp-b w200" id="profilePic" name="profilePic"/></div>');
			s._('<div class="clearfix" style="position:relative; border:1px dashed #999; padding:20px;"><div style=" position:absolute; top:-8px; left:60px; width:17px; height:8px; background:url('+ctx.res_img+'/w.png) no-repeat;"></div>');
			s._('<a href="UIDeg.jpg"/*tpa=http://www.yztz.com/res/js/user/'+ctx.res_img+'/UIDeg.jpg*/ target="_blank"><img src="'+ctx.res_img+'/UIDeg1.jpg" width="150" height="115" style="float:left;"></a><div style="color:#B30000; padding:10px 0 0 200px;"><b class="fs16">手持身份证照片示例</b><br>本人的脸部和身份证文字<br>必须在照片内清晰可见</div></div>');
			s._('<div class="ui-sub-form" style="padding-top:30px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="上传"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="暂不上传"/></div>');
			s._('</form>');
			s._('</div>');
			
			d.open(s.ts(),{topic:'实名认证 - 上传照片完成认证',width:550,notify:function(nt){
				if(nt==0){
					if(nameAuthen){
						window.location.reload();
					}
					return;
				};
				
				var frontPic= $.v("frontPic");
				var backPic = $.v("backPic");
				var profilePic = $.v("profilePic");
				
				if(''==frontPic){
					X.dialog.alert('请选择身份证正面照片',1);
					return false;
				}
				if(''==backPic){
					X.dialog.alert('请选择身份证背面照片',1);
					return false;
				}
				if(''==profilePic){
					X.dialog.alert('请选择手持身份证照片',1);
					return false;
				}
				
				if(frontPic==backPic||frontPic==profilePic||backPic==profilePic){
					X.dialog.alert("请不要上传相同的文件",1);
					return false;
				}
				if(!X.valid.isImg(frontPic)){
					X.dialog.alert("身份证正面照片必须是图片",1);
					return false;
				}
				if(!X.valid.isImg(backPic)){
					X.dialog.alert("身份证背面照片必须是图片",1);
					return false;
				}
				if(!X.valid.isImg(profilePic)){
					X.dialog.alert("手持身份证照片必须是图片",1);
					return false;
				}
				if(nt==1){
					$("#nameAuth").submit();
					X.form.uploadBtn("sure",1000,"进度{progress}%");
				}
			}});
		},
		/**
		 * 绑定邮箱
		 */
		verifyEmailNew:function(change){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">')._(change?"新":"")._('邮箱</label><input type="text" id="_email_new" class="ui-input" style="width:180px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">验证码</label><input type="text" id="checkCode" class="ui-input mr10" style="width:180px;"/><input id="mailBindGetCode" onclick="X.dialog.notify(#di#,2);" type="button" class="btn-normal" value="获取验证码"></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="提交"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			d.open(s.ts(),{topic:'绑定'+(change?"新":"")+'邮箱',width:500,notify:function(nt){
				if(nt==0)return;
				if(nt==2){
					var email=$.trim($("#_email_new").val());
					if(email==''){
						X.dialog.alert("请填写邮箱",1);
						$("#_email_new").focus();
						return false;
					}
					if(!X.valid.isEmail(email)){
						X.dialog.alert("邮箱填写错误",1,{});
						$("#_email_new").focus();
						return false;
					}
					
					X.form.timeoutBtn("mailBindGetCode","{time}秒后重新获取",60);
					X.ajax(ctx.user+"/security.htm",{action:"emailBindCode",email:email},function(data){
						data = $.parseJSON(data);
						if(data.success){
							//d.alert('验证码已发送到您的邮箱，请注意查收',4);
						}else{
							X.form.timeoutBtnBreak("mailBindGetCode");
							if(X.code.notifyInterval==$.trim(data.code)){
								X.form.timeoutBtn("mailBindGetCode","{time}秒后重新获取",data.interval);
							}else{
								d.alert(data.resultMsg,3);
							}
						}
					});
				}
				if(nt==1){
					var email=$.trim($("#_email_new").val());
					if(email==''){
						X.dialog.alert("请填写邮箱",1,{notify:function(){$("#_email_new").focus();}});
						return false;
					}
					if(!X.valid.isEmail(email)){
						X.dialog.alert("邮箱填写错误",1,{notify:function(){$("#_email_new").focus();}});
						return false;
					}
					var checkCode = $.trim($("#checkCode").val());
					if(''==$.trim(checkCode)){
						X.dialog.alert("请填写验证码",1,{notify:function(){$("#checkCode").focus();}});
						return false;
					}
					
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"bindEmail",email:email,checkCode:checkCode},function(data){
						data = $.parseJSON(data);
						if(data.success){
							X.dialog.close();
							X.dialog.alert("邮箱绑定成功",4,{notify:function(){window.location.reload();}});
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3,{notify:function(){$("#checkCode").focus();}});
						}
					});
				}
			}});
		},
		//解绑邮箱
		unbindEmail:function(){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">原邮箱</label><span id="_old_email"></span></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">验证码</label><input type="text" id="checkCode" class="ui-input mr10" style="width:150px;"/><input id="mailUnbindGetCode" onclick="X.dialog.notify(#di#,2);" type="button"  class="btn-normal" value="获取验证码"></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="下一步"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			d.open(s.ts(),{topic:'修改邮箱',width:500,notify:function(nt){
				if(nt==0)return;
				if(nt==2){
					X.form.timeoutBtn("mailUnbindGetCode","{time}秒后重新获取",60);
					X.ajax(ctx.user+"/security.htm",{action:"unbindEmailCode"},function(data){
						data = $.parseJSON(data);
						if(data.success){
							//d.alert('验证码已发送到您的邮箱，请注意查收',4);
						}else{
							X.form.timeoutBtnBreak("mailUnbindGetCode");
							if(X.code.notifyInterval==$.trim(data.code)){
								X.form.timeoutBtn("mailUnbindGetCode","{time}秒后重新获取",data.interval);
							}else{
								d.alert(data.resultMsg,3);
							}
						}
					});
				}
				if(nt==1){
					var checkCode = $.trim($("#checkCode").val());
					if(''==checkCode){
						X.dialog.alert("请填写验证码",1,{notify:function(){$("#checkCode").focus();}});
						return;
					}
					
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"unbindEmail",checkCode:checkCode},function(data){
						data = $.parseJSON(data);
						if(data.success){
							d.close();
							t.verifyEmailNew(true);
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3,{notify:function(){$("#checkCode").focus();}});
						}
					});
					
				}
			}});
			X.ajax(ctx.user+"/security.htm",{action:"maskBindEmail"},function(data){
				data=$.parseJSON(data);
				if(data.success){
					$("#_old_email").text(data.maskEmail);
				}
			});
			
			$("#mailUnbindGetCode").click();
		},
		//修改密码
		updPwd:function(){
			var t=this,d=X.dialog,s=new Text();
			
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">原登录密码</label><input type="password" id="oldPwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">新登录密码</label><input type="password" id="newPwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">确认登录密码</label><input type="password" id="rePwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="确认"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			var od = X._zi;
			d.open(s.ts(),{topic:'修改登录密码',width:450,notify:function(nt){
				if(nt==0)return;
				if(nt==1){
					var oldPwd = $("#oldPwd").val();
					var newPwd = $("#newPwd").val();
					var rePwd = $("#rePwd").val();
					
					if(''==oldPwd){
						X.dialog.alert("请输入原登录密码",1,{notify:function(){$("#oldPwd").focus();}});
						return false;
					}
					if(''==newPwd){
						X.dialog.alert("请输入新登录密码",1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					var npwdv = X.valid.isPwdValid(newPwd);
					if(!npwdv.valid){
						X.dialog.alert(npwdv.msg,1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					if(newPwd!=rePwd){
						X.dialog.alert("新密码与确认密码不一致",1,{notify:function(){$("#rePwd").focus();}});
						return false;
					}
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"loginPwdModify",newPassword:newPwd,oldPassword:oldPwd},function(data){
						data = $.parseJSON(data);
						if(data.success){
							X.dialog.close();
							X.dialog.alert("登录密码修改成功",4);
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3);
						}
					});
				}
			}});
			od = X._zi;
		},
		//修改提款密码
		updWithdrawPwd:function(){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">原提款密码</label><input type="password" id="oldPwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">新提款密码</label><input type="password" id="newPwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">确认提款密码</label><input type="password" id="rePwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="确认"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			var od = X._zi;
			d.open(s.ts(),{topic:'修改提款密码',width:450,notify:function(nt){
				if(nt==0)return;
				if(nt==1){
					var oldPwd = $("#oldPwd").val();
					var newPwd = $("#newPwd").val();
					var rePwd = $("#rePwd").val();
					
					if(''==oldPwd){
						X.dialog.alert("请输入原提款密码",1,{notify:function(){$("#oldPwd").focus();}});
						return false;
					}
					
					if(''==newPwd){
						X.dialog.alert("请输入新提款密码",1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					
					var npwdv = X.valid.isPwdValid(newPwd);
					if(!npwdv.valid){
						X.dialog.alert(npwdv.msg,1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					
					if(''==newPwd){
						X.dialog.alert("请输入新提款密码",1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					
					if(''==rePwd){
						X.dialog.alert("请输入确认提款密码",1,{notify:function(){$("#rePwd").focus();}});
						return false;
					}
					if(newPwd!=rePwd){
						X.dialog.alert("新密码与确认密码不一致",1,{notify:function(){$("#rePwd").focus();}});
						return false;
					}
					
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"withdrawPwdModify",newPassword:newPwd,oldPassword:oldPwd},function(data){
						data = $.parseJSON(data);
						if(data.success){
							X.dialog.close();
							X.dialog.alert("提款密码修改成功",4);
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3);
						}
					});
				}
			}});
			od = X._zi;
		},
		setWithdrawPw:function(isReset){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">提款密码</label><input type="password" id="newPwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">确认提款密码</label><input type="password" id="rePwd" class="ui-input mr10" style="width:188px;"/></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="确认"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			var od = X._zi;
			d.open(s.ts(),{topic:'设置提款密码',width:450,notify:function(nt){
				if(nt==0)return;
				if(nt==1){
					var newPwd = $("#newPwd").val();
					var rePwd = $("#rePwd").val();
					
					if(''==newPwd){
						X.dialog.alert("请输入提款密码",1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					
					var npwdv = X.valid.isPwdValid(newPwd);
					if(!npwdv.valid){
						X.dialog.alert(npwdv.msg,1,{notify:function(){$("#newPwd").focus();}});
						return false;
					}
					
					if(rePwd==''){
						X.dialog.alert("请输入确认提款密码",1,{notify:function(){$("#rePwd").focus();}});
						return false;
					}
					
					if(newPwd!=rePwd){
						X.dialog.alert("密码与确认密码不一致",1,{notify:function(){$("#rePwd").focus();}});
						return false;
					}
					
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:isReset?"resetWithdrawPwd":"withdrawPwdSet",password:newPwd},function(data){
						data = $.parseJSON(data);
						if(data.success){
							d.close();
							X.dialog.alert("提款密码设置成功",4,{notify:function(){window.location.reload();}});
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3);
						}
					});
				}
			}});
			od = X._zi;
		},
		/**
		 * 忘记提款密码
		 */
		forgetWithdrawPwd:function(isMobile){
			var t=this,d=X.dialog,s=new Text();
			s._('<div class="db-con">');
			s._('<div class="ui-sub-form"><label class="ui-label">')._(isMobile?'手机':'邮箱')._('</label><span id="_contact"></span></div>');
			s._('<div class="ui-sub-form"><label class="ui-label">验证码</label><input type="text" id="checkCode" class="ui-input mr10" style="width:128px;"/><input id="withdrawPwGetCode" onclick="X.dialog.notify(#di#,2);" type="button" class="btn-normal" value="获取验证码"></div>');
			s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;"><input type="button" id="sure" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" value="下一步"/><input type="button" onclick="X.dialog.close(#di#,0);" class="btn btn-l-grey ml10" value="取消"/></div>');
			s._('</div>');
			
			d.open(s.ts(),{topic:'提款密码修改',width:450,notify:function(nt){
				if(nt==0)return;
				if(nt==2){
					X.form.timeoutBtn("withdrawPwGetCode","{time}秒后重新获取",60);
					X.ajax(ctx.user+"/security.htm",{action:"forgetWithdrawPasswordCode"},function(data){
						data = $.parseJSON(data);
						if(data.success){
							//d.alert('验证码已发送到您的'+(isMobile?'手机':'邮箱')+'，请注意查收',4);
						}else{
							X.form.timeoutBtnBreak("withdrawPwGetCode");
							if(X.code.notifyInterval==$.trim(data.code)){
								X.form.timeoutBtn("withdrawPwGetCode","{time}秒后重新获取",data.interval);
							}else{
								d.alert(data.resultMsg,3);
							}
						}
					});
					return;
				}
				if(nt==1){
					var checkCode = $("#checkCode").val();
					if(''==$.trim(checkCode)){
						X.dialog.alert("请填写验证码",1,{notify:function(){$("#checkCode").focus();}});
						return false;
					}
					X.form.disableBtn("sure");
					X.ajax(ctx.user+"/security.htm",{action:"checkResetWithdrawPwdCode",checkCode:checkCode},function(data){
						data = $.parseJSON(data);
						if(data.success){
							d.close();
							t.setWithdrawPw(true);
						}else{
							X.form.enableBtn("sure");
							X.dialog.alert(data.resultMsg,3,{notify:function(){$("#checkCode").focus();}});
						}
					});
					return;
				}
			}});
			X.ajax(ctx.user+"/security.htm",{action:isMobile?"maskBindMobile":"maskBindEmail"},function(data){
				data=$.parseJSON(data);
				if(data.success){
					$("#_contact").text(isMobile?data.maskMobile:data.maskEmail);
				}
			});
			
			$("#withdrawPwGetCode").click();
		},
		/**
		 * 身份认证回调
		 */
		parseNameAuthen:function(data){
			X.form.timeoutBtnBreak("sure");
			X.form.enableBtn("sure");
			if(data.success){
				X.dialog.alert("您的实名认证请求已经提交成功，我们会尽快为您处理",4,{notify:function(){window.location.reload();}});
			}else{
				X.dialog.alert(data.resultMsg,3);
			}
		}
}
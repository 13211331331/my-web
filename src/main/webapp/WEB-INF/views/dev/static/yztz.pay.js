X.pay={
		withdrawRecordPageJump:function(page){
			if('0'==page&&$("#withdrawRecord").data("loaded")){
				return;
			}
			$.post(ctx.pay+'/withdraw.htm',{action:'withdrawRecord',page:page,pageSize:10},function(data){
				var text = new Text();
				text._(data);
				text.toHtml("withdrawRecord");
				$("#withdrawRecord").data("loaded",true);
			},'text');
		},
		loadSubBank:function(bankName,province,city,element){
			$.post(ctx.pay+"/bankCard.htm",
					{action:'subBank',bankName:bankName,province:province,city:city},
					function(data){
						var node = $("#"+element).children().remove();
						if(data&&$.isArray(data.banks)&&data.banks.length>0){
							var text = new Text();
							for(var i=0;i<data.banks.length;i++){
								var sub = $.trim(data.banks[i]);
								if('浦发银行'==bankName){
									sub = $.replace(sub,'上海浦发发展银行股份有限公司','');
									sub = $.replace(sub,'上海浦东发展银行股份有限公司','');
									sub = $.replace(sub,'上海浦东发展银行','');
									sub = $.replace(sub,'上海浦发发展银行','');
									
								}else{
									sub = $.replace(sub,"中国"+bankName+"银行有限责任公司",'');
									sub = $.replace(sub,bankName+"银行有限责任公司",'');
									sub = $.replace(sub,"中国"+bankName+"股份有限公司",'');
									sub = $.replace(sub,bankName+"股份有限公司",'');
									sub = $.replace(sub,"中国"+bankName+'银行','');
									sub = $.replace(sub,"中国"+bankName,'');
									sub = $.replace(sub,bankName+'银行','');
									sub = $.replace(sub,bankName,'');
								}
								text._('<option value="')._(sub)._('">')._(sub)._('</option>');
							}
							text._("<option value='其他支行'>其他支行</option>");
							$("#"+element).html(text.ts());
						}else{
							var text = new Text();
							text._("<option value='其他支行'>其他支行</option>");
							$("#"+element).html(text.ts());
						}
					},
					'json');
		},
		/**
		 * 绑定银行卡
		 */
		bindBankCard:function(card){
			if(!$.isEmptyObject(card)){
				if(''==$.trim(card.bankCard)){
					X.dialog.alert("银行卡号不能为空",1);
					return false;
				}
				if(''==$.trim(card.reBankCard)){
					X.dialog.alert("确认卡号不能为空",1);
					return false;
				}
				if(card.bankCard!=card.reBankCard){
					X.dialog.alert("确认卡号与银行卡号不一致",1);
					return false;
				}
				
				if(!X.valid.isBankCard(card.bankCard)){
					X.dialog.alert("银行卡号格式错误",1);
					return false;
				}
				
				card.action="bindCard";
				X.form.disableBtn("cardBtn");
				X.ajax(ctx.pay+"/bankCard.htm",card,function(data){
					X.form.enableBtn("cardBtn");
					data = $.parseJSON(data);
					if(data.success){
						X.dialog.alert("银行卡绑定成功",4,{notify:function(){window.location.href=ctx.pay+"/withdraw.htm?tab=bankCardTab";}})
					}else{
						X.dialog.alert(data.resultMsg,3);
					}
				});
			}else{
				X.dualog.alert("绑定数据不能为空",1);
			}
		},
		withdraw:function(cardId,money,password){
			if(money==''){
				X.dialog.alert("请输入提款金额",1,{notify:function(){$("#money").focus();}});
				return false;
			}
			if(!X.valid.isMoney(money)){
				X.dialog.alert("提款金额填写错误",1,{notify:function(){$("#money").focus();}});
				return false;
			}
			if(X.user.account.balance<parseFloat(money)){
				X.dialog.alert("提款金额必须小于等于帐户余额",1,{notify:function(){$("#money").focus();}});
				return false;
			}
			if(parseFloat(money)<10){
				X.dialog.alert("提款金额最小10元",1,{notify:function(){$("#money").focus();}});
				return false;
			}
			if(!cardId||''==$.trim(cardId)){
				X.dialog.alert("请选择提款银行卡",1,{notify:function(){$("#cardId").focus();}});
				return false;
			}
			if(''==$.trim(password)){
				X.dialog.alert('请输入提款密码',1,{notify:function(){$("#password").focus();}});
				return false;
			}
			
			X.dialog.confirm('您确定要申请提款吗',2,{notify:function(nt){
				if(nt==1){
					X.form.disableBtn("withdrawBtn");
					X.ajax(ctx.pay+"/withdraw.htm",
							{action:'withdraw',cardId:cardId,money:money,password:password},
							function(data){
								X.form.enableBtn("withdrawBtn");
								data = $.parseJSON(data);
								if(data.success){
									X.dialog.alert("提款申请成功",4,{notify:function(){
										window.location.href=ctx.pay+"/withdraw.htm?tab=recordTab";
									}});
								}else{
									X.dialog.alert(data.resultMsg,3);
								}
							});
				}
			}});
			
		},
		cancelWithdraw:function(id,callback){
			X.dialog.confirm('您确定要申请提款吗',2,{notify:function(nt){
				if(nt==1){
					X.ajax(ctx.pay+"/withdraw.htm",{action:"cancelWithdraw",id:id},
							function(data){
								data = $.parseJSON(data);
								if(data.success){
									X.dialog.alert("提款取消成功",4,{notify:function(){
										if(callback){
											callback();
										}
									}});
								}else{
									X.dialog.alert(data.resultMsg,3);
								}
							});
				}
			}});
		},
		setDefaultCard:function(cardId){
			X.ajax(ctx.pay+"/bankCard.htm",{action:'setDefaultCard',cardId:cardId},function(data){
				data = $.parseJSON(data);
				if(data.success){
					X.dialog.alert("默认银行卡设置成功",4,{notify:function(){
						window.location.href=window.location.href=ctx.pay+"/withdraw.htm?tab=bankCardTab";
					}});
				}else{
					X.dialog.alert(data.resultMsg,3);
				}
			});
		},
		deleteCard:function(cardId){
			X.dialog.confirm('您确定要删除该银行卡吗',2,{notify:function(nt){
				if(nt==1){
					X.ajax(ctx.pay+"/bankCard.htm",{action:"deleteCard",cardId:cardId},function(data){
						data = $.parseJSON(data);
						if(data.success){
							X.dialog.alert("银行卡删除成功",4,{notify:function(){
								window.location.href=window.location.href=ctx.pay+"/withdraw.htm?tab=bankCardTab";
							}});
						}else{
							X.dialog.alert(data.resultMsg,3);
						}
					});
				}
			}});
		},
		showCharge:function(success,fail,ps){
			var oper = function(nt){
				if(nt==1){
					window.open(ctx.pay+"/charge.htm");
					X.dialog.close();
					X.dialog.confirm('充值是否成功',2,{btn:'充值成功',btn1:'充值失败',notify:function(t){
						if(t==1){
							X.user.loadBalance(function(ast){
								if(success)success(ast.balance);
							});
						}else if(t==0){
							if(fail)fail();
							return;
						}
						X.dialog.close();
					}});
				}else if(nt==0){
					return;
				}
			};
			X.dialog.confirm(ps&&$.trim(ps.title).length>0?$.trim(ps.title):'您的账户余额不足，请先充值',2,{btn:'立即充值',btn1:'暂不充值',notify:oper});	
			if(ps&&ps.direct){
				oper(1);
			}
		},
		showChargeResultConfirm:function(success,fail){
			X.dialog.confirm('充值是否成功',2,{btn:'充值成功',btn1:'充值失败',notify:function(t){
				if(t==1){
					X.user.loadBalance(function(ast){
						if(success)success(ast.balance);
					});
				}else if(t==0){
					if(fail)fail();
					return;
				}
				X.dialog.close();
			}});
		}
}
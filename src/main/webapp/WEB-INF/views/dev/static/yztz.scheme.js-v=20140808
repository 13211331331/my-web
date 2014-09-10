X.scheme={
		resolveToken:function(tokenName,callback){
			if(callback&&''!=$.trim(tokenName)){
				$.post(ctx.trade+"/tokenResolver.htm",
						{token:tokenName},function(data){
							if(data.token){
								callback(data.token);
							}
						},'json');
			}
		},
	/**
	 * 计算配资月利率以及预警平仓线
	 */
	getScheme:function(money,cycle){
		var interest = 190;
		if(money>=1000000){
			if(cycle>=3){
				interest = 160;
			}else if(cycle>=1){
				interest = 170;
			}
		}else if(money>=100000){
			if(cycle>=3){
				interest = 170;
			}else if(cycle>=1){
				interest = 180;
			}
		}else if(money>=1000){
			if(cycle>=3){
				interest = 180;
			}else if(cycle>=1){
				interest =190;
			}
		}
		return {interest:interest,openLine:Math.round(money*1.07),warningLine:Math.round(money*1.1)};
	},
	getEverWin:function(money,lever){
		if($.isInt(money)&&$.isInt(lever)){
			if(lever==5||lever==10||lever==15){
				if(lever==5){
					return {warning:money*106/100,open:money*104/100,principal:Math.floor(money/lever),fee:$.round(money/1000,4),interest:1};
				}else if(lever==10){
					return {warning:money*105/100,open:money*103/100,principal:Math.floor(money/lever),fee:$.round(money*1.5/1000,4),interest:1.5};
				}
				return {warning:money*104/100,open:money*102/100,principal:Math.floor(money/lever),fee:$.round(money*2/1000,4),interest:2};
			}
		}
		return {warning:0,open:0,principal:0,fee:0,interest:0};;
	},
	/**
	 * 检测方案发起的参数是否合法
	 * 
	 */
	initiateCheck : function(config){
		if($.isPlainObject(config)){
			//principal
			if($.trim(config.principal)==''){
				X.dialog.alert("请输入投资本金",1,{notify:function(){$("#principal").focus();}});
				return false;
			}else if(!X.valid.isInt(config.principal,true)){
				X.dialog.alert("投资本金填写错误，金额必须是整数",1,{notify:function(){$("#principal").focus();}});
				return false;
			}
			var principal = parseInt(config.principal,10);
			if(principal<schemeConfig.minMoney||principal>schemeConfig.maxMoney){
				X.dialog.alert("投资本金最少1千元，最多100万元",1,{notify:function(){$("#principal").focus();}});
				return false;
			}else if(principal-Math.round(principal)!=0||principal%1000!=0){
				X.dialog.alert("投资本金必须是1000的整数倍",1,{notify:function(){$("#principal").focus();}});
				return false;
			}
			
			//lever
			if($.trim(config.lever)==''){
				X.dialog.alert("请输入配资倍数",1);
				return false;
			}else if(!X.valid.isInt(config.lever,true)){
				X.dialog.alert("配资倍数必须是整数",1);
				return false;
			}
			var lever = parseInt(config.lever,10);
			if(lever<schemeConfig.minLever||lever>schemeConfig.maxLever){
				X.dialog.alert("配资倍数必须在"+schemeConfig.minLever+"-"+schemeConfig.maxLever+"倍",1);
				return false;
			}
			
			//cycle
			if($.trim(config.cycle)==''){
				X.dialog.alert("请选择借款期限",1);
				return false;
			}else if(!X.valid.isInt(config.cycle,true)){
				X.dialog.alert("借款期限必须是整数",1);
				return false;
			}
			var cycle = parseInt(config.cycle,10);
			if(cycle<1||cycle>schemeConfig.maxCycle){
				X.dialog.alert("借款期限必须在1-"+schemeConfig.maxCycle+"个月",1);
				return false;
			}
			
			if(config.intention){
				if(!$.isInt(config.intention)||config.intention<0){
					X.dialog.alert("意向金必须是非负整数",1);
					return false;
				}
				var intention = Math.round(principal*schemeConfig.intentionPercent/100);
			
				if(intention<schemeConfig.minIntention){
					intention = schemeConfig.minIntention;
				}else if(intention>schemeConfig.maxIntention){
					intention = schemeConfig.maxIntention;
				}
				if(Math.abs(config.intention-intention)>=0.01){
					X.dialog.alert("意向金必须为"+intention+"元",1);
					return false;
				}
			}
			if(!config.agree){
				X.dialog.alert("请先阅读并同意签署《借款协议》",1,{notify:function(){$("input[name='agree']").focus();}});
				return false;
			}
			return true;
		}
		X.dialog.alert("数据对象错误",3);
		return false;
	},
	/**
	 * 检查并发起方案
	 */
	checkAndInitiate:function(config){
		if(X.scheme.initiateCheck(config)&&X.user.checkAndShowLogin()){
			config.action="initiate";
			
			X.form.disableBtn("initBtn");
			X.ajax(ctx.trade+"/schemeInitiate.htm",config,function(data){
				data = $.parseJSON(data);
				if(data.success){
					window.location.href=ctx.trade+"/schemeInitiateComplete.htm?schemeId="+data.schemeId;
				}else{
					X.form.enableBtn("initBtn");
					if(X.code.unauthorized==data.code){
						X.user.clearUserCookie();
						X.user.checkAndShowLogin();
					}else if(X.code.nameUnsettled==data.code){
						X.uc.user.legalizeID(false,function(){initiate();});
					}else if(X.code.balanceShortage==data.code){
						X.pay.showCharge(function(balance){
							X.user.loadPageHeader();
							$("http://www.yztz.com/res/js/trade/.chooseBuyType .curr").click();
							showRebate();
						});
					}else if(X.code.rebate==data.code){
						X.user.loadBalance(function(){
							X.user.loadPageHeader();
							$("http://www.yztz.com/res/js/trade/.chooseBuyType .curr").click();
							showRebate();
						});
						X.dialog.alert(data.resultMsg,1);
					}else{
						X.dialog.alert(data.resultMsg,1);
					}
					if(data.token){
						$("input[name='token']").val(data.token);
					}
				}
			});
		}
	},
	everWinInitiateCheck:function(config){
		if($.trim(config.money)==''){
			X.dialog.alert("请输入实盘资金",1,{notify:function(){$("#tm").focus();}});
			return false;
		}
		if(!/^\d+$/.test(config.money)||parseInt(config.money,10)%1000!=0){
			X.dialog.alert("实盘资金必须是1000的整数倍",1,{notify:function(){$("#tm").focus();}});
			return false;
		}
		var money = parseInt(config.money,10);
		if(money<2000||money>200000){
			X.dialog.alert("实盘资金最少2千，最多20万",1,{notify:function(){$("#tm").focus();}});
			return false;
		}
		
		if($.trim(config.lever)==''){
			X.dialog.alert("请选择风险保证金",1);
			return false;
		}
		if(config.lever!='5'&&config.lever!='10'&&config.lever!='15'){
			X.dialog.alert("风险保证金错误",1);
			return false;
		}
		if(!config.agree){
			X.dialog.alert("请先阅读并同意签署《天天赢合作操盘协议》",1,{notify:function(){$("#agree").focus();}});
			return false;
		}
		return true;
	},
	checkAndInitiateEverWin:function(config){
		config.agree=true;
		config.action='initiate';
		
		X.form.disableBtn("initBtn");
		if(X.scheme.everWinInitiateCheck(config)){
			X.ajax(ctx.trade+"/everwin/initiate.htm",config,function(data){
				data = $.parseJSON(data);
				if(data.success){
					window.location.href=ctx.trade+"/everwin/complete.htm?schemeId="+data.schemeId;
				}else{
					X.form.enableBtn("initBtn");
					if(X.code.unauthorized==data.code){
						X.user.clearUserCookie();
						X.user.checkAndShowLogin();
					}else if(X.code.nameUnsettled==data.code){
						X.uc.user.legalizeID(false,function(){initiate();});
					}else if(X.code.balanceShortage==data.code){
						X.pay.showCharge(function(balance){
							X.user.loadPageHeader();
							showBalanceTip();
						});
					}else if(X.code.rebate==data.code){
						X.user.loadBalance(function(){
							X.user.loadPageHeader();
							showBalanceTip();
						});
						X.dialog.alert(data.resultMsg,1);
					}else if(X.code.schemeError==data.code){
						X.dialog.alert(data.resultMsg,1);
					}else{
						X.dialog.alert(data.resultMsg,1);
					}
					if(data.token){
						$("input[name='token']").val(data.token);
					}
				}
			});
		}
	},
	/**
	 * 体验方案
	 */
	startExperience:function(){
		X.form.disableBtn("experienceBtn");
		X.ajax(ctx.trade+"/initiateExperience.htm",{},function(data){
			data = $.parseJSON(data);
			X.form.enableBtn("experienceBtn");
			if(data.success){
				X.dialog.alert("免费体验参与成功",4,{notify:function(){
					window.location.href = ctx.trade+"/user/userEverwin.htm";
				}});
			}else{
				if(X.code.unauthorized==data.code){
					X.user.clearUserCookie();
					X.user.checkAndShowLogin(function(){X.scheme.startExperience();});
				}else if(X.code.nameUnsettled==data.code){
					X.uc.user.legalizeID(false,function(){X.scheme.startExperience();});
				}else if(X.code.balanceShortage==data.code){
					X.pay.showCharge(function(balance){
						X.user.loadPageHeader();
					});
				}else{
					X.dialog.alert(data.resultMsg,1);
				}
				if(data.token){
					$("input[name='token']").val(data.token);
				}
			}
		});
	},
	startMatch:function(match){
		X.form.disableBtn($("div[name=n"+match+"] input[type='button']"));
		X.ajax(ctx.trade+"/match.htm",{action:"apply",match:match},function(data){
			X.form.enableBtn($("div[name=n"+match+"] input[type='button']"));
			data = $.parseJSON(data);
			if(data.success){
				X.dialog.alert("您已成功参与了全民实盘炒股大赛",4,{notify:function(){
					X.form.disableBtn($("div[name=n"+match+"] input[type='button']"),{dtext:"已参与"});
					//window.location.href = ctx.trade+"/user/userScheme.htm";
				}});
			}else{
				if(X.code.unauthorized==data.code){
					X.user.clearUserCookie();
					X.user.checkAndShowLogin();
				}else if(X.code.nameUnsettled==data.code){
					X.uc.user.legalizeID(false,function(){X.scheme.startMatch(match);});
				}else if(X.code.balanceShortage==data.code){
					X.pay.showCharge(function(balance){
						X.user.loadPageHeader();
						X.scheme.startMatch(match);
					});
				}else{
					X.dialog.alert(data.resultMsg,1);
				}
			}
			if(data.token){
				$("input[name='token']").val(data.token);
			}
		});
	},
	checkMatchJoined:function(match,callback){
		X.ajax(ctx.trade+"/match.htm",{action:"getMatchJoined",match:match},function(data){
			data = $.parseJSON(data);
			if(data.joined){
				X.form.disableBtn($("div[name=n"+match+"] input"),{dtext:"已参加"});
			}
			if(callback){
				callback(data.joined);
			}
		});
	},
	/**
	 * 修改发起方案
	 */
	modifyInitiate:function(data){
		var param = "";
		for(key in data){
			param += key+'='+encodeURI(encodeURI(data[key]))+'&';
		}
		window.location.href = ctx.trade+"/?"+param;
	},
	modifyEverWinInitiate:function(data){
		var param = "";
		for(key in data){
			param += key+'='+encodeURI(encodeURI(data[key]))+'&';
		}
		window.location.href = ctx.trade+"/everwin/?"+param;
	},
	/**
	 * 方案详情页面不良记录跳转
	 */
	detailBadRecordPageJump:function(userId,page){
		X.ajax(ctx.trade+"/scheme/schemeDetailBadRecord.htm",{page:page,userId:userId,pageSize:5},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("badRecordContent");
		});
	},
	/**
	 * 投标记录页面跳转
	 */
	detailBidsPageJump:function(schemeId,page){
		X.ajax(ctx.trade+"/scheme/schemeDetailBid.htm",{page:page,status:bidConfig.statusBidding+","+bidConfig.statusBidWon,schemeId:schemeId,pageSize:10},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("bidsContent");
			$("#_bidMoney").text($.v("bidMoney"));
			$("#bidsContent").data("page",page);
			$("#bidsContent").data("schemeId",schemeId);
		});
	},
	detailBidsPageReload:function(){
		X.scheme.detailBidsPageJump($("#bidsContent").data("schemeId"),$("#bidsContent").data("page"));
	},
	detailLoansPageJump:function(schemeId,page){
		X.ajax(ctx.trade+"/scheme/schemeDetailBid.htm",{action:"loans",page:page,
									status:bidConfig.statusBidWon+","+bidConfig.statusTransfer+","+bidConfig.statusTransferRenewal,
									schemeId:schemeId,
									pageSize:10},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("loansContent");
			$("#_money").text($.v("money"));
			$("#loansContent").data("page",page);
			$("#loansContent").data("schemeId",schemeId);
		});
	},
	detailLoansPageReload:function(){
		X.scheme.detailLoansPageJump($("#loansContent").data("schemeId"),$("#loansContent").data("page"));
	},
	detailInterestsPageJump:function(schemeId,page,status){
		if('0'==page&&$("#interestsContent").data("loaded")){
			return true;
		}
		X.ajax(ctx.trade+"/scheme/schemeDetailInterest.htm",{page:page,schemeId:schemeId,pageSize:10,status:(status?status:'')},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("interestsContent");
			$("#interestsContent").data("loaded",true);
		});
	},
	everwinInterestsPageJump:function(schemeId,page,status){
		if('0'==page&&$("#interestsContent").data("loaded")){
			return true;
		}
		X.ajax(ctx.trade+"/scheme/everwinDetailInterest.htm",{page:page,schemeId:schemeId,pageSize:10,status:(status?status:'')},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("interestsContent");
			$("#interestsContent").data("loaded",true);
		});
	},
	/**
	 * 债权转让页面跳转
	 */
	detailTransfersPageJump:function(schemeId,page){
		if('0'==page&&$("#transfersContent").data("loaded")){
			return true;
		}
		X.ajax(ctx.trade+"/scheme/schemeDetailTransfer.htm",{page:page,schemeId:schemeId,pageSize:10},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("transfersContent");
			$("#transfersContent").data("loaded",true);
		});
	},
	/**
	 * 方案资金明细页面跳转
	 */
	schemeFundRecordPageJump:function(schemeId,page){
		if('0'==page&&$("#fundRecordsContent").data("loaded")){
			return true;
		}
		X.ajax(ctx.trade+"/scheme/fundRecord.htm",{action:"schemeFundRecord",page:page,schemeId:schemeId},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("fundRecordsContent");
			$("#fundRecordsContent").data("loaded",true);
		});
	},
	/**
	 * 方案资金明细页面跳转
	 */
	everwinFundRecordPageJump:function(schemeId,page){
		if('0'==page&&$("#fundRecordsContent").data("loaded")){
			return true;
		}
		X.ajax(ctx.trade+"/scheme/fundRecord.htm",{action:"everwinFundRecord",page:page,schemeId:schemeId},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("fundRecordsContent");
			$("#fundRecordsContent").data("loaded",true);
		});
	},
	/**
	 * 续约跳转
	 */
	detailRenewalsPageJump:function(schemeId,page){
		if('0'==page&&$("#renewalsContent").data("loaded")){
			return true;
		}
		X.ajax(ctx.trade+"/scheme/schemeDetailRenewal.htm",{page:page,schemeId:schemeId,pageSize:10},function(data){
			var txt = new Text();
			txt._(data);
			txt.toHtml("renewalsContent");
			$("#renewalsContent").data("loaded",true);
		});
	}
	,
	//修改方案
	updScheme:function(){
		var t=this,d=X.dialog,f=X.form,s=new Text();
		//投标方案信息
		s._('<div class="db-con-1">');
		s._('<div class="ui-sub-form"><label class="ui-label">投资本金</label><em class="h">')._($.formatMoney(modifyContext.principal))._('</em><em class="unit">元</em></div>');
		s._('<div class="ui-sub-form"><label class="ui-label">配资倍数</label><em class="h">')._(modifyContext.lever)._('</em><em class="unit">倍</em></div>');
		s._('<div class="ui-sub-form"><label class="ui-label">借款金额</label><em class="h">')._($.formatMoney(modifyContext.money))._('</em><em class="unit">元</em></div>');
		s._('<div class="ui-sub-form"><label class="ui-label">借款期限</label><em class="h">')._(modifyContext.cycle)._('</em><em class="unit">个月</em></div>');
		s._('<div class="ui-sub-form"><label class="ui-label">借款月利息</label>');
		var tx1=modifyContext.interest;
		t.addSelect(s,{css:'sel-b w100',id:"_interest"},tx1,modifyContext.interestSelect);
		s._('</div>');
		s._('<div class="ui-sub-form"><label class="ui-label">筹款期限</label>');
		var tx2=[['1天',1],['2天',2],['3天',3],['4天',4],['5天',5],['6天',6],['7天',7]];
		t.addSelect(s,{css:'sel-b w100',id:"_timeLimit"},tx2,modifyContext.timeLimitSelect);	
		s._('</div>');
		s._('<div class="ui-sub-form"><label class="ui-label">借款说明</label><textarea id="_explain" style="width:290px;height:100px;color:#999999;">')._(modifyContext.explain)._('</textarea></div>');
		s._('<div class="ui-sub-form" style=" padding-top:10px; padding-bottom:10px;">');
		d.addButton(s,{id:'btn-sure',name:'确定修改',css:'btn btn-l',click:'X.dialog.notify(#di#,1);'});
		d.addButton(s,{id:'btn-cel',name:'取消修改',css:'btn btn-l-grey ml20',click:'X.dialog.close(#di#,0);'});
		s._('</div>');
		s._('</div>');
		
		d.open(s.ts(),{topic:'修改方案',width:550,notify:function(nt){
			if(nt==0)return;
			var explain = $.v("_explain");
			if(explain.length>100){
				X.dialog.alert("借款说明字数不能超过100个字",1,{notify:function(){$("#_explain").focus();}});
				return;
			}
			X.form.disableBtn("btn-sure");
			//提交修改方案信息
			X.ajax(ctx.trade+"/schemeOper.htm",{action:"updateScheme",schemeId:modifyContext.schemeId,interest:$.v("_interest"),timeLimit:$.v("_timeLimit"),explain:explain},
					function(data){
				data = $.parseJSON(data);
				if(data.success){
					d.close();
					X.dialog.alert("方案修改成功",4,{notify:function(){
						window.location.reload();
					}});
				}else{
					X.form.enableBtn("btn-sure");
					X.dialog.alert(data.resultMsg,3);
				}
			});
		}});
		f.inputR("_explain","给理财人看的，可不填写");
	},
	//删除方案
	cancelScheme:function(){
		var t=this,d=X.dialog,s=new Text();
		d.confirm('您确定要撤销方案吗',2,{notify:function(nt){
			if(nt==1){
				X.form.disableBtn("cancelBtn");
				X.ajax(ctx.trade+"/schemeOper.htm",{action:"cancelScheme",schemeId:modifyContext.schemeId},function(data){
					X.form.enableBtn("cancelBtn");
					data = $.parseJSON(data);
					if(data.success){
						X.dialog.alert("方案撤消成功",4,{notify:function(){window.location.reload();}});
					}else{
						X.dialog.alert(data.resultMsg,3);
					}
				});
			}
		}});
	},
	//续约
	renewal:function(schemeId,interest){
		var t=this,d=X.dialog,s=new Text();
		var text=new Text();
		text._('<div style=" line-height:150%;">申请续约后，我们会进行审核，不保证续约一定成功</div>');
		d.addTips(s,{icon:4,info:text.ts()});
		s._('<div class="db-con" style="padding-top:20px;">');
		s._('<div class="ui-sub-form"><label class="ui-label">续约时间</label>');
		var tx2=[['1个月',1]];
		t.addSelect(s,{css:'sel-b w100',id:'renewalCycle'},tx2,2);	
		s._('</div>');
		s._('<div class="ui-sub-form" style="padding-bottom:10px;">');
		d.addButton(s,{id:'renewalSure',name:'确定续约',css:'btn btn-l',click:'X.dialog.notify(#di#,1);'});
		d.addButton(s,{id:'btn-cel',name:'取消续约',css:'btn btn-l-grey ml20',click:'X.dialog.close(#di#,0);'});
		s._('</div>');
		d.open(s.ts(),{topic:'我要续约',width:500,notify:function(nt){
			if(nt==0)return;
			X.form.disableBtn("renewalSure");
			X.ajax(ctx.trade+"/renewal.htm",
					{action:"applyRenewal",schemeId:schemeId,cycle:$.v("renewalCycle")},
					function(data){
						data = $.parseJSON(data);
						X.form.enableBtn("renewalSure");
						if(data.success){
							d.close();
							X.dialog.alert("续约申请成功，我们会尽快为您处理",4,{notify:function(){window.location.reload();}});
						}else if(X.code.balanceShortage==data.code){
							X.pay.showCharge(function(balance){
								X.user.loadPageHeader();
							},$.noop,{title:'账户余额不足够支付利息'+interest+'元，请先充值'});
						}else{
							X.dialog.alert(data.resultMsg,1);
						}
					});
		}});
	},
	//提取利润
	profitWithdraw:function(schemeId){
		var t=this,d=X.dialog,s=new Text(),text=new Text();
		text._('<div style=" line-height:150%;">提取您投资账户已盈利的资金，并且确保这些资金在投资账户里处于可转账状态。</div>');
		d.addTips(s,{icon:4,info:text.ts()});
		s._('<div class="db-con-1">');
		s._('<div class="ui-sub-form" style="padding-top:20px;"><label class="ui-label">提取金额</label><input type="text" id="withdrawMoney" class="ui-input" style="width:215px"/> <em class="unit">元</em></div>');
		s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;">');
		d.addButton(s,{id:'sure',name:'确定提取',css:'btn btn-l',click:'X.dialog.notify(#di#,1);'});
		d.addButton(s,{id:'btn-cel',name:'取消提取',css:'btn btn-l-grey ml10',click:'X.dialog.close(#di#,0);'});
		s._('</div>');
		s._('</div>');
		
		d.open(s.ts(),{topic:'提取利润',width:550,notify:function(nt){
			if(nt==0)return;
			var moneyStr = $.trim($.v("withdrawMoney"));
			if(moneyStr==''){
				X.dialog.alert("请填写提取金额",1,{notify:function(){$("#withdrawMoney").focus();}});
				return;
			}
			if(!/^\d{1,}$/.test(moneyStr)){
				X.dialog.alert("提取金额填写错误，金额必须是整数",1,{notify:function(){$("#withdrawMoney").focus();}});
				return;
			}
			var money = parseInt(moneyStr,10);
			if(money<schemeConfig.minWithdrawProfit){
				X.dialog.alert("利润提取金额最小为"+schemeConfig.minWithdrawProfit+"元",1,{notify:function(){$("#withdrawMoney").focus();}});
				return;
			}
			X.form.disableBtn("sure");
			X.ajax(ctx.trade+"/schemeOper.htm",{action:"profitWithdraw",schemeId:schemeId,money:money},function(data){
				data = $.parseJSON(data);
				if(data.success){
					d.close();
					X.dialog.alert("利润提取申请成功",4,{notify:function(){window.location.reload();}});
				}else{
					X.form.enableBtn("sure");
					X.dialog.alert(data.resultMsg,3);
				}
			});
		}});
	},
	//取消提取利润
	celProfitWithdraw:function(id){
		var t=this,d=X.dialog;
		d.confirm('您确定要取消提取利润吗',2,{notify:function(nt){
			if(nt==1){
				X.ajax(ctx.trade+"/schemeOper.htm",{action:"cancelProfitWithdraw",id:id},function(data){
					data = $.parseJSON(data);
					if(data.success){
						X.dialog.alert("利润提取取消成功",4,{notify:function(){window.location.reload();}});
					}else{
						X.dialog.alert(data.resultMsg,3);
					}
				});
			}
		}});
	},//保证金追加
	appendPrincipal:function(schemeId,minMoney){
		var t=this,d=X.dialog,s=new Text(),text=new Text();
		text._('<div style=" line-height:150%;">每次追加保证金不能小于当前方案总操盘资金的1%，且每天最多追加5次(包括取消次数)。</div>');
		d.addTips(s,{icon:4,info:text.ts()});
		s._('<div class="db-con-1">');
		s._('<div class="ui-sub-form" style="padding-top:20px;"><label class="ui-label">追加金额</label><input type="text" id="addMoney" class="ui-input" style="width:215px"/> <em class="unit">元</em>　<em class="tip">最少'+minMoney+'元</em></div>');
		s._('<div class="ui-sub-form" style="padding-top:10px; padding-bottom:10px;">');
		d.addButton(s,{id:'appendBtn',name:'确定追加',css:'btn btn-l',click:'X.dialog.notify(#di#,1);'});
		d.addButton(s,{id:'btn-cel',name:'取消追加',css:'btn btn-l-grey ml10',click:'X.dialog.close(#di#,0);'});
		s._('</div>');
		s._('</div>');
		
		d.open(s.ts(),{topic:'追加保证金',width:550,notify:function(nt){
			if(nt==0)return;
			var moneyStr = $.trim($.v("addMoney"));
			if(moneyStr==''){
				X.dialog.alert("请填写追加金额",1,{notify:function(){$("#addMoney").focus();}});
				return;
			}
			if(!/^\d{1,}$/.test(moneyStr)){
				X.dialog.alert("追加金额填写错误，金额必须是整数",1,{notify:function(){$("#addMoney").focus();}});
				return;
			}
			var money = parseInt(moneyStr,10);
			if(money<minMoney){
				X.dialog.alert("追加的保证金金额不能小于"+minMoney+"元",1,{notify:function(){$("#addMoney").focus();}});
				return;
			}
			X.form.disableBtn("appendBtn");
			X.ajax(ctx.trade+"/schemeOper.htm",{action:"principalAppend",schemeId:schemeId,money:money},function(data){
				X.form.enableBtn("appendBtn");
				data = $.parseJSON(data);
				if(data.success){
					d.close();
					X.dialog.alert("保证金追加申请成功",4,{notify:function(){window.location.reload();}});
				}else if(X.code.balanceShortage==data.code){
					X.pay.showCharge(function(balance){
						X.user.loadPageHeader();
					});
				}else{
					X.dialog.alert(data.resultMsg,1);
				}
			});
		}});
	},
	//取消保证金追加
	celPrincipalAppend:function(id){
		var t=this,d=X.dialog;
		d.confirm('您确定要取消保证金追加吗',2,{notify:function(nt){
			if(nt==1){
				X.ajax(ctx.trade+"/schemeOper.htm",{action:"principalAppendCancel",id:id},function(data){
					data = $.parseJSON(data);
					if(data.success){
						X.dialog.alert("保证金追加取消成功",4,{notify:function(){window.location.reload();}});
					}else{
						X.dialog.alert(data.resultMsg,3);
					}
				});
			}
		}});
	},finishScheme:function(id){
		var t=this,d=X.dialog,s=new Text();
		d.confirm('<div>您确定要申请完结方案吗</div><br/><div class="red">请确保您的交易账户股票已经全部卖出，否则我们将有权把您的股票进行平仓处理（不保证平仓价格）</div>',2,{width:500,notify:function(nt){
			if(nt==1){
				X.ajax(ctx.trade+"/schemeOper.htm",{action:"everWinFinish",schemeId:id},function(data){
					data = $.parseJSON(data);
					if(data.success){
						X.dialog.alert("方案完结申请成功",4,{notify:function(){window.location.reload();}});
					}else{
						X.dialog.alert(data.resultMsg,1);
					}
				});
			}
		}});
	},
	//ps:id name style css,d:key value
	addSelect:function(s,ps,d,seld){
		s._('<select');
		if(ps.id)
			s._(' id="')._(ps.id)._('"');
		if(ps.name)
			s._(' name="')._(ps.name)._('"');
		if(ps.style)
			s._(' style="')._(ps.style)._('"');
		if(ps.css)
			s._(' class="')._(ps.css)._('">');
		for(i=0;i<d.length;i++){
			s._('<option ')._((i==seld?'selected':''))._(' value="')._(d[i][1])._('">')._(d[i][0])._('</option>');
		}
		s._('</select>');
	}
}
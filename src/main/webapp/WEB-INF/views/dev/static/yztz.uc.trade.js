X.uc.trade={
		schemeIngPageJump:function(page,orderBy){
			if('0'==page&&$("#schemeIng").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#schemeIng input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userScheme.htm',{action:'ing',page:page,pageSize:10,orderBy:orderBy?orderBy:"","__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#schemeIng").html(data);
				$("#schemeIng").data("loaded",true);
			},'text');
		},
		schemeCompletePageJump:function(page,orderBy){
			if('0'==page&&$("#schemeComplete").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#schemeComplete input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userScheme.htm',{action:'complete',page:page,pageSize:10,orderBy:orderBy?orderBy:"","__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#schemeComplete").html(data);
				$("#schemeComplete").data("loaded",true);
			},'text');
		},
		schemeMisbirthPageJump:function(page){
			if('0'==page&&$("#schemeMisbirth").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#schemeMisbirth input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userScheme.htm',{action:'misbirth',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#schemeMisbirth").html(data);
				$("#schemeMisbirth").data("loaded",true);
			},'text');
		},
		everwinIngPageJump:function(page){
			if('0'==page&&$("#everwinIng").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#everwinIng input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userEverwin.htm',{action:'ing',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#everwinIng").html(data);
				$("#everwinIng").data("loaded",true);
			},'text');
		},
		everwinCompletePageJump:function(page){
			if('0'==page&&$("#everwinComplete").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#everwinComplete input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userEverwin.htm',{action:'complete',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#everwinComplete").html(data);
				$("#everwinComplete").data("loaded",true);
			},'text');
		},
		everwinMisbirthPageJump:function(page){
			if('0'==page&&$("#everwinMisbirth").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#everwinMisbirth input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userEverwin.htm',{action:'misbirth',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#everwinMisbirth").html(data);
				$("#everwinMisbirth").data("loaded",true);
			},'text');
		},
		bidLoanPageJump:function(page,orderBy){
			if('0'==page&&$("#bidLoan").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#bidLoan input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userBid.htm',{action:"loan",page:page,pageSize:10,orderBy:orderBy?orderBy:'interestNetTime',"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#bidLoan").html(data);
				$("#bidLoan").data("loaded",true);
			},'text');
		},
		bidBiddingPageJump:function(page){
			if('0'==page&&$("#bidBidding").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#bidBidding input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userBid.htm',{action:"bidding",page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#bidBidding").html(data);
				$("#bidBidding").data("loaded",true);
			},'text');
		},
		bidCompletePageJump:function(page,orderBy){
			if('0'==page&&$("#bidComplete").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#bidComplete input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userBid.htm',{action:"complete",orderBy:orderBy?orderBy:"bidTime",page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#bidComplete").html(data);
				$("#bidComplete").data("loaded",true);
			},'text');
		},
		bidMissPageJump:function(page){
			if('0'==page&&$("#bidMiss").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#bidMiss input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userBid.htm',{action:"miss",page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#bidMiss").html(data);
				$("#bidMiss").data("loaded",true);
			},'text');
		},
		transferIngPageJump:function(page){
			if('0'==page&&$("#transferIng").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#transferIng input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userTransfer.htm',{action:'ing',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#transferIng").html(data);
				$("#transferIng").data("loaded",true);
			},'text');
		},
		transferAblePageJump:function(page){
			if('0'==page&&$("#transferAble").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#transferAble input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userTransfer.htm',{action:'able',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#transferAble").html(data);
				$("#transferAble").data("loaded",true);
			},'text');
		},
		transferOutPageJump:function(page){
			if('0'==page&&$("#transferOut").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#transferOut input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userTransfer.htm',{action:'out',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#transferOut").html(data);
				$("#transferOut").data("loaded",true);
			},'text');
		},
		transferInPageJump:function(page){
			if('0'==page&&$("#transferIn").data("loaded")){
				return;
			}else if('-1'==page){
				page = $("#transferIn input[name='page']").val();
			}
			$.post(ctx.trade+'/user/userTransfer.htm',{action:'in',page:page,pageSize:10,"__af":"scriptRedirect",entrance:$.winPos()},function(data){
				$("#transferIn").html(data);
				$("#transferIn").data("loaded",true);
			},'text');
		},
		/**
		 * 检查并更新自动投标
		 */
		checkAndUpateAutoBid:function(param){
			
			if(param.bidMoneyMin==''){
				X.dialog.alert("请填写投标最小金额",1,{notify:function(){$("#bidMoneyMin").focus();}});
				return;
			}
			if(!X.valid.isInt(param.bidMoneyMin,true)){
				X.dialog.alert("投标最小金额必须大于等于1元",1);
				return false;
			}
			
			if(param.bidMoneyMax==''){
				X.dialog.alert("请填写投标最大金额",1,{notify:function(){$("#bidMoneyMax").focus();}});
				return;
			}
			
			if(!X.valid.isInt(param.bidMoneyMax,true)){
				X.dialog.alert("投标最大金额必须大于等于1元",1,{notify:function(){$("#bidMoneyMax").focus();}});
				return false;
			}
			
			var maxMoney = parseInt(param.bidMoneyMax,10);
			var minMoney = parseInt(param.bidMoneyMin,10);
			if(minMoney>maxMoney){
				X.dialog.alert("投标最大金额不能小于最小金额",1,{notify:function(){$("#bidMoneyMax").focus();}});
				return false;
			}
			
			var maxMode = maxMoney-maxMoney%100;
			if(maxMode<100){
				X.dialog.alert("投标金额将会是100的整数倍，您选择的范围无法投标",1);
				return false;
			}
			var minMode = minMoney%100==0?minMoney:(minMoney+(100-minMoney%100));
			if(minMode>maxMoney){
				X.dialog.alert("投标金额将会是100的整数倍，您选择的范围无法投标",1);
				return false;
			}
			
			if(param.remain==''){
				X.dialog.alert("请填写账户保留金额",1,{notify:function(){$("#remain").focus();}});
				return false;
			}
			if(!X.valid.isInt(param.remain)||parseInt(param.remain)<0){
				X.dialog.alert("账户保留金额必须是大于等于0的整数",1);
				return false;
			}
			
			if(!X.valid.isInt(param.minInterest,true)){
				X.dialog.alert("最小年化利率必须是大于0的整数",1);
				return false;
			}
			if(!X.valid.isInt(param.maxInterest,true)){
				X.dialog.alert("最大年化利率必须是大于0的整数",1);
				return false;
			}
			
			if(parseInt(param.minInterest,10)>parseInt(param.maxInterest,10)){
				X.dialog.alert("最小年化利率不能大于最大年化利率",1);
				return false;
			}
			
			
			if(!X.valid.isInt(param.minCycle,true)){
				X.dialog.alert("最小借款期限必须是大于0的整数",1);
				return false;
			}
			if(!X.valid.isInt(param.maxCycle,true)){
				X.dialog.alert("最大借款期限必须是大于0的整数",1);
				return false;
			}
			if(parseInt(param.minCycle,10)>parseInt(param.maxCycle,10)){
				X.dialog.alert("最小借款期限必须小于等于借款期限",1);
				return false;
			}
			if(!param.agree){
				X.dialog.alert("请先阅读并同意签署《借款协议》《债权转让协议》",1);
				return false;
			}
			
			X.form.disableBtn("save");
			X.ajax(ctx.trade+"/user/autoBidOper.htm",param,function(data){
				data = $.parseJSON(data);
				if(data.success){
					window.location.href=ctx.trade+"/user/autoBid.htm?action=info";
				}else{
					X.form.enableBtn("save");
					X.dialog.alert(data.resultMsg,1);
				}
			});
		},
		doAutoBidOn:function(){
			X.ajax(ctx.trade+"/user/autoBidOper.htm",
					{action:"updateValid",valid:"true"},
					function(data){
						data = $.parseJSON(data);
						if(data.success){
							X.dialog.alert("自动理财启用成功",4,{notify:function(){window.location.reload();}})
						}else{
							if(X.code.nameUnsettled==data.code){
								X.uc.user.legalizeID(false,function(){X.uc.trade.doAutoBidOn();});
							}else{
								X.dialog.alert(data.resultMsg,1);
							}
						}
					});
		},
		autoBidOn:function(){
			X.dialog.confirm('您确定要启用自动理财吗',2,{notify:function(nt){
				if(nt==1){
					X.uc.trade.doAutoBidOn();
				}
			}});
		},
		autoBidOff:function(){
			X.dialog.confirm('您确定要暂停自动理财吗',2,{notify:function(nt){
				if(nt==1){
					X.ajax(ctx.trade+"/user/autoBidOper.htm",
							{action:"updateValid",valid:"false"},
							function(data){
								data = $.parseJSON(data);
								if(data.success){
									X.dialog.alert("自动理财暂停成功",4,{notify:function(){window.location.reload();}})
								}else{
									X.dialog.alert(data.resultMsg,1);
								}
							});
				}
			}});
		},
		pzMustRead:function(){
			
			var t=this,d=X.dialog,f=X.form,s=new Text(),r='请输入手机号或邮箱',r1='请填写留言内容';
			
			s._('<table width="100%" class="mustread">');
			s._('<tr><td width="150" vlaign="middle" align="right">股票交易规则</td><td><div style="line-height:150%;">1、不得购买S、ST、*ST、S*ST、SST、以及被交易所特别处理的股票；<br>');
			s._('2、不得购买权证类可以T+0交易的证券；<br>');
			s._('3、不得购买首日上市新股（或复牌首日股票）等当日不设涨跌停板限制的股票；<br>');
			s._('4、借款金额100万或以上主板单只股票不得超过账户总资产的50%（100万以下不受限制）；<br>');
			s._('5、借款金额100万或以上创业板单只股票不得超过账户总资产的30%（100万以下不受限制）；<br>');
			s._('6、单只股票持仓总市值不得超过该股前5个交易日日均成交额的30%；<br>');
			s._('7、不得进行坐庄、对敲、接盘、大宗交易、内幕信息等违反股票交易法律法规及证券公司规定的交易；<br>');
			s._('违背以上任一协定，我们将有权以任何可以成交的价格完全卖出违反协定之类别股票。');
			s._('</div></td></tr>');
			s._('<tr><td vlaign="middle" align="right" rowspan="2">账户资金亏损警戒线</td><td>借款的110%，例如：20万本金+100万借款 = 100万借款*110% = 警戒线是110万</td></tr>');
			s._('<tr><td><div style="line-height:150%;">当账户总资产到警戒线以下时，只能平仓不能建仓，必须在次日上午10点前将本金补到警戒线之上，否则我们将有权把您的股票减仓到剩余本金的6倍。</div></td></tr>');
			s._('<tr><td vlaign="middle" align="right" rowspan="2">账户资金亏损平仓线</td><td>借款的107%，例如：20万本金+100万借款 = 100万借款*107% = 平仓线是107万</td></tr>');
			s._('<tr><td>当账户总资产到平仓线以下时，我们将有权把您的股票进行平仓处理。</td></tr>');
			s._('<tr><td vlaign="middle" align="right">借款到期处理</td><td><div style="line-height:150%;">借款到期前一个交易日，应将账户内总资产全部变现为货币资金（卖出全部股票），借款期满当日，我们将账户内资产进行清算。当然您也可以在快到期的最后7天内，通过申请续约来延长借款时间。</div></td></tr>');
			s._('</table>');
			s._('<div style="text-align:center;line-height:100%;padding-top:20px;;">以上内容来自借款协议，更多内容请阅读<a href="javascript:X.uc.trade.showBorrowContract()">《借款协议》</a></div>');
			s._('<div style="padding-top:30px; padding-bottom:10px; text-align:center;"><input id="btn" type="button" onclick="X.dialog.notify(#di#,1);" class="btn btn-l" dis-text="处理中..." value="确定"></div>');
			d.open(s.ts(),{topic:'配资交易前必读',width:870,notify:function(nt){
				if(nt!=1){return;}												 
				d.close();
			}});
		},
		showBorrowContract:function(){
			window.open('borrowContract.htm'/*tpa=http://www.yztz.com/trade/borrowContract.htm*/,'赢在投资借款协议','height=800,width=1000,top=0,left=200,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
		},
		showTransferContract:function(){
			window.open('transferContract.htm'/*tpa=http://www.yztz.com/trade/transferContract.htm*/,'赢在投资债权转让协议','height=800,width=1000,top=0,left=200,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no')
		},
		showEverWinContract:function(){
			window.open('everwinContract.htm'/*tpa=http://www.yztz.com/trade/everwinContract.htm*/,'天天赢合作操盘协议','height=800,width=1000,top=0,left=200,toolbar=no,menubar=no,scrollbars=yes, resizable=no,location=no, status=no');
		}
}
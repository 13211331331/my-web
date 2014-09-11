<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>CNTV.cn - ERROR</title>
    <style type="text/css">
    body {background:#d6d6d2;margin:0;padding:0;}
    div,h3,p {margin:0;padding:0;}
    .errbox {background:url(/static/back.jpg) left top no-repeat;width:980px;margin:0 auto;height:399px;position:relative;}
    .errbox .box {position:absolute;left:297px;top:102px;font-family:"微软雅黑","黑体";color:#504e4e;width:630px;}
    .errbox .box h3 {font-size:25px;height:42px;}
    .errbox .box p {font-size:17px;}
    .errbox a {position:absolute;left:442px;top:201px;width:97px;height:39px;display:inline-block;background:url(/static/img/btn.jpg) left top no-repeat;}
    </style>
</head>

<body>
<div class="errbox" id="errbox">
    <div class="box">
        <h3>对不起，可能是网络原因或无此页面，请稍后尝试。</h3>
        <p>本页面3秒之后将带您回到本站首页。</p>
    </div>
    <a href="http://www.cntv.cn/index.shtml"></a>
</div>
<script type="text/javascript">
    function loadHeight(){
        var bodyH=document.documentElement.clientHeight,
                bodyW=document.documentElement.clientWidth,
                box=document.getElementById("errbox"),
                boxW=box.offsetWidth,
                boxH=box.offsetHeight;
        if(bodyH<=boxH){
            box.style.marginTop="0px";
        }else{
            box.style.marginTop=(bodyH-boxH)/2+"px";
        }
        if(bodyW<=boxW){
            box.style.marginLeft="0px";
        }else{
            box.style.marginLeft=(bodyW-boxW)/2+"px";
        }


    }
    loadHeight();
    window.onload=window.onresize=loadHeight;
</script>
<script language="javascript">
    setTimeout("aaa()" ,5000);
    function aaa(){
        window.location="http://127.0.0.1:8080"
    }
</script>
</body>
</html>


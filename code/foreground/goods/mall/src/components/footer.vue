<template>
	<div id="footer">
   <!-- <div>
	  <span @click="select(0, $event)" :class="{'active': selectType===0}">0</span>
	  <span @click="select(1, $event)" :class="{'active': selectType===1}">1</span>
	  <span @click="select(2, $event)" :class="{'active': selectType===2}">2</span>
	</div> -->

	<div class="contain">
		<div class="links">
			<ul>
				<li>
					<h3>服务</h3>
					<p><a href="http://bbs.supersoco.com/forum.php?mod=viewthread&amp;tid=873&amp;extra=page%3D1" target="_blank">售后服务</a></p>
					<p><a href="http://bbs.supersoco.com/forum.php?mod=viewthread&amp;tid=873&amp;page=1#pid3426" target="_blank">配送政策</a></p>
					<p><a href="http://www.supersoco.com/second-phase/ch/speed_treasure.php">速珂宝</a></p>
				</li>
				<li>
					<h3>支持</h3>
					<p><a href="http://bbs.supersoco.com/forum.php?mod=viewthread&amp;tid=873&amp;page=1#pid3425" target="_blank">常见问题</a></p>
					<p><a href="http://www.supersoco.com/second-phase/ch/footer-instruction.php">产品用户手册</a></p>
				</li>
				<li>
					<h3>关于我们</h3>
					<p><a href="http://www.supersoco.com/second-phase/ch/footer-about-us.php">公司介绍</a></p>
					<p><a href="http://www.supersoco.com/second-phase/ch/footer-contact-us.php">联系方式</a></p>
					<p><a href="http://www.supersoco.com/second-phase/ch/footer-join-us.php">加入我们</a></p>
				</li>
				<li class="share footer-backe">
					<h3>关注我们</h3>
					<p class="facebookec" @mouseenter="showWeChat" @mouseleave="hideWechat"><a href="javascript:;" class="facebook" :class="{'show':!wechat}"><img :src="wechatcode"></a><a href="javascript:void(0)"><img :src="wechat?wechat1:wechat2" class="wechat footer-backe">&nbsp;官方微信</a></p>
					<p @mouseenter="showSina" @mouseleave="hideSina"><a href="http://weibo.com/5698841008/profile?rightmod=1&amp;wvr=6&amp;mod=personnumber&amp;is_all=1" target="_blank"><img :src="sina?sina1:sina2" class="sina">&nbsp;官方微博</a></p>
				</li>
				<li>
					<h3>客服</h3>
					<p>400-021-2008<p></p>
					<p>周一至周日 8:30-17:30</p>
				</li>
			</ul>
			<div class="line"></div>
			<div class="clear"></div>
		</div>
		<div class="infos">
			<div class="info fl-l">
				<h1>Copyright@2013-2018 速珂智能科技（上海）有限公司</h1>
				<p>沪ICP备15055590号-1</p>
			</div>
			<a target="bank" style="font-size:12px;color:#666;padding-right:121px" class="fl-r" href="http://218.242.124.22:8081/businessCheck/verifKey.do?showType=extShow&amp;serial=9031000020170502145733000001749983-SAIC_SHOW_310000-20170815151357503630&amp;signData=MEQCICHvWKC0eCuDwY7lyLiZcKFJQnmDHD7nN6pgdirrYK9uAiBr1ogewtmNxD/tgbQKQBLX/WWrHsB8RbI2Wm1yhzGbfA=="><img class="fl-l" width="20" :src="licIcon">&nbsp;电子营业执照</a>
			<br><a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=31011802002594" style="font-size:12px;color:#666;padding-right:10px" class="fl-r">
			<img :src="netIcon" style="float:left;">&nbsp;沪公网安备 31011802002594号</a>
			<div class="select-language fl-r" style="display:none;">
				<div class="ch">
					<router-link :to="{}">
						<img class="fl-l" src="">
						&nbsp;中文
						<i></i>
					</router-link>
				</div>
				<div class="en" style=" display:none;">
					<router-link :to="{}">
						<img src="">
						<span>英文</span>
						<i></i>
					</router-link>
				</div>
			</div>
			<div class="clear"></div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
	var $data = {
		message:'hello world',
		a:'123',
		bSign:true,
		wechat:true,
		sina:true,
		wechatcode:require('../common/images/footer/wechat-code.jpg'),
		wechat1:require('../common/images/footer/wechat1.png'),
		wechat2:require('../common/images/footer/wechat2.png'),
		sina1:require('../common/images/footer/sina1.png'),
		sina2:require('../common/images/footer/sina2.png'),
		licIcon:require('../common/images/footer/lic_icon.png'),
		netIcon:require('../common/images/footer/net_icon.png')
	}
	var $this = {}
	export default{
		props:{
			mesages:String, 
		},
		data(){
			$this = this
			return $data
		},
		methods:{
			showWeChat:function(){
				this.wechat=false;
			},
			hideWechat:function(){
				this.wechat=true;
			},
			showSina:function(){
				this.sina=false;
			},
			hideSina:function(){
				this.sina=true;
			},
			toggle(){
				this.bSign = !this.bSign;
			}
		},
		computed:{
			reverseMessage:function(){
				return '123';
				
			}
		},
		created(){
			////console.log(this.a);
		}


	}
</script>
<style rel="stylesheet/css">
	/***THE FOOTER PART START***/
	span.active{
		color: red
	}
	#footer{
		width:100%;
		height:auto;
		background:#f2f2f2;
		padding:50px 0;
		min-width:1100px;
		
	}
	#footer .contain{
		padding:0 35px;
		position: relative;
	}
	#footer .links>ul{
		overflow: hidden;
	}
	#footer .links>ul>li{
		float:left;
		width:20%;
		text-align:left;
		line-height: 24px;
	}

	#footer .links>ul>li h3{
		font-size:12px;
		color:#333;
	}
	#footer .links>ul>li:last-child h1{
		font-size:18px;
		color:#555;
	}
	#footer .links>ul>li p{
		line-height: 20px;
	}
	#footer .links>ul>li p,#footer .links>ul>li p a{
		font-size:12px;
		color:#666;
	}
	#footer .links>ul>li p a{
		transition:all 0.3s;
		-o-transition:all 0.3s;
		-webkit-transition:all 0.3s;
		-moz-transition:all 0.3s;
		-ms-transition:all 0.3s;
	}
	#footer .links>ul>li p:hover a{
		color:#111;
	}
	#footer .links>ul>li.share .wechat{
		display: inline-block;
		width: 20px;
		height: 20px;
		float: left;
	}
	#footer .links>ul>li.share .sina{
		display: inline-block;
		width: 20px;
		height: 20px;
		float: left;
	}
	#footer .links>ul>li.share p:nth-of-type(1) a:hover span{
		background-position:left -17px;
	}
	#footer .links>ul>li.share p:nth-of-type(2) a:hover span{
		background-position:right -17px;
	}
	#footer .links .line{     /**footer line**/
		width:100%;
		height:1px;
		background:#e5e5e5;
		margin:30px 0;
	}
	#footer .infos{
		margin:10px 0 0 0;
	}
	#footer .infos .info h1{
		font-size:12px;
		color:#333;
	}
	#footer .infos .info p{
		font-size:10px;
		color:#999;
		line-height: 24px;
	}
	/***THE FOOTER PART END***/
/**
 * footer page
 * 
 * */

 .facebook{
 	width:100px;height:100px;position:absolute;left:740px;top:0px;
 	background-size:cover;
 	opacity:0;
 	transition:opacity ease 0.5s;
 	display: inline-block;
 }
 .facebook>img{
 	width: 100%;
 	height: 100%;
 }
 .facebook.show{
 	opacity:1;
 }
 .islogcoder{
 	position:relative;
 }
 .back-link{
 	width:100%;
 	position:absolute;
 	left:0;
 	height:0;
 	overflow: hidden;
 	transition:height ease 0.3s;
 	z-index: 999;
 }
 #header .nav span{
 	display:inline-block;
 }
 .back-link:hover{
 	height:100px;
 }
 #header .nav span.islogcoder>a:hover + .back-link{
 	height:100px;
 }
 .drpiv{
 	background-color: #1b1b1b ;
 	color: #fff;
 	position: absolute;
 	width:116px;
 	box-shadow: 0 2px 3px 0 #333;
 }

 .drpiv ul li{
 	border-top:1px solid #313131;
 	text-align: center;
 }
 .drpiv ul li a{
 	color:#9A9A9A; 
 	text-align:center;
 	line-height: 35px;
 	padding-left:0 !important;
 	padding-right:0 !important;
 }
 .triangle {
 	width:0; 
 	height:0; 
 	border-left:10px solid transparent;
 	border-right:10px solid transparent;
 	border-bottom:10px solid #1b1b1b;
 	position: relative;
 	left:48px;
 }
 .drpiv ul li:first-child{
 	border:none;
 }

</style>

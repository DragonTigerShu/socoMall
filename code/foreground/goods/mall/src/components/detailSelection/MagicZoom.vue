<template>
	<div class="magiczoom-wrap">
		<div class="tsShopContainer">
			<!--轮播图-->
			<div v-for="(item,index) in dataList" :key="index" v-show="index==currentIndex">
				<div class="showList">
					<video controls="controls" loop="loop"  poster="" id="videoPlay" autoplay  @click="videoPlay" v-if="item.is_video==1"  width="500" height="500">
						<source :src="common+item.video_url" type="video/mp4">
						</video>	 
						<img width="500" height="500" v-if="item.is_video==0" :src="common+item.img_url">
					</div>
				</div>
				<div class="tsPicContainer">
					<div class="tsImgSCon">
						<ul>
							<li rel="MagicZoom" class="tsSelectImg"  v-for="(item,index) in dataList" :key="index" :class="{'active':index==currentIndex}" @click="Onchange(index)">	 
								<video controls="controls"  v-if="item.is_video==1"> <!--判断是不是视频 1代表视频 0 代表图片-->
									<source :src="common+item.video_url" type="video/mp4">
									</video>	 
									<img :src="common+item.img_url" v-if="item.is_video==0"/>  
								</li>
							</ul>
						</div>
					</div>
					<div style="clear:both"></div>
				</div>
			</div>
		</template>
		<script>
			export default{
				data(){
					return {
						currentIndex:-1,
						timer:'',
						common:'',
						dataList:''
					}
				},
				props:{
					galleryData:{
				type:Array // 用户相册信息
			},
			baseHead:{
				type:String
			}
			
		},
		watch:{
			galleryData(c,v){
				this.init();
			}
		},
		created:function(){
			this.init();
		},
		mounted:function(){
		},
		methods:{
			init:function(){
				let that = this;
				that.currentIndex=-1;
				that.common=that.baseHead;
				that.dataList=that.galleryData;//
				this.autoPlay()  // 图片
			},
			autoPlay:function(){
				this.currentIndex ++  //轮播图自动切换 是的  这个是我和你之前做的 你记得不  
				if(this.currentIndex >this.dataList.length-1){
					this.currentIndex = 0
				}
			},
			Onchange:function(index){
				this.currentIndex = index
			},
			videoPlay:function(){
			  	var video = document.getElementById("videoPlay");  // 点击视频播放
			  	if(video.paused){
			  		video.play() 
			  		return true
			  	}else{
			  		video.pause();
			  		return false
			  	}
			  }
			}
		}
	</script>

	<style>
		
		/* tsShopContainer */
		.magiczoom-wrap{
			height: 650px;
		}
		.magiczoom-wrap .showList video{ background: black;}
		.tsShopContainer{width:100%;margin:40px auto 80px auto;position:relative;font-size:12px;padding-bottom:5px; min-height: 500px;}
		.tsShopContainer li{display: inline-block;width: 20%; float: left}
		.tsShopContainer img{vertical-align:top;cursor: pointer;}
		.tsShopContainer .tsImgS{text-align:center;width:100%;position:relative;}
		.tsShopContainer .tsImgS a{display:block;text-align:center;margin:0px auto;}
		.tsShopContainer .tsImgS img{border:0px;}
		.tsShopContainer .tsPicContainer .tsImgSCon{position: absolute;
			top:20px;left:0;width:500px;height:70px;position: relative;}
			.tsShopContainer .tsPicContainer .tsImgSCon ul{width:100%;overflow:hidden;height:84px;border-radius: 4px;}

			.tsShopContainer .tsPicContainer .tsImgSCon li img{padding:3px;margin:1px;display:block;width:80px;height:80px;}
			.tsShopContainer .tsPicContainer .tsImgSCon li video{padding:3px;margin:1px;display:block;width:80px;height:80px;}
			.tsShopContainer .tsPicContainer .tsImgSCon li.tsSelectImg img{}
			.tsShopContainer .tsPicContainer .tsImgSCon li.tsSelectImg.active{
				/* border: 1px solid #d7d7d7; */
				opacity: 0.7;
			}

			.list-enter-active {
				transition: all 0.5s ease;
				transform: translateX(0)
			}
			.list-leave-active {
				transition: all 0.5s ease;
				transform: translateX(-100%)
			}
			.list-enter {
				transform: translateX(100%)
			}

			.list-leave {
				transform: translateX(0)
			}
		</style>
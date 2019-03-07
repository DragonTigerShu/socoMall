<template>
	<div class="indo_dese_left">
		<img  :src="headImg" />
		<ul class="indo-ul">
			<li v-for="(item,index) in infos" :class="index===parseInt(info_left)&&index<3?'active':''" @click="event(index)"><router-link :to="{path:item.href}">{{item.title}}</router-link></li>
		</ul>
	</div>
</template>
<script>
	import axios from 'axios'
	var $this={};
	var $data={
		infos:[
		{
			value:0,
			title:'我的订单', 
			href:''
		},{
			value:1,
			title:'售后订单',
			href:''
		},{
			value:2,
			title:'收货地址',
			href:''
		},{
			value:3,
			title:'修改密码',
			href:''
		},{
			value:4,
			title:'退出登录',
			href:''
		}]
	};
	export default{
		data() {
			$this=this;
			return $data;
		},
		created:function(){
			
		},
		props:{
			info_left:{
				type:Number
			},
			headImg:String
		},
		watch: {
			
		},
		methods:{
			event:function(index){
				$this.$emit("infoLeftListen",index);
			}
		},
		components:{
			
		}
	}
</script>

<style lang="scss">
	.indo_dese_left{
		width: 240px;
		height: 400px;
		border-radius: 4px;
		background: #fff;
		display: inline-block;
		>img{
			border-radius: 4px;
			text-align: center;
			display: block;
			margin: 20px auto;
			box-shadow: 0px 0px 14px 0px #e5e3e3;
			width: 170px;
			height: 170px;
		}
		.indo-ul{
			padding: 20px 0;
			li{
				float: none;
				text-align: center;
				line-height: 30px;
				font-family: PingFangSC-Regular;
				font-size: 14px;
				color: #B1B5B8;
				cursor: pointer;
				&.active a{
					color: #C8161E;
				}
				
			}
			
		}
	}
	
</style>
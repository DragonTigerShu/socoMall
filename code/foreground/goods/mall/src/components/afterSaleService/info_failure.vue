<template>
	<div class="info_failure">
		<img :src="paysuccess">
		<h1>{{h}}</h1>
		<p>{{p}}</p>
		<button @click="clickListen">{{btn}}</button>
	</div>
</template>
<script>
	var $data={
		'paysuccess':require('../../common/images/aftersale/customservice.png'),
	}
	var $this={}
	export default{
		name: 'info_failure',
		props: {
			h:String,
			p:String,
			btn:String
		},
		data(){
			$this = this;
			return $data;
		},
		methods:{
			clickListen:function(){
				$this.$emit("clickListen");
			}
		}
	}
</script>
<style lang="scss">
	.info_failure{
		text-align:center;
		width:100%;
		background-color:white;
		img{
			margin-left: 35px;
			width:250px;
			height:250px;
		}
		h1{
			font-size: 20px;
			color: #444444;
			font-weight:bold;
		}
		p{
			margin-top:10px;
			font-size: 14px;
			color: #9DA2A6;
			width: 720px;
			margin: 0 auto;
		}
		button{
			width:260px;
			height:40px;
			border:0px solid white;
			outline:none;
			margin-top:30px;
			background: #C8161E;
			border-radius: 8px;
			color:white;
			font-size: 16px;
			cursor:pointer;
		}
	}
</style>
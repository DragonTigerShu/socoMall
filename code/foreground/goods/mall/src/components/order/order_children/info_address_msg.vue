<template>
	<div class="account w">
		<div class="address_message">
			<h3>收货地址</h3>
			<div>
				<addressList :reload="reload" :noSelect="true" @appListen="appListen"></addressList>
			</div>
		</div>    
	</div>
</template>
<script>
	import addressList from '@/components/shoppingCartService/addressList.vue'  
	import axios from 'axios'
	var $this={};
	var $data={
		address_msg:false,
		dialogSuccessHText:'',
		orderId_car:'', 
	infoIndex:1,  //头
	info_left:1,  //左侧信息
	addressData:[]
};
export default{
	name:"info_address_msg",
	components:{
		"addressList":addressList
	},
	props:{
		reload:{type:Boolean,default:false}
	},
	data() {
		$this=this;
		return $data;
	},
	watch:{
		reload(c,v){
			
		}
	},
	created:function(){

	},
	mounted:function(){
		this.infoIndex=1;
		this.orderId=1;
			this.$emit('initListen',3);//刷新后重置左侧位置
			// if(this.$route.params.topIndex){   //检测头部和左侧
				
		 //      $this.$emit('topIndex',this.$route.params.topIndex);
		 
			// }
			// if(this.$route.params.leftIndex!=null){  
				
			//     this.info_left=parseInt(this.$route.params.leftIndex)   //检测侧边栏
			// }
			// if(this.$route.params.deviceId){               //控制上面的颜色
			// 	$this.infoIndex = this.$route.params.deviceId
			// 	this.orderId=this.$route.params.deviceId;
			// }
		},
		methods:{
	   //判断状态数量信息
	   appListen:function($t,$i){
	   	$this.$emit("appListen",$t,$i);
	   }
	}
}
</script>

<style lang="scss">
	.account-info{
		background: #f4f4f4;
		position: relative;
		overflow: hidden;
	}
	.account{
		.info_title{
			background-color: #fff;
			height: 46px;
			line-height: 46px;
			border-radius: 4px;
			margin-bottom: 20px;
		}
		.info_left{
			flex: 1;
			margin-right: 10px;
		}
		.address_message{
			padding:45px 20px 45px 50px;
			width: 940px;
			min-height: 600px;
			background-color: #FFFFFF;
			border-radius: 4px;
			h3{
				font-size:18px;
				color: #333333;
				font-weight: bold !important;
			}
		}
		
	}
</style>
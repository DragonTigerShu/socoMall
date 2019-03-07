<template>
	<section class="account-info">
		<div class="account w">
			<div class="info_title">
				<info_muen :v_number='1' @Order_Id="Order_add"  :infoIndex="parseInt(infoIndex)"></info_muen> <!--v_number参数判断类型-->
			</div>
			<div class="info_center">
				<div class="info_left">
					<info_left :info_left="info_left" @dialogSuccessListen="dialogSuccessListen"></info_left>
				</div>
				<div class="address_message">
					<h3>收货地址</h3>
					<div>
						<addressList></addressList>
					</div>
				</div>
			</div>    
		</div>
	</section>
</template>
<script>
	import info_left from '@/components/personal/info_left.vue'  
	import info_muen from '@/components/personal/info_muen.vue'
	import addressList from '@/components/shoppingCartService/addressList.vue'  
	var $this={};
	var $data={
		infoIndex:2,
		address_msg:false,
		dialogSuccessHText:'',
		orderId_car:'', 
	infoIndex:1,  //头
	info_left:1  //左侧信息
};
export default{
	name:"info_address_msg",
	components:{
		"info_left":info_left,
		"info_muen":info_muen,
		"addressList":addressList
	},
	data() {
		$this=this;
		return $data;
	},
	created:function(){
		this.infoIndex=1;
		this.orderId=1;
		if(this.$route.params.leftIndex!=undefined){ 
			
			    this.info_left=parseInt(this.$route.params.leftIndex)   //检测侧边栏
			}
		},
		methods:{
	   //判断状态数量信息
	   Order_add:function($index){
	   	$this.infoIndex=$index;
	   	if($index>0){
	   		this.orderId = $index  
	   	}else{
				 	$this.info_left=1;  //左侧菜单
				 	$this.$router.push({path:'/info_order_goods'})
				 	window.scrollTo(0,0)
				 }
				},Order_details:function($index){
					$this.info_left=$index;
					$this.infoIndex = 1 //菜单栏
					$this.orderId = 1  //详情概述
					$this.$router.push({path:'/info_order'})
					window.scrollTo(0,0)
					
				},
				dialogSuccessListen:function($b){
					$this.$emit('appListen',true,'relogin');
					$this.dialogSuccess=false;
				}
			}
		}
	</script>

	<style lang="scss">
		.account-info{
			background: #f4f4f4;
			position: relative;
			overflow: hidden;
			padding: 50px 20px;	
		}
		.account{
			.info_title{
				background-color: #fff;
				height: 46px;
				line-height: 46px;
				border-radius: 4px;
				margin-bottom: 20px;
			}
			.info_center{
				display: flex;
				
				.info_left{
					flex: 1;
					margin-right: 10px;
				}
				.address_message{
					padding:45px 20px 45px 50px;
					width: 940px;
					min-height: 600px;
					background-color: #FFFFFF;
					-webkit-box-flex: 4;
					-ms-flex: 4;
					flex: 4;
					margin-left: 10px;
					border-radius: 4px;
					h3{
						font-size:18px;
						color: #333333;
						font-weight: bold !important;
					}
				}
			}		
		}
	</style>
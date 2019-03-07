<template>
	<div class="info_aftersale_application_success" v-if="data['return_goods_info']">
		<div class="soco_details_right_top info_aftersale_cation">
			<info_title :data="data">
			<h3 slot="info_header-title" class="info_header-title">{{typeArray[data['return_goods_info']['type']]}}申请</h3>
			</info_title> 
			<!--退货退款-->
			<template v-if="data['return_goods_info']['type']==0">
				<info_drawback v-if="data['return_goods_info']['status']==5" :drawack="0" :infoIndex="4"></info_drawback>
				<info_drawback v-else :drawack="1" :infoIndex="3"></info_drawback>
			</template>
			<!--换货-->
			<template v-else-if="data['return_goods_info']['type']==1">
				<template v-if="data['return_goods_info']['status']==5">
					<info_drawback :drawack="2" :infoIndex="4"></info_drawback>
				</template>
				<template v-else-if="data['return_goods_info']['status']==4">
					<info_drawback :drawack="2" :infoIndex="3"></info_drawback>
				</template>
				<template v-else="data['return_goods_info']['status']==3">
					<info_drawback :drawack="2" :infoIndex="2"></info_drawback>
				</template>
			</template>
			<!--退款-->
			<template v-else-if="data['return_goods_info']['type']==2">
				<info_drawback v-if="data['return_goods_info']['status']==5" :drawack="0" :infoIndex="2"></info_drawback>
				<info_drawback v-else :drawack="0" :infoIndex="1"></info_drawback>
			</template>
			<info_down :data="data['return_action_list']" :trackData="data['return_goods_info']['kd_info']?data['return_goods_info']['kd_info']['Traces']:[]">
			</info_down> 
			<!-- <info_down></info_down> -->
		</div>
		<div class="info_afterSale_success">
			<div class="info_success">
				<img :src="paysuccess">
				<!-- 已确认 -->
				<template v-if="data['return_goods_info']['status']==5">
					<h1>{{typeArray[data['return_goods_info']['type']]}}成功</h1>
				</template>
				<template v-else-if="data['return_goods_info']['type']==0">
					<h1>商家已收货,待商家退款</h1>
				</template>
				<template v-else-if="data['return_goods_info']['type']==1">
					<template v-if="data['return_goods_info']['status']==3">
						<h1>商家已收货,商家发货准备中</h1>
					</template>
					<template v-if="data['return_goods_info']['status']==4">
						<h1>商家已发货,待签收</h1>
						<button @click="checkOrder">查看订单详情</button>
					</template>
				</template>
				<template v-else-if="data['return_goods_info']['type']==2">
					<h1>退款申请通过,待商家退款</h1>
				</template>
			</div>
			<div class="info_textarea">
				<!-- 已确认 -->
				<template v-if="data['return_goods_info']['status']==5">
					<p>{{typeArray[data['return_goods_info']['type']]}}成功</p>
					<p>{{data['return_goods_info']['refund_remark']}}</p>
				</template>
				<template v-else-if="data['return_goods_info']['type']==0">
					<p>*退款将在1-7个工作日内退还至您的支付账户,请注意查收。<br/>客服电话: 400-021-2008 周一至周日 8:30-17:30</p>
				</template>
				<template v-else-if="data['return_goods_info']['type']==1">
					<p>*我们将立即为您调配商品,并在1-7个工作日内以新订单寄出。<br/>客服电话: 400-021-2008 周一至周日 8:30-17:30</p>
				</template>
				<template v-else-if="data['return_goods_info']['type']==2">
					<p>*退款将在1-7个工作日内退还至您的支付账户,请注意查收。<br/>客服电话: 400-021-2008 周一至周日 8:30-17:30</p>
				</template>
			</div>
		</div>

	</div>
</template>

<script> 
	import info_title from '@/components/afterSaleService/info_title_cation.vue'
	import info_drawback from '@/components/afterSaleService/info_drawback.vue'
	import info_down from '@/components/afterSaleService/info_down.vue'
	import info_status from '@/components/afterSaleService/info_order_status.vue'
	var $this={}
	var $data={
		'paysuccess':require('../../common/images/personal/paysuccess.png'),
		typeArray:['退款退货','换货','退款'],
	}
	export default{
		components:{
   		"info_title":info_title,      //订单头部
   		"info_drawback":info_drawback,
   		"info_down":info_down,
   		"info_status":info_status,      //订单状态
   	},
   	beforeRouteLeave(to, from, next) {
   		this.$emit("appListen",'loading',false);
   		next();
   	},
   	beforeRouteUpdate(to, from, next) {
   		next(false);
   	},
   	created(){
   		this.id=this.$route.params.id;
   		if(this.data['return_goods_info']==null||this.data['return_goods_info']==''){
   			this.$router.push({name:'info_afterSale_check',params:{'id':this.id}});
   		}
   	},
   	props:{
   		data:Object
   	},
   	data(){
   		$this =this;
   		return $data
   	},
   	methods:{
   		checkOrder:function(){
   			$this.$router.push({name: 'info_order_goods/order_details',params:{id:this.data['return_goods_info']['seller_delivery']}})
   			window.scrollTo(0,0);
   		},
    }
}
</script>
<style lang="scss">
	.info_aftersale_application_success{
		.soco_details_right_top{
			min-height: auto;
		}
		.info_afterSale_success{
			width:940px;
			border-radius: 4px;
			background-color:white;
			padding-top:30px;
			padding-bottom:25px;
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
			.info_success{
				text-align:center;
				img{
					width:250px;
					height:250px;
					margin-left:30px;
				}
				h1{
					font-size: 20px;
					color: #444444;
					font-weight:bold;
				}
			}
			.info_textarea{
				margin: 70px 20px 0 20px;
				width: auto;
				background: #F5F5F5;
				border-radius: 4px;
				padding:30px;
				p{
					font-size: 14px;
					color: #9DA2A6;
					&:last-child{
						font-size: 14px;
						color: #5C656F;
						font-weight:bold;
					}
				}
			}
		}
	}
</style>
	<template>
		<div class="info_aftersale_cation_three_pay" v-if="data['return_goods_info']">
			<div class="soco_details_right_top info_aftersale_cation">
				<info_title :data="data">
				<h3 slot="info_header-title" class="info_header-title">换货申请</h3>
				</info_title> <!--售后申请-->
				<info_drawback :drawack="2" :infoIndex="1"></info_drawback>
				<info_down :data="data['return_action_list']" :trackData="data['return_goods_info']['kd_info']?data['return_goods_info']['kd_info']['Traces']:[]"></info_down> 
			</div>
			<div class="info_exchangegood_pay">
				<h1>商家同意换货,请支付费用</h1>
				<h3>运费: {{data['return_goods_info']['need_pay_money']}}元</h3>
				<h2>{{data['return_goods_info']['remark']}}</h2>
				<h4>请选择支付方式</h4>
				<h5>支付平台</h5>
				<pL :orderId="data['return_goods_info']['id']" :orderSn="data['return_goods_info']['return_order_sn']" :url="'afterSale_order/checkOder'"></pL>
			</div>
		</div>
	</template>

	<script> 
		import info_title from '@/components/afterSaleService/info_title_cation.vue'
		import info_drawback from '@/components/afterSaleService/info_drawback.vue'
		import info_down from '@/components/afterSaleService/info_down.vue'
		import payList from '@/components/common/payListAfterSale.vue';
		var $this={}
		var $data={

		}
		export default{
			components:{
   		"info_title":info_title,      //订单头部
   		"info_drawback":info_drawback,
   		"info_down":info_down,
   		'pL':payList,
   	},
   	data(){
   		$this =this ;
   		return $data
   	},
   	props:{
   		data:Object
   	},
   	created(){
   		this.id=this.$route.params.id;
   		if(this.data['return_goods_info']==null||this.data['return_goods_info']==''){
   			this.$router.push({name:'info_afterSale_check',params:{'id':this.id}});
   		}else{
   			if(this.data['return_goods_info']['status']==-2){
   				this.infoIndex=0;
   			}
   		}
   	},
   	methods:{
   		
   	}
   }
</script>
<style lang="scss">
	.info_aftersale_cation_three_pay{
		.soco_details_right_top{
			min-height: auto;
		}
		.info_exchangegood_pay{
			width:940px;
			height:auto;
			border-radius: 4px;
			background-color:white;
			padding:30px 30px 70px 30px;
			h1{
				font-size: 20px;
				color: #444444;
				font-weight:bold;
			}
			h2{
				font-size: 14px;
				color: #5C6670;
				text-indent:5px;
				padding-bottom:10px;
				border-bottom: 1px solid #E0E0E0;
				margin-bottom:30px;
			}
			h3{
				color:#c8161e;
				font-size: 20px;
				font-weight:bold;
			}
			h4{
				margin-top:30px;
				font-size: 18px;
				color: #333333;
			}
			h5{
				margin:15px 0 30px 0;
				font-size: 14px;
				color: #444444;
			}
		}
	}
</style>
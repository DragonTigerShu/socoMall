<template>
	<div class="aftersale_cation" v-if="data['return_goods_info']">
		<div class="info_aftersale w">
			<div class="soco_details_right_top info_aftersale_cation">
				<info_title :data="data">
				<h3 slot="info_header-title" class="info_header-title">退款退货申请</h3>
				</info_title>
				<info_drawback :drawack="1" :infoIndex="parseInt(infoIndex)"></info_drawback>
				<info_down :key="data['return_goods_info']['return_order_sn']" :data="data['return_action_list']" :trackData="data['return_goods_info']['kd_info']?data['return_goods_info']['kd_info']['Traces']:[]"></info_down> 
			</div>
		</div>
		<template v-if="data['return_goods_info']"><merchant :data="data" @cancelListen="cancelListen"></merchant></template>
		<info_message :data="data"></info_message>
	</div>
</template>
<script>
	import info_drawback from '@/components/afterSaleService/info_drawback.vue'
	import info_title from '@/components/afterSaleService/info_title_cation.vue'
	import info_status from '@/components/afterSaleService/info_order_status.vue'
	import info_message from '@/components/afterSaleService/info_message.vue'
	import merchant from '@/components/afterSaleService/info_merchant_audit.vue'
	import info_down from '@/components/afterSaleService/info_down.vue'
	let $data = {
		infoIndex:1
	}
	let $this ={}
	export default{
	   	name:'info_aftersale_cation_three_application', //退款退货
	   	components:{
	   		"info_drawback":info_drawback,  //退换货物
	   		"info_title":info_title,        //订单头部
	   		"info_status":info_status,      //订单状态
	   		"info_message":info_message, //售后订单内的订单信息
	   		"merchant":merchant,
	   		"info_down":info_down
	   	},
	   	data() {
	   		$this = this
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
	   		cancelListen:function(){
	   			$this.$emit('appListen','cancelAfterSaleOrder',this.id);
	   		}
	   	}
	   }
	</script>

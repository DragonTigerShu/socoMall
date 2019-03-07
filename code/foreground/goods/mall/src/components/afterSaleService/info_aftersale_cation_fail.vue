<template>
	<div class="aftersale_application_failure" v-if="data['return_goods_info']">
		<div class="soco_details_right_top info_aftersale_cation">
			<info_title :data="data">
			<h3 slot="info_header-title" class="info_header-title">{{typeArray[data['return_goods_info']['type']]}}申请</h3>
			</info_title>
			<template v-if="data['return_goods_info']['type']==0"><!-- 退款退货 -->
				<info_drawback :drawack="1" :infoIndex="1"></info_drawback>
			</template>
			<template v-else-if="data['return_goods_info']['type']==1"><!-- 换货 -->
				<info_drawback :drawack="2" :infoIndex="1"></info_drawback>
			</template>
			<template v-else-if="data['return_goods_info']['type']==2"><!-- 仅退款 -->
				<info_drawback :drawack="0" :infoIndex="1"></info_drawback>
			</template>
			<info_down :data="data['return_action_list']" :trackData="data['return_goods_info']['kd_info']?data['return_goods_info']['kd_info']['Traces']:[]">
			</info_down>
		</div>
		<div class="info_afterSale_failure">
			<div class="info_failure">
				<img :src="payfail">
				<h1>{{typeArray[data['return_goods_info']['type']]}}申请未通过</h1>
				<p>*客服回复:{{data['return_goods_info']['refuse_reason']}}</p>
				<button @click="clickListen">编辑申请</button>
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
		typeArray:['退款退货','换货','退款'],
		'payfail':require('../../common/images/aftersale/customservice.png'),
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
   		clickListen:function(){
   			switch(parseInt(this.data['return_goods_info']['type'])){
   				case 0:this.$router.push({name:'info_aftersale_cation_two_application_edit',params:{'id':this.id}});break;//退货退款
   				case 1:this.$router.push({name:'info_aftersale_cation_three_application_edit',params:{'id':this.id}});break;//换货
   				case 2:this.$router.push({name:'info_aftersale_cation_one_application_edit',params:{'id':this.id}});break;//仅退款
   			}
   		}
   	}
   }
</script>
<style lang="scss">
	.aftersale_application_failure{
		.info_afterSale_failure{
			width:940px;
			height:540px;
			border-radius: 8px;
			background-color:white;
			padding-top:30px;
			padding-bottom:25px;
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
		}
		.soco_details_right_top{
			min-height: auto;
		}
	}
</style>
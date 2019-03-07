<template>
	<!--<h3>售后申请</h3>-->
	<div class="info_title_cation">
		<div class="info_title">
			<slot name="info_header-title"></slot>
		</div>
		<div class="info_title_order" v-if="data['return_goods_info']">
			<p>售后单号:<span>{{data['return_goods_info']['return_order_sn']}}</span></p>
			<p>下单日期:<span>{{transformTime(data['return_goods_info']['addtime'])}}</span></p>
			<!-- <div class="order_right">
				<span><i>商品总价:</i><em>{{data['order_info']['goods_amount']}}元</em></span>
				<span><i>运费:</i><em>{{data['order_info']['shipping_fee']}}元</em></span>
				<span><i>支付金额:</i><em>{{data['order_info']['total_amount']}}元</em></span>
			</div> -->
		</div>
		<div class="info_title_order" v-else-if="data['order_info']">
			<p>订单单号:<span>{{data['order_info']['order_sn']}}</span></p>
			<p>下单日期:<span>{{transformTime(data['order_info']['add_time'])}}</span></p>
			<div class="order_right">
				<span><i>商品总价:</i><em>{{data['order_info']['goods_amount']}}元</em></span>
				<span><i>运费:</i><em>{{data['order_info']['shipping_fee']}}元</em></span>
				<span><i>支付金额:</i><em>{{data['order_info']['total_amount']}}元</em></span>
			</div>
		</div>
	</div>
</template>
<script>
	let $this={}
	let $data = {
		
	}
	export default{
	name:'info_title_cation', //退款，申请 ，退换 头部信息
	data(){
		$this = this
		return $data
	},
	props:{
		data:Object
	},
	methods:{

	}
}
</script>
<style lang="scss">
	.info_title_cation{
		h3,.info_title{
			font-size: 20px;
			color: #333333;
			font-weight: 600;	
		}
		.info_title_order{
			border-bottom: 1px solid #e0e0e0;
			padding-bottom: 20px;
			margin-bottom: 40px;
			position: relative;
			p{
				margin: 5px 0 0 0;
				font-size: 14px;
				color: #9DA2A6;
				display: block;
			}
			.order_right{
				text-align: right;
				margin: -30px 0 0 0;
				position: absolute;
				right: 0;
				top: 0;
				span{
					display: block;
					width: 100%;
					zoom: 1;
					color:#818181;
					line-height: 24px;
				}
				i{
					display: inline-block;
					text-align: right;
				}
				em{
					min-width: 80px;
					display: inline-block;
				}
			}  
		}	
	}
</style>
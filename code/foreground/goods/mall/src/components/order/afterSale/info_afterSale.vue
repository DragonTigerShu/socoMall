<template>
	<div class="soco_details_right">
		<div class="soco_details_right_top">
			<h3>售后服务申请</h3>
			<Sale_list :data="data"></Sale_list> <!--信息列表-->
			<p class="details_order">为您的产品选择服务类型</p>
			<Sale_refund :orderId="parseInt(orderId)" :recId="parseInt(recId)"></Sale_refund>
			<div class="after_sale">
				<i>*您的商品支持退货，退货退换，换货服务。</i>
			</div>
		</div>
	</div>
</template>
<script>
	import Sale_list from '@/components/afterSaleService/info_Sale_list.vue'
	import Sale_refund from '@/components/afterSaleService/info_refund_refunds.vue'
	import axios from 'axios'
	var $this={

	}
	export default{
   	name:'info_afterSale', //订单详情页面
   	components:{
   		"Sale_list":Sale_list,
   		"Sale_refund":Sale_refund
   	},
   	beforeRouteLeave(to, from, next) {
   		this.$emit("appListen",'loading',false);
   		next();
   	},
   	beforeRouteUpdate(to, from, next) {
   		next(false);
   	},
   	created:function(){
       this.$emit('initListen',6);//刷新后重置左侧位置
       this.orderId=this.$route.params.orderId;
       this.recId=this.$route.params.recId;
       this.initOrder();
       window.scrollTo(0,0);
   },
   mounted:function(){
   },
   data() {
   	$this=this;
   	return {
   		orderId:'',
   		recId:'',
   		data:{}
   	}
   },
   methods:{
   	initOrder:function(){
   		$this.$store.commit('loadingUpdate',true);
   		axios({
   			method:'post',
   			url: $basePath+'?c=ReturnGoods&m=getOrderGoodsById',
   			data:{
   				'recId':$this.recId,
   			}
   		})
   		.then((response) => {
		      //console.log(response.data.data);
		      $this.$store.commit('loadingUpdate',false);
		      switch(parseInt(response.data.code)){
		      	case 1600100 :{
		      		$this.data=response.data.data;
		      		break;
		      	}
		      	case 888 :$this.$emit("appListen","loginAgain");break;
		      	default :$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
		      }
		  })
   		.catch(function (error) {
   			$this.$store.commit('loadingUpdate',false);
		      //console.log(error);
		  });
   	},
   }
}
</script>
<style lang="scss">
	.soco_details_right_top{
		margin-left: 0;
		h3{
			font-size: 24px;
			color: #333333;
			font-weight: 600;	
		}
		p.details_order{
			margin: 20px 0;
			font-size: 18px;
			color: #5C6670;
		}
		.after_sale{
			i{
				display: inline-block;
				margin: 20px 0;
				color:#9DA2A6;
				font-size: 14px;
			}
		}
	}
	.info_aftersale{
		display: flex;
		position: relative;
		overflow: hidden;
		h3{
			font-size: 24px;
			color: #333333;
			font-weight: 600;	
		}
		p.details_order{
			margin: 20px 0;
			font-size: 18px;
			color: #5C6670;
		}
		.after_sale{
			i{
				display: inline-block;
				margin: 20px 0;
				color:#9DA2A6;
				font-size: 14px;
			}
		}
	}
</style>
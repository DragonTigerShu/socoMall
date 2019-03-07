<template>
	<div class="soco_goods" @click="parentClickListen($event)">
		<a href="javascript:void(0)" v-for="(item,index) in goods" :class="{active:index===infoIndex}" :data-function="(index+1)" :key="index">{{item}}</a>
	</div>
</template>
<script>
	var $this={}
	export default{
   	name:'info_refund_refunfs', //售后订单填写/编辑页面中间切换售后类型条
   	components:{
   		
   	},
   	props:{
   		infoIndex:{
   			type:Number,
   			default:-1
   		},
   		recId:{
   			type:Number
   		},
   		orderId:{
   			type:Number
   		},
   		id:{
   			type:Number,
   			default:0
   		}
   	},
   	data() {
   		$this=this;
   		return {
   			goods:['退款','退货退款','换货']
   		}
   	},
   	methods:{
   		parentClickListen:function(e){
   			switch (e.target.nodeName.toLowerCase()){
   				case 'a':{
   					const fun = parseInt(e.target.dataset.function);
   					if(this.id!=0){
   						switch(parseInt(fun)){
   							case 1 : $this.$router.push({name:'info_aftersale_cation_one_application_edit',params:{'id':this.id}});window.scrollTo(0,0);break;
   							case 2 : $this.$router.push({name:'info_aftersale_cation_two_application_edit',params:{'id':this.id}});window.scrollTo(0,0);break;
   							case 3 : $this.$router.push({name:'info_aftersale_cation_three_application_edit',params:{'id':this.id}});window.scrollTo(0,0);break;
   						}
   					}else{
   						switch(parseInt(fun)){
   							case 1 : $this.$router.push({name: 'info_order_goods/info_aftersale_cation_one',params:{orderId:$this.orderId,recId:$this.recId}});window.scrollTo(0,0);break;
   							case 2 : $this.$router.push({name: 'info_order_goods/info_aftersale_cation_two',params:{orderId:$this.orderId,recId:$this.recId}});window.scrollTo(0,0);break;
   							case 3 : $this.$router.push({name: 'info_order_goods/info_aftersale_cation_three',params:{orderId:$this.orderId,recId:$this.recId}});window.scrollTo(0,0);break;
   						}
   					}
   				}
   			}
   		}
   	}
   }
</script>
<style lang="scss">
	.soco_goods{
		width: 100%;
		a{
			display: inline-block;
			padding:20px;
			width: 266px;
			text-align: center;
			border-radius:4px;
			border: 1px solid #e0e0e0;
			font-size: 14px;
			color: #5C6670;
			margin: 0 20px 0px 15px;
			box-sizing:border-box;
			&.active{
				border: 1px solid #C8161E;
				color: #C8161E;
			}
			&:nth-child(3n-2){
				margin-left: 0;
			}
			&:nth-child(3n){
				margin-right: 0;
			}
			
		}
	}
</style>
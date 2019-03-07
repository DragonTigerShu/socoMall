<template>
	<div class="info_drawback">
		<span v-for="(item,index) in cation[drawack]" :class="{active:index<=infoIndex}">{{item}}</span>
	</div>
</template>
<script> 
	export default{
		props:{
			drawack:{
				type:Number,
				default:0
			},
			infoIndex:{
				type:Number,
				default:0
			}
		},
		data(){
			return {
				cation:{
					0:['买家申请仅退款','商家处理退款申请','完成'],
					1:['买家申请退款','商家处理申请','寄回商品','退换退货成功'],
					2:['买家申请换货','商家处理退款申请','寄回商品','商家发货','换货成功']
				}
			}
		},
		methods:{
			sevent:function(index){
				this.infoIndex = index;
			}
		}
	}
</script>
<style lang="scss">
	.info_drawback{
		width: 100%;
		background: #f5f5f5;
		border-radius: 4px;
		margin: 20px 0;
		font-size: 12px;
		height: 24px;
		display: flex;
		span{
			flex:1;
			line-height:24px;
			display: inline-block;
			text-align: center;
			&.active{
				color: #fff;
				background: #c8161e;
			}
			&:first-child{
				border-radius: 4px 0 0 4px;
			}
			&:last-child{
				border-radius: 0 4px 4px 0;
			}
		}
	}
</style>
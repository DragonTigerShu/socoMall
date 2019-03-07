<template>
	<div class="info_muen">
		<label>
			<span v-for="(item ,index) in info1" v-if="v_number==1"  :class="{activees:index===infoIndex}" @click="$events(index)">{{item}}</span>
			<span v-for="(item ,index) in info2" v-if="v_number==2"  :class="{activees:index===infoIndex}" @click="$events(index)">{{item}}</span>
		</label>
	</div>
</template>
<script>
	export default{
		props:{
			v_number:{
				type:Number,
				default:1
			},
			infoIndex:{
				type:Number,
				default:1
			}
		},
		data(){
			return{
				info1:['个人中心','账户信息'],
				info2:['个人中心','全部订单','待付款','待收货','已结束']
			}
		},
		methods:{
			$events :function(index){
		  	    this.$emit('Order_Id',index)  //判断显示 付款问题
		  	}
		  },
		  created:function(){
		  	
		  },
		  watch:{
		  	
		  }
		  
		}
	</script>
	<style lang="scss">
		.info_muen{	
			label{
				display:block;
				width: 100%;
				span{
					display: inline-block;
					width: 20%;
					height: 46px;
					line-height: 46px;
					color: #333;
					text-align: center;
					font-size: 16px;
					cursor:pointer;
					&.activees:nth-of-type(1){
						border-bottom:none;
					}
					&.activees{
						border-bottom: 3px solid #CA1113;
						
					}
				}
				
			}
		}
	</style>
<template>
	<!--订单日志-->
	<div class="info_order_status">
		<h4>订单状态</h4>
		<label class="order">
			<span v-for="(item,index) in data" :key="index" >
				<i></i>	{{item['log_time'] | formatDate}} &nbsp;&nbsp;&nbsp;
				<small>{{item['action_note']}} 
					<em v-if="flagArray[index]" @click="toggle()">物流详情 / 收起详情<img src="../../common/images/aftersale/next.png">
					</em>
				</small>
				<template v-if="flagArray[index]">
					<ul class="down_active" :class="{'slideleft-active':isActive}" v-show="isActive">
						<template v-if="trackData==null||trackData.length==0">
							<li>暂无数据</li>
						</template>
						<template v-else>
							<li v-for="(child,indexC) in trackData" :key="indexC"><p>{{child['AcceptTime']}}  {{child['AcceptStation']}}</p></li>
						</template>
					</ul> 
				</template>
			</span>
		</label>
	</div>	
</template>
<script>
	import {formatDate} from '@/common/js/data.js'
	export default{
		data(){
			return{
				isActive: false,
				flag:true,
				flagArray:[]
			}
		},
		components:{
			
		},
		created:function(){
			for(var i=0;i<this.data.length;i++){
				if(this.data[i]['shipping_status']==1&&this.flag){
					this.flagArray.push(true);
					this.flag=false;
				}else{
					this.flagArray.push(false);
				}
			}
		},
		props:{
			data:Array,
			trackData:Array
		},
		filters:{
			//计算时间属性
			formatDate(time) {
				let date = new Date(time*1000) //获取当前时间
				return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
			}
		},
		methods:{
			checkTrack:function(i){
				if(parseInt(i)==1&&this.flag){
					return true;
				}else{
					return false;
				}
			},
			toggle:function(){
				this.isActive = !this.isActive;
			}
		}
	}
</script>

<style lang="scss">
	.info_order_status{
		margin: 40px 0 0 0;
		position: relative;
		h4{
			margin-top: 30px;
			font-size: 18px;
			color: #5C6670;
			font-weight: bold;
		}
		label.order{
			display: block;
			margin: 10px 0 0px 0;
			span{
				font-size:14px;
				color: #9DA2A6;
				margin-right: 20px;
				display: block;
				line-height: 30px;
				position: relative;
				i{
					display: inline-block;
					width: 10px;
					height: 10px;
					border-radius:5px;
					margin-right: 20px;	
					background: #2fc10a;
				}
				small{
					margin-left: 20px;
				}
				em{
					color: #c8161e;
					display: inline-block;
					text-indent:10px;
					cursor: pointer;
					>img{
						vertical-align: middle;
						width: 16px;
						margin-left: 8px;
					}
				}
			}
		}	
		.down_active{
			transition: all 0.3s;
			color: #7e8c8d;
			width: 100%;
			margin: 20px 0 20px 34px;
			line-height: 30px;
			//transition: 2s 3s min-height ease;/*合在一起*/
			// -webkit-animation:ulShow 3s; 
			// -webkit-animation-fill-mode:forwards; 
			// -webkit-animation-timing-function: cubic-bezier(0,0.8,0.9,100);
			min-height:20px;
			//  animation:myfirst 1s;
			// -webkit-animation:myfirst 1s;
			//   animation-fill-mode: forwards;
		}	
	}
	@-webkit-keyframes ulShow {
		from { -webkit-transform:scaleY(0); }
		to { -webkit-transform:scaleY(1); }
	}

</style>
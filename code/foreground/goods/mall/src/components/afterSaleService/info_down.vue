<template>
	<!--售后订单日志状态-->
	<div class="info_down">
		<div class="down_right">
			<a href="javacript:void(0);" @click="toggleDown()">订单状态
				<img src="../../common/images/icon/icon_next.png"/>
			</a>
			<ul class="down_active" :class="{'slideleft-active':isDownActive}" v-show="isDownActive">
				<label class="order">
					<span v-for="(item,index) in data" :key="index" >
						<i></i>{{item['log_time'] | formatDate}} &nbsp;&nbsp;&nbsp;
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
			</ul> 
		</div> 
	</div>
</template>
<script>
	import {formatDate} from '@/common/js/data.js'
	export default{
		data(){
			return{
				isDownActive: false,
				isActive: false,
				flag:true,
				flagArray:[]
			}
		},
		created:function(){
			for(var i=0;i<this.data.length;i++){
				if(this.data[i]['return_goods_status']==2){
					this.flagArray.push(true);
					this.flagArray[i-1]=false;
				}else{
					this.flagArray.push(false);
				}
			}
		},
		filters:{
		//计算时间属性
		formatDate(time) {
			let date = new Date(time*1000) //获取当前时间
			return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
		}
	},
	props:{
		data:Array,
		trackData:Array
	},
	methods:{
		toggleDown:function(){
			this.isDownActive = !this.isDownActive;
		},
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
	.info_down{	
		margin: 5px 10px;
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
		.down_right{
			position: relative;
			text-align: right;
			img{
				vertical-align: middle;
			}
			.bg-primary{
				height: 150px;
				width: 100%;
				display: inline-block;
				transition: all 0.3s;
			}
			.down_active{
				transition: all 0.3s;
				color: #7e8c8d;
				width: 100%;
				line-height: 30px;
				text-align: left;
				//transition: 2s 3s min-height ease;/*合在一起*/
				// -webkit-animation:ulShow 3s; 
				// -webkit-animation-fill-mode:forwards; 
				// -webkit-animation-timing-function: cubic-bezier(0,0.8,0.9,100);
				min-height:100px;
				//  animation:myfirst 1s;
				// -webkit-animation:myfirst 1s;
				//   animation-fill-mode: forwards;
			}	
		}
		@-webkit-keyframes ulShow {
			from { -webkit-transform:scaleY(0); }
			to { -webkit-transform:scaleY(1); }
		}
	}
</style>
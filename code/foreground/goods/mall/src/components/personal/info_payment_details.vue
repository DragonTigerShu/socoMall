<template>
	<div class="info_payment">
		<div class="info_breed" v-if="orderId==datainfo.status" >
			<div class="info-dialog-header">
				<h3 class="info-dialog-header">{{datainfo.order_satus}}</h3>
			</div>
			<div class="info-pay-details">
				<label class="select-time">
					<span>订单号：<i>{{datainfo.order_number}}</i></span>
					<time>下单时间：<i>{{datainfo.order_time}}</i></time>
					<p @click="cancelListen">{{datainfo.No_cancel}}</p>
				</label>
				<div class="details-list">
					<ul>
						<li><img :src="datainfo.avatar"/></li>
						<li>
							<label>
								<span>{{datainfo.title}}</span>
								<span>车型选择：<small>{{datainfo.model_type}}</small></span>
								<span>颜色分类：<small>{{datainfo.model_color}}</small></span>
							</label>
						</li>
						<li>{{datainfo.order_No}}</li>
						<li><label>
							<span><small>{{datainfo.order_sum}}</small>元</span>
							<span><small>含运费</small>{{datainfo.order_expenses}}</span>
						</label>
					</li>
					<li>
						<div class="dialog-ditails-button" @click="orderDetailListen">订单详情</div>
						<button class="button" type="button" v-if="datainfo.status==2" @click="payListen">立即支付</button>
						<p class="darwebck" href="#" v-else-if="datainfo.status==3">{{drawback[datainfo.status-2]}}</p>
						<p class="darwebck" href="#" v-else>{{drawback[0]}}</p>
					</li>
				</ul>
			</div>
			<div>	
			</div>
		</div>
	</div>
	<div class="info_breed" v-else-if="orderId==1">
		<div class="info-dialog-header">
			<h3 class="info-dialog-header">{{datainfo.order_satus}}</h3>
		</div>
		<div class="info-pay-details">
			<label class="select-time">
				<span>订单号：<i>{{datainfo.order_number}}</i></span>
				<time>下单时间：<i>{{datainfo.order_time}}</i></time>
				<p @click="cancelListen">{{datainfo.No_cancel}}</p>
			</label>
			<div class="details-list">
				<ul>
					<li><img :src="datainfo.avatar"/></li>
					<li>
						<label>
							<span>{{datainfo.title}}</span>
							<span>车型选择：<small>{{datainfo.model_type}}</small></span>
							<span>颜色分类：<small>{{datainfo.model_color}}</small></span>
						</label>
					</li>
					<li>{{datainfo.order_No}}</li>
					<li><label>
						<span><small>{{datainfo.order_sum}}</small>元</span>
						<span><small>含运费</small>{{datainfo.order_expenses}}</span>
					</label>
				</li>
				<li>
					<div class="dialog-ditails-button" @click="orderDetailListen">订单详情</div>
					<button class="button" type="button" v-if="datainfo.status==2" @click="payListen">立即支付</button>
					<p class="darwebck" href="#" v-else-if="datainfo.status==3">{{drawback[datainfo.status-2]}}</p>
					<p class="darwebck" href="#" v-else>{{drawback[0]}}</p>
				</li>
			</ul>
		</div>
		<div>	
		</div>
	</div>
</div>
</div>
</template>
<script>
	var $this={};
	var $data={
		dialogOne:false,
	order_status:'',  //付款状态码
	No_cancel:'',
	drawback:['售后申请','申请退款']  //申请退款信息
};
export default{
	name:'info_payment',
		props:{  // 期望在父组件传下来，子组件需要显示props
			datainfo:{
          	 	type:Object  //数据传值
          	 },
          	 orderId:{
          	 	type:Number,
          	 	default:'1'
          	 }
          	},
          	data(){
          		$this = this;
          		return $data;
          	},
          	created () {
			//待支付状态
			if($this.orderId==2){
				$this.order_status = '待付款'
				$this.No_cancel = '取消订单'
				return
			}else if ($this.datainfo.status==3){
				$this.order_status = '待收货'
				return
			}else{
				$this.order_status = '已结束'
				return
			}
			
		},
		methods:{
			cancelListen:function(){
				$this.$emit('cancelListen');
			},
			payListen:function(){
				$this.$router.push({path:'/shoppingCart/Pay'});
				window.scrollTo(0,0);
			},
			orderDetailListen:function(){
				$this.$router.push({path:'/order_details'});
				window.scrollTo(0,0);
			}

		},
		components:{
			
		}
	}
</script>
<style lang="scss">
	.info_payment{	
		.info_breed{
			background: #fff;
			padding: 20px;
			width: 940px;
			height:254px;
			margin-bottom: 20px;
			border-radius: 4px;		
			.info-dialog-header{
				font-size: 20px;
				color:#C8161E;
				width: 100%;
				height: 30px;
				margin-bottom: 5px;
				visibility: visible;
			}
		}
		.info-pay-details{
			.select-time{
				position: relative;
				color: #9DA2A6;
				span{
					font-size: 14px;
					color: #9DA2A6;
					margin-right: 10px;
					i{
						margin-left: 10px;
					}
				}
				time{
					@extend span;
					margin-left: 10px;	
				}
				p{
					float: right;
					margin-top: -30px;
					cursor: pointer;
				}
			}
			.details-list {
				position:relative;
				ul{
					display: flex;
					justify-content: center;
					align-items: center;
					li{
						display: inline-block;
						flex:1;
						width: 20%;
						padding: 10px 0;
						text-align: center;
						span{
							display: block;
							width: 100%;
							padding: 2.5px 0;
							color: #9DA2A6;
							text-align: left;
							&:nth-of-type(1){
								color: #5C6670;;
							}
						}
						.dialog-ditails-button{
							width: 180px;
							height: 40px;
							border-radius: 8px;
							background: #efefee;
							text-align: center;
							line-height: 40px;
							letter-spacing: 1px;
							margin-bottom: 20px;
							cursor: pointer;
							color: #5C6670;	 
						}
						button{
							background: #C8161E;
							border-radius: 8px;
							width: 180px;
							height: 40px;
							color: #fff;
							text-align: center;
							border: 0;
							letter-spacing: 1px;
							cursor: pointer;	 
							outline: none;
							

						}
						p.darwebck{
							visibility: visible;
							height:30px;
							display: block;
							color: #9DA2A6;
							letter-spacing: 1px;
							cursor:pointer;
							width: fit-content;
							margin: 0 auto;
						}
					}
				}
			}
			
		}
		
	}
</style>
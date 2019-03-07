<template>
	<!--售后申请详情最后部分信息区域-->
	<div class="info_merchant_audit">
		<h3>{{orderTypeArray[orderType]}}</h3>
		<ul class="apply">
			<li>
				<span>售后类型:</span>
				<span>{{typeArray[data['return_goods_info']['type']]}}</span>
			</li>
			<li><span>货物状态:</span>
				<span>{{receiveType[data['return_goods_info']['is_receive']]}}</span>
			</li>
			<li><span>退款金额:</span>
				<span>{{data['return_goods_info']['refund_money']}}元</span>
			</li>
			<li><span>退款原因:</span>
				<span>{{data['return_goods_info']['reason']}}</span>
			</li>
			<li><span>{{typeRemarkArray[data['return_goods_info']['type']]}}:</span>
				<span>{{data['return_goods_info']['describe']}}</span>
			</li>		
		</ul>
		<div class="after_explain">
			<template v-if="picList.length>0">
				<i v-for="(d,index) in picList" ><img :src='baseHead+d'></i>
			</template>
		</div>
		<div class="after_apply">
			<button v-if="data['return_goods_info']['status']!=-2&&(data['return_goods_info']['status']<2||(data['return_goods_info']['status']<1&&data['return_goods_info']['type']==2))" @click="cancelListen">撤销申请</button>
			<!-- <button v-if="data['return_goods_info']['status']!=-2&&datainfo['status']<1)" @click="editListen">修改申请</button> -->
			<p>客服将在7个工作日内为您处理，非质量问题产生的退换退货订单，我们需要收取运费哦。</br>如有疑问请联系客服，客服电话：400-012-2008 周一至周日 8:30-17:30</p>
		</div>
	</div>
</template>
<script>
	let $this={}
	let $data = {
		orderType:'',
		typeArray:['退款退货','换货','仅退款'],
		typeRemarkArray:[,'退货说明','换货说明','退款说明'],
		orderTypeArray:['已完成','待审核','未通过','买家已取消','待商家退款','待买家寄回','待商家收货','商家已收货,准备发货中','商家已收货,待退款','商家已发货','商家同意换货,待买家付款'],
		receiveType:['未收货','已收货'],
		picList:[],
		baseHead:''
	}
	export default{
		name:'info_merchant_audit', //退货退款申请
		data(){
			$this = this
			return $data
		},
		props:{
			data:Object
		},
		created:function(){
			this.baseHead=$baseHead;
			var picListStr=this.data['return_goods_info']['imgs'];
			if(picListStr!=''){
				this.picList=picListStr.split(',');
			}
			switch (parseInt(this.data['return_goods_info']['type'])){
          		case 0:{//退货退款
          			switch (parseInt(this.data['return_goods_info']['status'])){
		          		case -2:$this.orderType=3;break;//已取消
		          		case -1:$this.orderType=2;break;//未通过
		          		case 0:$this.orderType=1;break;//待审核
		          		case 1:$this.orderType=5;break;//通过=>待寄回
		          		case 2:$this.orderType=6;break;//买家已发货=>待商家收货
		          		case 3:$this.orderType=8;break;//商家已收货=>商家已收货,准备发货中
		          		case 5:$this.orderType=0;break;//已完成=>已完成
		          	}
		          	break;
		          }
          		case 1:{//换货
          			switch (parseInt(this.data['return_goods_info']['status'])){
		          		case -2:$this.orderType=3;break;//已取消
		          		case -1:$this.orderType=2;break;//未通过
		          		case 0:$this.orderType=1;break;//待审核
		          		case 1:{
		          			if(parseInt(this.data['return_goods_info']['is_need_paid'])){
		          				if(parseInt(this.data['return_goods_info']['is_paid']))
		          					$this.orderType=5;//已支付
		          				else
		          					$this.orderType=10;//未支付
		          			}else{
		          				$this.orderType=5;
		          			}
		          			break;
		          		}//通过=>待寄回
		          		case 2:$this.orderType=6;break;//买家已发货=>待商家收货
		          		case 3:$this.orderType=7;break;//商家已收货=>商家已收货,准备发货中
		          		case 4:$this.orderType=9;break;//商家已发货=>商家已发货
		          		case 5:$this.orderType=0;break;//已完成=>已完成
		          	}
		          	break;
		          }
          		case 2:{//仅退款
          			switch (parseInt(this.data['return_goods_info']['status'])){
		          		case -2:$this.orderType=3;break;//已取消
		          		case -1:$this.orderType=2;break;//未通过
		          		case 0:$this.orderType=1;break;//待审核
		          		case 1:$this.orderType=4;break;//待退款
		          		case 5:$this.orderType=0;break;//已完成=>已完成
		          	}
		          	break;
		          }
		      }

		  },
		  methods:{
		  	editListen:function(){
		  		$this.$emit('editListen');
		  	},
		  	cancelListen:function(){
		  		$this.$emit('cancelListen');
		  	}
		  }
		}
	</script>
	<style lang="scss">
		.info_merchant_audit{
			padding: 30px;
			background: #FFF;
			width: 940px;
			min-height: 325px;
			height: auto;
			border-radius: 8px;
			margin-bottom:20px;
			h3{
				font-size: 20px;
				color: #333333;
				font-weight: 600;
				margin-bottom: 12.5px;
			}
			.apply li{
				color: #5c6670;
				font-size: 14px;
				span{
					@extend li;
					display: inline-block;
					min-width:15%;
					text-align: left;
					line-height:24px;
				}
			}
			.after_explain{
				padding: 30px 0;
				>i{
					display: inline-block;
					width: 270px;
					height: 180px;
					border-radius: 4px;
					margin-right: 15px;
					text-align:center;
					>img{
						height:100%;
						width: 100%;
					}
				}
			}
			.after_apply{
				text-align: right;
				>span{
					cursor:pointer;
					display: block;
					margin-bottom: 10px;
					margin-right: 60px;
					text-align: right;
					color: #9da2a6;
					font-size: 14px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
				}
				>button{
					text-align: center;
					width: 180px;
					height: 40px;
					color: #fff;
					background: #C8161E;
					border: 0;
					outline: none;
					border-radius: 8px;
					line-height: 30px;
					font-size: 14px;
					-webkit-box-sizing: border-box;
					box-sizing: border-box;
					cursor: pointer;
					letter-spacing: 1px;
					margin-bottom: 20px;
				}
				>p{
					margin-top: 12px;
					color: #9DA2A6;
					font-size: 14px;
					line-height: 24px;
				}
			}
		}
	</style>
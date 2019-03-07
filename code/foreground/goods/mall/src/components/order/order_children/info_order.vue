<template>
	<div class="info_order" @click="ulClickListen($event)">
            <!-- <info_payment ref="info_payment" v-show  :orderId="orderId" v-for="(data_list,index) in datalist">
            </info_payment> -->
            <div v-if="datalist==''" class="goodsListContent empty">
            	<img :src="emptyShoppingCart">
            	<p>订单空空如也~</p>
            	<button @click="goShopping">马上去购物</button>
            </div>
            <div v-else class="info_payment" v-for="(datainfo,index) in datalist">
            	<div class="info_breed">
            		<div class="info-dialog-header">
            			<h3>{{orderTypeArray[orderTypeShowList[index]]}}</h3>
            		</div>
            		<div class="info-dialog-header-right">
            			<p :data-function="0" :data-id="datainfo.order_id" v-if="datainfo['shipping_status']==0&&(datainfo['order_status']==0)&&datainfo['total_amount']!=0">取消订单</p>
            			<p :data-function="1" :data-id="datainfo.order_id">订单详情</p>
            		</div>
            		<div class="info-pay-details">
            			<label class="select-time">
            				<div>订单编号：<span>{{datainfo.order_sn}}</span></div>
            				<div>订单日期：<span>{{transformTime(datainfo.add_time)}}</span></div>
            			</label>
            			<label class="select-time">
            				<!-- 				 		<div>运费：<span>￥{{datainfo.shipping_fee}}</span></div> -->
            				<div>支付金额：<span>￥{{datainfo.total_amount}}</span></div>
            			</label>
            			<div class="details-list" v-for="(item,index) in datainfo.order_goods_list">
            				<ul>
            					<li><img :data-id="item.goods_id" :src="baseHead+item.goods_thumb"/></li>
            					<li >
            						<label>
            							<span>{{item.goods_name}}</span>
            							<span>{{item.spec_key_name}}</span>
            						</label>
            					</li>
            					<li>X{{item.goods_number}}</li>
            					<li><label>
            						<span><small>￥{{item.goods_price}}</small></span>
            					</label>
            				</li>
            				<li>
            					<p v-if="(parseInt(datainfo.order_status)==2||parseInt(datainfo.order_status)==4)&&checkComfirmTime(item.receive_time
            					)" :data-function="2" :data-recid="item.rec_id" :data-orderid="datainfo.order_id"  >售后申请</p>
            				</li>
            			</ul>
            		</div>
            	</div>
            	<div class="info_btn" v-if="datainfo['order_status']==0&&datainfo['pay_status']==0">
            		<button :data-id="datainfo.order_id" class="button" type="button">立即支付</button>
            	</div>
            </div>
        </div>
    </div>
</template>
<script>
	import axios from 'axios'


	let $this ={}
	let $data ={
		datalist:[],
		dialogCancel:false,
		dynamicSegment:'',
		orderId_car:'', 
		dialogOne:false,
	order_status:'',  //付款状态码
	No_cancel:'',
	orderTypeArray:'',
	drawback:['售后申请','申请退款'],  //申请退款信息
	orderTypeList:[],//按照orderTypeArray分类所有订单成4类
	orderTypeShowList:[],
	'emptyShoppingCart':require('../../../common/images/shoppingCart/emptyShoppingCart.png')
}
export default{
	name:"info_order",
	components:{
	},
		props:{  // 期望在父组件传下来，子组件需要显示props
			orderStatus:{
				type:Number,
				default:'1'
			},
			reload:Boolean
		},
		watch:{
			reload(c,d){
				this.initOrder();
			},
			orderStatus(c,d){
				this.initOrder();
			}
		},
		data() {
			$this= this
			return $data
		},
		created:function(){
			this.orderTypeArray=$orderTypeArray;
			this.baseHead=$baseHead;
			this.initOrder();
		},
		mounted:function(){
			if(this.$route.query.orderStatus==2){
				this.$emit('initListen',7);//刷新后重置左侧位置
			}else if(this.$route.query.orderStatus==3){
				this.$emit('initListen',8);//刷新后重置左侧位置
			}else{
				this.$emit('initListen',1);//刷新后重置左侧位置
			}
		},
		methods:{
			checkComfirmTime:function(time){
				if(parseInt(time) + 604800 < new Date().getTime()/1000)return false;
				return true;
			},
			goShopping:function(){
				$this.$router.push({path:'/'});
				window.scrollTo(0,0);
			},
			initOrder:function(){
				$this.$store.commit('loadingUpdate',true);
				axios({
					method:'post',
					url: $basePath+'?c=Order&m=userOrderList',
					data:{
						'page':1,
						'limit':100
					}
				})
				.then((response) => {
					$this.$store.commit('loadingUpdate',false);
					switch(parseInt(response.data.code)){
						case 1100100 :{
							$this.datalist=[];
							$this.orderTypeList=[];
							$this.orderTypeShowList=[];
							var tempList=response.data.data.list;
							for(var i=0;i<tempList.length;i++){
								switch (parseInt(tempList[i]['order_status'])){
			          		case 3:{//买家已取消
			          			switch(parseInt(tempList[i]['pay_status'])){
			          				case 0:$this.orderTypeList.push(7);break;//未付款=>已取消
			          				case 3:$this.orderTypeList.push(6);break;//已退款=>已退款
			          				case 4:$this.orderTypeList.push(5);break;//拒绝退款=>拒绝退款
			          				case 1:;
			          				case 2:$this.orderTypeList.push(4);break;//已付款=>待退款
			          			}
			          			break;
			          		}
			          		case 5:$this.orderTypeList.push(8);break;;//商家已作废
			          		case 6:$this.orderTypeList.push(7);break;//系统取消=>已取消
			          		case 2:;//买家收货
			          		case 4:$this.orderTypeList.push(3);break;//已完成=>已收货
			          		case 0:{
			          			if(parseInt(tempList[i]['pay_status'])==0){
									$this.orderTypeList.push(1);//未付款=>待付款
								}else{
									$this.orderTypeList.push(10);//已付款=>备货中
								}
								break;
							}
							case 1:{
								if(parseInt(tempList[i]['shipping_status'])==0){
									$this.orderTypeList.push(9);//已付款=>待发货
								}
								else{
									$this.orderTypeList.push(2);//已付款=>待收货
								}
								break;
							}
						}
						switch(parseInt($this.orderStatus)){
			          		case 1:{//全部订单
			          			$this.orderTypeShowList.push($this.orderTypeList[i])
			          			$this.datalist.push(tempList[i]);
			          			break;
			          		}
			          		case 2:{//待付款
			          			if($this.orderTypeList[i]==1){
			          				$this.orderTypeShowList.push($this.orderTypeList[i]);
			          				$this.datalist.push(tempList[i]);
			          			}
			          			break;
			          		}
			          		case 3:{//待收货
			          			if($this.orderTypeList[i]==2||$this.orderTypeList[i]==9||$this.orderTypeList[i]==10){
			          				$this.orderTypeShowList.push($this.orderTypeList[i]);
			          				$this.datalist.push(tempList[i]);
			          			}
			          			break;
			          		}
			          		case 4:{//已完成
			          			if($this.orderTypeList[i]==0||$this.orderTypeList[i]==3){
			          				$this.orderTypeShowList.push($this.orderTypeList[i]);
			          				$this.datalist.push(tempList[i]);
			          			}
			          			break;
			          		}
			          	}
			          }
			          ////console.log($this.orderTypeList);
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
			ulClickListen:function(e) {
				switch (e.target.nodeName.toLowerCase()){
					case 'button':{
						const id = e.target.dataset.id;
						if(id!=''&&id!=null){
							$this.$emit('initListen',5);
							$this.$router.push({name:'info_order_goods/pay',params:{'id':id}});
							window.scrollTo(0,0);
						}
						break;
					}
					case 'p':{
						const fun = parseInt(e.target.dataset.function);
						if(fun==0){
							const id = parseInt(e.target.dataset.id);
							$this.$emit('appListen','cancelOrder',id);
						}else if(fun==1){
							//查看详情
							const id = parseInt(e.target.dataset.id);
							$this.$router.push({name: 'info_order_goods/order_details',params:{id:id}})
							window.scrollTo(0,0);
						}else if(fun==2){
							//售后
							const recId = parseInt(e.target.dataset.recid);
							$this.$router.push({name: 'info_order_goods/info_afterSale_list',params:{recId:recId}});
							window.scrollTo(0,0);
						}
						break;
					}
					case 'img':{
						const index = parseInt(e.target.dataset.id);
						if(!isNaN(index))window.open($hostUrl+'/#/detail/'+index);
						break;
					}
				}
			},
		    cancelListen:function(){
		    	$this.$emit("appListen","cancelOrder");
		    },
	        // payListen:function(id){
	        // 	    debugger;
	        //     $this.$router.push({name:'info_order_goods/pay',params:{'id':id}});
	        //     window.scrollTo(0,0);
	        // },
	    }
	}
</script>

<style lang="scss">
	.info_order{
		background: #f5f5f5;
		position: relative;
		overflow: hidden;
		.goodsListContent{
			border-radius: 4px;
			&.empty{
				height:500px;
				text-align:center;
				background-color:white;
				&.paddingTop{
					padding-top:150px;
				}
				img{
					margin-top:10px;
					width:250px;
					height:250px;
				}
				p{
					font-size:20px;
					color:#333333;
					font-weight:normal;
				}
				button{
					width:260px;
					height:40px;
					border-radius:8px;
					border:0 solid white;
					background-color:#c8161e;
					color:white;
					margin-top:50px;
					cursor:pointer;
					outline:none;
				}
				.login{
					width:180px;
					margin-right:20px;
				}
				.goShopping{
					width:180px;
					background-color:white;
					border:1px solid #c8161e;
					color:#c8161e;
					box-sizing:border-box;
				}
			}
		}
		.order_info_title{
			background-color: #fff;
			height: 46px;
			line-height: 46px;
			border-radius: 4px;
			margin-bottom: 20px;
		}
		.info_btn{
			width:100%;
			text-align:right;
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
		}
		.info_payment{	
			.info_breed{
				background: #fff;
				padding: 20px;
				width: 940px;
				height:auto;
				margin-bottom: 20px;
				border-radius: 4px;
				position:relative;		
				.info-dialog-header{
					>h3{
						font-size: 20px;
						color:#C8161E;
						width: 100%;
						height: 30px;
						margin-bottom: 5px;
					}
				}
				.info-dialog-header-right{
					position: absolute;
					right: 40px;
					top: 25px;
					display:flex;
					flex-direction: row;
					p{
						font-size: 14px;
						color: #9DA2A6;
						cursor:pointer;
						margin-left:15px;
					}
				}
			}
			.info-pay-details{
				.select-time{
					position: relative;
					color: #9DA2A6;
					display:flex;
					flex-direction:row;
					div{
						font-size: 14px;
						color: #9DA2A6;
						margin-right: 10px;
						span{
							margin-left: 10px;
						}
					}
					time{
						@extend span;
						margin-left: 10px;	
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
							flex:2;
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
							img{
								cursor:pointer;
								width:150px;
								height:150px;
							}
							p{
								cursor:pointer;
							}
							&:nth-child(2){
								flex:3;
								padding:10px 0 10px 40px;
							}
						}
					}
				}
			}
		}
	}
</style>
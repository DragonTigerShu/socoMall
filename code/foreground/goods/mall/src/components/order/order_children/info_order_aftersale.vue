<template>
	<div class="info_order_aftersale" @click="ulClickListen($event)">
            <!-- <info_payment ref="info_payment" v-show  :orderId="orderId" v-for="(data_list,index) in datalist">
            </info_payment> -->
            <div v-if="datalist.length==0" class="goodsListContent empty">
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
            			<p :data-function="0" :data-id="datainfo.id" v-if="datainfo['status']!=-2&&(datainfo['status']<2||(datainfo['status']<1&&datainfo['type']==2))">取消售后</p>
            			<p :data-function="1" :data-id="datainfo.id">订单详情</p>
            		</div>
            		<div class="info-pay-details">
            			<label class="select-time">
            				<div>售后订单编号：<span>{{datainfo.return_order_sn}}</span></div>
            			</label>
            			<label class="select-time">
            				<div>售后订单日期：<span>{{transformTime(datainfo.addtime)}}</span></div>
            			</label>
            			<div class="details-list" v-for="(item,index) in datainfo.goods_info">
            				<ul>
            					<li><img :data-id="item.goods_id" :src="baseHead+item.goods_thumb"/></li>
            					<li>
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
            			</ul>
            		</div>
            	</div>
            	<div class="info_btn" v-if="datainfo['status']==1&&datainfo['is_need_paid']==1&&datainfo['is_paid']==0">
            		<button :data-function="1" :data-id="datainfo.id" class="button" type="button">立即支付</button>
            	</div>
            	<div class="info_btn" v-if="datainfo['status']==-1">
            		<button :data-function="2" :data-type="datainfo['type']" :data-id="datainfo.id" class="button" type="button">编辑申请</button>
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
	typeArray:['退款退货','换货','仅退款'],
	orderTypeArray:['已完成','待审核','未通过','买家已取消','待商家退款','待买家寄回','待商家收货','商家已收货,准备发货中','商家已收货,待退款','商家已发货','商家同意换货,待买家付款'],
	orderTypeShowList:[],
	orderTypeList:[],
	'emptyShoppingCart':require('../../../common/images/shoppingCart/emptyShoppingCart.png')
}
export default{
	name:"info_order_aftersale",
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
			this.baseHead=$baseHead;
			// this.baseHead=$baseHead;
			// this.$emit('initListen',1);//刷新后重置左侧位置
			// this.initOrder();
		},
		mounted:function(){
			this.$emit('initListen',2);//刷新后重置左侧位置
			this.initOrder();
		},
		methods:{
			goShopping:function(){
				$this.$router.push({path:'/'});
				window.scrollTo(0,0);
			},
			initOrder:function(){
				$this.$store.commit('loadingUpdate',true);
				axios({
					method:'post',
					url: $basePath+'?c=ReturnGoods&m=userReturnGoodsList',
					data:{
						'page':1,
						'limit':100
					}
				})
				.then((response) => {
			      //console.log(response.data.data);
			      $this.$store.commit('loadingUpdate',false);
			      switch(parseInt(response.data.code)){
			      	case 1600100 :{
			      		$this.datalist=[];
			      		$this.orderTypeList=[];
			      		$this.orderTypeShowList=[];
			      		var tempList=response.data.data;
			          //-1审核不通过，-2用户取消，0待审，1通过，2买家已发货，3商家已收货，4商家已发货，5已完成
			          for(var i=0;i<tempList.length;i++){
			          	switch (parseInt(tempList[i]['type'])){
			          		case 0:{//退货退款
			          			switch (parseInt(tempList[i]['status'])){
					          		case -2:$this.orderTypeList.push(3);break;//已取消
					          		case -1:$this.orderTypeList.push(2);break;//未通过
					          		case 0:$this.orderTypeList.push(1);break;//待审核
					          		case 1:$this.orderTypeList.push(5);break;//通过=>待寄回
					          		case 2:$this.orderTypeList.push(6);break;//买家已发货=>待商家收货
					          		case 3:$this.orderTypeList.push(8);break;//商家已收货=>商家已收货,准备发货中
					          		case 5:$this.orderTypeList.push(0);break;//已完成=>已完成
					          	}
					          	break;
					          }
			          		case 1:{//换货
			          			switch (parseInt(tempList[i]['status'])){
					          		case -2:$this.orderTypeList.push(3);break;//已取消
					          		case -1:$this.orderTypeList.push(2);break;//未通过
					          		case 0:$this.orderTypeList.push(1);break;//待审核
					          		case 1:{
					          			if(parseInt(tempList[i]['is_need_paid'])){
					          				if(parseInt(tempList[i]['is_paid']))
					          					$this.orderTypeList.push(5);//已支付
					          				else
					          					$this.orderTypeList.push(10);//未支付
					          			}else{
					          				$this.orderTypeList.push(5);
					          			}
					          			break;
					          		}//通过=>待寄回
					          		case 2:$this.orderTypeList.push(6);break;//买家已发货=>待商家收货
					          		case 3:$this.orderTypeList.push(7);break;//商家已收货=>商家已收货,准备发货中
					          		case 4:$this.orderTypeList.push(9);break;//商家已发货=>商家已发货
					          		case 5:$this.orderTypeList.push(0);break;//已完成=>已完成
					          	}
					          	break;
					          }
			          		case 2:{//仅退款
			          			switch (parseInt(tempList[i]['status'])){
					          		case -2:$this.orderTypeList.push(3);break;//已取消
					          		case -1:$this.orderTypeList.push(2);break;//未通过
					          		case 0:$this.orderTypeList.push(1);break;//待审核
					          		case 1:$this.orderTypeList.push(4);break;//待退款
					          		case 5:$this.orderTypeList.push(0);break;//已完成=>已完成
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
			          			if($this.orderTypeList[i]==4||$this.orderTypeList[i]==8||$this.orderTypeList[i]==10){
			          				$this.orderTypeShowList.push($this.orderTypeList[i]);
			          				$this.datalist.push(tempList[i]);
			          			}
			          			break;
			          		}
			          		case 3:{//待收货
			          			if($this.orderTypeList[i]==5||$this.orderTypeList[i]==6||$this.orderTypeList[i]==7||$this.orderTypeList[i]==9){
			          				$this.orderTypeShowList.push($this.orderTypeList[i]);
			          				$this.datalist.push(tempList[i]);
			          			}
			          			break;
			          		}
			          		case 4:{//已完成
			          			if($this.orderTypeList[i]==0){
			          				$this.orderTypeShowList.push($this.orderTypeList[i]);
			          				$this.datalist.push(tempList[i]);
			          			}
			          			break;
			          		}
			          	}
			          }
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
			const fun = parseInt(e.target.dataset.function);
			const id = parseInt(e.target.dataset.id);
			switch(parseInt(fun)){
							case 1:$this.$router.push({name:'info_afterSale_check',params:{'id':id}});break;//支付
							case 2:{
								const type = parseInt(e.target.dataset.type);
								switch(parseInt(type)){
									case 0 : $this.$router.push({name:'info_aftersale_cation_two_application_edit',params:{'id':id}});break;
									case 1 : $this.$router.push({name:'info_aftersale_cation_three_application_edit',params:{'id':id}});break;
									case 2 : $this.$router.push({name:'info_aftersale_cation_one_application_edit',params:{'id':id}});break;
								}
								break;
							}
						}
						// const id = parseInt(e.target.dataset.id);
						// $this.$emit('initListen',5);
						// $this.$router.push({name:'info_order_goods/pay',params:{'id':id}});
      //       			window.scrollTo(0,0);
      break;
  }
  case 'p':{
  	const fun = parseInt(e.target.dataset.function);
  	const id = parseInt(e.target.dataset.id);
  	if(fun==0){
  		$this.$emit('appListen','cancelAfterSaleOrder',id);
  	}else if(fun==1){
							//查看详情
							$this.$router.push({name:'info_afterSale_check',params:{'id':id}});
						}
						break;
					}
					case 'img':{
						const index = parseInt(e.target.dataset.id);
						if(!isNaN(index))window.open(window.location.origin + '/#/detail/'+index);
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
	.info_order_aftersale{
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
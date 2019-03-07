<template>
	<div class="info_aftersale_cation_two_exchange" v-if="data['return_goods_info']">
		<div class="soco_details_right_top info_aftersale_cation">
			<info_title :data="data">
			<h3 slot="info_header-title" class="info_header-title">退款退货申请</h3>
			</info_title> <!--售后申请-->
			<info_drawback :drawack="1" :infoIndex="2"></info_drawback>
			<info_down :data="data['return_action_list']" :trackData="data['return_goods_info']['kd_info']?data['return_goods_info']['kd_info']['Traces']:[]">
			</info_down>
		</div>
		<div class="info_logistics">
			<h3 v-if="data['return_goods_info']['status']==1">商家同意申请,请寄回商品</h3>
			<h3 v-else-if="data['return_goods_info']['status']==2">待商家确认收货</h3>
			<div class="logis_tip">
				<label>
					<span>收货单位:<em>速珂智能科技(上海)有限公司</em></span>
					<span>联系电话:<em>+86 02159845308</em></span>
					<span>收货地址:<em>上海市青浦区沪青平公路3938号移动智地72-2楼139-140室</em></span>
				</label>
			</div>
			<div class="logistics_company">
				<ul class="company_lists">
					<li>
						<label>物流公司：</label>
						<select id="express" v-model="expressCode" :class="{'selected-style':expressCode,'default-style':!expressCode,'error':expressCodeError}" @focus="clearExpressCode" :disabled="expressDisabled">
							<option value="">请选择物流公司</option>
							<option v-if="expressList.length>0" v-for="(d,index) in expressList" :value="d.express_code">{{d.express_name}}</option>
						</select>
						<span class='error'>{{expressCodeErrorText}}</span>
					</li>
					<li>
						<label>物流单号：</label>
						<input type="text" v-model="expressSn" placeholder="请输入物流单号" max-length="50" :class="{'error':expressSnError}" @focus="clearExpressSn" :disabled="expressDisabled">
						<span class='error'>{{expressSnErrorText}}</span>
						<span v-if="expressDisabled" class='edit' @click="editListen">修改</span>
					</li>
				</ul>
				<div class="after_apply" v-if="data['return_goods_info']['status']==1" >
					<template v-if="data['return_goods_info']['status']==1">
						<div><span  @click="cancelListen">撤销申请</span></div>
						<button @click="clickListen">提交</button>
					</template>
					<template v-else-if="data['return_goods_info']['status']==2">
						<button v-if="!expressDisabled"  @click="clickListen">提交修改</button>
					</template>
				</div>

			</div>
		</div>
	</div>
</template>

<script> 
	import info_title from '@/components/afterSaleService/info_title_cation.vue'
	import info_drawback from '@/components/afterSaleService/info_drawback.vue'
	import info_down from '@/components/afterSaleService/info_down.vue'
	import axios from 'axios'
	var $this={}
	var $data={
		id:0,
		expressList:[],
		expressSn:'',
		expressCode:'',
		expressCodeError:false,
		expressSnError:false,
		expressCodeErrorText:'',
		expressSnErrorText:'',
		expressDisabled:true
	}
	export default{
		components:{
   		"info_title":info_title,      //订单头部
   		"info_drawback":info_drawback,
   		"info_down":info_down,
   	},
   	created(){
   		this.id=this.$route.params.id;
   		if(this.data['return_goods_info']==null||this.data['return_goods_info']==''){
   			this.$router.push({name:'info_afterSale_check',params:{'id':this.id}});
   		}else{
   			this.getExpressList();
   			if(this.data['return_goods_info']['buyer_delivery']!=''&&this.data['return_goods_info']['buyer_delivery']!=null){
   				var json =JSON.parse(this.data['return_goods_info']['buyer_delivery']);
   				this.expressSn=json.express_sn;
   				this.expressCode=json.express_code;
   				this.expressDisabled=true;
   			}else{
   				this.expressDisabled=false;
   			}
   		}
   	},
   	beforeRouteLeave(to, from, next) {
   		this.$emit("appListen",'loading',false);
   		next();
   	},
   	beforeRouteUpdate(to, from, next) {
   		next(false);
   	},
   	data(){
   		$this =this ;
   		return $data
   	},
   	props:{
   		data:Object
   	},
   	methods:{
   		editListen:function(){
   			$this.expressDisabled=false;
   		},
   		clearExpressCode:function(){
   			$this.expressCodeError=false;
   			$this.expressCodeErrorText='';
   		},
   		clearExpressSn:function(){
   			$this.expressSnError=false;
   			$this.expressSnErrorText='';
   		},
   		getExpressList:function(){
   			$this.$store.commit('loadingUpdate',true);
   			axios({
   				method:'post',
   				url: $basePath+'?c=Express&m=getExpressList',
   				data:{
   					'type':1,
   					'page':1,
   					'limit':20
   				}
   			})
   			.then((response) => {
   				$this.$store.commit('loadingUpdate',false);
   				switch(parseInt(response.data.code)){
   					case 2300100 :{
   						$this.expressList=response.data.data;
   						break;
   					}
   					case 888 :$this.appListen("loginAgain");break;
   					default :$this.appListen("inform","服务器忙,请稍后重试");break;
   				}
   			})
   			.catch(function (error) {
   				$this.$store.commit('loadingUpdate',false);
   				$this.appListen("inform","服务器忙,请稍后重试");
		        //console.log(error);
		    });
   		},
   		clickListen:function(){
   			if($this.expressCode==''){
   				$this.expressCodeError=true;
   				$this.expressCodeErrorText='请选择物流公司';
   				return false;
   			}
   			if($this.expressSn==null||$this.expressSn==''){
   				$this.expressSnError=true;
   				$this.expressSnErrorText='请填写物流单号';
   				return false;
   			}
   			var  myselect=document.getElementById("express");
   			var index=myselect.selectedIndex ; 
   			myselect.options[index].text;
   			$this.$store.commit('loadingUpdate',true);
   			axios({
   				method:'post',
   				url: $basePath+'?c=ReturnGoods&m=saveExchangeGoods',
   				data:{
   					'returnGoodsId':$this.id,
   					'expressName':myselect.options[index].text,
   					'expressSn':$this.expressSn,
   					'expressCode':$this.expressCode
   				}
   			})
   			.then((response) => {
		      //console.log(response.data.data);
		      $this.$store.commit('loadingUpdate',false);
		      switch(parseInt(response.data.code)){
		      	case 1600100 :{
		      		$this.$emit("appListen","inform","提交成功");
		      		$this.$router.push({name:'info_afterSale_check',params:{'id':$this.id}});
		      		break;
		      	}
		      	case 888 :$this.$emit("appListen","loginAgain");break;
		      	default :$this.$router.push({name:'info_afterSale_check',params:{'id':$this.id}});$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
		      }
		  })
   			.catch(function (error) {
   				$this.$store.commit('loadingUpdate',false);
		      //console.log(error);
		  });
   			//$this.$router.push({path:'/info_order_goods/afterSaleService_two/wait'});
      		//window.scrollTo(0,0);
      	},
      	cancelListen:function(){
      		$this.$emit('appListen','cancelAfterSaleOrder',this.id);
      	}
      }
  }
</script>
<style lang="scss">
	.info_aftersale_cation_two_exchange{
		.soco_details_right_top{
			min-height: auto;
		}
		.info_logistics{
			padding: 30px;
			background: #FFF;
			width: 940px;
			height: auto;
			border-radius: 8px;
			margin-bottom: 20px;
			h3{
				font-size: 20px;
				color: #333333;
				font-weight: 600;
			}
			.logis_tip{
				background: #f6f6f6;
				padding: 20px 30px;
				margin: 30px 0;
				border-radius: 8px;
				h4{
					font-size: 14px;
					color: #5c6670;
					margin-bottom: 5px;
				}
				label{
					display: block;
					color: #9da2a6;
					font-size: 14px;
					span{
						@extend label;
						line-height: 22px;
						em{
							margin-left: 8px;
						}
					}
				}
				.order_company{
					margin-top: 20px;
					@extend label;
					>label span{
						color: #5c6670;
					}
				}
			}
			.logistics_company{
				.company_lists{
					>li{
						line-height:30px;
						margin-bottom:20px;
						position:relative;
						label{
							margin-right: 10px;
							display: inline-block;
							font-size: 14px;
							color: #5c6670;
						}
						select,input{
							width: 266px;
							height: 40px;
							border: 1px solid #d2d2d2;
							border-radius: 8px;
							padding-left: 10px;
							color: #333333;
							outline: none;
							transition: all 0.4s;
							&.error{
								border: 1px solid #c8161e;
							}
						}
						select{
							option{
								color:#333333;
								&:first-child{
									display:none;
								}
							}
							&.default-style{
								color:#9DA2A6;
							}
							&.selected-style{
								color:#333333;
							}
						}
						span.error{
							font-size: 12px;
							color:#c8161e;
							position:absolute;
							top: 40px;
							left: 100px;
						}
						span.edit{
							color:#9DA2A6;
							cursor:pointer;
						}
					}
				}
				.after_apply{
					text-align: right;
					>div{
						display: block;
						margin-bottom: 10px;
						margin-right: 60px;
						text-align: right;
						color: #9da2a6;
						font-size: 14px;
						-webkit-box-sizing: border-box;
						box-sizing: border-box;
						span{
							cursor:pointer;
						}
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
		}
	}

</style>
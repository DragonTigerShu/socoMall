<template>
<div class="select-language">
	<div class="detail w">
		<article class="detail-left">
			<div class="detail-left-article"></div>
				<template v-if="arr">
					<MagicZoom :galleryData="arr.galleryData" :baseHead="baseHead"></MagicZoom>
				</template>
				<template v-else></template>
			<div class="tatils">
        	<h1>随车可享受优化购买速珂宝政策</h1>
        	<p>客服电话:400-6388-6666 收市话费</p>
        	<p>周一至周日6:00-21:00</p>
        </div>
		</article>
		<article class="detail-right">
		   	<div class="sales-board">
		   		<template v-if="arr.goodsBaseData">
		   			<h3>{{arr.goodsBaseData[0].goods_name}}</h3>
		   			<p>{{arr.goodsBaseData[0].goods_brief}}</p>
		   		</template>
		   		<template v-else>
		   			<h3>SUPERSOCO</h3>
		   			<p>酷和好玩</p>
		   		</template>
				<!-- 规格说明 -->
				<div class="sales-board-form">
				    <div class="sales-board-info">
						<div class="picse">
							<span>现价</span>
						<span>￥{{goods_price}}</span>
						</div>
				    </div>
<!-- 				    <div class="sales-board-info">
						<div class="picse">
							<span>原价</span>
						<span>￥{{goods_old_price}}</span>
						</div>
				    </div> -->
				    <template v-if="specData">
				    	<div class="sales-board-info sales-color" v-for="(item,index) in specData">
							<div class="left">{{item.spec_name}}</div>
							<div class="right">
								<radioChoose ref="radioChoose" :selections="item"  :baseHead="baseHead" @selectgoodsPrice = "selectgoodsPrice"></radioChoose>
							</div>
					    </div>
				    </template>
				    <div class="sales-board-info sales-num">
						<div class="left">购买数量</div>
						<div class="right">
							<count :max="parseInt(store_count)" @selectCount="selectCount"></count>
						</div>
				    </div>
				    <template v-if="arr.goodsBaseData">
				    	<div class="sales-board-info sales-address">
							<div class="left">配送至</div>
							<div class="right">
								<dropSelect :goodsNum="goodsNum" @shipping_fee = "shipping_fee"></dropSelect>
							</div>
					    </div>
				    </template>
				    <template v-if="arr!=''&&arr.serviceData!=null">
						<div class="sales-board-info sales-serve">
							<div class="left">增值服务</div>
							<div class="right">
								<selectService :addServiceData="arr.serviceData" @addGoodsListen="addServiceListen"></selectService>
							</div>
				    	</div>
				    </template>
				    <template v-if="arr!=''&&arr.addGoodsData!=null">
				    	<div class="sales-board-info sales-purchase">
					    	<div class="left" >搭配购买</div>
					    	<div class="right" >
					    		<selectAddGoods :addGoodsData="arr.addGoodsData" @addGoodsListen="addGoodsListen"></selectAddGoods>
					        </div>
					    </div>
				    </template>
					<div class="sales-board-info sales-purchase">
				        <div class="accounts " >
				       	    <ul class="accou-top">
				       	    	<li v-for="(item,index) in showGoodsData">
				       	    		<span>{{item.goods_name}}  {{item.goods_key_name}}</span><span>X{{item.goods_number}}</span>
				       	    	</li>
				       	    </ul>
				       	    <div class="accou-bottom"><h3>总计:</h3><span>{{moneyall}}</span></div>
				        </div>
				        <div class="buttou-shop" >
				        	<template v-if="isDisabled">
				        		<button type="button" disabled="true" class="disabledStyle"><span>已售罄</span></button>
				        	</template>
				        	<template v-else>
				        		<button type="button" class="shoppingCartAdd" @click="shoppingCartAdd"><span>加入购物车</span></button>
				        	</template>
				        	<div class="clear"></div>
				    	</div>
					</div>
				    <div class="sales-board-info">
				     <!--  <button class="btn" @click="showPayDialog">立即购买</button> -->
				    </div>
			  	</div>
		   </div> 	  
		</article>
		<div class="clear" ></div>
	</div>
	<div style="height: 30px;background: #f5f5f5;"></div>
	<my-Details ref="my-Details" :detcon="detcon"></my-Details>
    <div class="clear"></div>
</div>
</template>

<script>
import RadioChoose from '../../components/detailSelection/radioChoose.vue'
import Count from '../../components/detailSelection/Count.vue'
import Color from '../../components/detailSelection/color.vue'
import dropSelect from '../../components/detailSelection/select.vue'  //下拉列表
import MagicZoom from '../../components/detailSelection/MagicZoom.vue'
import Details from '@/components/page/Details.vue'
import selectAddGoods from '@/components/detailSelection/selectAddGoods.vue'
import selectService from '@/components/detailSelection/selectService.vue'
import axios from 'axios'
var $this={}

var $data={
	arr:'',//商品明细数据
	baseId:'',
	baseHead:'',
	isDisabled:false,  // 禁用按钮
	goodsNum :1, // 购买的数量
	detcon:'',
	specData:[], // 规格参数
	goodsPrice:{},  // 参数价格表
	goods_price:'***',  // 价格
	store_count:0,//库存
	goods_old_price:'',
	goods_key:'',
	arg:[],
	shop_fee:'', // 快递费
	showGoodsData:[],//总计时展示,选择的所有商品
	showServicesData:[],//总计时展示,选择的服务商品
	showAddGoodsData:[],//总计时展示,选择的搭配商品
	addPrice:0,
	imgUnChecked:require('../../common/images/icon/checkbox.png'),
	imgchecked:require('../../common/images/icon/checkbox-checked.png'),
	imgDisabled:require('../../common/images/icon/checkbox-disabled.png'),
}
export default {
	name:'detail',
	data(){
      	$this = this;
      	return $data
	},
	props: {
	},
	mounted: function () {

	},
	computed:{
	   	moneyall :function (){  // 计算总价
			let allp =  $this.goods_price * $this.goodsNum + $this.addPrice;
			if(isNaN(allp))allp='***';
			else allp = allp.toFixed(2);
			return allp
	    }
	},
	created(){
		window.scrollTo(0,0);
		this.baseId =  this.$route.params.id;
		this.baseHead = $baseHead;
		this.refreshData();
	},
	watch: {
	        
	},
	beforeRouteLeave(to, from, next){
		this.clearParams();
		next();
	},
	beforeRouteUpdate(to, from, next) {
		this.clearParams();
	    next();
    },
    methods:{
    	clearParams:function(){
    		$this.goods_price = '***';
			$this.store_count = 0;
			$this.arg=[];
			$this.goodsPrice={};
			$this.$store.commit('loadingUpdate',false);
			$this.goodsNum=1;
			$this.isDisabled=true;
			$this.goods_key='';
			$this.detcon='';
			$this.specData=[];
			$this.showGoodsData=[];
			$this.showServicesData=[];
			$this.showAddGoodsData=[];
			$this.arr='';
    	},
    	mousemoveListen:function(e){
			const x = e.offsetX
  			const y = e.offsetY
			e.target.style.setProperty('--x', `${ x }px`)
			e.target.style.setProperty('--y', `${ y }px`)
    	},
		refreshData(){
			//$this.$emit('appListen','loading',true)  // 开启动画加载
			$this.$store.commit('loadingUpdate',true);
			    axios({
					method:'post',
					url: $basePath+'?c=GoodsCus&m=getGoodsDetails',
					data: {
				    	goodsId:$this.baseId  // 1整车 2周边 3配件
					}
				})
				.then((response) => {
					this.$store.commit('loadingUpdate',false);
					//200131表示已登陆状态，200132表示未登录
					let data =  response.data 
					if(data.code=='2100100'){
						$this.arr=data.data;
						$this.goods_price = $this.arr.goodsBaseData[0].goods_price;
						$this.goods_old_price = $this.arr.goodsBaseData[0].goods_ori_price;
					if($this.arr.specPriceData==null||$this.arr.specPriceData==''||$this.arr.specPriceData==false){
						$this.store_count = $this.arr.goodsBaseData[0].store_count;
					}else{
						$this.specData =  $this.arr.specPriceData.specData;  // 规格参数表信息
						$this.specData.map((cur)=>{   // 数据追加
							let obj={   // 添加数据信息
								spec_id:cur.spec_id,
								val_id:cur.item[0].item_id
							};
							$this.arg.push(obj);
						})
						let end_val_id = '';
						$this.arg.map((val,index)=>{
							if(index==0){
								end_val_id=val.val_id;
							}else{
								end_val_id+='_'+val.val_id;
							}
							
						})
						$this.goods_key = end_val_id;
						$this.goodsPrice  = $this.arr.specPriceData.goodsPrice // 商品确定价格表
						$this.goods_price = $this.goodsPrice[end_val_id].price;   // 确定默认价格 好的 
					    $this.key_name = $this.goodsPrice[end_val_id].key_name;  // 商品名称
					    $this.store_count = $this.goodsPrice[end_val_id].store_count;
					}
					if($this.arr.goodsBaseData[0].is_on_sale==1){
						if($this.store_count>0){
							$this.isDisabled = false
						}else{
							$this.isDisabled = true
						}
					}else{
						$this.isDisabled = true  
					}
				    $this.showGoodsDataInit();
				}else{
					$this.$router.push({path:'/'});
     				window.scrollTo(0,0);
				}
			})
			.catch(function (error) {
				//console.log(error);
		   	});
			// 富文本信息
			axios({
				method:'post', 
				url: $basePath+'?c=GoodsCus&m=getGoodsCon',
				data: {
					goodsId:$this.baseId  // 1整车 2周边 3配件
				}
			})
			.then((response) => {
				//200131表示已登陆状态，200132表示未登录
				$this.detcon = response.data.detcon  // 图片详情
				if($this.detcon!=null&&$this.detcon!='')$this.detcon=$this.detcon.replace(/..\/server/g,$baseHead);
			})
			.catch(function(){
				//console.log(error)
			})
		},
		onParamChange:function(arr,val){ 
			this[arr]= val
		},
		selectgoodsPrice:function(cb,spec_id){  // 颜色和规格
			this.arg.map((cur)=>{
				if(cur.spec_id==spec_id){
				cur.val_id=cb;
				}
			})
			let end_val_id = '';
			this.arg.map((val,index)=>{
				if(index==0){
					end_val_id=val.val_id;
				}else{
					end_val_id+='_'+val.val_id;
				}
			})
			this.goods_key = end_val_id;
			this.goods_price=this.goodsPrice[end_val_id].price;   // 商品价格
			this.key_name = this.goodsPrice[end_val_id].key_name;  // 商品名称
			this.store_count = this.goodsPrice[end_val_id].store_count;
			if(this.arr.goodsBaseData[0].is_on_sale==1){
				if(this.store_count==0){  // 库存为空的情况
					this.isDisabled = true  
				}else{
					this.isDisabled = false  
				}
			}else{
				this.isDisabled = true  
			}
			this.showGoodsDataInit();
		},
      	colorFonts:function(){
      	 	this[arr]= val
		},
		shipping_fee:function($event){
			this.shop_fee = $event
		},
		selectCount:function(val){ // 添加数量
		  this.goodsNum = parseInt(val)  // 点击数量信息
		  this.$set($this.showGoodsData[0],'goods_number',this.goodsNum);
		},
  		shoppingCartAdd:function(){
      	 	if($user==null||$user==''){
      	 		$this.$emit("appListen","informLogin",'登录后可添加购物车');
      	 	}else{
      	 		var goodsArr=[];
      	 		for(var i=0;i<$this.showGoodsData.length;i++){
      	 			if(i==0){
      	 				var temp={
		      	 			'goodsId':$this.showGoodsData[i]['goods_id'],
		      	 			'specKey':$this.showGoodsData[i]['goods_key'],
		      	 			'goodsNum':$this.goodsNum
				   		}
      	 			}else{
      	 				var temp={
		      	 			'goodsId':$this.showGoodsData[i]['goods_id'],
		      	 			'specKey':$this.showGoodsData[i]['goods_key'],
		      	 			'goodsNum':1
					   	}
      	 			}
      	 			goodsArr.push(temp);
      	 		}
      	 		axios({
			        method:'post',
			        url: $basePath+'?c=Cart&m=addCartList',
			        data: {
			        	'goodsArr':goodsArr
			        }
		        })	
		        .then((response) => {
		        //200131表示已登陆状态，200132表示未登录
			        switch(parseInt(response.data.code)){
						case 1000300 :
						$this.$emit("appListen","shoppingCartAdd");
						$this.$emit('appListen','reloadCart');
						break;
						case 1000340 :$this.$emit("appListen","inform",'相关商品已售罄,刷新重试');break;
						case 1000330 ://console.log('请填写必填项');break;
						case 888 :$this.$emit("appListen","loginAgain",'登录后可添加购物车');break;
						default:$this.$emit("appListen","inform",'服务器忙,请刷新后重试');break;
					}
		        })
		        .catch(function (error) { 
		        	//console.log(error);
		      	});
  	 		}
		},
		addGoodsListen:function($arr){
  	 		$this.showAddGoodsData=$arr;
  	 		$this.showGoodsDataInit();
  		},
  		addServiceListen:function($arr){
  			$this.showServicesData=$arr;
  			$this.showGoodsDataInit();
  		},
  		showGoodsDataInit:function(){
  			//添加总计展示商品
  			var tempArray=[];
			var tempGoodsData={}
			var price=0;
			tempGoodsData['goods_id']=$this.baseId;
			tempGoodsData['goods_name']=$this.arr.goodsBaseData[0].goods_name;
			tempGoodsData['goods_price']=$this.goods_price;
			tempGoodsData['goods_key']=$this.goods_key;
			tempGoodsData['goods_key_name']=$this.key_name;
			tempGoodsData['goods_number']=$this.goodsNum;
			tempArray[0]=tempGoodsData;
			for(var i=0;i<$this.showServicesData.length;i++){
				if($this.showServicesData[i]!=null){
					price+=parseFloat($this.showServicesData[i]['goods_price']);
					$this.showServicesData[i]['goods_number']=1;
					tempArray.push($this.showServicesData[i]);
				}
			}
			for(var i=0;i<$this.showAddGoodsData.length;i++){
				if($this.showAddGoodsData[i]!=null){
					price+=parseFloat($this.showAddGoodsData[i]['goods_price']);
					$this.showAddGoodsData[i]['goods_number']=1;
					tempArray.push($this.showAddGoodsData[i]);
				}
			}
			$this.addPrice=price;
			$this.showGoodsData=[];
			$this.showGoodsData=tempArray;
			////console.log($this.showGoodsData);
  		},
	    messageInform:function(){
			$this.$emit("appListen","goodsInform");
		}
  	},
	components:{
      	radioChoose: RadioChoose, // 版本类型
      	Count:Count,   // 数量
      	color:Color,  // 颜色  
      	MagicZoom:MagicZoom,
      	myDetails:Details,
      	dropSelect:dropSelect,
      	selectAddGoods:selectAddGoods,
      	selectService:selectService
	}
}
</script>
<style lang="scss">
.one {  
	color: #9da2a6;
	font-size: 14px;
}  
.detail{
	background-color: #ffffff;
    padding-top:20px;
	width: 1200px;
    .detail-left{
       width:500px;
       float:left;
       height:500px;
    }
    .detail-right{
      	padding: 30px 0 60px 160px;
       	width: 50%;
       	float: left;
       	.sales-board{
			min-height: 800px;
           	h3{
            	font-size: 24px;
                color: #333;
           	}
           	>p{
           	 	@extend .one;
           	 	padding-top: 10px;
           	 	padding-bottom: 30px
           	}
           	.picse{
           	 	@extend .one;
           	 	padding-bottom:20px; 
           	 	width: 100%;
           	 	span:nth-of-type(1){
                width: 25%;
                display: inline-block;
           	 	}
           	 	span:nth-of-type(2){
           	 	   width: 75%;
                   color:#c8161e;
                   font-size: 26px;
                   font-weight: bold;
                    
           	 	}
           	}
        }
       	.sales-board-form{
           	.sales-board-info{
	           	width: 100%;
	            .left{
				    @extend .one;
				    float: left;
				    width: 25%;
				    line-height: 35px;
	            }
	            .right{
	             	display: inline-block;
	             	width: 75%;
	            }
	        }
			.sales-num{
				padding: 15px 0 19px 0;
			}
			.sales-address{
				padding: 0 0 24px 0;
			}
			.sales-serve{
				.right{
					margin-top: 23px;
					border-radius: 4px;
					clear:none;
					height: 110px;
					width: 446px;
					border: 1px solid #e0e0e0;
					.serve{
						width: 100%;
						height: 100%;
						display:flex;
						align-items:center;
						justify-content:flex-start;
						padding:0 15px;
						.serve-checkbox{
							img{
								cursor:pointer;
							}
						}
						.serve-left{
						    img{
						    	height: 80px;
							    width: 80px;
							    margin:0 10px;
							    border-radius: 4px;
						    }
						}
						.serve-center{
							width:230px;
							span{
								color: #333;
								font-size: 14px;
							}
							p{
								color: #9da2a6;
								font-size: 12px;
							}
						}
						.serve-right{
							flex:1;
							display:flex;
						    flex-direction: column;
						    height:100%;
						    justify-content: space-around;
							span{
						    	align-items:flex-end;
						    	color: #333;
						    	cursor:pointer;
							}
							p{
					           align-items:flex-end;
					           color: #C8161E;
							   font-size: 14px;
							}
						}
					}
				}
			}
        	.sales-purchase{
    	    	padding:55px 0;
        	    .right{
				    width: 446px;
				    height: 52px;
				    border-radius: 4px;
				    margin-top: 20px;
				} 
                .accounts{
                    border-radius: 4px;
                    background: #eee;
                    padding: 20px 30px;
                    background-color:#F5F5F5;
                    ul.accou-top{
                        font-size: 16px;
                        color: #333;
                    	>li{
                    		display:flex;
                    		justify-content:space-between;
                    		>span:nth-child(1){
                    			flex:1;
                    		}
                    	}
                        span{
                        	margin-right: 20px;
                        } 
                    }
                    .accou-bottom{
                     	color: #C8161E;
                     	h3{
                         	display: inline-block;
                         	margin-right: 20px;
                         	color: #C8161E;
                         	font-size: 20px;
                        }
                        span{
                            font-size: 20px;

                        }
                    }
                }
				.buttou-shop{
					padding: 50px 0;
					text-align: center;
					button{
						min-width: 180px;
						padding: 9.5px 47.5px;
					    border: none;
					    color: #fff;
					    border-radius: 4px;
					    text-align: center;
					    margin:0 auto;
					    outline: none;
					    font-size: 16px;
					    border: none;
					    -webkit-appearance: none; 
					    cursor:pointer; 
					    margin-right: 10px;
					    margin-left: 10px;
					    letter-spacing: 1px;
					}
					button.disabledStyle{
						background:#5c6670;
						text-decoration:line-through
					}
					button.shoppingCartAdd{
						background:#C8161E;
					}
				}
            }
        }   
    }
    .clear{
    	clear: both;
    }
    .tatils{
    	font-size: 14px;
        padding-top:70px;
    	h1{
    		color: #5c6670;
    		line-height: 30px;
    	}
    	p{
    		color: #9da2a6;
    	}
    }
}

</style>
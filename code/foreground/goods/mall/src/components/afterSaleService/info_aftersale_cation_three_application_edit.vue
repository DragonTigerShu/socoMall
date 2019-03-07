<template>
	<div class="info_aftersale_cation_one_application_edit" v-if="data['return_goods_info']">
		<div class="info_aftersale w">
			<div class="soco_details_right_top info_aftersale_cation">
				<info_title :data="data">
				<h3 slot="info_header-title" class="info_header-title">售后申请编辑</h3>
				</info_title> <!--换货申请-->
				<info_drawback :drawack="2" :infoIndex="0"></info_drawback>
			</div>
		</div>
		<div class="info_aftersale_bottom">
			<h3>换货商品</h3>
			<Sale_list :data="data"></Sale_list> <!--信息列表-->
			<h3>服务类型</h3>
			<Sale_refund style="margin-bottom:20px" :id="parseInt(data['return_goods_info']['id'])" :infoIndex="2"></Sale_refund>
			<div class="info_after_state">
				<div class="info_state_one">
					<h3>货物状态:</h3>
					<label>
						<span>
							<label><img :src="imgchecked">已收到货</label>
						</span>
						<span>*买家已发货,请先查看物流信息或联系商家。</span>
					</label>
				</div>
				<div class="info_state_two">
					<h3>退货数量:</h3>
					<aN style="margin-left:20px;height:41px" :minusDis="minusDis" :addDis="addDis" :num="parseInt(goodsNumber)" @aNClickListen="aNClickListen"></aN>
				</div>
				<div class="info_state_two">
					<h3>退款原因:</h3>
					<select :class="{'selected-style':reason,'default-style':!reason,'error':reasonError}" v-model="reason" @focus="clearReason" >
						<option value="">请选择退款原因</option>
						<option value="质量问题">质量问题</option>
						<option value="颜色发错">颜色发错</option>
						<option value="型号发错">型号发错</option>
						<option value="零件损坏">零件损坏</option>
						<option value="其他">其他</option>
					</select>
					<span class='error'>{{reasonErrorText}}</span>
				</div>
				<div class="info_state_four">
					<h3>换货说明:</h3>
					<textarea v-model='describe'></textarea>
				</div>
				<div class="info_state_five">
					<h3>上传图片:</h3>
					<section class="picList" @click="removeListen($event)">
						<div v-for="(d,index) in picList" :key="index">
							<i class="removeIcon"><img :data-index="index" :src="removeImgDefauly"></i>
							<img :src='baseHead+d.src'>
						</div>
						<div v-if="picList.length<5">
							<label for="upload"><img :src="plusImg"><p>上传凭证</p></label>
							<input type="file" name="file" id="upload" @change="picupload($event)" />
						</div>
					</section>
				</div>
				<div class="info_state_add">
					<h3>收货地址:</h3>
					<aL :reload="reload" :selectAddressId="selectAddressId" @selectListen="selectAddressListen" @appListen="appListen"></aL>  <!--收货地址-->
					
				</div>
				<button type="button"  @click="cation_button()">重新提交</button>
				<div class="info_state_point">
					<p>*点击提交即表示同意“换货规则”</p>
				</div>
			</div>
			<div class="rule">
				<h4>退货规则</h4>
				<p>1.自用户收到商品当日起，7天内可以享受无理由退换货权利。</p>
				<p>2.详情可咨询SOCO客服电话：400-021-2008</p>
				<p>3.自厂家收到退回商品之日起，7个工作日内，网站将退款返还至订单对应支付账户。</p>
				<p>4.详细条款：</p>
				<p class="detail">a.7天无理由退货政策仅对SOCO认证网站销售的商品有效。<br>七天无理由退货不包括以下行为：<br>发票遗失，人为损坏，保修与防伪标签损毁，外观损毁，随车零件缺失，包装箱（纸箱以及木箱）破损或缺失等影响二次销售的情况。<br>b.运费说明<br>对于SOCO承诺提供无理由退货服务的商品，若用户以无理由形式退货或拒收，来回运费均有用户承担。不接受到付快递，如拒收产生的费用由客户自行承担。</p>
				<p>5.若网站提供对该商品的包邮服务，用户仅需承担退货运费。</p>
				<p>6.若用户在商品配送前，通过网站或电话取消订单，用户无需承担任何运费。</p>
				<p>7.如果退货原因是商品质量问题或收到的商品与订单内容不符，退货运费将由SOCO承担。</p>
			</div>
		</div>
	</div>
</template>
<script>
	import info_drawback from '@/components/afterSaleService/info_drawback.vue'
	import Sale_list from '@/components/afterSaleService/info_Sale_list.vue'
	import Sale_refund from '@/components/afterSaleService/info_refund_refunds.vue'
	import info_title from '@/components/afterSaleService/info_title_cation.vue'
	import addressList from '@/components/shoppingCartService/addressList.vue'
	import axios from 'axios'
	import acountNumber from '@/components/shoppingCartService/acountNumber.vue';
	var $data={
		data:{},
		'removeImgDefauly':require('../../common/images/icon/remove-active.png'),
		'imgchecked':require('../../common/images/icon/checkbox-checked.png'),
		'plusImg':require('../../common/images/shoppingCart/add.png'),
		'reason':'',
		'reasonError':'',
		'reasonErrorText':'',
		'picList':[],
		'baseHead':'',
		'id':'',
		'recId':0,
		'goodsNumber':1,
		'minusDis':true,
		'addDis':true,
		'selectAddressId':-1
	}
	var $this={}
	export default{
   	name:'info_aftersale_cation_one_application_edit', //退货
   	beforeRouteLeave(to, from, next) {
   		this.$emit("appListen",'loading',false);
   		next();
   	},
   	beforeRouteUpdate(to, from, next) {
   		next(false);
   	},
   	created(){
   		this.id=this.$route.params.id;
   		this.baseHead=$baseHead;
   		this.initOrder(this.id);
    	this.$emit('initListen',6);//刷新后重置左侧位置
    	window.scrollTo(0,0);
    },
    props:{
    	reload:Boolean
    },
    components:{
    	"info_drawback":info_drawback,
    	"Sale_list":Sale_list,
    	"Sale_refund":Sale_refund,
    	"info_title":info_title,
    	'aL':addressList,
    	'aN':acountNumber
    },
    data() {
    	$this = this;
    	return $data;
    },
    methods:{
    	initOrder:function(id){
    		$this.$store.commit('loadingUpdate',true);
    		axios({
    			method:'post',
    			url: $basePath+'?c=ReturnGoods&m=userReturnGoodsDetail',
    			data:{
    				'returnGoodsId':id,
    			}
    		})
    		.then((response) => {
    			$this.$store.commit('loadingUpdate',false);
    			switch(parseInt(response.data.code)){
    				case 1600100 :{
    					$this.data=response.data.data;
    					$this.reason=$this.data['return_goods_info']['reason'];
    					$this.describe=$this.data['return_goods_info']['describe'];
    					$this.recId=$this.data['return_goods_info']['rec_id'];
    					$this.goodsNumber=$this.data['return_goods_info']['goods_num'];
    					$this.selectAddressId=$this.data['return_goods_info']['address_id'];
    					if($this.goodsNumber==1)$this.minusDis=true;
    					else $this.minusDis=false;
    					if($this.goodsNumber+1>$this.data['order_goods_info']['goods_number'])$this.addDis=true;
    					else $this.addDis=false;
    					if($this.data['return_goods_info']['imgs']!=''){
    						var picListArray=[]
    						picListArray=$this.data['return_goods_info']['imgs'].split(',');
    						for(var i=0;i<picListArray.length;i++){
    							var temp={}
    							temp['src']=picListArray[i];
    							picListArray[i]=temp;
    						}
    						$this.picList=[];
    						$this.picList=picListArray;
    					}
    					break;
    				}
    				case 888 :$this.$emit("appListen","loginAgain");break;
    				default :$this.$router.push({name:'info_order_goods/info_order_aftersale_list'});$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
    			}
    		})
    		.catch(function (error) {
    			$this.$store.commit('loadingUpdate',false);
    			$this.$emit("appListen","inform","服务器忙,请稍后重试");
				//console.log(error);
			});
    	},
    	aNClickListen:function($b){
    		if($b)$this.goodsNumber++;
    		else $this.goodsNumber--;
    		if($this.goodsNumber==1)$this.minusDis=true;
    		else $this.minusDis=false;
    		if($this.goodsNumber+1>$this.data['order_goods_info']['goods_number'])$this.addDis=true;
    		else $this.addDis=false;
    	},
    	selectAddressListen:function($addressId){
    		$this.selectAddressId=$addressId;
    	},
    	clearReason:function(){
    		$this.reasonError=false;
    		$this.reasonErrorText='';
    	},
    	removeListen:function(e){
    		if(e.target.dataset.index!='' && e.target.nodeName.toLowerCase()=='img'){
    			const index = parseInt(e.target.dataset.index);
    			var tempList=[];
    			for(var i=0;i<$this.picList.length;i++){
    				if(i!=index)tempList.push($this.picList[i]);
    			}
    			$this.picList=tempList;
    		}
    	},
    	aNClickListen:function($b){
    		if($b)$this.goodsNumber++;
    		else $this.goodsNumber--;
    		if($this.goodsNumber==1)$this.minusDis=true;
    		else $this.minusDis=false;
    		if($this.goodsNumber+1>$this.data['order_goods']['goods_number'])$this.addDis=true;
    		else $this.addDis=false;
    	},
    	cation_button:function(){
    		if($this.reason==null||$this.reason==''){
    			$this.reasonError=true;
    			$this.reasonErrorText='请选择换货原因';
    			$this.$emit("appListen","inform","请选择换货原因");
    			return false;
    		}
    		if($this.selectAddressId==-1){
    			$this.$emit("appListen","inform","请选择收货地址");
    			return false;
    		}
    		if($this.picList.length>0){
    			var imgs=$this.picList[0]['src'];
    			for(var i=1;i<$this.picList.length;i++){
    				imgs+=','+$this.picList[i];
    			}
    		}
    		$this.$store.commit('loadingUpdate',true);
    		axios({
    			method:'post',
    			url: $basePath+'?c=ReturnGoods&m=editReturnGoods',
    			data:{
    				'returnGoodsId':$this.id,
    				'recId':$this.recId,
		        'type':1,//换货
		        'reason':$this.reason,
		        'describe':$this.describe,
		        'imgs':imgs,
		        'addressId':$this.selectAddressId,
		        'goodsNum':$this.goodsNumber
		    }
		})
    		.then((response) => {
		      //console.log(response.data.data);
		      $this.$store.commit('loadingUpdate',false);
		      switch(parseInt(response.data.code)){
		      	case 1600100 :{
		      		$this.$emit("appListen","inform","提交售后申请成功");
		      		$this.$router.push({name:'info_afterSale_check',params:{'id':$this.id}});
		      		break;
		      	}
		      	case 1600106 :{
		      		$this.$emit("appListen","inform","当前售后订单不可编辑");
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
    	},
    	/*立即触发上传图片*/
    	picupload:function(e){
    		var file = e.target.files[0];
    		var imgArr = [];
		    //遍历得到的图片文件
			//获取文件上传的后缀名
			var type = file.type;
			if(type!=''||type!=null){
				if(type.match(/image.(jpg|jpeg|png)/)){
				  // 类型符合，可以上传
				  if (file.size >= 2*1024*1024) {
				  	$this.$emit('appListen','inform','文件过大,图片最大2M');
				  	return false;
				  } else {
				    // 在这里需要判断当前所有文件中
				    $this.UploadFileFn(file);
				    e.target.value='';
				}
			}else{
				$this.errorFile='图片类型错误(仅png,jpg,jpeg)'; 
				$this.$emit('appListen','inform','图片类型错误(仅png,jpg,jpeg)'); 
				return false;
			}
		}else{
			$this.errorFile='图片类型错误(仅png,jpg,jpeg)'; 
			$this.$emit('appListen','inform','图片类型错误(仅png,jpg,jpeg)');
			return false;
		}
	},
		//相册图片文件上传
		UploadFileFn:function(file) {
			var formData= new FormData();
			//formData.append("files",files[0]);
			//FormData.set 和 append() 的区别在于，如果指定的键已经存在， FormData.set 会使用新值覆盖已有的值，而 append() 会把新值添加到已有值集合的后面。
			//注意：如果你的服务器端是PHP那么为了与php命名习惯一致在名称中需要添加[]，如formData.append('files[]',files[i]);
			formData.append('file',file);
			$this.$store.commit('loadingUpdate',true);
			axios({
				method:'post',
				// withCredentials: true,
				headers:{'Content-Type':'multipart/form-data'},
				url: $basePath+'?c=ReturnGoods&m=uploadReturnGoodsImg',
				data:formData
			})
			.then((response) => {
		      //console.log(response.data.data);
		      $this.$store.commit('loadingUpdate',false);
		      switch(parseInt(response.data.code)){
		      	case 1600100 :{
		      		$this.picList.push(response.data.data);
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
		appListen:function($t,$i){
			$this.$emit("appListen",$t,$i);
		}
	}
}
</script>
<style lang="scss">
	.info_aftersale_cation_one_application_edit{
		.info_aftersale_cation{
			min-height: 200px;
		}
		.info_aftersale_bottom{
			width: 100%;
			min-height: 500px;
			background: #fff;
			border-radius: 4px;
			padding: 30px;
			>h3{
				height:auto;
				line-height:normal;
				font-size: 20px;
				color: #333333;
				font-weight: 600;
				margin-bottom: 15px;
			}
			.rule{
				margin-top:30px;
				width:876px;
				height:416px;
				background: #F5F5F5;
				border-radius: 4px;
				padding:20px 30px;
				margin-bottom:45px;
				>h4{
					font-size: 18px;
					color: #5C6670;
					margin-bottom:20px;
				}
				p{
					font-size: 14px;
					color: #9DA2A6;
					margin: 0;
					line-height:24px;
					&.detail{
						padding-left:1em;
					}
				}
			}
			.info_after_state{
				>div{
					width:100%;
					display:inline-flex;
					flex-direction: row;
				}
				.info_state_one,.info_state_two,.info_state_three,.info_state_four,.info_state_five,.info_state_add{
					position:relative;
					>h3{
						line-height:normal;
						font-size: 20px;
						color: #333333;
						font-weight: 600;
						margin-bottom: 15px;
						height: 40px;
						line-height: 40px;
					}
					span.error{
						font-size: 12px;
						color:#c8161e;
						position:absolute;
						top: 39px;
						left: 123px;
					}
				}
				.info_state_one{
					>label{
						margin-top: 6px;
						display:inline-flex;
						flex-direction: column;
						margin-left:20px;
						span{
							font-size: 14px;
							color: #9DA2A6;
							margin-bottom:10px;
							img{
								position:relative;
								top:5px;
								margin-right:10px;
							}
						}
					}
				}
				.info_state_two{
					select{
						margin-left:20px;
						width:260px;
						height:40px;
						outline:none;
						text-indent:10px;
						border: 1px solid #E6E6E6;
						border-radius: 8px;
						transition: all 0.4s;
						&.error{
							border: 1px solid #c8161e;
						}
					}
				}
				.info_state_three{
					margin-bottom:20px;
					>div{
						display:inline-flex;
						flex-direction: column;
						margin-left:20px;
						input{
							margin-bottom:15px;
							color: #C8161E;
							width:260px;
							height:40px;
							outline:none;
							text-indent:15px;
							border: 1px solid #E6E6E6;
							border-radius: 8px;
							transition: all 0.4s;
							&.error{
								border: 1px solid #c8161e;
							}
						}
						span{
							color: #5c6670;
							font-size: 12px;
						}
					}
				}
				.info_state_four{
					margin-bottom:20px;
					textarea{
						width:750px;
						height:204px;
						resize:none;
						margin-left:20px;
						font-size:16px;
						padding: 10px;
						font: 100 14px/1.5 'PINGFANG','Helvetica Neue',Helvetica,'Hiragino Sans GB','Microsoft YaHei',Arial,sans-serif;
						outline: none;
						text-indent: 10px;
						border: 1px solid #E6E6E6;
						border-radius: 8px;
						-webkit-transition: all 0.4s;
						transition: all 0.4s;
					}
				}
				.info_state_five{
					margin-bottom:30px;
					.picList{
						width: 765px;
						display:flex;
						flex-wrap:wrap;
						margin-left: 20px;
						div{
							margin:0 5px 5px 0px;
							width: 250px;	
							height: 180px;
							text-align:center;
							position:relative;
							i.removeIcon{
								display:none;
							}
							&:hover{
								i.removeIcon{
									display:block;
									position:absolute;
									right:5px;
									top:5px;
								}
							}
							>img{
								height: 100%;
								max-width: 250px;
							}
						}
						label{
							width:250px;
							height:180px;
							border: 1px solid #E0E0E0;
							border-radius: 4px;
							display:block;
							text-align:center;
							padding-top:58px;
							cursor: pointer;
							p{
								font-size: 14px;
								color: #9DA2A6;
								margin-top:25px;
							}
						}
						input{
							display:none
						}
					}
				}
				.info_state_add{
					padding: 5px 0 35px 0;
					>section{
						margin-left:20px;
						width:765px;
						>ul{
							>li{
								margin-right:5px;
								>div{
									width: 250px;
									margin-top:0;
									margin-bottom:5px;
								}
							}
						}
					}
				}
				.info_state_point{
					color: #C8161E;
					text-align: center;
					margin-left: 106px;
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
				>button{
					width:250px;
					height:40px;
					outline:none;
					text-indent:10px;
					border: 1px solid #E6E6E6;
					border-radius: 8px;
					transition: all 0.4s;
					background: #C8161E;
					color:white;
					text-align:center;
					margin-left:106px;
					cursor: pointer;
				}
			}
		}
	}
</style>
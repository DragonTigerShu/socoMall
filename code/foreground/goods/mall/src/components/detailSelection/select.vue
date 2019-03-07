<template>
	<div class="select">
		<div class="select-img">
			<img :src="imgBottom" />
			<select  class='form-control' v-model="region_id"  id="provice"  name="province" @change="provinceListen">  
				<option value="" v-show='false'>请选择地址</option>
				<option :value="item.id"  v-for="(item,index) in province">{{item.name}}</option>
			</select>  
		</div>
		<div class="select-img">
			<img :src="imgBottom" />
			<select  class='form-control'  id="cityId" name="city" v-model="city_id" @change="cityListen">  
				<option value=""  v-show='false'>请选择地址</option>
				<option :value="item.id"  v-for="(item,index) in getCity" >{{item.name}}</option>
			</select>  
		</div>
		<label>运费:
			<template v-if="shipping_fee===''">计算中</template>
			<template v-else><span>￥{{shipping_fee}}</span></template>
		</label>
	</div>
</template>
<script>
	import axios from '@/common/js/axios.js'
	import {mapState} from 'vuex'
	let $data={
		select:'',
		provinceId:'',
		province:[],
		getCity:[],   // 市
		cityId:'',
		shipping_fee:'', //运费 
		region_id:'', // 获取省份
		city_id:'', // 获取市区
		imgBottom:require('../../common/images/page/bottom.png')
	}
	let $this={}
	export default{
		data(){
			$this = this
			return $data
		},
		props:{
			goodsNum:{
				type:Number,
				default:1
			}
		},	
		created:function(){
			this.shipping_fee=0;
			// 获取城市地址
		 	axios({   //现实省会城市信息
		 		method:'post',
		 		url: $basePath+'?c=GoodsCus&m=getIpInfoByClient',
		 	})
		 	.then((response) => {
				//200131表示已登陆状态，200132表示未登录
				let data =  response.data
				if(data.code=='2100100'){
					let latitude = data.data
				    $this.region_id = latitude.region_id.substring(0,latitude.region_id.length-4); // 获取省
				    $this.city_id = latitude.city_id.substring(0,latitude.city_id.length-2);  // 获取市
				    $this.region = latitude.region
				    $this.city = latitude.city
					axios({   //现实省会城市信息
						method:'post',
						url: $basePath+'?c=UserAddress&m=getProvince',
					})
					.then((response) => {
						//200131表示已登陆状态，200132表示未登录
						let data =  response.data
						if(data.code=='600100'){
							let arr = data.data
							$this.province = arr 
						}
					})
					.catch(function (error) { 
						//console.log(error);
					});
					$this.provincesId = $this.region_id;
					$this.getCity = [] //清除 市区
					$this.area = []  // 清除 地区
						axios({   //市区
							method:'post',
							url: $basePath+'?c=UserAddress&m=getCity',
							data:{
								provinceId:$this.provincesId 
							}
						})
						.then((response) => {
							//200131表示已登陆状态，200132表示未登录
							let data =  response.data
							if(data.code=='600100'){
								let arr = data.data
								$this.getCity = arr 
							}
						})
						.catch(function (error) { 
							//console.log(error);
						}); 
						// 默认获取运费信息
						axios({
							method:'post',
							url: $basePath+'?c=GoodsCus&m=getShippingFeeByCity',
							data:{
								goodsId:parseInt($this.$route.params.id),
								areaId:parseInt($this.city_id),
								goodsNum:$this.goodsNum
							},   
						}).then((response) => {
							//200131表示已登陆状态，200132表示未登录
							let data =  response.data
							if(data.code=='2100100'){
								let arr = data.data
								$this.shipping_fee = arr.shipping_fee
								$this.$emit('shipping_fee',$this.shipping_fee)
							}
						}).catch(function (error) { 
							//console.log(error);
						}); 		
					}
				}).catch(function (error) { 
			//console.log(error);
		});
			},
			watch:{
			// 点击
			goodsNum(c,b){
				var _this = this
				_this.goodsNum  = c;
				$this.shipping_fee = '计算中';
				if(this.city_id){
					axios({
						method:'post',
						url: $basePath+'?c=GoodsCus&m=getShippingFeeByCity',
						data:{
							goodsId:parseInt($this.$route.params.id),
							areaId:parseInt($this.city_id),
							goodsNum:_this.goodsNum
						},   
					}).then((response) => {
						//200131表示已登陆状态，200132表示未登录
						let data =  response.data
						if(data.code=='2100100'){
							let arr = data.data
							$this.shipping_fee = arr.shipping_fee
							$this.$emit('shipping_fee',$this.shipping_fee)
						}
					}).catch(function (error) { 
						//console.log(error);
					}); 
				}
			}
		},
		methods:{
			provinceListen:function(e){
				$this.shipping_fee=0;
				$this.provincesId = document.getElementById('provice').value;
				$this.city_id =''
				
					$this.getCity = [] //清除 市区
					$this.area = []  // 清除 地区
						axios({   //市区
							method:'post',
							url: $basePath+'?c=UserAddress&m=getCity',
							data:{
								provinceId:$this.provincesId 
							}
						})
						.then((response) => {
						//200131表示已登陆状态，200132表示未登录
						let data =  response.data
						if(data.code=='600100'){
							let arr = data.data
							$this.getCity = arr 
						}
					})
						.catch(function (error) { 
						//console.log(error);
					});  
					},
					cityListen:function(e){
						$this.cityId = document.getElementById('cityId').value  // 地区
						$this.area =[]
						axios({
							method:'post',
							url: $basePath+'?c=UserAddress&m=getArea',
							data:{cityId:$this.cityId},
						})
						.then((response) => {
							//200131表示已登陆状态，200132表示未登录
							let data =  response.data
							if(data.code=='600100'){
								let arr = data.data
								$this.area = arr
								//$this.$emit('cityId',cityId)
								if($this.cityId){
									axios({
										method:'post',
										url: $basePath+'?c=GoodsCus&m=getShippingFeeByCity',
										data:{
											goodsId:parseInt($this.$route.params.id),
											areaId:parseInt($this.cityId),
											goodsNum:this.goodsNum
										},   
									}).then((response) => {
									//200131表示已登陆状态，200132表示未登录
									let data =  response.data
									if(data.code=='2100100'){
										
										let arr = data.data
										$this.shipping_fee = arr.shipping_fee
										
										$this.$emit('shipping_fee',$this.shipping_fee)
									}
								}).catch(function (error) { 
									//console.log(error);
								}); 
							}
							
							
						}
					})
						.catch(function (error) { 
							//console.log(error);
						}); 
				 //通过城市获取 地理价格
				 
				 
				},
			}
			
		}
	</script>
	<style lang="scss">
		.select{
			position: relative;
			white-space: nowrap;
			.select-img{
				position: relative;
				float: left;
				margin-right: 20px
			}
			.form-control{
				background: none;
				border-radius: 4px;
				width:100px;
				height: 36px;
				border-radius: #eee;
				border: 1px solid #e0e0e0;
				color: #666;
				font-size: 14px;
				outline: none;
				padding-right: 1.8rem;
				padding-left: 1em;
				appearance:none;  
				
				-moz-appearance:none;  
				-webkit-appearance:none;  
			}
			img{
				position: absolute;
				left:85px;
				top: 15px;
			}
			label{
				color: #000;
				line-height: 30px;	
				position:relative;
				top:5px;
				white-space: nowrap;
				span{
					margin-left: 5px;
					font-size: 14px;
				}
			}
		}
	</style>
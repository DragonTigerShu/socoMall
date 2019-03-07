<template>
  <section class="w car">
      <div class="shopStore-escooter-products">
      <router-link :to="{name: 'detail',params:{id:item.goods_id}}" v-for="(item,index) in car_ists" :key="index">
        <div class="shopStore-escooter-products-img">
           <img :src="baseHead+item.goods_img" /> 
        </div>
        <div class="shopStore-escooter-products-des">
            <div class="shopStore-products-des-name">{{item.goods_name}}</div>
            <div class="shopStore-products-des-title">{{item.goods_brief}}</div>
            <div class="shopStore-products-des-price">￥{{item.goods_price}}</div>
        </div>
      </router-link>
    </div>
  </section>
</template>
<script>
import axios from '@/common/js/axios.js'  //接口模板
let $data={
  car_ists:[],
  baseHead:''
}
let $this={}
export default{
  name:'car', 
  data(){
	 	$this = this
 		return $data
  },
  created:function(){
	this.baseHead = $baseHead;
    axios({
      method:'post',
      url: $basePath+'?c=GoodsCus&m=getGoodsByType',
      data: {
        showTypeId:'1'
      }
    })
    .then((response) => {
			let data =  response.data
			if(data.code=='2100100'){
        let arr = data.data
        $this.car_ists = arr  
      }
    })
    .catch(function (error) { 
      //console.log(error);
    });
  }
}
</script>
<style lang="scss">
section.car{
  box-sizing: border-box;
  .shopStore-escooter-products{
    background: #fff;
    padding: 80px 0 30px 0;
    width: 100%;
    display: inline-block;
    position: relative;
    a{
      width: 33.33333%;
      float: left;
    }
    .shopStore-escooter-products-img>img{
      width:320px;
    }
    .shopStore-escooter-products-des{
      padding: 0 30px;
      display: inline-block;
      text-align: left;
      width: 100%;
      .shopStore-products-des-name{
        font-size: 20px;
        color: #333;
        line-height: 32px;
      }
      .shopStore-products-des-title{
        padding-top: 5px;
        padding-bottom: 10px;
        font-size: 14px;
        color: #9DA2A6;  
      }
      .shopStore-products-des-price{
        font-size: 18px;
        color: #c8161e;
        text-align: right;
      }
    }
  }
}
</style>

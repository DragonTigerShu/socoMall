<template>
  <div>
   <div class="slider" style="width:100%;">
    <!-- 配置slider组件 -->
    <slider :pages="someList" :baseUrl="baseUrl" :sliderinit="sliderinit" @slide='slide' @tap='onTap' @init='onInit'>
      <!-- 设置loading,可自定义 -->  
    </slider>
  </div>
  <div class="car">
    <myCar ref="myCar"></myCar>
  </div>
  <div style="background:#f5f5f5">
    <div class="product w">
      <template v-if="boardList&&boardList.length!=0" >
        <div class="goods-arrivls">
          <div class="pro-auto"><h1>新品上架</h1><span>New Arrivals</span></div>
          <div class="pro-tom">
            <template v-for="(item,index) in boardList">
              <div v-if="item['is_on_sale']==1" class="product-item">
                <router-link :to="{name: 'detail',params:{id:item.goods_id}}">
                  <div class="item-goods" >
                    <img :src="baseHead+item.goods_img" /> 
                    <h3>{{item.goods_name}}
                    </h3>
                    <i>{{item.goods_brief}}</i>
                    <p><span>￥</span>{{item.goods_price}}</p>
                  </div>
                </router-link>
              </div>
            </template>
            <div class="clear"></div>
          </div>  
        </div>
      </template>
      <!--配件-->
      <template v-if="fittingList&&fittingList.length!=0" >
        <div class="goods-fittings">
          <div class="pro-auto"><h1>产品配件</h1><span>SOCO Accessories</span></div>
          <div class="pro-tom pro-fittings">
            <template v-for="(item,index) in fittingList">
              <div class="product-item" v-if="item['is_on_sale']==1"  >
                <router-link :to="{name: 'detail',params:{id:item.goods_id}}">
                  <div class="item-goods" >
                    <img :src="baseHead+item.goods_img" /> 
                    <h3>{{item.goods_name}}</h3>
                    <i>{{item.goods_brief}}</i>
                    <p><span>￥</span>{{item.goods_price}}</p>
                  </div>
                </router-link>
              </div>
            </template>
            <div class="clear"></div>
          </div>		
        </div>
      </template>
      <!--周边-->
      <template v-if="cultureList&&cultureList.length!=0">
        <div class="goods-culture">
          <div class="pro-auto"><h1>周边文化</h1><span>SOCO Cultural</span></div>
          <div class="pro-tom pro-culture">
            <template v-for="(item,index) in cultureList">
              <div class="product-item" v-if="item['is_on_sale']==1" >
                <router-link :to="{name: 'detail',params:{id:item.goods_id}}">
                  <div class="item-goods" >
                    <img :src="baseHead+item.goods_img" /> 
                    <h3>{{item.goods_name}}</h3>
                    <i>{{item.goods_brief}}</i>
                    <p><span>￥</span>{{item.goods_price}}</p>
                  </div>
                </router-link>
              </div>
            </template>
            <div class="clear"></div>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>
</template>  

<script>
import slider from '@/components/page/slider.vue'
import Car from '@/components/page/car.vue'
import axios from 'axios';   //接口
import baseUrl from '@/common/js/common.js'
let $data ={
  baseUrl:baseUrl,
  baseHead:'',
  someList:[], //banner轮播图
  /* 主要产品数据 */
  boardList: [],
  fittings: [],//滑动配置[obj]  
  fittingList:[],  // 配件
  cultureList:[], //周边
  sliderinit: {
  currentPage: 0,
  slidesToScroll:1,
  tracking: false,
  thresholdTime: 300,//滑动判定距离
  thresholdDistance: 100,//滑动判定时间
  direction:'vertical',//垂直滚动
  loop:false,//无限循环
  infinite:3,
  autoplay:6000,//自动播放
  timingFunction: 'ease'
  }
};
let $this ={};
export default {
		name:'Product', //商品列表信息
		data(){
     $this= this
     return $data;
   },
   computed:{
   },
   created:function(){
      //配件产品信息
      $this.baseHead=$baseHead;
      $this.someList=[]
      // 首页轮播图
      axios({
        method:'post',
        url:'http://wx.supersoco.com:8070/index.php?c=GetData&m=getCon&pid=7'})
      .then((response) => {
        if(response.data) {
          let data = response.data
          for (let index =0; index < data.length; index++) {
              let element = data[index]  //数组添加到底部
              $this.someList.push(element)
          }
        }
      })
      .catch(function (error) { 
        //console.log(error);
      });
      //新品
      axios({
        method:'post',
        url: $basePath+'?c=GoodsCus&m=getGoodsByIsNew',
        data: {
          isNew:'1'  // 1
        }
      })
      .then((response) => {
      //200131表示已登陆状态，200132表示未登录
      //  //console.log(JSON.stringify(response.data,null,4))
      let data =  response.data
      if(data.code=='2100100'){
        let arr = data.data;
        $this.boardList=[];
        if(arr.length>0){
          for(let i=0;i<arr.length;i++){
            $this.boardList.push(arr[i]);
          }
        }
      }
    })
      .catch(function (error) { 
      //console.log(error);
    });
      // 配件
      axios({
        method:'post',
        url: $basePath+'?c=GoodsCus&m=getGoodsByType',
        data: {
        showTypeId:'2'  // 1整车 2配件 3周边
      }
    })
      .then((response) => {
    //200131表示已登陆状态，200132表示未登录 
    let data =  response.data
    if(data.code=='2100100'){
      let arr = data.data;
      $this.fittingList=[];
      if(arr.length>0){
        for(let i=0;i<arr.length;i++){
          $this.fittingList.push(arr[i]);
        }
      }
    }
  })
      .catch(function (error) { 
    //console.log(error);
  });
      // 周边
      axios({
        method:'post',
        url: $basePath+'?c=GoodsCus&m=getGoodsByType',
        data: {
          showTypeId:'3'  // 1整车 2配件 3周边
        }
      })
      .then((response) => {
        //200131表示已登陆状态，200132表示未登录
        let data =  response.data
        if(data.code=='2100100'){
          let arr = data.data;
          $this.cultureList=[];
          if(arr.length>0){
            for(let i=0;i<arr.length;i++){
              $this.cultureList.push(arr[i]);
            }
          }
        }
      })
      .catch(function (error) { 
      //console.log(error);
    });
    },
    components:{
      'myCar':Car,
      'slider':slider
    },
    methods:{
      onMouseOver:function(){
      //  this.buys = true
    },
    onMouseout:function(){
       //this.buys = false
     },
     turnTo (num) {
      // 传递事件 vue 2.0 传递事件修改了，好的写法应该直接写在空vue类中
      this.$children[0].$emit('slideTo', num);
      // //console.log(this);
    },
    slideNext () {
      this.$children[0].$emit('slideNext');
      //  //console.log(this.$children[0].$emit('slideNext'));
      // //console.log(this.$children[0].$emit('slideNext').$options.parent);
      //childComponents.$emit('slideNext');
      // this.next();
    },
    slidePre () {
      this.$children[0].$emit('slidePre');
         // childComponents.$emit('slidePre')
       },
       appendslider(){
      // this.someList.push({
      //     title: 'slidernew',
      //     style:{
      //         background:'#333',
      //         color:'#fff'
      //     }
      // });
    },
    // Listener event
    slide (data) {
      ////console.log(data)

    },
    onTap (data) {
       // //console.log(data)  //向上
      //  alert('onTap'+data)
    },
    onInit (data) {
      //  //console.log(data)  //向下
      // alert("onTnit"+data)
    }
  }
}
</script>
<style lang="scss">
	.product{
		position: relative;
		min-height: 1000px;
		padding: 20px 0;
		.pro-auto{
      padding: 45px 0 25px 0;
      h1{
        font-size: 22px;
        display: inline-block; 
      }
      span{
        margin-left: 10px;
        color:#9DA2A6;
        font-size: 18px; 
      }
    }
    .pro-tom{
      display: flex;
      flex-direction: row;	
      justify-content: unset;
      flex-wrap: wrap;
      .product-item{
        float: left;
        position: relative;
        background: #fff;
        transition: all .5s;
        height: auto;
        border-radius:10px;
        position: relative;
        overflow: hidden;
        width:262px;
        justify-content:flex-start;
        border: 1px solid #f4f4f4;
        margin-bottom: 30px;
        margin: 0 25px 30px;
        height:auto;
        &:nth-child(4n-3){
          margin-left: 0;
        }
        &:nth-child(4n){
          margin-right: 0;
        }
        &:hover{
          -webkit-transform: translateY(-3px);
          transform: translateY(-3px);
          box-shadow: 1px 5px 20px #d0d0d0;
          button{
            opacity: 1;
            transition:all 0.5s;
            -o-transition:all 0.5s;
            -webkit-transition:all 0.5s;
            -moz-transition:all 0.5s;
            -ms-transition:all 0.5s;
            &:hover{
              background: #c90400;
            }
          }
        }
        .item-goods{
          overflow: hidden;
          width: 100%;
          bottom:0;
          padding:30px;
          margin-bottom:5px;
          cursor: pointer;
          img{
            width: 100%;
            display: block;
            min-height: 200px;
          }
          h3{
           line-height: 1.2;
           font-size: 18px;
           color: #5c6670;
           margin: 0 auto;
           padding: 0px 14px;
           text-align: center;
           overflow: hidden;
           padding-top: 20px;
         }
         i{
           display: block;
           font-style: normal;
           text-align: center;
           line-height: 1.2;
           font-size: 14px;
           color: #a4a9ad;
           margin: 10px;
           min-height: 50px;
         }
         p{
          margin: 0px 30px 20px 0;
          color: #e4393c;
          text-align: right;
          font-size: 20px;
          position: absolute;
          right: 0;
          bottom:0;
        }
        span{
          color: #C8161E;
          text-align: right;
          font-size: 16px;
        }

      }	

    }
  }
  .pro-fittings{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .pro-culture{

  }
  button{
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    margin-left: 10px;
    margin-bottom: 10px;
    border: none;
    opacity: 0;
    font-size: 12px;
    border-radius: 5px;
    padding: 5px 10px;
    background: #e4393c;
    color: #fff;
  }
  button{
    outline:none;
    box-shadow: none;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
    cursor: pointer;
    border:0;
  }
}

</style>                                                                                                                                           
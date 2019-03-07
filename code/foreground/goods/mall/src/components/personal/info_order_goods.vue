<template>
  <!--order主目录信息-->
  <div class="info_order_goods">  
    <section class="info_order_menu w">
      <div class="order_goods_title" v-show="details_muen">
        <label>
          <span v-for="(item ,index) in info1" v-if="v_number==1" :key="index" :class="{activees:index===orderStatus}" @click="$events(index)">{{item}}</span>
          <span v-for="(item ,index) in info2" v-if="v_number==2" :key="index" :class="{activees:index===orderStatus}" @click="$events(index)">{{item}}</span> 
        </label>
      </div><!--title information-->
      <div class="order_goods_menu">
        <!--left right menu -->
        <div class="order_menu_left" >
          <info_left  @infoLeftListen="infoLeftListen" :info_left="parseInt(info_left)" :headImg="headImg" @appListen="appListen"></info_left>   <!-- 做菜单 -->
        </div>
        <div class="order_menu_right">
          <router-view :reload="reload" :headImg="headImg" @initListen="initListen" :orderStatus="orderStatus" @appListen="appListen"></router-view>  <!--主路由名称-->
        </div>
      </div>
    </section>
  </div>
</template>
<script>
  import info_left from "@/components/personal/info_left.vue";
  import axios from "axios";
  let $this = {}
  let $data ={
    info1:['个人中心','账户信息'],
    info2:['个人中心','全部订单','待付款','待收货','已完成'],
  infoIndex:1,  //头
  info_left:'',
  menuLeft:true,
  details_muen:true,
  v_number:1,
  headImg: require("../../common/images/personal/pictured.png"),
}

export default{
  name:'info_order_goods',
  props:{
    reload:Boolean,
    // menuNext:Boolean
  },
  data () {
    $this = this
    return $data
  },
  computed:{
    orderStatus:function(c,v){
      return $this.$store.state.order.orderStatus;
    }
  },
  watch:{
    reload(c,v){
      this.headImg=$user.headImg;
    },
  },
  created(){
    if($flag){//首次刷新页面时,$flag的初始值为0,app.vue会请求一次登录判断接口,此处就不需要请求,appvue请求过后,$flag=1,为防止用户再次直接进入路由,作此判断
      if($user.user_name==null||$user.user_name==''){//当appvue已请求过登录接口，且用户全局变量仍未空,则
        $this.$router.push({path:'/'});
      }
    }
    if($user.headImg!=null&&$user.headImg!='')this.headImg=$user.headImg;
  },
  methods: {
    $events:function(index){
      ////console.log(index,'****************-------**')
      $this.infoIndex = index
      if(index==0){   
        $this.v_number = 1
        $this.infoIndex =1
        $this.info_left =''
        //this.orderStatus = 1
        $this.$store.commit('orderStatusUpdate',1);
        $this.$router.push({path:'/info_order_goods'})
        window.scrollTo(0,0)
      }else{
        //  $this.$emit('order_list',index);
        //this.orderStatus = index
        $this.$store.commit('orderStatusUpdate',index);
      }
    },
    appListen:function($c,$i){
      $this.$emit("appListen",$c,$i);
    },
    initListen:function($num){//刷新与跳转后初始化左侧与头部
      $this.info_left='';
      switch(parseInt($num)){
        case 0:{//个人中心
          $this.details_muen= true;
          $this.v_number =1;
          break;
        }
        case 1:{//我的订单
          $this.details_muen= true;
          $this.info_left=0;
          $this.v_number =2;
          break;
        }
        case 2:{//售后订单
          $this.details_muen= true
          $this.info_left=1;
          $this.v_number =2;
          break;
        }
        case 3:{//收货地址
          $this.details_muen= true
          $this.info_left=2;
          $this.v_number =1;
          break;
        }
        case 4:{//订单详情
          $this.details_muen= false;
          $this.info_left=0;
          break;
        }
        case 5:{//订单支付
          $this.details_muen= false;
          $this.info_left=0;
          break;
        }
        case 6:{//售后详情
          $this.details_muen= false;
          $this.info_left=1;
          break;
        }
        case 7:{//订单详情-待付款
          $this.details_muen= true;
          $this.v_number =2;
          $this.info_left=0;
          $this.$events(2);
          break;
        }
        case 8:{//订单详情-待收货
          $this.details_muen= true;
          $this.info_left=0;
          $this.v_number =2;
          $this.$events(3);
          break;
        }
      }
    },
    infoLeftListen:function(index){//左侧个人中心
      switch(parseInt(index)){
        case 0:{//我的订单
          $this.$store.commit('orderStatusUpdate',1);
          $this.$router.push({name:'info_order_goods/info_order_list'});
          window.scrollTo(0,0);
          break;
        }
        case 1:{//售后订单
          $this.$router.push({name:'info_order_goods/info_order_aftersale_list'});
          window.scrollTo(0,0);
          break;
        }
        case 2:{//收货地址
          $this.$router.push({name:'info_order_goods/info_address_msg'});
          window.scrollTo(0,0);
          break;
        }
        case 3:{//修改密码
          $this.$emit('appListen','editPassword');
          break;
        }
        case 4:{//退出登录
          $this.$emit('appListen','loginOut');
          break;
        }
      }
    }
  },
  components:{
    info_left:info_left
  }
}
</script>

<style lang="scss">
  .info_order_goods{
    background: #f5f5f5;
    .order_goods_title{ 
      background-color: #fff;
      height: 46px;
      line-height: 46px;
      border-radius: 4px;
      margin-bottom: 20px;
      label{
        display:block;
        width: 100%;
        span{
          display: inline-block;
          width: 20%;
          height: 46px;
          line-height: 46px;
          color: #333;
          text-align: center;
          font-size: 16px;
          cursor:pointer;
          &.activees:nth-of-type(1){
            border-bottom:none;
          }
          &.activees{
            border-bottom: 3px solid #CA1113;
          }
        }
      }
    }
    .info_order_menu{
      position: relative;
      overflow: hidden;
      padding: 50px 0px;
      height: auto;
      .order_goods_menu{
        width: 100%;
        display: flex;
        .order_menu_left{
          margin-right: 10px;
        }
        .order_menu_right{
          width: 940px;
          border-radius: 4px;
          overflow: hidden;
          flex: 1;
          margin-left: 10px;
        }
      }
      .account-info{
        padding: 0px 10px;
      }
    }
  }
</style>
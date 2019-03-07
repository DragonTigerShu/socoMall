<template>
  <!--order主目录信息-->
  <div class="order_goods_name ">  
    <section class="info_order_menu w">
     <div class="order_goods_menu"><!--left right menu -->
       <div class="order_menu_left" >
        <info_left @infoLeftListen="infoLeftListen" :info_left="1" :headImg="headImg" @appListen="appListen" ></info_left>   <!-- 做菜单 -->
      </div>
      <div class="order_menu_right">
       <router-view :data="data" @checkOrderListen="checkOrderListen" @appListen="appListen"></router-view>  <!--主路由名称-->
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
    headImg: require("../../common/images/personal/pictured.png"),
    data:{}
  }

  export default{
    name:'info_order_goods',
    props:{
      reload:{type:Boolean,default:false}
    },
    data () {
     $this = this
     return $data
   },
   watch:{
    reload(c,v){
      this.headImg=$user.headImg;
      this.checkOrderListen(this.$route.params.id);
    }
  },
  props:{
    reload:Boolean,
    // menuNext:Boolean
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
    infoLeftListen:function(index){//左侧个人中心
      switch(parseInt(index)){
        case 0:{//我的订单
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
    },
    checkOrderListen:function(id){
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
            $this.data={}
            $this.data=response.data.data;
            switch (parseInt($this.data['return_goods_info']['type'])){
              case 0:{//退货退款
                switch (parseInt($this.data['return_goods_info']['status'])){
                  case -2:$this.$router.push({name:'info_aftersale_cation_two_application',params:{'id':id}});break;//已取消
                  case -1:$this.$router.push({name:'info_aftersale_cation_two_fail',params:{'id':id}});break;//未通过
                  case 0:$this.$router.push({name:'info_aftersale_cation_two_application',params:{'id':id}});break;//待审核
                  case 1:$this.$router.push({name:'info_aftersale_cation_two_exchange',params:{'id':id}});break;//通过=>待寄回
                  case 2:$this.$router.push({name:'info_aftersale_cation_two_exchange_wait',params:{'id':id}});break;//买家已发货=>待商家收货
                  case 3:$this.$router.push({name:'info_aftersale_cation_two_success',params:{'id':id}});break;//商家已收货=>商家已收货,准备发货中
                  case 5:$this.$router.push({name:'info_aftersale_cation_two_success',params:{'id':id}});break;
                }
                break;
              }
              case 1:{//换货
                switch (parseInt($this.data['return_goods_info']['status'])){
                  case -2:$this.$router.push({name:'info_aftersale_cation_three_application',params:{'id':id}});break;//已取消
                  case -1:$this.$router.push({name:'info_aftersale_cation_three_fail',params:{'id':id}});break;//未通过
                  case 0:$this.$router.push({name:'info_aftersale_cation_three_application',params:{'id':id}});break;//待审核
                  case 1:{
                    if(parseInt($this.data['return_goods_info']['is_need_paid'])){
                      if(parseInt($this.data['return_goods_info']['is_paid']))
                        $this.$router.push({name:'info_aftersale_cation_three_exchange',params:{'id':id}});
                      else
                        $this.$router.push({name:'info_aftersale_cation_three_pay',params:{'id':id}});//待审核
                    }else{
                      $this.$router.push({name:'info_aftersale_cation_three_exchange',params:{'id':id}});
                    }
                    break;
                  }//通过=>待寄回
                  case 2:$this.$router.push({name:'info_aftersale_cation_three_exchange_wait',params:{'id':id}});break;//买家已发货=>待商家收货
                  case 3:$this.$router.push({name:'info_aftersale_cation_three_success',params:{'id':id}});break;//商家已收货=>商家已收货,准备发货中
                  case 4:$this.$router.push({name:'info_aftersale_cation_three_success',params:{'id':id}});break;//商家已发货=>商家已发货
                  case 5:$this.$router.push({name:'info_aftersale_cation_three_success',params:{'id':id}});break;//已完成=>已完成
                }
                break;
              }
              case 2:{//仅退款
                switch (parseInt($this.data['return_goods_info']['status'])){
                  case -2:$this.$router.push({name:'info_aftersale_cation_one_application',params:{'id':id}});break;//已取消
                  case -1:$this.$router.push({name:'info_aftersale_cation_one_fail',params:{'id':id}});break;//未通过
                  case 0:$this.$router.push({name:'info_aftersale_cation_one_application',params:{'id':id}});break;//待审核
                  case 1:$this.$router.push({name:'info_aftersale_cation_one_success',params:{'id':id}});break;//待退款
                  case 5:$this.$router.push({name:'info_aftersale_cation_one_success',params:{'id':id}});break;//已完成=>已完成
                }
                break;
              }
            }
            break;
          }
          case 888 :$this.appListen("loginAgain");break;
          default :$this.$router.push({name:'info_order_goods/info_order_aftersale_list'});$this.appListen("inform","服务器忙,请稍后重试");break;
        }
        window.scrollTo(0,0);
      })
.catch(function (error) {
  $this.$store.commit('loadingUpdate',false);
  $this.appListen("inform","服务器忙,请稍后重试");
        //console.log(error);
      });

      // switch(id){//根据状态跳转到对应售后订单状态页面 参考路由index.js中的/afterSale_order内子路由
      //   case 0 :$this.$router.push({name:'info_aftersale_cation_one_application',params:{id:$this.id}});break;
      // }
    },
    appListen:function($c,$i){
      $this.$emit("appListen",$c,$i);
    }
  },
  components:{
   info_left:info_left
 }
}
</script>

<style lang="scss">
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
  .order_goods_name{
   background: #f5f5f5;
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

</style>
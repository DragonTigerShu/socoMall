<template>
  <div id="app">
    <div class="wrapper">
      <!--header-->
      <div class="app-header">
        <div class="app-header-inner">
          <!--给tu添加路由, logo图点击跳转到首页-->
          <a href="http://www.supersoco.com/second-phase/ch/index.php"><img class="header-img" src="./common/images/login/logo.png"/></a>
          <nav class="nav vertical">
            <a href="http://www.supersoco.com/second-phase/ch/index.php">速珂电动</a>
            <router-link :to="{path:'/'}" class="">官方商城</router-link>
            <a href="http://bbs.supersoco.com" target="_blank">社区</a>
            <a href="http://www.supersoco.com/second-phase/ch/server.php" >服务</a>
            <a href="javascript:void(0)" @mouseenter="showSOCOBAO" @mouseleave="hideSOCOBAO">速珂宝</a>
            <a href="http://www.supersoco.com/second-phase/ch/footer-app-download.php">下载</a>
            <a href="http://www.supersoco.com/second-phase/ch/footer-join-us.php">加入我们</a>
          </nav>
          <div class="back-list" @mouseenter="showSOCOBAO" @mouseleave="hideSOCOBAO">
            <ul class="contain" :class="{'active':socoFlag}">
              <li onclick="window.open('http://www.supersoco.com/second-phase/ch/speed_treasure.php')">
                <a href="javascript:;">
                  <img src="http://wx.supersoco.com/pc/images/common/logose.png" style="width: 41px">
                </a>
                <h3>产品介绍</h3>
              </li>
              <li onclick="window.open('http://wx.supersoco.com/index.php?c=SukeBao&amp;m=baobao')">
                <a href="javascript:;">
                  <img src="http://wx.supersoco.com/pc/images/common/query.png" style="width: 84px">
                </a>
                <h3>激活和查询</h3>
              </li>
            </ul>
          </div>
          <ul class="fl-r ul-mian">
            <li class="img-login" v-on:mouseenter="dataDetails()" data-function="go" @click="goInfo($event)"  v-on:mouseleave="hiddenDetail()" >
              <transition name="transitionOne">
                <div class="menu-title" v-if="order==false" v-show="login_reg">
                  <div class="nav">
                    <ul class="fl-r" > 
                      <li v-for="(item,index) in items" :class="{active:index===nextIndex}" @click="$events(index)"><router-link :to="{}"  >{{item.name}}</router-link></li>
                    </ul>
                  </div>
                </div>	
                <Personal v-else :personal_list="login_reg" @order-userName="order_colse" @order_topIndex ="order_topIndex"  @order_info="order_info()" :userNames="userName" @appListen="appListen"></Personal>
              </transition> 
            </li>
            <li class="img-shopping"  v-on:mouseenter="shopDetails()" @click="goShoppingCart"  v-on:mouseleave="shopDetail()">
            </li>
            <li v-on:mouseenter="keepShopDetails()"  v-on:mouseleave="shopDetail()">
              <transition name="transitionOne">
                <Peurchat ref="Peurchat" :reloadCart="reloadCart"  v-show="shoping" @closePurchase="closePurchase"></Peurchat>
              </transition>
            </li>
          </ul>
        </div>
      </div>
      <div class="app-content">
        <router-view :key="" :reload="reload" :menuNext="menuNext"  :reloadCart="reloadCart"  @appListen="appListen"></router-view>
      </div>
      <!--<vProduct ref="vProduct"></vProduct> -->
      <vfooter ref="vfooter"></vfooter>
    </div>
    <!-- 弹窗start -->
    <section>
      <dialogLogin :isShow="dialogLogin" @clickListen="dialogLoginListen" @registerListen="$events(0)" @forgetListen="forgetListen"></dialogLogin>
      <dialogRegister :isShow="dialogRegister" @clickListen="dialogRegisterListen" @loginListen="$events(1)"></dialogRegister>
      <dialogPassword :isShow="dialogPassword" @clickListen="dialogPasswordListen"></dialogPassword>
      <dialogSuccess :isShow="dialogSuccess" :type="dialogSuccessPic" :h="dialogSuccessText" @clickListen="dialogSuccessListen"></dialogSuccess>
      <dialogConfirm :isShow="dialogConfirm" :h="dialogConfirmText" :p="dialogConfirmTip" :ok="dialogConfirmOKText" :cancel="dialogConfirmCancelText" :confirm='dialogConfirmButtonText' @clickListen="dialogConfirmListen"></dialogConfirm>
      <dialogEditUserName :isShow="dialogEditUserName" @clickListen="dialogEditUserNameListen"></dialogEditUserName>
      <dialogEditPhoneOne :isShow="dialogEditPhoneOne" @clickListen="dialogEditPhoneOneListen"></dialogEditPhoneOne>
      <dialogEditPhoneTwo :isShow="dialogEditPhoneTwo" :cover="false" @clickListen="dialogEditPhoneTwoListen"></dialogEditPhoneTwo>
      <dialogEditPasswordOne :isShow="dialogEditPasswordOne" @clickListen="dialogEditPasswordOneListen"></dialogEditPasswordOne>
      <dialogEditPasswordTwo :isShow="dialogEditPasswordTwo" :cover="false" @clickListen="dialogEditPasswordTwoListen" @appListen="appListen"></dialogEditPasswordTwo>
      <dialogLoading :isShow="dialogLoading"></dialogLoading>
    </section>
    <!-- 弹窗end -->
  </div>
</template>
<script>
    import vfooter from '@/components/footer.vue';  //底部信息
    import Personal from '@/components/page/personal_list.vue'  //个人订单信息
    import Peurchat from '@/components/page/purchasing_list.vue'    //购物车清单
    import dialogConfirm from '@/components/dialog/dialogConfirm';
    import dialogLogin from '@/components/dialog/dialogLogin.vue'   //登录
    import dialogRegister from '@/components/dialog/dialogRegister.vue'
    import dialogPassword from '@/components/dialog/dialogPassword';
    import dialogSuccess from '@/components/dialog/dialogSuccess';
    import dialogEditUserName from '@/components/dialog/dialogEditUserName';
    import dialogEditPasswordOne from '@/components/dialog/dialogEditPasswordOne';
    import dialogEditPasswordTwo from '@/components/dialog/dialogEditPasswordTwo';
    import dialogEditPhoneOne from '@/components/dialog/dialogEditPhoneOne';
    import dialogEditPhoneTwo from '@/components/dialog/dialogEditPhoneTwo';
    import dialogLoading from '@/components/dialog/dialogLoading';
    import {overflowDisabled} from '@/common/js/data'
    import axios from '@/common/js/axios.js'
    let phone;
    var $data ={
      userName:'',
      show:false,
      login_reg:false,
      shoping:false,
      vctives:true,
      acer:false,
      phone1:'',
      order:false,
      nextIndex:1,
      topIndex:0,
      items:[{
       name:'注册'
     },{
       name:'登录'
     }],   
     arr:['0','1'],
    clockOne:'',//定时器
    clockTwo:'',//定时器
    clockThree:'',
    recId:'',//（删除）购物车某个商品的Id
    orderId:'',//(取消)订单Id
    dialogPassword:false,
    dialogConfirm:false,
    dialogSuccess:false,
    dialogRegister:false,
    dialogLogin:false,
    dialogEditUserName:false,
    dialogEditPhoneOne:false,
    dialogEditPhoneTwo:false,
    dialogEditPasswordOne:false,
    dialogEditPasswordTwo:false,
    //dialogLoading:false,
    dialogSuccessText:'',
    dialogConfirmType:0,//0只是提示//1退出登录//2删除地址//3去登录
    dialogConfirmText:'',
    dialogConfirmTip:'',
    dialogConfirmButtonText:'',
    dialogConfirmOKText:'',
    dialogConfirmCancelText:'',
    dialogSuccessType:true,//t重新登录f正常提示
    dialogSuccessPic:0,//0成功1手机2人3时钟4短信
    reload:false,
    reloadCart:false,
    addressId:'',
    menuNext:true,
    socoFlag:false
  };
  var $this ={
    
  }
  export default {
    name: 'app',
    data () {
     $this = this
     return $data;
   },
   computed:{
    dialogLoading(){
      return this.$store.getters.loadingGet;
    },
    key() {
      return this.$route.fullPath;
    }
  },
  created:function(){
    if($user.user_name==''||$user.user_name==null){
      axios({
        method:'post',
        url: $basePath+'?c=User&m=checkLogin',
        data: {}
      })
      .then((response) => {
        //200131表示已登陆状态，200132表示未登录
        $flag=1;
        //console.log(response.data);
        switch(parseInt(response.data.code)){
          case 500131 :{
            $user=response.data.data[0];
            $user.phone=$user.mobile_phone.substr(0,3)+"****"+$user.mobile_phone.substr(7,11);
            if($user.head_pic!=null&&$user.head_pic!='')$user.headImg=$headPicPath+$user.head_pic;
            $this.order=true;
            $this.login_reg=false;
            $this.reload=!$this.reload;
            $this.getCart();//获取购物车信息
            break;
          }
          case 500132 :window.scrollTo(0,0);break;
          case 888 :window.scrollTo(0,0);break;
          default:break;
        }
      })
      .catch(function (error) { 
        //console.log(error);
      });
    }else{
      $this.order=true;
      $this.login_reg=false;
    }
  },
  mounted(){
    //$this.$store.commit('loadingUpdate',false);
  },
  components:{
   vfooter,
   'Personal':Personal,
   'Peurchat':Peurchat,
   'dialogPassword':dialogPassword,
   'dialogConfirm':dialogConfirm,
   'dialogSuccess':dialogSuccess,
   'dialogLogin':dialogLogin,
   'dialogRegister':dialogRegister,
   'dialogEditUserName':dialogEditUserName,
   'dialogEditPhoneOne':dialogEditPhoneOne,
   'dialogEditPhoneTwo':dialogEditPhoneTwo,
   'dialogEditPasswordOne':dialogEditPasswordOne,
   'dialogEditPasswordTwo':dialogEditPasswordTwo,
   'dialogLoading':dialogLoading
 },
 methods: {
    //方法入口
    //登录
    showSOCOBAO:function(){
      clearTimeout($this.clockThree);
      $this.socoFlag=true;
    },
    hideSOCOBAO:function(){
      clearTimeout($this.clockThree);
      $this.clockThree = setTimeout(function (){
        $this.socoFlag=false;
      }, 250);
    },
    dataDetails:function(event){
      clearTimeout($this.clockOne);
      $this.login_reg = true
    }, 
    hiddenDetail:function(event){
      clearTimeout($this.clockOne);
      $this.clockOne = setTimeout(function (){
        $this.login_reg = false
      }, 250);
    },
    order_topIndex:function($b){
      window.scrollTo(0,0);
        //$this.$router.push({path:'/info_order_goods',params:{leftIndex:$b}});
        switch (parseInt($b)){
          case 0:{
            $this.$router.push({name:'info_order_goods/info_account'});
            window.scrollTo(0,0);
            break;
          }
          case 1:{
            $this.$router.push({name:'info_order_goods/info_order_list'});
            window.scrollTo(0,0);
            break;
          }
          case 2:{
            $this.$router.push({name:'info_order_goods/info_address_msg'});
            window.scrollTo(0,0);
            break;
          }
          case 3:{
            $this.appListen('editPassword');
            break;
          }
          case 4:{
            $this.appListen('loginOut');
            break;
          }
        }
      },
      shopDetails:function(){
      //判断是否登录过
      
      if($user.user_name!="" && $user.user_name!=null){   //已登录状态
        clearTimeout($this.clockTwo);
        this.shoping = true
        $this.order = true
        $this.login_reg = false
        
      }else{      //未登录状态
       $this.order = false    
       $this.login_reg = true
       
     }
     
   },
   keepShopDetails:function(){
      if($user.user_name!="" && $user.user_name!=null){   //已登录状态
        clearTimeout($this.clockTwo);
        $this.shoping = true
        $this.order = true
        $this.login_reg = false
      }else{      //未登录状态
        $this.order = false    
        $this.login_reg = true
      }
    },
    shopDetail:function(){
      clearTimeout($this.clockTwo);
      $this.clockTwo = setTimeout(function (){
        $this.shoping = false;
      }, 250);
    },
    closePurchase:function(){
      $this.shoping = false;
    },
    $events:function(index){
      overflowDisabled(true);
      $this.dialogLogin=false;
      $this.dialogRegister = false;
      if(index==0){
    		$this.dialogRegister = true;  //注册
    	}else{
    		$this.dialogLogin=true;   //登录
    	}
      $this.nextIndex = index
    },
    order_colse:function(userNames){
      if(userNames==""){
        $this.order = false  
        $this.login_reg = true
      }else{
       $this.order = true
       $this.login_reg = false
     }
   },
   closeDialog:function(emelt){
    $this[emelt] =false
  },
  infoSuccess:function(){
    $this.isShowsucceeDialog = false;
    $this.isShowLogDialog=true;
    if($this.isShowLogDialog==true) $this.order = true
      else  $this.order = false
    },
  goShoppingCart:function(){
    if($user.user_name==''||$user.user_name==null){
      $this.$events(1);
    }else{
      window.scrollTo(0,0);
      $this.$router.push({path:'/shoppingCart'});
    }
  },
  goInfo:function(e){
    if($user.user_name==''||$user.user_name==null){
      $this.$events(1);
    }else{
      if(e.target.nodeName.toLowerCase()=='li'){
        var fun = e.target.dataset.function;
        if(fun!=null&&fun!=''){
          window.scrollTo(0,0);
          $this.$router.push({path:'/info_order_goods'});
          $this.order_topIndex(0);
        }
      }
    }
  },
    appListen:function($c,$d){// $c case name $d 其他参数
      switch($c){
        case 'inform':{
          overflowDisabled(true);
          $this.dialogConfirmText=$d;
          $this.dialogConfirmButtonText='确认';
          $this.dialogConfirmOKText='';
          $this.dialogConfirmCancelText='';
          $this.dialogConfirmType=0;
          $this.dialogConfirm=true;
          break;
        }
        case 'relogin':{
          $this.$router.push({path:'/'});window.scrollTo(0,0);
          $this.order = false;
          $this.login_reg = false;
          $this.dialogLogin=true;
          break;
        }
        case 'loginAgain':{//身份过期，提示重新登录
          $this.loginAgain();
          break;
        }
        case 'gologin':{//购物车登录,直接出弹窗
          overflowDisabled(true);
          $this.dialogLogin=true;
          break;
        }
        case 'editUserName':{
          overflowDisabled(true);
          $this.dialogEditUserName=true;
          break;
        }
        case 'editPhone':{
          overflowDisabled(true);
          $this.dialogEditPhoneOne=true;
          break;
        }
        case 'editPassword':{
          overflowDisabled(true);
          $this.dialogPassword=true;
          break;
        }
        case 'editHeadPic':{
          $this.dialogSuccessPic=0;
          $this.dialogSuccessText='修改头像成功';
          $this.dialogSuccessType=false;
          $this.dialogSuccess=true;
          this.reload=!this.reload;
          break;
        }
        case 'loginOut':{
          $this.dialogConfirmText='确认退出当前账户';
          $this.dialogConfirmOKText='确认';
          $this.dialogConfirmCancelText='取消';
          $this.dialogConfirmType=1;
          $this.dialogConfirm=true;
          break;
        }
        case 'deleteAddress':{
          $this.dialogConfirmText='确认删除该收货地址';
          $this.dialogConfirmOKText='确认';
          $this.dialogConfirmCancelText='取消';
          $this.dialogConfirmType=2;
          $this.dialogConfirm=true;
          $this.addressId=$d;
          break;
        }
        case 'addAddressSuccess':{
          $this.dialogSuccessPic=0;
          $this.dialogSuccessText='新增地址成功';
          $this.dialogSuccessType=false;
          $this.dialogSuccess=true;
          break;
        }
        case 'editAddressSuccess':{
          $this.dialogSuccessPic=0;
          $this.dialogSuccessText='编辑地址成功';
          $this.dialogSuccessType=false;
          $this.dialogSuccess=true;
          break;
        }
        case 'shoppingCartAdd':{
          $this.dialogConfirmText='已成功加入购物车';
          $this.dialogConfirmButtonText='';
          $this.dialogConfirmOKText='结算购物车';
          $this.dialogConfirmCancelText='继续逛逛';
          $this.dialogConfirmType=4;
          $this.dialogConfirm=true;
          break;
        }
        case 'informLogin':{//商品详情页提示登录
          $this.dialogConfirmText=$d;
          $this.dialogConfirmButtonText='去登录';
          $this.dialogConfirmType=3;
          $this.dialogConfirm=true;
          break;
        }
        case 'addressFail':{
          $this.dialogConfirmText='保存地址失败,请重试';
          $this.dialogConfirmButtonText='确认';
          $this.dialogConfirmType=0;
          $this.dialogConfirm=true;
          break;
        }
        case 'cancelOrder':{//订单列表内取消订单
          $this.dialogConfirmText='确认取消当前订单';
          $this.dialogConfirmTip='可能会失去再次购买的机会';
          $this.dialogConfirmOKText='确认';
          $this.dialogConfirmCancelText='取消';
          $this.dialogConfirmType=7;
          $this.dialogConfirm=true;
          $this.orderId=$d;
          break;
        }
        case 'cancelOrderDetail':{//订单详情内取消订单
          $this.dialogConfirmText='确认取消当前订单';
          $this.dialogConfirmTip='可能会失去再次购买的机会';
          $this.dialogConfirmOKText='确认';
          $this.dialogConfirmCancelText='取消';
          $this.dialogConfirmType=9;
          $this.dialogConfirm=true;
          $this.orderId=$d;
          break;
        }
        case 'cancelAfterSaleOrder':{
          $this.dialogConfirmText='确认取消当前售后申请吗?';
          $this.dialogConfirmTip='可能会失去再次申请的机会';
          $this.dialogConfirmOKText='确认';
          $this.dialogConfirmCancelText='取消';
          $this.dialogConfirmType=8;
          $this.dialogConfirm=true;
          $this.orderId=$d;
          break;
        }
        case 'removeShoppingCart':{
          $this.dialogConfirmText='确认移除当前商品';
          $this.dialogConfirmTip='可能会失去本次购买的机会';
          $this.dialogConfirmOKText='确认';
          $this.dialogConfirmCancelText='取消';
          $this.dialogConfirmType=6;
          $this.dialogConfirm=true;
          $this.recId=$d;//将商品Id存储起来
          break;
        }
        case 'reDialogEditPasswordOne':{//忘记密码二dialogEditPasswordTwo中,手机验证超时,返回忘记密码手机验证弹窗
          $this.dialogEditPasswordTwo=false;
          $this.dialogConfirmText='手机验证超时,请重新验证';
          $this.dialogConfirmButtonText='重新验证';
          $this.dialogConfirmType=5;
          $this.dialogConfirm=true;
          break;
        }
        case 'reloadCart':{//重新读取购物车
          $this.getCart();
          break;
        }
        /*case 'loading':{//loading遮罩
          // if($d){
          //   $this.dialogLoading=$d;
          // }else{
          //   setTimeout(function(){$this.dialogLoading=$d},2000);
          // }
          //$this.dialogLoading=$d;//T打开F关闭
          $this.$store.commit('loadingUpdate',$d);
          break;
        }*/
        /*case 'goOrder':{
          $this.$store.commit('loadingUpdate',true);
          $this.$store.dispatch('$cartUpdate').then((response) => {
            switch(parseInt(response.data.code)){
              case 1000500 :{
                context.commit('$cartUpdate',response.data.data);
                break;
              }
              case 1000510 :break;
              case 1000520 :break;
              case 888 :;break;
            }
          })
          .catch(function (error) {
          
          });
          break;
        }*/
      }
    },
    forgetListen:function(){
      $this.dialogLogin=false;
      $this.dialogEditPasswordTwo=false;
      $this.dialogEditPasswordOne=true;
    },
    order_info:function(){
      $this.userName = ""
      $this.order = false
      $this.login_reg = false
    },
    dialogLoginListen:function($b){
      if($b){
        overflowDisabled(true);
        $this.dialogSuccessPic=0;
        $this.dialogSuccessText='登录成功';
        $this.dialogSuccessType=false;
        $this.dialogSuccess=true;
        $this.order = true;
        $this.login_reg = false;
        $this.getCart();
        $this.reload=!$this.reload;
      }else{
        overflowDisabled(false);
      }
      $this.dialogLogin=false;
    },
    dialogRegisterListen:function($b){
      if($b){
        overflowDisabled(true);
        $this.dialogSuccessPic=0;
        $this.dialogSuccessText='注册成功';
        $this.dialogSuccessType=true;
        $this.dialogSuccess=true;
      }else{
        overflowDisabled(false);
      }
      $this.dialogRegister=false;
    },
    dialogPasswordListen:function($b){//0取消//1成功//2身份过期，重新登录
      switch ($b){
        case 0 : 
        overflowDisabled(false);
        $this.dialogPassword=false;
        break;
        case 1 : 
        $this.dialogPassword=false;
        $this.dialogSuccessPic=1;
        $this.dialogSuccessText='密码修改成功,请重新登录';
        $this.dialogSuccessType=true;
        $this.dialogSuccess=true;
        break;
        case 2 : 
        $this.dialogPassword=false;
        $this.loginAgain();
        break;
        default:$this.dialogPassword=false;$this.appListen("inform","服务器忙,请稍后重试");break;
      }
    },
    dialogConfirmListen:function($b){
      if($b){
        switch($this.dialogConfirmType){
          case 0 ://只是提示
            overflowDisabled(false);
            $this.dialogConfirm=false;
            break;
          case 1 :{
            $this.loginOut();//退出
            overflowDisabled(false);
            $this.dialogConfirm=false;
            break;
          }
          case 2 :{//删除地址
            $this.deleteAddress($this.addressId);
            overflowDisabled(false);
            $this.dialogConfirm=false;
            break;
          }
          case 3 :{//去登录
            //overflowDisabled(false);
            $this.dialogConfirm=false;
            $this.dialogLogin=true;
            break;
          }
          case 4 :{//结算购物车
            overflowDisabled(false);
            $this.dialogConfirm=false;
            $this.$router.push({path:'/shoppingCart'});
            break;
          }
          case 5 :{//忘记密码-手机验证过期,重新验证手机
            $this.dialogConfirm=false;
            $this.forgetListen();
            break;
          }
          case 6:{//购物车删除某个商品
            $this.dialogConfirm=false;
            $this.$store.commit('loadingUpdate',true);
            axios({
              method:'post',
              url: $basePath+'?c=Cart&m=deleteCart',
              data:{
                'recId':$this.recId
              }
            })
            .then((response) => {
                //console.log(response.data.data);
                $this.$store.commit('loadingUpdate',false);
                switch(parseInt(response.data.code)){
                  case 1000400 :{
                    $this.appListen("reloadCart");break;
                    break;
                  }
                  case 1000420 ://console.log('请填写必填项');break;
                  case 1000430 :$this.appListen("inform","购物车无此商品,请刷新后重试");break;
                  case 1000410 :$this.appListen("inform","服务器忙,请稍后重试");break;
                  case 888 :$this.loginAgain();break;
                  default:$this.appListen("inform","服务器忙,请稍后重试");break;
                }
              })
            .catch(function (error) { 
              $this.$store.commit('loadingUpdate',false);
                //console.log(error);
              });
            break;
          }
          case 7:{//取消订单(订单列表)//刷新路径不同
            $this.dialogConfirm=false;
            $this.$store.commit('loadingUpdate',true);
            axios({
              method:'post',
              url: $basePath+'?c=Order&m=cancelOrder',
              data:{
                'orderId':$this.orderId,
              }
            })
            .then((response) => {
              $this.$store.commit('loadingUpdate',false);
              //console.log(response.data.data);
              $this.$router.push({name:'info_order_goods/info_order_list'});
              $this.reload=!$this.reload;
              switch(parseInt(response.data.code)){
                case 1100100 :{
                  $this.appListen("inform","订单取消成功");
                  break;
                }
                case 1100105:{
                  $this.appListen("inform","商品已就绪或已在路上,请直接联系400-021-2008客服售后");
                  break;
                }
                case 1100106:{
                  $this.appListen("inform","订单已被取消");
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
            break;
          }
          case 8:{//取消售后订单
            $this.dialogConfirm=false;
            $this.$store.commit('loadingUpdate',true);
            axios({
              method:'post',
              url: $basePath+'?c=ReturnGoods&m=cancelReturnGoods',
              data:{
                'returnGoodsId':$this.orderId,
              }
            })
            .then((response) => {
              $this.$store.commit('loadingUpdate',false);
              //console.log(response.data.data);
              $this.$router.push({name:'info_afterSale_check',params:{'id':$this.orderId}});
              $this.reload=!$this.reload;
              switch(parseInt(response.data.code)){
                case 1600100 :{
                  $this.appListen("inform","撤销成功");
                  window.scrollTo(0,0);
                  break;
                }
                case 1600105:{
                  $this.appListen("inform","当前售后申请已经撤销");
                  window.scrollTo(0,0);
                  break;
                }
                case 1600106:{
                  $this.appListen("inform","当前售后申请无法取消");
                  window.scrollTo(0,0);
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
            break;
          }
          case 9:{//取消订单(订单详情内部取消)//刷新路径不同
            $this.dialogConfirm=false;
            $this.$store.commit('loadingUpdate',true);
            axios({
              method:'post',
              url: $basePath+'?c=Order&m=cancelOrder',
              data:{
                'orderId':$this.orderId,
              }
            })
            .then((response) => {
              $this.$store.commit('loadingUpdate',false);
              //console.log(response.data.data);
              $this.$router.push({name:'info_order_goods/order_details',params:{'id':$this.orderId}});
              $this.reload=!$this.reload;
              switch(parseInt(response.data.code)){
                case 1100100 :{
                  $this.appListen("inform","订单取消成功");
                  break;
                }
                case 1100105:{
                  $this.appListen("inform","商家已发货,无法取消,请申请售后退款");
                  break;
                }
                case 1100106:{
                  $this.appListen("inform","订单已被取消");
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
            break;
          }
          default:break;
        }
      }else{
        overflowDisabled(false);
        $this.dialogConfirm=false;
      }
      $this.dialogConfirmTip='';
      $this.dialogConfirmText='';
      $this.dialogConfirmButtonText='';
      $this.dialogConfirmOKText='';
      $this.dialogConfirmCancelText='';
    },
    dialogSuccessListen:function($b){
      overflowDisabled(false);
      $this.dialogSuccess=false;
      if($b){
        if($this.dialogSuccessType){
          $user='';
          $this.appListen('relogin');
        }
      }else{
        if($this.dialogSuccessType){
          $user='';
          $this.appListen('relogin');
        }
      }
    },
    dialogEditUserNameListen:function($b){//0取消//1成功//2身份过期，重新登录
      switch ($b){
        case 0 : 
        overflowDisabled(false);
        $this.dialogEditUserName=false;
        break;
        case 1 : 
        $this.dialogEditUserName=false;
        $this.dialogSuccessPic=2;
        $this.dialogSuccessText='用户名修改成功';
        $this.dialogSuccessType=false;
        $this.dialogSuccess=true;
          $this.reload=!$this.reload;//更改重新读取状态，个人中心内修改用户名后需要刷新数据,子组件监听reload变化更新数据
          break;
          case 2 : 
          $this.dialogEditUserName=false;
          $this.loginAgain();
          break;
          default:$this.dialogEditUserName=false;$this.appListen("inform","服务器忙,请稍后重试");break;
        }
      },
    dialogEditPhoneOneListen:function($b){//0取消//1成功//2身份过期，重新登录
      switch ($b){
        case 0 :
        overflowDisabled(false);
        $this.dialogEditPhoneOne=false;
        break;
        case 1 :
        $this.dialogEditPhoneOne=false;
        $this.dialogEditPhoneTwo=true;
        break;
        case 2 :
        $this.dialogEditPhoneOne=false;
        $this.loginAgain();
        break;
        default:$this.dialogEditPhoneOne=false;$this.appListen("inform","服务器忙,请稍后重试");break;
      }
    },
    dialogEditPhoneTwoListen:function($b){//0取消//1成功//2身份过期，重新登录
      switch ($b){
        case 0 :
        overflowDisabled(false);
        $this.dialogEditPhoneTwo=false;
        break;
        case 1 :
        $this.dialogEditPhoneTwo=false;
        $this.dialogSuccessPic=1;
        $this.dialogSuccessText='手机号修改成功,请重新登录';
        $this.dialogSuccessType=true;
        $this.dialogSuccess=true;
        break;
        case 2 :
        $this.dialogEditPhoneTwo=false;
        $this.loginAgain();
        break;
        default:$this.dialogEditPhoneTwo=false;$this.appListen("inform","服务器忙,请稍后重试");break;
      }
    },
    dialogEditPasswordOneListen:function($b){
      $this.dialogEditPasswordOne=false;
      if($b){
        $this.dialogEditPasswordTwo=true;
      }else{
        $this.dialogLogin=true;
      }
    },
    dialogEditPasswordTwoListen:function($b){
      $this.dialogEditPasswordTwo=false;
      if($b){
        $this.dialogSuccessPic=1;
        $this.dialogSuccessText='密码修改成功,请重新登录';
        $this.dialogSuccessType=true;
        $this.dialogSuccess=true;
      }else{
        $this.dialogLogin=true;
      }
    },
    //退出功能
    loginOut:function(){
      axios.post($basePath+'?c=User&m=login_out').then(function (response) {
        if(response.data) {
          let data = response.data
          switch (parseInt(data.code)) {
            case 888 :
            $user='';
            $this.$store.commit('$cartUpdate','');//清空购物车
            $this.order = false;
            $this.login_reg = false;
            $this.$router.push({path:'/'});window.scrollTo(0,0);break;
            break;
            case 500600 :
            $user='';
            $this.$store.commit('$cartUpdate','');//清空购物车
            $this.order = false;
            $this.login_reg = false;
            $this.$router.push({path:'/'});window.scrollTo(0,0);break;
            default:
            break;
          }
        }
      })
      .catch(function (error) { 
        //console.log(error);
      });  
    },
    deleteAddress:function($addressId){
      $this.$store.commit('loadingUpdate',false);
      axios({   //现实省会城市信息
        method:'post',
        url: $basePath+'?c=UserAddress&m=delAddressByUser',
        data:{
          addressId:$this.addressId
        }
      })
      .then((response) => {
        //200131表示已登陆状态，200132表示未登录
        let data =  response.data
        switch (parseInt(data.code)) {
          case 600300:$this.reload=!$this.reload;break;
          case 600301://console.log("请填写必填项");break;
          case 600302:{
            $this.dialogConfirmText='该地址不存在,或已被删除,请刷新页面后重试';
            $this.dialogConfirmButtonText='确认';
            $this.dialogConfirmOKText='';
            $this.dialogConfirmCancelText='';
            $this.dialogConfirmType=0;
            $this.dialogConfirm=true;
            break;
          }
          case 600303:{
            $this.dialogConfirmText='删除地址失败,请刷新页面后重试';
            $this.dialogConfirmButtonText='确认';
            $this.dialogConfirmOKText='';
            $this.dialogConfirmCancelText='';
            $this.dialogConfirmType=0;
            $this.dialogConfirm=true;
            break;
          }
          case 888 :
          $this.loginAgain();
          break;
          case 500600 :
          $this.loginAgain();
          break;
          default:$this.appListen("inform","服务器忙,请稍后重试");break;
        }
      })
      .catch(function (error) { 
      //console.log(error);
    });
    },
    loginAgain:function(){//弹出弹窗提示登录身份已过期，需要重新登录
      $this.order = false;
      $this.login_reg = false;
      $user='';
      $cart='';
      $this.dialogSuccessPic=3;
      $this.dialogSuccessText='登录身份已过期,请重新登录';
      $this.dialogSuccessType=true;
      $this.dialogSuccess=true;
    },
    getCart:function(){
      $this.$store.dispatch('$cartUpdate');
    },
  },
}
</script>
<style lang="scss">
  /**!
  * header
  */
  /* 页面宽高为100%，overflow为hidden隐藏溢出部分 */

  $background:#0b0b0b;
  /*!
  *  继承 a类继承b类的属性  @extend b;
  */

  /*!
  * @mixin left
  * @include left
  */
  @mixin left{
    //background: red;
    // height: 45px;
  }
  #app{
    position:relative;
    height:100%;
    overflow-y:auto;
    .wrapper{
      width:100%;
      position:relative;
    }
  }
  .app-header{
    background: $background;
    width: 100%;
    height: 45px;
    display:flex;
    position:absolute;
    text-overflow: ellipsis;
    z-index:999;
    .app-header-inner{
      min-width:86px;
      width:1200px;
      margin:0 auto;
      display: flex;
      justify-content: space-between;
      .header-img{
        margin-top:10px;
      }
      .img-login{
        width:22px;
        height:45px;
        margin:0 32px;
        background:url(./common/images/login/login-icon-active.png) center center no-repeat;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        &:hover{
          width:22px;
          height:45px;
          margin:0 32px;
          background:url(./common/images/login/login-icon.png) center center no-repeat;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
        }
      } 
      .img-shopping{
        width:22px;
        height:45px;
        background:url(./common/images/login/shopping-active.png) center center no-repeat;
        float: right;
        -webkit-transition: all 0.5s;
        transition: all 0.5s;
        &:hover{
          width:22px;
          height:45px;
          float: right;
          background:url(./common/images/login/shopping.png) center center no-repeat;
          -webkit-transition: all 0.5s;
          transition: all 0.5s;
        }
      }
      .nav.vertical{
        width:70%;
        font-size:0;
        @include left;
        a{
          color: white;
          position:relative;
          color:white;
          padding:0 30px;
          margin:0;
          font-size:14px;
          line-height: 45px;
          transition:all 0.3s;
          -o-transition:all 0.3s;
          -webkit-transition:all 0.3s;
          -moz-transition:all 0.3s;
          -ms-transition:all 0.3s;
          &:hover{
            color: #aaa;
          }
        }
      }
    }
    .ul-mian{
      height: 45px;
      font-size: 0;
      li{
        float:left;
        margin: auto 5px;
        cursor: pointer;
        line-height: 45px;
      }
    }
  }
  .app-content{
    padding-top:45px;
  }
  .header-title
  {
    line-height: 50px;
    font-size: 16px
  }
  /* content */
  .content {
    width:100%;
    background:#f4f9f7;
  }
  .sliderButton{
    text-align: center;
  }
  .slider-container{
    width: 100%;
    margin: 0;
    height: 980px;
    padding: 0;

  }
  .sliderButton button{
    display: inline-block;
    background: #fff;
    border-radius: 3px;
    /*    width: 100px;*/
    height: 30px;
    border: 1px solid #333;
    line-height: 30px;
    margin-left: 10px;
    padding: 0 15px;
    margin-top: 10px;
  }
  .header-info{
    padding: 15px;
  }
  .vctives{
    opacity: 1;
    transition: all 200ms ease-out;
  }
  .fade-enter-active, .fade-leave-active{
   transition:all ease 0.7s; //动画延迟 0.7s
   -o-transition:all ease 0.7s;
   -webkit-transition:all ease 0.7s;
   -moz-transition:all ease 0.7s;
   -ms-transition:all ease 0.7s;
   transition: all 0.4s ease-out;
   z-index: -999;
 }
 .fade-enter{
   transform:translateY(-1000px); //渐入动画
 }
 .fade-leave-active{
   transform:translateY(-1000px); //渐出动画
 }
 .menu-title{
   .nav{
    margin-right: 47px;
  }
  background: #fff;
  height: 52px;
  border-radius: 8px;
  margin-top: 20px;
  margin-bottom: 50px;
  box-shadow: 0px 2px 6px #cbcbcb;
  left: 20px;
  position: absolute;
  top:32px;
  z-index: 99;
  width: 1200px;
  left: 50%;
  margin-left: -600px;
  transition: all 3s ease-out;
  li{
   float: left;
   a{
     font-size: 14px;
     line-height: 55px;
     padding: 7.5px 21px;
     transition: all 0.3s;
     border: 1px solid #f9ced4;
     margin: 0 5px;
     border-radius: 4px;
     color: #f9ced4;
     &:hover{
      color: #df001f;
      border:1px solid #df001f;
    }
  }
  &.active a{
    transition: all 0.5s;
    background: #5c6670;
    color: #fff;
    border: 1px solid #5c6670;
  }
}
}
.transitionOne-enter-active {
  opacity:1;
  transition: all 0.3s ease-out;
}
.transitionOne-leave-active {
  opacity:0;
  transition: all 0.3s ease-out;
}
.transitionOne-enter,.transitionOne-leave{
  opacity:0;
}
</style>

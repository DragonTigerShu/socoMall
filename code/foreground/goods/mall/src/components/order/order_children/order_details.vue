<template>
	<div class="info_order_details">
		<div class="info_order_top">
			<h3>订单详情</h3>
     <div class="solid">
       <p>订单日期:<span><template v-if="data.add_time">{{transformTime(data.add_time)}}</template><template v-else>***</template></span></p>
       <p>订单单号:<span><template v-if="data.order_sn">{{data.order_sn}}</template><template v-else>***</template></span></p>
     </div>
     <div class="btn-tool">
      <template v-if="data['shipping_status']==0&&(data['order_status']==0)">
        <div class="cancelOrder">
          <span @click="cancelListen">取消订单</span>
        </div>
      </template>
      <template v-if="data['order_status']==0&&data['pay_status']==0">
        <button class="payOrder" type="button" @click="payListen">立即付款</button>
      </template>
    </div>
    <h4>{{orderTypeArray[orderType]}} <template v-if="time>0" ><span>你还有<em>{{goClock}}</em> 来付款，超时订单自动关闭</span></template></h4>
    <div class="succes">
     <ul class="sucfixs">
      <li>
       <img :src="imgOrder1">
       <h5>递交订单</h5>
       <template v-if="data.add_time"><time>{{transformTime(data.add_time)}}</time></template>
     </li>
     <li>
       <img :src="data.pay_status==1?imgOrder2:imgOrder2_2">
       <h5>付款完成</h5>
       <template v-if="data.pay_time&&data.pay_time!=0"><time>{{transformTime(data.pay_time)}}</time></template>
     </li>
     <li>
       <img :src="data.order_status==2?imgOrder2:imgOrder2_2">
       <h5>签收</h5>
       <template v-if="data.confirm_time&&data.confirm_time!=0"><time>{{transformTime(data.confirm_time)}}</time></template>
     </li>
     <li>
      <template v-if="(data.order_status==3&&data.pay_status==0)||data.order_status==4||data.order_status==5||data.order_status==6||data.order_status==2">
        <img :src="imgOrder2">
        <h5>完成</h5>
        <template v-if="data.confirm_time&&data.confirm_time!=0"><time>{{transformTime(data.confirm_time)}}</time></template>
      </template>
      <template v-else>
       <img :src="imgOrder2_2">
       <h5>完成</h5>
     </template>
   </li>
 </ul>
</div>
<template v-if="data['order_action_list']">
  <info_status :data="data['order_action_list']" :trackData="data['kd_info']['Traces']" :key="data.order_sn"></info_status>
</template>  <!--订单状态-->
</div>
<info_message :data="data"></info_message>
</div>
</template>
<script>
  var $this = {};
  var $data = {
   baseHead:'',
   orderId:'',
   data:{},
   time:0,
   clock:'',
   flag:false,
   orderType:'',
   orderTypeArray:'',
   'imgOrder1':require('../../../common/images/personal/order1.png'),
   'imgOrder1_1':require('../../../common/images/personal/order1_1.png'),
   'imgOrder2':require('../../../common/images/personal/order2.png'),
   'imgOrder2_2':require('../../../common/images/personal/order2_2.png'),
   'imgOrder3':require('../../../common/images/personal/order3.png'),
   'imgOrder3_3':require('../../../common/images/personal/order3_3.png'),
   'imgOrder4':require('../../../common/images/personal/order4.png'),
   'imgOrder4_4':require('../../../common/images/personal/order4_4.png'),
 };
 import info_status from '@/components/afterSaleService/info_order_status.vue'
 import info_message from '@/components/afterSaleService/info_message.vue'
 import axios from 'axios'
 export default{
   	name:'order_details', //订单详情页面
   	components:{
       "info_status":info_status,
       "info_message":info_message
     },
     data() {
       $this = this;
       return $data;
     },
     created:function(){
       this.orderId=this.$route.params.id;
       this.baseHead=$baseHead;
       this.orderTypeArray=$orderTypeArray;
         // this.orderId=this.$route.params.id;
         // this.baseHead=$baseHead;
         // this.$emit('initListen',4);//刷新后重置左侧位置
         // this.initOrderDetail();
       },
       watch:{
        reload(c,d){
          this.initOrderDetail();
        }
      },
      props:{
        reload:Boolean,
      },
      mounted:function(){
         this.$emit('initListen',4);//刷新后重置左侧位置
         this.initOrderDetail();
       },
       beforeRouteLeave(to, from, next){
        this.clearParams();
        next();
      },
      beforeRouteUpdate(to, from, next) {
        this.clearParams();
        next();
      },
      computed:{
       goClock:function(){
        return this.transformClock(this.time);
      }
    },
    methods:{
      clearParams:function(){
        $this.data = {};
        $this.time = 0;
        $this.flag = false;
        $this.orderType = '';
      },
      cancelOrderInOfNoTime:function(){
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
          switch(parseInt(response.data.code)){
            case 1100100 :{
              $this.flag=false;
              $this.initOrderDetail();
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
      initOrderDetail:function(){
        this.time=0;
        clearInterval(this.clock);
        $this.$store.commit('loadingUpdate',true);
        axios({
         method:'post',
         url: $basePath+'?c=Order&m=userOrderDetail',
         data:{
           'orderId':this.orderId
         }
       })
        .then((response) => {
               //console.log(response.data.data);
               $this.$store.commit('loadingUpdate',false);
               switch(parseInt(response.data.code)){
                 case 1100100 :{
                   $this.data=response.data.data;
                     if($this.data.order_status==0&&$this.data.pay_status==0){//倒计时
                      var nowtime=new Date().getTime();
                      $this.time=parseInt($this.data.add_time)+86400-parseInt(nowtime/1000);
                      if($this.time>0){
                       $this.flag=true;
                       $this.clock = setInterval(function(){
                        $this.time--;
                        if($this.time<=0){
                         clearInterval($this.clock);
                                 //$this.cancelOrderInOfNoTime();
                               };
                             }, 1000);
                     }else{
                           //$this.cancelOrderInOfNoTime();//已超时订单发送取消订单
                         }
                       }
                       switch (parseInt($this.data['order_status'])){
                        case 3:{//买家已取消
                         switch(parseInt($this.data['pay_status'])){
                              case 0:$this.orderType=7;break;//未付款=>已取消
                              case 3:$this.orderType=6;break;//已退款=>已退款
                              case 4:$this.orderType=5;break;//拒绝退款=>拒绝退款
                              case 1:;
                              case 2:$this.orderType=4;break;//已付款=>待退款
                            }
                            break;
                          }
                       case 5:$this.orderType=8;//商家已作废
                       case 6:$this.orderType=7;break;//系统取消=>已取消
                       case 2:;//买家收货
                       case 4:$this.orderType=3;break;//已完成=>已收货
                       case 0:{
                        if($this.data['pay_status']==0)
                            $this.orderType=1;//未付款=>待付款
                          else{
                            $this.orderType=10;//已付款=>备货中
                          }
                          break;
                        }
                        case 1:{
                          if($this.data['shipping_status']==0)
                            $this.orderType=9;//已付款=>待发货
                          else
                            $this.orderType=2;//已付款=>待收货
                          break;
                        }
                      }
                      break;
                    }
                    case 888 :$this.$emit("appListen","loginAgain");break;
                    default :$this.$router.push({path:'/'});window.scrollTo(0,0);$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
                  }
                })
        .catch(function (error) {
         $this.$store.commit('loadingUpdate',false);
               //console.log(error);
             });
      },
      transformClock:function(timestamp) {
        var h=parseInt(timestamp/60/60);
        var m=parseInt(timestamp/60)%60;
        var s=timestamp%60;
        var str='';
        if(h!=null)str+=h+'小时';
        if(m!=null)str+=m+'分';
        if(s!=null)str+=s+'秒';
        return str;
      },
      cancelListen:function(){
        $this.$emit("appListen","cancelOrderDetail",this.orderId);
      },
      payListen:function(){
        $this.$router.push({name: 'shoppingCartPay',params:{id:$this.orderId}});
        window.scrollTo(0,0);
      }
    }
  }
    </script>
    <style lang="scss">
     $color:#333333;
     $background:#fff;
     $radius :4px;
     .info_order_details{
      .info_order_top{
       margin-left:-10px;
       width: 950px;
       border-radius:$radius;
       padding: 30px;
       background:$background;
       margin-bottom: 20px;
       position: relative;
       h3{
        font-size: 20px;
        color:$color;
        font-weight: 600;
      }
      div.solid{
        font-size: 14px;
        color:$color;
        font-weight: 500;
        margin-right: 5px;
        margin: 20px 0;
        padding-bottom: 15px;
        letter-spacing: 1px;
        border-bottom: 1px solid #e0e0e0;
        
      }
      .btn-tool{
        position: absolute;
        right: 0;
        top: 0;
        margin: 30px;
        div.cancelOrder{
         span{
          color: #9da2a6;
          font-size: 14px;
          cursor: pointer;
        }
        width:180px;
        height:25px;
        margin:0 auto 10px auto;
        text-align: center;
        box-sizing: border-box;
      }
      button.payOrder{
       text-align: center;
       width:180px;
       height:40px;
       color:#fff;
       background:#c8161e;
       border:0;
       outline:none;
       border-radius:8px;
       line-height:30px;
       font-size:14px;
       box-sizing:border-box;
       cursor:pointer;
       letter-spacing:1px;
     }
   } 	   
   h4{
    margin-top: 30px;
    font-size: 18px;
    color: #5C6670;
    font-weight: bold;
    span{
      color:#d31111;
      margin-left:10px;
      em{
        color:#d31111;
        display:inline-block;
        margin:0 10px;
        
      }
    }
  }
  .succes{
   margin-top: 40px;
   .sucfixs{
    display: flex;
    li{
     flex: 1;
     text-align: center;
     margin: 0 auto;
     &:nth-of-type(1) h5{
      border-radius: 4px 0 0 4px;
    }
    &:nth-of-type(4) h5{
      border-radius: 0 4px 4px 0;
    }
    h5{
     width: 100%;
     background: #efefef;
     margin: 10px 0;
     color: #818181;
     line-height: 20px;
     padding:4px;
     
   }
   time{
    font-size:14px;
    color: #9DA2A6;
  }
}
}
}
label.order{
  display: block;
  margin: 10px 0 0px 0;
  span{
   font-size:14px;
   color: #9DA2A6;
   margin-right: 20px;
   display: block;
   
   i{
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius:5px;
    margin-right: 20px;	
    background: #2fc10a;
  }
  small{
    margin-left: 20px;
  }
  
}
}
}

}
</style>
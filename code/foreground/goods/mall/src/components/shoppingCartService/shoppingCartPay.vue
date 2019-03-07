<template>
  <div class="shoppingCartPay">
    <section>
      <tabH :data="tabData" :now="tabNow" ></tabH>
      <div class="payHead">
        <img :src="payImg">
        <div class="payTitle">
          <h1>订单递交成功! 去付款咯~</h1>
          <p>请在 <span>24小时</span> 内完成支付,超时后将取消订单</p>
          <p>下单时间: <template v-if="data.add_time">{{transformTime(data.add_time)}}</template><template v-else>***</template></p>
        </div>
        <div class="payMoney">
          <p>应付金额: <span><template v-if="data.total_amount">{{data.total_amount}}</template><template v-else>***</template></span>元</p>
        </div>
      </div>
    </section>
    <section>
      <div class="payContent">
        <h1>选择以下方式付款</h1>
        <h2>支付平台</h2>
        <payList :orderId="data.order_id" :orderSn="data.order_sn" :url="'shoppingCart/OK'"></payList>
      </div>
    </section>

    <section>
      <div class="payDetailList">
        <ul class="goodsListHead">
          <li><h1>商品</h1></li>
          <li>单价</li>
          <li>数量</li>
          <li>小计</li>
        </ul>
        <ul class="goodsListContent" v-if="data.order_goods_list" @click="ulClickListen($event)">
          <li>
            <gPLi v-for="(d,index) in data.order_goods_list" :data="d" :index="index" :key="index" ></gPLi>
          </li>
        </ul>
      </div>
      <div class="orderDetail">
        <p>订单单号: <span>{{data.order_sn}}</span></p>
        <p>收货信息: <span>{{data.name}} {{data.mobile}} {{data.province}} {{data.city}} {{data.area}} {{data.address}}</span></p>
        <p v-if="data.inv_type==0">发票信息: 
          <span>普通纸质发票 {{data.inv_payee}} {{data.co_name}} {{data.co_ident_no}}</span>
        </p>
        <p v-else="data.inv_type==1">发票信息: 
          <span>增值税专用发票 {{data.co_name}} {{data.co_ident_no}}</span>
          <span>开户信息:{{data.dep_bank}} {{data.dep_bank_no}}</span>
          <span>注册信息:{{data.reg_address}} {{data.reg_number}}</span>
        </p>
        <p>配送运费: <span>{{data.shipping_fee}}元</span></p>
      </div>
      <div class="orderTotal">
        <p>共 <template v-if="data.order_goods_list">{{data.order_goods_list.length}}</template><template v-else>***</template> 件商品</p>
        <p>应付总额: <span><template v-if="data.total_amount">{{data.total_amount}}</template><template v-else>***</template></span>元</p>
      </div>
    </section>
  </div>
</template>

<script>
  import tabHead from '@/components/shoppingCartService/tabHead.vue';
  import goodsListContentPayLi from '@/components/shoppingCartService/goodsListContentPayLi.vue';
  import payList from '@/components/common/payList.vue';
  import {overflowDisabled} from '@/common/js/data'
  import axios from 'axios'
  var $data = {
    'tabNow':2,
    'orderId':'',
    'payImg':require("../../common/images/personal/ordercomplete.png"),
    'WeChat':require("../../common/images/shoppingCart/wechat.jpg"),
    'AliPay':require("../../common/images/shoppingCart/alipay.jpg"),
    'UnionPay':require("../../common/images/shoppingCart/unionpay.jpg"),
    data:{},
  }
  var $this={}
  export default {
    name: 'shoppingCartPay',
    props: {
      tabData:Array
      
    },
    data () {
      $this = this;
      return $data
    },
    beforeRouteLeave(to, from, next) {
      this.$emit("appListen",'loading',false);
      next();
    },
    beforeRouteUpdate(to, from, next) {
      next(false);
    },
    created:function(){
    this.orderId =  this.$route.params.id  //列表 id
    this.$store.commit('loadingUpdate',true);
    axios({
      method:'post',
      url: $basePath+'?c=Order&m=userOrderDetail',
      data:{
        orderId:this.orderId
      }
    })
    .then((response) => {
      //console.log(response.data.data);
      $this.$store.commit('loadingUpdate',false);
      this.$emit("initListen",5);
      switch(parseInt(response.data.code)){
        case 1100100 :{
          $this.data=response.data.data;
          if($this.data['pay_status']==1){
            $this.$router.push({name: 'shoppingCartOK',params:{id:$this.data['order_id']}});
          }
          if($this.data['order_status']==3){
            $this.$router.push({name: 'info_order_goods/order_details',params:{id:$this.data['order_id']}});
          }
          window.scrollTo(0,0);
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
  watch:{
    
  },
  methods:{
    ulClickListen:function(e) {
      switch (e.target.nodeName.toLowerCase()){
        case 'img':{
          const index = parseInt(e.target.dataset.id);
          if(!isNaN(index))window.open(window.location.origin + '/#/detail/'+index);
          break;
        }
      }
    }
  },
    components:{
      'tabH':tabHead,
      'gPLi':goodsListContentPayLi,
      'payList':payList
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .shoppingCartPay{
    
    .payHead{
      font-size:0;
      width:100%;
      height:200px;
      position: relative;
      background-color:white;
      border-radius:4px;
      padding:67px 30px 30px 40px;
      img{
        width:70px;
        height:70px;
        display:inline-block;
        vertical-align:middle;
      }
      .payTitle{
        display:inline-block;
        vertical-align:top;
        margin-left:65px;
        h1{
          font-size:20px;
          font-weight:normal;
          color:#333333;
        }
        p{
          margin-top:5px;
          font-size:14px;
          color:#5c6670;
          font-weight:normal;
          span{
            color:#c8161e;
            font-weight:normal;
          }
        }
      }
      .payMoney{
        position: absolute;
        right: 30px;
        bottom: 30px;
        p{
          margin-top:10px;
          font-size:14px;
          color:#5c6670;
          font-weight:normal;
          span{
            margin-left:5px;
            color:#c8161e;
            font-weight:normal;
            font-size:24px;
          }
        }
      }
    }
    .payContent{
      margin-top:20px;
      width:100%;
      height:320px;
      border-radius:4px;
      background-color:white;
      padding:30px 0;
      .payList{
        padding:0 40px;
      }
      >h1{
        font-size:20px;
        font-weight:normal;
        color:#333333;
        padding:0 0 25px 40px;
      }
      >h2{
        padding:20px 0 20px 40px;
        border-top:1px solid #e0e0e0;
      }
    }
    .payDetailList{
      background-color:#DDDDDD;
      border-bottom:1px solid #e0e0e0;
      ul.goodsListHead{
        font-size:0;
        width:100%;
        background-color: white;
        border-radius: 4px 4px 0 0;
        margin-top:20px;
        padding:10px 40px 25px 40px;
        display:flex;
        >li{
          padding-top: 9px;
          color:#5c6670;
          font-weight:normal;
          text-align:center;
          flex:1;
          h1{
            font-size:20px;
            font-weight:normal;
            color:#333333;
          }
          &:first-child{
            flex:3;
            text-align:left;
          }
        }
      }
      .goodsListContent{
        margin:0;
        background-color:white;
        padding:10px 40px 25px 40px;
        >li{
          width: 100%;
        }
      }
    }
    .orderDetail{
      padding:30px 40px 50px 40px;
      background-color:white;
      height:auto;
      color:#5c6670;
      font-weight:normal;
      font-size:14px;
      p{
        margin-bottom:20px;
        span{
          margin-left:4px;
        }
      }
      p:last-child{
        margin-bottom:60px;
        span{
          color:#c8161e;
        }
      }
    }
    .orderTotal{
      border-radius:0 0 4px 4px;
      height:auto;
      background-color:white;
      text-align:right;
      padding:0 40px 20px 0;
      p{
        color:#5c6670;
        font-size:14px;
        display:inline-block;
        margin-right:20px;
        span{
          font-size:24px;
          font-weight:normal;
          color:#c8161e;
        }
      }
    }
  }
</style>

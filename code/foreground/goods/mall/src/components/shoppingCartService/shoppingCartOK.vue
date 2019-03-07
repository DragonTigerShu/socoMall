<template>
  <div class="shoppingCartOK">
    <tabH :data="tabData" :now="tabNow" style="margin-bottom:30px"></tabH>
    <section class="goodsList">
      <ul class="goodsListHead">
        <li class="li-checkBox-style" style="margin-left:20px;">
          <input type="checkbox" style="display:none" id="goodListAll" :checked="checked"><label for="goodListAll"><img :src="checked ? imgchecked : imgUnChecked " ></label>
        </li>
        <li style="margin-left:20px">全选</li>
        <li style="margin-left:60px">商品信息</li>
        <li style="margin-left:309px">单价</li>
        <li style="margin-left:157px">数量</li>
        <li style="margin-left:157px">小计</li>
        <li style="margin-left:157px">操作</li>
      </ul>
      <div class="goodsListContent">
        <img :src="ShoppingCartOK">
        <p>支付成功!</p>
        <button class="checkOrder" @click="checkOrderListen">查看订单</button>
        <button class="go" @click="goShopping">继续购物</button>
      </div>
    </section>
    <section>
      <div class="payDetailList" v-if="data!=null">
        <ul class="goodsListHead">
          <li style="margin-left:40px;"><h1>商品</h1></li>
          <li style="margin-left:640px">单价</li>
          <li style="margin-left:120px">数量</li>
          <li style="margin-left:120px">小计</li>
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
        <p v-if="data.discount!=''&&data.discount!=0">调整金额: <span>{{data.discount}}元</span></p>
      </div>
      <div class="orderTotal">
        <p v-if="data.order_goods_list">共 {{data.order_goods_list.length}} 件商品</p>
        <p>应付总额: <span>{{data.order_amount}}</span>元</p>
      </div>
    </section>
  </div>
</template>

<script>
  import tabHead from '@/components/shoppingCartService/tabHead.vue';
  import goodsListContentPayLi from '@/components/shoppingCartService/goodsListContentPayLi.vue';
  import {overflowDisabled} from '@/common/js/data'
  import axios from 'axios'
  var $data = {
    'imgUnChecked':require('../../common/images/icon/checkbox.png'),
    'imgchecked':require('../../common/images/icon/checkbox-checked.png'),
    'ShoppingCartOK':require('../../common/images/personal/paysuccess.png'),
    'checked': false,
    'tabNow':3,
    data:[],
    orderId:'',
    orderSn:''
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
   // this.orderSn=this.$route.query.out_trade_no;
    //this.orderId=getStorage(this.orderSn);
    this.orderId =  this.$route.params.id;
    if(this.orderId!=null){
      $this.$store.commit('loadingUpdate',true);
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
        switch(parseInt(response.data.code)){
          case 1100100 :{
            $this.data=response.data.data;
            if($this.data['pay_status']==0){
              $this.$router.push({name: 'info_order_goods/order_details',params:{id:$this.orderId}});
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
    }
    overflowDisabled(false);
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
    },
    checkOrderListen:function(){
      $this.$router.push({name: 'info_order_goods/order_details',params:{id:this.orderId}});
      window.scrollTo(0,0);
    },
    goShopping:function(){
      $this.$router.push({path:'/'});
      window.scrollTo(0,0);
    }
  },
  components:{
    'tabH':tabHead,
    'gPLi':goodsListContentPayLi,
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .shoppingCartOK{
    .goodsList{
      li label{
        cursor:pointer;
      }
      .li-checkBox-style{
        position: relative;
        top: 3px;
      }
      ul.goodsListHead{
        font-size:0;
        background-color: white;
        border-radius: 4px;
        height:46px;
        color:#5c6670;
        font-weight:normal;
        >li{
          display:inline-block;
          vertical-align:middle;
          padding-top: 11px;
        }
      }
      .goodsListContent{
        margin:20px 0;
        padding-bottom:20px;
        border-radius: 4px;
        height:auto;
        text-align:center;
        background-color:white;
        img{
          margin-top:10px;
          width:250px;
          height:250px;
          margin-left: 30px;
        }
        p{
          font-size:20px;
          color:#333333;
          font-weight:normal;
        }
        button{
          width:260px;
          height:40px;
          border-radius:8px;
          border:0 solid white;
          background-color:#c8161e;
          color:white;
          margin-top:50px;
          cursor:pointer;
          outline:none;
          &.checkOrder{
            width:180px;
            margin-right:20px;
          }
          &.go{
            width:180px;
            background-color:white;
            border:1px solid #c8161e;
            color:#c8161e;
            box-sizing:border-box;
          }
        }
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
        margin-top:18px;
        padding-top:10px;
        padding-bottom:25px;
        >li{
          padding-top: 9px;
          display:inline-block;
          vertical-align:middle;
          h1{
            font-size:18px;
            font-weight:normal;
            color:#333333;
          }
        }
      }
      .goodsListContent{
        margin:0;
        background-color:white;
        padding-top: 10px;
        padding-bottom: 20px;
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
      font-size:14px;
      font-weight:normal;
      p{
        margin-bottom:20px;
        span{
          margin-left:4px;
        }
        &:last-child{
          margin-bottom:60px;
          span{
            color:#c8161e;
          }
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

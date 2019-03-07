<template>
  <div class="payList">
    <ul>
      <li @click="AliPayListen">
        <img :src="AliPay">
        <div class="tip">
          <h3>支付宝 网页支付</h3>
          <p>登陆网页版支付宝支付</p>
        </div>
      </li>
      <li @click="WeChatListen">
        <img style="border-radius:50%" :src="WeChat">
        <div class="tip">
          <h3>微信 扫码支付</h3>
          <p>使用微信手机客户端支付</p>
        </div>
      </li>
    </ul>
    <section>
      <displayPaying :isShow="displayPaying" :cover="false" @clickListen="payingListen"></displayPaying>
    </section>
    <section>
      <displayQuestion :isShow="displayQuestion" :cover="true" @clickListen="questionListen"></displayQuestion>
    </section>
  </div>
</template>

<script>
  import goodsListContentPayLi from '@/components/shoppingCartService/goodsListContentPayLi.vue';
  import displayPaying from '@/components/dialog/dialogPaying.vue';
  import displayQuestion from '@/components/dialog/dialogQuestion.vue';
  import axios from 'axios';
  import {setStorage,getStorage} from '@/common/js/store'
  import {overflowDisabled} from '@/common/js/data'
  var $data = {
    'WeChat':require("../../common/images/payList/wechat.png"),
    'AliPay':require("../../common/images/payList/alipay.png"),
    // 'UnionPay':require("../../common/images/payList/unionpay.png"),
    displayPaying:false,
    displayQuestion:false,
    htmlCode:''
  }
  var $this={}
  export default {
    name: 'payList',
    props: {
      'url':{type:String,default:''},
      'orderSn':String,
      'orderId':String
    },
    data () {
      $this = this;
      return $data
    },
    created:function(){
      this.htmlCode="";
    },
    mounted:function(){
      this.htmlCode="";
    },
    watch:{
      
    },
    methods:{
      AliPayListen:function(){
        if(this.orderSn!=null&&this.orderId!=null){
          var newWin = window.open('about:blank');
          newWin.document.body.innerHTML = '速珂带你去支付宝支付,请不要关闭页面...';
          axios({
            method:'post',
            dataType:'json',
            url: $basePath+'?c=Pay&m=payAli',
            data:{
            'order_sn':$this.orderSn,//正式环境使用
            "return_url" : $hostUrl+'/#/'+$this.url+'/'+$this.orderId
          }
        })
          .then((response) => {
            var data=response.data;
            if(data.status == 'error')
            {
              alert(data.msg);
            }
            else if(parseInt(data.code) == 1500103){
              $this.$router.push({name: 'info_order_goods/order_details',params:{id:$this.orderId}})
            }
            else
            {
              $this.displayPaying=true;
              overflowDisabled(true);
              window.localStorage.setItem("alipay", data.data.alipay_res);
              newWin.location.href = $hostUrl+'/pay.html';
            }
          })
          .catch(function (error) {
            overflowDisabled(false);
            $this.$store.commit('loadingUpdate',false);
          });
        }
      },
      WeChatListen:function(){
        if(this.orderSn!=null&&this.orderId!=null){
        //setStorage(this.orderSn,this.orderId);
        $this.displayPaying=true;
        overflowDisabled(true);
        var newWin = window.open('about:blank');
        newWin.document.body.innerHTML = '速珂带你去微信支付,请不要关闭页面...';
        newWin.location.href = 'http://wx.supersoco.com/scshop/server/index.php?c=Pay&m=payWe&order_sn='+this.orderSn+'&key='+$user.auid;
      }
    },
    UnionPayListen:function(){
      $this.displayPaying=true;
    },
    payingListen:function($b){
      $this.displayPaying=false;
      overflowDisabled(false);
      switch(parseInt($b)){
        case 0 :{
          break;
        }
        case 1 :{
          $this.$router.push({name: 'info_order_goods/order_details',params:{id:this.orderId}})
          window.scrollTo(0,0);
          break;
        }
        case 2 :{
          $this.displayQuestion=true;
          break;
        }
      }
    },
    questionListen:function(){
      $this.displayQuestion=false;
    }
  },
  components:{
    'displayPaying':displayPaying,
    'displayQuestion':displayQuestion
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .payList{
    >ul{
      font-size:0;
      width:100%;
      display: inline-flex;
      flex-direction:row;
      justify-content:flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      li{
        margin-right:30px;
        max-width:432px;
        display: inline-flex;
        align-items:center; 
        justify-content:left;
        width:31.67%;
        height:110px;
        border-radius:8px;
        cursor:pointer;
        background-color:#f0efee;
        img{
          max-width:90px;
          width:21.05%;
          height:auto;
          margin:0 7.89%;
        }
        &:hover{
          background-color:#dddddd;
        }
      }
      .tip{
        h3{
          font-size:16px;
          color:#333333;
          font-weight:normal;
        }
        p{
          font-size:14px;
          color:#5c6670;
        }
      }
    }
  }
</style>

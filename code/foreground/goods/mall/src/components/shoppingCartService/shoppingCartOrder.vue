<template>
  <div class="shoppingCartOrder">
    <tabH :data="tabData" :now="tabNow"></tabH>
    <section>
      <div class="orderHead">订单详情</div>
      <div class="orderContent">
        <h1>收货地址</h1>
        <aL v-if="data" :reload="reload" @selectListen="selectAddressListen" @appListen="appListen"></aL>
        <section class="group">
          <h3>支付方式</h3>
          <span>在线支付 (支持支付宝 微信)</span>
        </section>
        <section class="group">
          <h3>配送方式</h3>
          <span>快递配送 (按运送地计/免运费)</span>
        </section>
        <section class="invoices">
          <aside>
            <h3>发票</h3>
          </aside>
          <content>
            <div class="group">
              <button :class="{'active':FlagOne}" @click="flagOneLeftListen">普通发票(纸质)</button>
              <button :class="{'active':!FlagOne}" @click="flagOneRightListen">增值税专用发票</button>
            </div>
            <div class="group">
              <button :disabled="!FlagOne" :class="{'active':FlagTwo,'disabled':!FlagOne}" @click="flagTwoLeftListen">个人</button>
              <button :class="{'active':!FlagTwo}" @click="flagTwoRightListen">单位</button>
            </div>
            <section v-show="FlagOne&&FlagTwo">
              <div class="group" :class="{'group-error':invPayeeError}">
                <label>发票抬头</label>
                <input type="text" v-model="invPayee" placeholder="请填写发票抬头(默认:个人)" maxlength="50" @focus="clear('invPayee')">
                <span>{{invPayeeErrorText}}</span>
              </div>
            </section>
            <section v-show="!FlagOne&&!FlagTwo">
              <div class="group" :class="{'group-error':coName1Error}">
                <label>公司名称</label>
                <input type="text" v-model="coName1" placeholder="请填写公司名称" maxlength="50" @focus="clear('coName1')">
                <span>{{coName1ErrorText}}</span>
              </div>
              <div class="group" :class="{'group-error':coIdentNo1Error}">
                <label>纳税人识别号</label>
                <input type="text" v-model="coIdentNo1" placeholder="请填写纳税人识别号" maxlength="50" @focus="clear('coIdentNo1')">
                <span>{{coIdentNo1ErrorText}}</span>
              </div>
              <div class="group" :class="{'group-error':depBankError}">
                <label>开户银行</label>
                <input type="text" v-model="depBank" placeholder="请填写开户银行" maxlength="50" @focus="clear('depBank')">
                <span>{{depBankErrorText}}</span>
              </div>
              <div class="group" :class="{'group-error':depBankNoError}">
                <label>开户银行账户</label>
                <input type="text" v-model="depBankNo" placeholder="请填写开户银行账户" maxlength="50" @focus="clear('depBankNo')">
                <span>{{depBankNoErrorText}}</span>
              </div>
              <div class="group" :class="{'group-error':regAddressError}">
                <label>注册地址</label>
                <input type="text" v-model="regAddress" placeholder="请填写注册地址" maxlength="50" @focus="clear('regAddress')">
                <span>{{regAddressErrorText}}</span>
              </div>
              <div class="group" :class="{'group-error':regNumberError}">
                <label>注册电话</label>
                <input type="text" v-model="regNumber" placeholder="请填写注册电话" maxlength="50" @focus="clear('regNumber')">
                <span>{{regNumberErrorText}}</span>
              </div>
            </section>
            <section v-show="FlagOne&&!FlagTwo">
              <div class="group" :class="{'group-error':coName2Error}">
                <label>公司名称</label>
                <input type="text" v-model="coName2" placeholder="请填写公司名称" maxlength="50" @focus="clear('coName2')">
                <span>{{coName2ErrorText}}</span>
              </div>
              <div class="group" :class="{'group-error':coIdentNo2Error}">
                <label>纳税人识别号</label>
                <input type="text" v-model="coIdentNo2" placeholder="请填写纳税人识别号" maxlength="50" @focus="clear('coIdentNo2')">
                <span>{{coIdentNo2ErrorText}}</span>
              </div>
            </section>
            <label>发票须知:</label>
            <p style="margin-top:10px">1.发票内容为购买商品明细；</p>
            <p>2.我们将发票与商品分开邮寄，届时请注意查收。</p>
          </content>
        </section>
      </div>
    </section>
    <section>
      <div class="ordersList">
        <ul class="goodsListHead">
          <li style="margin-left:40px;">商品</li>
          <li style="margin-left:479px">单价</li>
          <li style="margin-left:120px">数量</li>
          <li style="margin-left:120px">小计</li>
          <li style="margin-left:150px;cursor:pointer" @click="preciousTab">返回购物车</li>
        </ul>
        <ul class="goodsListContent" @click="ulClickListen($event)">
          <li><gOLi v-for="(d,index) in data" :index="index" :data="d" :key="index" >
          </gOLi></li>
        </ul>
      </div>
    </section>
    <section>
      <div class="orderDetail">
        <p>商品件数:<span>{{selected}}件</span></p>
        <p>金额合计:<span>{{total}}元</span></p>
        <p>活动优惠:<span>-{{discount}}元</span></p>
        <p>优惠券抵扣:<span>-{{discount}}元</span></p>
        <p>运费:<template v-if="shippingFee==0"><span>0 元</span></template><template v-else><span>{{shippingFee}}元</span></template></p>
        <p>应付总额:<span style="font-size:26px">{{(total*100+shippingFee*100-discount)/100}}<sub style="font-size:14px;font-weight:normal">元</sub></span></p>
      </div>
      <div class="orderGo">
        <button type="button" @click="nextTab">提交订单</button>
      </div>
    </section>
  </div>
</template>
<script>
  import addressList from '@/components/shoppingCartService/addressList.vue';
  import tabHead from '@/components/shoppingCartService/tabHead.vue';
  import goodsListContentOrderLi from '@/components/shoppingCartService/goodsListContentOrderLi.vue';
  import axios from 'axios'
  var $data={
  selectAddressId:-1,//选择的用户地址
  tabNow:1,
  FlagOne:true,
  FlagTwo:true,
  data:[],
  total:0,
  discount:0.00,
  shippingFee:'0',
  selected:0,
  invPayee:'个人',
  invPhone:'',
  invEmail:'',
  coName1:'',
  coIdentNo1:'',
  depBankNo:'',
  depBank:'',
  regAddress:'',
  regNumber:'',
  coName2:'',
  coIdentNo2:'',
  invPayeeError:false,
  invPhoneError:false,
  invEmailError:false,
  coName1Error:false,
  coIdentNo1Error:false,
  depBankNoError:false,
  depBankError:false,
  regAddressError:false,
  regNumberError:false,
  coName2Error:false,
  coIdentNo2Error:false,
  invPayeeErrorText:'',
  invPhoneErrorText:'',
  invEmailErrorText:'',
  coName1ErrorText:'',
  coIdentNo1ErrorText:'',
  depBankNoErrorText:'',
  depBankErrorText:'',
  coIdentNo2ErrorText:'',
  regAddressErrorText:'',
  coName2ErrorText:'',
  regNumberErrorText:''
}
var $this = {}
export default {
  name: 'shoppingCartOrder',
  props: {
    tabData:Array,
    reload:Boolean,
    reloadCart:Boolean
  },
  created:function(){
    window.scrollTo(0,0);
    this.$store.commit('loadingUpdate',true);
    this.$store.dispatch('$cartUpdateCustom').then((response) => {
      switch(parseInt(response.data.code)){
        case 1000500 :{
          $this.$store.commit('loadingUpdate',false);
          $this.$store.commit('$cartUpdate',response.data.data);
          $this.initCart();
          break;
        }
        case 1000510 :$this.appListen("inform","服务器忙,读取购物车失败,请稍后重试");break;
        case 1000520 :$this.appListen("inform","服务器忙,读取购物车失败,请稍后重试");break;
        case 888 :$this.loginAgain();break;
        default :$this.appListen("inform","服务器忙,读取购物车失败,请稍后重试");break;
      }
    })
    .catch(function (error) {
      
    });
  },
  mounted:function(){
    // window.scrollTo(0,0);
    // this.initCart();
  },
  data () {
    $this = this;
    return $data
  },
  watch:{
    reload(c,v){

    },
    reloadCart(curVal,oldVal){
      this.initCart();
    },
  },
  beforeRouteLeave(to, from, next) {
    this.$emit("appListen",'loading',false);
    next();
  },
  methods:{
    initCart:function(){
      if($this.$store.state.$cart==''){
        $this.appListen("inform","没有可结算的商品");
        $this.$router.push({path: '/shoppingCart/Service'});   
        return false;
      }else {
        var temp=[];
        var data = $this.$store.state.$cart.list;
        if(data == ''||data.length==0){
          $this.appListen("inform","没有可结算的商品");
          $this.$router.push({path: '/shoppingCart/Service'});   
          return false;
        }else{
          var selected=0;
          var flag=true;
          for(var i=0;i<data.length;i++){
            if(data[i]['selected']==1){
              temp.push(data[i])
              selected+=parseInt(data[i].goods_num);
            };
          }
          if(temp.length==0){
            $this.appListen("inform","没有可结算的商品");
            $this.$router.push({path: '/shoppingCart/Service'});   
            return false;
          }
          $this.data=temp;
          $this.total=$this.$store.state.$cart.totalPrice;
          $this.selected=selected;
          $this.checked=flag;
        }
      }
    },
    ulClickListen:function(e) {
      switch (e.target.nodeName.toLowerCase()){
        case 'img':{
          const id = parseInt(e.target.dataset.id);
          $this.$router.push({name: 'info_order_goods/order_details',params:{id:id}})
          break;
        }
      }
    },
    flagOneLeftListen:function(){
      if(!$this.FlagOne)$this.FlagOne=true;
    },
    flagOneRightListen:function(){
      if($this.FlagOne){
        $this.FlagOne=false;
        $this.FlagTwo=false;
      }
    },
    flagTwoLeftListen:function(){
      if(!$this.FlagTwo)$this.FlagTwo=true;
    },
    flagTwoRightListen:function(){
      if($this.FlagTwo)$this.FlagTwo=false;
    },
    preciousTab:function(){
      $this.$router.push({path:'/shoppingCart/Service'});
      window.scrollTo(0,0);
    },
    nextTab:function(){
      var invType=0;
      var data={}
      if($this.selectAddressId==-1){
        $this.$emit("appListen","inform","请选择收货地址");
        return false;
      }
      if($this.FlagOne){
        if($this.FlagTwo){
          invType=0;
        }else{
          invType=1;
        }
      }else {
        invType=2;
      }
      switch(invType){
        case 0:{
          if($this.invPayee==''||$this.invPayee==null){
            $this.invPayee='个人';
            return false;
          }
          data={
            'addressId':$this.selectAddressId, 
            'invType':0,
            'invPayee':$this.invPayee,
            'coName':'',
            'coIdentNo':'',
            'dep_bank':'',
            'dep_bank_no':'',
            'regAddress':'',
            'reg_number':'',
          }
          break;
        }
        case 1:{
          if($this.coName2==''||$this.coName2==null){
            $this.coName2Error=true;
            $this.coName2ErrorText='请填写公司名称';
            return false;
          }
          if($this.coIdentNo2==''||$this.coIdentNo2==null){
            $this.coIdentNo2Error=true;
            $this.coIdentNo2ErrorText='请填写纳税人识别号';
            return false;
          }
          data={
            'addressId':$this.selectAddressId, 
            'invType':0,
            'invPayee':'',
            'coName':$this.coName2,
            'coIdentNo':$this.coIdentNo2,
            'dep_bank':'',
            'dep_bank_no':'',
            'regAddress':'',
            'reg_number':'',
          }
          break;
        }
        case 2:{
          if($this.coName1==''||$this.coName1==null){
            $this.coName1Error=true;
            $this.coName1ErrorText='请填写公司名称';
            return false;
          }
          if($this.coIdentNo1==''||$this.coIdentNo1==null){
            $this.coIdentNo1Error=true;
            $this.coIdentNo1ErrorText='请填写纳税人识别号';
            return false;
          }
          if($this.depBank==''||$this.depBank==null){
            $this.depBankError=true;
            $this.depBankErrorText='请填写开户银行';
            return false;
          }
          if($this.depBankNo==''||$this.depBankNo==null){
            $this.depBankNoError=true;
            $this.depBankNoErrorText='请填写开户银行账户';
            return false;
          }
          if($this.regAddress==''||$this.regAddress==null){
            $this.regAddressError=true;
            $this.regAddressErrorText='请填写注册地址';
            return false;
          }
          if($this.regNumber==''||$this.regNumber==null){
            $this.regNumberError=true;
            $this.regNumberErrorText='请填写注册电话';
            return false;
          }
          data={
            'addressId':$this.selectAddressId, 
            'invType':1,
            'invPayee':'',
            'coName':$this.coName1,
            'coIdentNo':$this.coIdentNo1,
            'dep_bank':$this.depBank,
            'dep_bank_no':$this.depBankNo,
            'regAddress':$this.regAddress,
            'reg_number':$this.regNumber,
          }
          break;
        }
      }
      $this.$store.commit('loadingUpdate',true);
      axios({
        method:'post',
        url: $basePath+'?c=Order&m=addOrder',
        data:data
      })
      .then((response) => {
          //console.log(response.data.data);
          $this.$store.commit('loadingUpdate',false);
          switch(parseInt(response.data.code)){
            case 1100100 :{
              $this.$emit("appListen","reloadCart");
              $this.$router.push({name:'shoppingCartPay',params:{id:response.data.data.order_id}});
              window.scrollTo(0,0);
              break;
            }
            case 1100105 :$this.appListen("inform","非常抱歉,部分商品已下架,请返回移除下架商品");break;
            case 1100106 :{
              $this.$emit("appListen","inform","提交订单失败,收货地址已失效,请刷新页面重试");break;
            }
            case 1100116 :{
              $this.$emit("appListen","inform","部分商品库存数量不足,无法提交订单");break;
            }
            case 1100107 :{
              $this.$emit("appListen","inform","非常抱歉,部分商品当前地址无法配送,无法提交订单");break;
            }
            case 888 :$this.$emit("appListen","loginAgain");break;
            default :$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
          }
        })
      .catch(function (error) {
          //console.log(error);
        });
    },
    appListen:function($t,$i){
      $this.$emit("appListen",$t,$i);
    },
    selectAddressListen:function($addressId){
      $this.selectAddressId=$addressId;
      var recIds=[];
      for(var i=0;i<$this.data.length;i++){
        recIds.push($this.data[i]['rec_id']);
      }
      $this.$emit("loading",true);
      axios({   //现实省会城市信息
        method:'post',
        url: $basePath+'?c=Order&m=getShippingFeeByUser',
        data:{
          rec_ids:recIds,
          address_id:$this.selectAddressId
        }
      })
      .then((response) => {
        $this.$emit("loading",false);
        switch(parseInt(response.data.code)){
          case 1100100:{
            $this.shippingFee=response.data.data.shippingFee;
            break;
          }
          case 888 :$this.$emit("appListen","loginAgain");break;
        }
      })
      .catch(function (error) { 
        $this.$emit("loading",false);
          //console.log(error);
        });
    },
    clear:function($str){
      switch($str){
        case 'invPayee':{
          $this.invPayeeError=false;
          $this.invPayeeErrorText='';
          break;
        }
        case 'invPhone':{
          $this.invPhoneError=false;
          $this.invPhoneErrorText='';
          break;
        }
        case 'invEmail':{
          $this.invEmailError=false;
          $this.invEmailErrorText='';
          break;
        }
        case 'coName1':{
          $this.coName1Error=false;
          $this.coName1ErrorText='';
          break;
        }
        case 'coIdentNo1':{
          $this.coIdentNo1Error=false;
          $this.coIdentNo1ErrorText='';
          break;
        }
        case 'openBank':{
          $this.openBankError=false;
          $this.openBankErrorText='';
          break;
        }
        case 'regAcount':{
          $this.regAcountError=false;
          $this.regAcountErrorText='';
          break;
        }
        case 'regAddress':{
          $this.regAddressError=false;
          $this.regAddressErrorText='';
          break;
        }
        case 'regNumber':{
          $this.regNumberError=false;
          $this.regNumberErrorText='';
          break;
        }
        case 'coName2':{
          $this.coName2Error=false;
          $this.coName2ErrorText='';
          break;
        }
        case 'coIdentNo2':{
          $this.coIdentNo2Error=false;
          $this.coIdentNo2ErrorText='';
          break;
        }
      }
    }
  },
  components:{
    'aL':addressList,
    'tabH':tabHead,
    'gOLi':goodsListContentOrderLi
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .shoppingCartOrder{
    padding: 40px 0;
    .tabHead-Style{
      margin-bottom: 30px;
    }
    .orderHead{
      font-size:14px;
      background-color: white;
      border-radius: 4px;
      height:46px;
      color:black;
      text-align:center;
      line-height: 46px;
    }

    .orderContent{
      margin-top:20px;
      border-radius: 4px;
      padding:40px;
      height:auto;
      background:white;
      color:#333333;
      >h1,.group h3,.invoices h3{
        font-size:18px;
        font-weight:normal;
      }
      .group{
        display:inline-block;
        width: 100%;
        h3{
          margin:50px 50px 0px 0;
          display:inline-block;
        }
      }
      .invoices{
        display:inline-block;
        width: 100%;
        font-size:0;
        aside{
          margin:50px 90px 0 0;
          width:auto;
          float:left;
          height:auto;
        }
        content{
          margin:50px 0 0 0;
          float:left;
          width:420px;
        }
        .group-error{
          input{
            border:1px solid #c8161e!important;
          }
        }
        .group{
          width:auto;
          font-size:0;
          margin-bottom:20px;
          position:relative;
          label{
            position: absolute;
            top: -10px;
            left: 20px;
            padding: 0 10px;
            background-color: white;
          }
          input{
            width:390px;
            height:40px;
            border:1px solid #e0e0e0;
            border-radius:4px;
            text-indent:15px;
            outline:none;
          }
          span{
            font-size:12px;
            color:#c8161e;
            position: absolute;
            right: 0;
            top: -18px;
          }
        }
        button{
          width:180px;
          height:40px;
          border-radius:4px;
          text-align:center;
          border:1px solid #e0e0e0;
          background-color:white;
          color:#5C6670;
          cursor: pointer;
          margin-right:30px;
          float: left;
          outline:none;
        }
        button:hover{
          /* box-shadow: 0px 2px 6px #cbcbcb; */
        }
        button.active{
          background-color:#f5f5f5;
          border:0px solid gray;
        }
        button.disabled{
          cursor:no-drop;
        }
        p{
          color:#c8161e;
          font-weight:normal
        }
      }
    }
    .ordersList{
      padding-top:20px;
      background-color:#f5f5f5;
      border-bottom:1px solid #e0e0e0;
      .goodsListHead{
        font-size:0;
        background-color: white;
        border-radius: 4px 4px 0 0;
        height:auto;
        padding-bottom:30px;
      }
      ul.goodsListHead>li{
        display:inline-block;
        padding-top: 20px;
        font-weight:normal;
        color:#5C6670;
        &:first-child{
          font-size:18px;
          color:#333333
        }
      }
      .goodsListContent{
        margin:0;
        background-color:white;
        padding-top: 10px;
        padding-bottom: 20px;
      }
      .goodsListContent>li{
        width: 100%;
      }
    }
    .orderDetail{
      background-color:white;
      padding:30px;
      border-bottom:1px solid #e0e0e0;
      color:#5c6670;
      p{
        font-size:14px;
        font-weight:normal;
        text-align:right;
        margin-bottom:10px
      }
      span{
        display:inline-block;
        width: auto;
        min-width: 170px;
        color:#c8161e;
        font-weight:normal;
        text-align:right;
      }
    }
    .orderGo{
      background-color:white;
      padding:20px 20px 20px 0;
      text-align:right;
      button{
        width:260px;
        height:40px;
        border-radius:8px;
        border:0 solid white;
        background-color:#c8161e;
        color:white;
        cursor:pointer;
      }
    }
  }
</style>

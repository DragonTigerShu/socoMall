<template>
  <div class="shoppingCartService">
    <tabH :data="tabData" :now="tabNow" ></tabH>
    <div class="goodsList">
      <ul class="goodsListHead">
        <li class="li-checkBox-style" style="margin-left:20px;">
          <input type="checkbox" style="display:none" id="goodListAll" @click="checkClick" :checked="checked"><label for="goodListAll"><img :src="checked ? imgchecked : imgUnChecked " ></label>
        </li>
        <li style="margin-left:20px">全选</li>
        <li style="margin-left:60px">商品信息</li>
        <li style="margin-left:309px">单价</li>
        <li style="margin-left:157px">数量</li>
        <li style="margin-left:157px">小计</li>
        <li style="margin-left:157px">操作</li>
      </ul>
      <template v-if="login==0">
        <div class="goodsListContent empty paddingTop">
          <p>登录之后将显示您之前加入的商品！</p>
          <button class="login" @click="loginIn">立即登录</button>
          <button  class="goShopping" @click="goShopping" >马上去购物</button>
        </div>
      </template>
      <template v-else>
        <template v-if="$cart==''">
          <div class="goodsListContent loading">
            <img :src="loadingImg" alt="loading" />
          </div>
        </template>
        <template v-else>
          <div v-if="$cart.list.length==0" class="goodsListContent empty">
            <img :src="emptyShoppingCart">
            <p>购物车空空如也~</p>
            <button @click="goShopping">马上去购物</button>
          </div>
          <template v-else>
            <ul class="goodsListContent">
              <li><gLi name="goodsListContentLi" :class="index==$cart.list.length-1?'clearborder':''" v-for="(d,index) in $cart.list" :index="index" :data='d'  :key="index" :minusDis="minusGroup[index]" :addDis="addGroup[index]" @checkedListen='checkedListen' @aNClickListen="aNClickListen"   @removeClickListen='removeClickListen'>
              </gLi></li>
            </ul>
            <ul class="goodsListFoot" id="goodsListFoot">
              <li class="coutinue" @click="goShopping">继续购物</li>
              <li class="footInformation">共 <span>{{goodsNum}}</span> 件商品,已选择 <span>{{goodsNumSelected}}</span> 件</li>
              <li class="total">
                <div>合计:</div>
                <div class="money">{{$cart.totalPrice}}</div>
                <div>元</div>
              </li>
              <li class="goOrder" @click="goOrder">去结算</li>
            </ul>
          </template>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
  import tabHead from '@/components/shoppingCartService/tabHead.vue';
  import goodsListContentLi from '@/components/shoppingCartService/goodsListContentLi.vue';
  import {overflowDisabled} from '@/common/js/data'
  import axios from 'axios'
  var $data = {
    'loadingImg':require('../../common/images/personal/loading.gif'),
    'flag':false,//当前页面是否接收了购物车数据接口f没有t已接收
    'tabNow':0,
    'login':0,
    'emptyShoppingCart':require('../../common/images/shoppingCart/emptyShoppingCart.png'),
    'imgUnChecked':require('../../common/images/icon/checkbox.png'),
    'imgchecked':require('../../common/images/icon/checkbox-checked.png'),
    'checked': false,
    'addGroup':[],
    'minusGroup':[],
    'removeGroup':[],
    'goodsNumSelected':0,
    'goodsNum':0,
  }
  var $this={}
  export default {
    name: 'shoppingCartService',
    props: {
      tabData:Array,
      reload:Boolean,
      reloadCart:Boolean
    },
    data () {
      $this = this;
      return $data
    },
    created:function(){
      
    },
    beforeRouteLeave(to, from, next) {
      this.$store.commit('loadingUpdate',false);
      next();
    },
    mounted:function(){
      overflowDisabled(false);
      window.scrollTo(0,0);
      if($user.user_name==''||$user.user_name==null){
        this.login=0;
      }else{
        this.login=1;
      }
    },
    computed:{
      $cart:function(){
        if($this.$store.state.$cart=='')return '';
        else {
          var goodsNumSelected=0;
          var goodsNum=0;
          var data = $this.$store.state.$cart.list;
          var flag=true;
          $this.minusGroup=[];
          $this.addGroup=[];
          for(var i=0;i<data.length;i++){
            goodsNum+=parseInt(data[i].goods_num);
            if(data[i].goods_num==1)$this.minusGroup.push(true);
            else $this.minusGroup.push(false);
            $this.addGroup.push(false);
            if(data[i].selected==1){
              goodsNumSelected+=parseInt(data[i].goods_num);
            }else{
              flag=false;
            }
          }
          $this.goodsNumSelected=goodsNumSelected;
          $this.goodsNum=goodsNum;
          $this.checked=flag;
          return $this.$store.state.$cart;
        }
      }
    },
    watch:{
      reload(curVal,oldVal){
        $this.checked=false;
        if($user.user_name==''||$user.user_name==null){$this.login=0;}
        else $this.login=1;
      },
      login(curVal,oldVal){
        if($this.login==1){
        }else{
          $this.checked=false;
        }
      }
    },
    methods:{
      loginIn:function(){
        $this.$emit("appListen","gologin");
      },
      setMask:function($b){//设置遮罩，每次使用接口，弹出loading遮罩，当接口未返回数据时禁止接口的使用
        $this.flag=$b;
        this.$store.commit('loadingUpdate',!$b);
        //$this.$emit("appListen","loading",!$b);
      },
    checkClick:function(e){
      if($this.login==1){
        var data = $this.$store.state.$cart.list;
        if(data.length!=0){
          $this.$store.commit('loadingUpdate',true);
          var recIds=[];
          var isSelect='';
          if(e.target.checked)isSelect=1;
          else isSelect=0;
          for(var i=0;i<data.length;i++){
            recIds.push(data[i].rec_id);
          }
          axios({
            method:'post',
            url: $basePath+'?c=Cart&m=selectCart',
            data: {
              'recIds':recIds,
              'isSelect':isSelect
            }
          })
          .then((response) => {
            $this.$store.commit('loadingUpdate',false);
            switch(parseInt(response.data.code)){
              case 1000700 :$this.$emit('appListen','reloadCart');break;
              case 1000710 :;
              case 1000720 :this.$emit('appListen','inform',"服务器忙,请稍后重试");break;
              case 888 :$this.$emit('appListen','loginAgain');break;
              default:$this.$emit('appListen','inform',"服务器忙,请稍后重试");break;
            }
          })
          .catch(function (error) {
          });
        }
      }
    },
    checkedListen:function($i,$b){
      $this.$store.commit('loadingUpdate',true);
      var isSelect='';
      var recIds=[];
      if($b){
        isSelect=1;
      }else{
        isSelect=0;
      }
      recIds.push($this.$store.state.$cart.list[$i].rec_id);
      axios({
        method:'post',
        url: $basePath+'?c=Cart&m=selectCart',
        data: {
          'recIds':recIds,
          'isSelect':isSelect
        }
      })
      .then((response) => {
        $this.$store.commit('loadingUpdate',false);
        switch(parseInt(response.data.code)){
          case 1000700 :$this.$store.dispatch('$cartUpdate');break;
          case 1000710 :;
          case 1000720 :$this.$emit('appListen','inform',"服务器忙,请稍后重试");break;
          case 888 :$this.$emit('appListen','loginAgain');break;
          default:$this.$emit('appListen','inform',"服务器忙,请稍后重试");break;
        }
      })
      .catch(function (error) {
        //console.log(error);
      });
    },
    aNClickListen:function($i,$b){
      //true ++ false--
      var data = $this.$store.state.$cart.list;
      var goodsNum=data[$i].goods_num;
      var recId=data[$i].rec_id;
      if($b){
        goodsNum++;
      }else{
        goodsNum--;
      }
      if(goodsNum>0){
        axios({
          method:'post',
          url: $basePath+'?c=Cart&m=changeNum',
          data:{
            'goodsNum':goodsNum,
            'recId':recId
          }
        })
        .then((response) => {
            //console.log(response.data);
            $this.$store.commit('loadingUpdate',false);
            switch(parseInt(response.data.code)){
              case 1000600 :$this.$store.dispatch('$cartUpdate');break;
              case 1000610 ://console.log("请填写必填项");break;
              case 1000630 :$this.$emit('appListen','loginAgain');break;
              case 1000640 :break;
              case 1000650 :$this.$emit('appListen','inform',"服务器忙");break;
              case 888 :$this.$emit('appListen','loginAgain');break;
            }
          })
        .catch(function (error) {
            //console.log(error);
          });
      }else{
        $this.$store.commit('loadingUpdate',false);
      }
      
    },
    removeClickListen:function($i){ //$i 返回第几个li 
      $this.$emit("appListen",'removeShoppingCart',$this.$store.state.$cart.list[$i].rec_id);
    },
    goOrder:function(){
      $this.$router.push({path: '/shoppingCart/Order'});
    },
    goShopping:function(){
      $this.$router.push({path:'/'});
      window.scrollTo(0,0);
    }
  },
  components:{
    'gLi':goodsListContentLi,
    'tabH':tabHead
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .shoppingCartService{
    padding: 40px 0;
    .tabHead-Style{
      margin-bottom: 30px;
    }
    .disappear-animation
    {
      animation:disappear-action 0.5s;
    }
    .move-up-animation
    {
      animation: move-up-action 0.5s;
    }
    @keyframes move-in-action
    {
      
    }
    @keyframes move-up-action
    {
      0%   {transform:translateY(180px);}
      100% {transform:translateY(0px);}
    }
    @keyframes move-up-action2
    {
      0%   {transform:translateY(0px);z-index:19;}
      100% {transform:translateY(-180px);z-index:19;}
    }
    @keyframes disappear-action
    {
      0%   {opacity:1;}
      100% {opacity:0;}
    }
    .goodsList{
      li label{
        cursor:pointer;
      }
      .goodsListContentLi.clearborder{
        border-bottom:0px solid #333;
      }
      .goodsListHead{
        font-size:0;
        background-color: white;
        border-radius: 4px;
        height:46px;
        padding-left:20px;
        >li{
          display:inline-block;
          vertical-align:middle;
          padding-top: 12px;
          font-size:14px;
          color:#5c6670;
          font-weight:normal;
        }
      }
      .goodsListFoot{
        font-size:0;
        background-color: white;
        border-radius: 4px;
        height:46px;
        position: relative;
        display: flex;
        align-items: center;
        >li{
          display:flex;
          flex-direction:row;
          align-items:center;
        }
        .total{
          flex: 1;
          justify-content: flex-end;
          div{
            margin:0 15px 0 5px;
            color:#C8161E;
          }
          .money{
            display:flex;
            align-items:center;
            margin:0;
            color: #C8161E;
            width: 130px;
            font-size: 27px;
            width: auto;
            height:46px;
          }
        }
        .coutinue{
          margin-left: 36px;
          cursor: pointer;
        }
        .footInformation{
          border-left:1px solid #E0E0E0;
          padding-left: 20px;
          margin: 10px 0 10px 20px;
          height: 20px;
          line-height: 20px;
          span{
            color: #C8161E;
          }
        }
        li.goOrder{
          justify-content:center;
          background: #C8161E;
          width: 200px;
          height: 46px;
          font-size: 18px;
          color: white;
          border-radius: 0 4px 4px 0;
          line-height: 46px;
          cursor:pointer;
        }
      }
      .goodsListContent{
        margin:20px 0;
        border-radius: 4px;
        >li{
          width: 100%;
          min-height:540px;
          background-color:white;
        }
        &.loading{
          height:500px;
          text-align:center;
          background-color:white;
          display:flex;
          justify-content:center;
          align-items:center;
        }
        &.empty{
          height:500px;
          text-align:center;
          background-color:white;
          &.paddingTop{
            padding-top:150px;
          }
          img{
            margin-top:10px;
            width:250px;
            height:250px;
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
          }
          .login{
            width:180px;
            margin-right:20px;
          }
          .goShopping{
            width:180px;
            background-color:white;
            border:1px solid #c8161e;
            color:#c8161e;
            box-sizing:border-box;
          }
        }
      }
      .li-checkBox-style{
        position: relative;
        top: 3px;
      }
    }
  }
</style>

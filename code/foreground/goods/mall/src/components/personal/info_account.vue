<!--个人中心-->
<template>
  <div class="info_account">
   <div class="info_right_top">   
     <img class="iconImg"  :src="headImg">
     <div class="info_edit">
       <ul>
        <li><span>用户名:</span><input type="text" v-model="userName" readonly="readonly" > <article @click="editUserName">修改</article></li>
        <li><span>手机号:</span><input type="text" :value="phone" readonly="readonly" > <article @click="editPhone">修改</article></li>
        <li class="headImg_edit" @change="fileSelected">
         <div class="info_img" >
          <form>
           <input id="fileToUpload" type="file" tabIndex = "-1" accept="headImg" name="file" />
         </form>
       </div>
       <label for="fileToUpload">修改头像</label>
     </li>
   </ul>
 </div>
</div>
<div class="info_right_bottom">
  <label>
   <span><img :src="imgPaid" /></span>
   <p>待支付订单:
    <i>{{payNum}}</i>
    <a href="javascript:void(0)" @click="goOrder(2)"> 查看订单</a>
  </p>
</label>
<label>
  <span><img :src="imgReceived" /></span>
  <p>待收货订单:
    <i>{{receiveNum}}</i>
    <a href="javascript:void(0)" @click="goOrder(3)"> 查看订单</a>
  </p>
</label>
<label>
  <span><img :src="imgCustomer" /></span>
  <p>售后订单:
    <i>{{afterSaleNum}}</i>
    <a href="javascript:void(0)" @click="goAfterSaleOrder()"> 查看售后订单</a>
  </p>
</label>
</div>
</div>
</template>
<script>
  import axios from 'axios'
  var $this={}
  var $data ={
   infoIndex: 2,
   imgPaid:require("../../common/images/personal/paid.png"),
   imgReceived:require("../../common/images/personal/received.png"),
   imgCustomer:require("../../common/images/personal/customer.png"),
   orderNum:0,
   payNum:0,
   receiveNum:0,
   afterSaleNum:0,
   orderFlag:false,
   afterSaleFlag:false,
   phone:'*',
   userName:'*'
 }
 export default{
  name: 'info_account',
  props: {
    headImg:String,
    reload:Boolean
  },
  watch:{
    reload(c,v){
      this.userName=$user.user_name;
      this.phone=$user.phone;
    }
  },
  created:function(){
    this.userName=$user.user_name;
    this.phone=$user.phone;
    $this.$store.commit('loadingUpdate',true);
    this.initOrder();
    this.initAfterSaleOrder();
  },
  mounted:function(){
    this.$emit('initListen',0);//刷新后重置左侧位置
  },
  data(){
    $this = this;
    return $data;
  }, 
  methods: {
    goOrder:function(n){
      $this.$store.commit('orderStatusUpdate',n);
      $this.$router.push({name:'info_order_goods/info_order_list'});
    },
    goAfterSaleOrder:function(){
      $this.$router.push({name:'info_order_goods/info_order_aftersale_list'});
    },
    checkLoading:function(){
      if($this.orderFlag&&$this.afterSaleFlag){
        $this.$store.commit('loadingUpdate',false);
      }
    },
    initOrder:function(){
      axios({
        method:'post',
        url: $basePath+'?c=Order&m=userOrderList',
        data:{
          'page':1,
          'limit':100
        }
      })
      .then((response) => {
        //console.log(response.data.data);
        $this.orderFlag=true;
        $this.checkLoading();
        switch(parseInt(response.data.code)){
          case 1100100 :{
            $this.payNum=0;
            $this.receiveNum=0;
            for(var i=0;i<response.data.data.list.length;i++){
              if(response.data.data.list[i]['order_status']<2&&response.data.data.list[i]['pay_status']==0){
                $this.payNum++;
              }
              if(response.data.data.list[i]['order_status']==1&&response.data.data.list[i]['shipping_status']==1){
                $this.receiveNum++;
              }
            }
            $this.orderNum=response.data.data.list.length;
            break;
          }
          case 888 :$this.$emit("appListen","loginAgain");break;
          default :$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
        }
      })
      .catch(function (error) {
        $this.orderFlag=true;
        $this.checkLoading();
        //console.log(error);
      });
    },
    initAfterSaleOrder:function(){
      axios({
        method:'post',
        url: $basePath+'?c=ReturnGoods&m=userReturnGoodsList',
        data:{
          'page':1,
          'limit':100
        }
      })
      .then((response) => {
        $this.afterSaleFlag=true;
        $this.checkLoading();
        switch(parseInt(response.data.code)){
          case 1600100 :{
            $this.afterSaleNum=response.data.data.length;
            break;
          }
          case 888 :$this.$emit("appListen","loginAgain");break;
          default :$this.$emit("appListen","inform","服务器忙,请稍后重试");break;
        }
      })
      .catch(function (error) {
        $this.afterSaleFlag=true;
        $this.checkLoading();
        //console.log(error);
      });
    },
    editUserName:function(){
      $this.$emit("appListen","editUserName");
    },
    editPhone:function(){
      $this.$emit("appListen","editPhone");
    },
    //添加图片信息
    fileSelected: function() {
		//图片上传
    var fileInput = document.getElementById("fileToUpload");
    var imgurl = document.querySelector(".iconImg");
    var formData = new FormData(document.querySelector("form"));
    function compress(file, quality, callback) {
      var file = fileInput.files[0];
      if (!window.FileReader || !window.Blob) {
        return errorHandler("您的浏览器不支持图片压缩")();
      }
      var reader = new FileReader();
      var mimeType = file.type || "image/jpeg";
      reader.onload = createImage;
      reader.onerror = errorHandler("图片读取失败！");
      reader.readAsDataURL(file);
      function createImage() {
        var dataURL = this.result;
        var image = new Image();
        image.onload = compressImage;
        image.onerror = errorHandler("图片加载失败");
        image.src = dataURL;
          $this.newHeadPic = image.src; //图片赋值
          imgurl.style.width = 160 + "px";
          imgurl.style.height = 160 + "px";
        }
        function compressImage() {
          var canvas = document.createElement("canvas");
          var ctx;
          var dataURI;
          var result;
          ctx = canvas.getContext("2d");
          var originWidth = this.width;
          var originHeight = this.height;
          // canvas对图片进行缩放
          canvas.width = targetWidth;
          canvas.height = targetHeight;
          //比例压缩
          var rate = 0.4;
          var qua = 0.5;
          if (quality.qua && obj.quality <= 1 && obj.quality > 0) {
            qua = quality.qua;
          }
          var base64 = canvas.toDataURL("image/jpeg", qua);
          var targetWidth = originWidth * rate,
          targetHeight = originHeight * rate;
          ctx.clearRect(0, 0, targetWidth, targetHeight);
          ctx.drawImage(this, 0, 0, targetWidth, targetHeight);
          dataURI = canvas.toDataURL(mimeType, quality);
          result = dataURIToBlob(dataURI);
          callback(null, result);
        }
        function dataURIToBlob(dataURI) {
          var type = dataURI.match(/data:([^;]+)/)[1];
          var base64 = dataURI.replace(/^[^,]+,/, "");
          var byteString = atob(base64);
          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
          }
          return new Blob([ia], { type: type });
        }
        function errorHandler(message) {
          return function() {
            var error = new Error("Compression Error:", message);
            callback(error, null);
          };
        }
      }
      var file = fileInput.files[0];
      compress(file, 0.5, function(err, data) {
        if (err) {
          //console.log(err);
          return;
        }
        formData.append("filename", data);
        axios({
          method: "post",
          url: $basePath+"?c=User&m=changeNH", //用户修改图像信息
          data: {
            headImg: $this.newHeadPic //图片上传参数
          }
        })
        .then(response => {
          //200131表示已登陆状态，200132表示未登录
         //  //console.log(response.data);
          //成功回调函数
          if(response.data.code){
            $user.headImg=$this.newHeadPic;
            $this.$emit("appListen","editHeadPic");
          }
        })
        .catch(function(error) {
          //console.log(error);
        });
      });
    }
  }
}
</script>
<style lang="scss">
  .info_account{
    background-color: #ffffff;
    .iconImg{
      width:160px;
      height:160px;
    }
    .info_right_top {
      padding: 50px;
      display: flex;
      border-bottom: 1px solid #ededed;
      .headImg_edit{
        form{
          /*opacity: 0;
          height: 0; 
          position: absolute;*/
          display:none;
        }
        label{
          color: #5c6670;
          cursor:pointer;
        }
      }
      .info_edit {
        flex: 4;
        padding: 25px 40px;
        width: 100%;
        height: 100%;
        li {
          line-height: 40px;
          span {
            font-size: 14px;
            color: #5c6670;
            &:last-child {
              cursor: pointer;
            }
          }
          input {
            font-size: 14px;
            color: #5c6670;
            margin-left: 5px;
          }
        }
        article {
          display: -webkit-inline-box;
          display: inline-box;
          color: #ca1113;
          cursor: pointer;
        }
      }
    }
    .info_right_bottom {
      padding: 50px;
      display: flex;
      label {
        display: inline-block;
        flex: 0;
        display: flex;
        span {
          display: inline-block;
          visibility: visible;
          width: 100px;
          height: 100px;
          border-radius: 4px;
          img {
            display: block;
            margin: 30px auto;
          }
        }
        p {
          padding: 30px 0px;
          margin-left: 30px;
          color: #5c6670;
          font-size: 18px;
          width: 128px;
          height: 103px;
          margin-right: 50px;
          i {
            font-size: 16px;
            font-weight: 600;
            color: #ca1113;
            margin-left: 5px;
          }
          a {
            display: block;
            font-size: 14px;
            color: #5c6670;
          }
        }
        &:nth-of-type(1) span {
          background-color: #2096f3;
        }
        &:nth-of-type(2) span {
          background-color: #8bc34a;
        }
        &:nth-of-type(3) span {
          background-color: #ffab00;
        }
      }
    }	
  } 
</style>
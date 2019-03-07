<template>
  <section class="addressList">
    <ul>
      <li v-for="(d,index) in data" >
        <aL :data="d" :data-areaId='d.city' :isSelected="parseInt(d.address_id)==parseInt(selectAddress)?true:false" @selectedListen="selectedListen" @editListen="editListen" @deleteListen="deleteListen"></aL>
      </li>
      <li><aLA @addressAddListen="addressAddListen"></aLA></li>
    </ul>
    <mydialog :isShow="mydialog"  @closeIcon="closeDialog">
      <h3 slot="header-title">{{dialogTitle}}</h3>
      <section slot="content-info" class="content-info">
        <div class="group-info">
          <label>姓名*</label><input type="text" placeholder="请填写收货人姓名" v-model="consignee" :class="{'error':consigneeError}" @focus="clearConsignee"><span>{{consigneeErrorText}}</span>
          <label style="margin-left:15px">手机号*</label><input type="text" placeholder="请填写收货人手机号" v-model='mobile' maxlength="11" :class="{'error':mobileError}" @focus='clearMobile'><span>{{mobileErrorText}}</span>
        </div>
        <div class="group-info">
          <label>所在地区*</label>
          <select :class="{'selected-style':provincesId,'default-style':!provincesId,'error':proviceError}" id="provice"  name="province"  @change="provinceListen" @focus="clearProvince">
           <option value="0">省/自治区</option>
           <option v-for="(item, index) in provinces"  v-bind:value="item.id" :selected="parseInt(item.id)==parseInt(provincesId)?true:false">{{item.name}}</option>
         </select>
         <span>{{proviceErrorText}}</span>
         <select :class="{'selected-style':cityId,'default-style':!cityId,'error':cityError}" id="cityId" name="city" @focus="clearCity" @change="cityListen">
          <option value="0">城市/地区</option>
          <option v-for="(item, index) in getCity"  v-bind:value="item.id" :selected="parseInt(item.id)==parseInt(cityId)?true:false" >{{item.name}}</option>
        </select>
        <span style="left:240px">{{cityErrorText}}</span>
        <select :class="{'selected-style':areaId,'default-style':!areaId,'error':areaError}" id="areaId"  name="block" @change="areaListen" style="width:163px" @focus="clearArea">
          <option value="0">区/县</option>
          <option v-for="(item, index) in area"  v-bind:value="item.id" :selected="parseInt(item.id)==parseInt(areaId)?true:false">{{item.name}}</option>
        </select>
        <span>{{areaErrorText}}</span>
      </div>
      <div class="group-info">
        <label>详细地址*</label><input :class="{'error':addressError}" style="width:423px;" type="text" placeholder="请填写收货人详细地址" v-model='address' @focus="clearAddress" ><span style="left: 113px;">{{addressErrorText}}</span>
      </div>
      <div class="group-info">
        <label>邮政编码</label><input :class="{'error':zipcodeError}" type="text" placeholder="请填写邮政编码" maxlength="6" v-model='zipcode' @focus="clearZipcode" ><span>{{zipcodeErrorText}}</span>
        <label style="margin-left:18px;margin-right:7px;">固定电话</label><input type="text" :class="{'error':telError}" placeholder="请填写收货人固定电话" v-model='tel' maxlength="11" @focus='clearTel' ><span>{{telErrorText}}</span>
      </div>
      <div class="default-info">
        <input type="checkbox" style="display:none" @click="checkClick" :checked="checked" id="address-default"><label for="address-default">设为默认<img :src="checked ? imgchecked : imgUnChecked " ></label>
      </div>
      <div class="group-btn">
        <button class="cancel" @click="cancelClick">取消</button><button class="ok" @click="okClick">确定</button>
      </div>
    </section>
  </mydialog>
</section>
</template>
<script>
  import addressLi from '@/components/shoppingCartService/addressLi.vue';
  import addressLiAdd from '@/components/shoppingCartService/addressLiAdd.vue';
  import mydialog from '@/components/dialog/dialogBig';
  import axios from 'axios'
  var $data={
    data:[],
    selectAddress:-1,
    dialogTitle:'新增收货地址',
    mydialog:false,
    removeIndex:-1,
    imgUnChecked:require('../../common/images/icon/checkbox.png'),
    imgchecked:require('../../common/images/icon/checkbox-checked.png'),
    checked: true,
    provinces:[],  // 省
    getCity:[],   // 市
    area:[],  // 区
    provincesId:'',
    cityId:'',
    areaId:'',
    consignee:'',
    mobile:'',
    address:'',
    zipcode:'',
    tel:'',
    addressId:'',
    isDefault:0,
    consigneeError:false,
    mobileError:false,
    proviceError:false,
    cityError:false,
    areaError:false,
    addressError:false,
    zipcodeError:false,
    telError:false,
    consigneeErrorText:'',
    mobileErrorText:'',
    proviceErrorText:'',
    cityErrorText:'',
    areaErrorText:'',
    addressErrorText:'',
    zipcodeErrorText:'',
    telErrorText:''
  }
  var $this = {}
  export default {
    name: 'shoppingCartOrder',
    data () {
      $this = this;
      return $data
    },
    props: {
      selectAddressId:{type:Number,default:-1},
      userId:{type:Number,default:0},
      noSelect:{type:Boolean,default:false},
      reload:Boolean
    },
    created:function(){
      this.selectAddress=this.selectAddressId;
    axios({   //获取地址
      method:'post',
      url: $basePath+'?c=UserAddress&m=getListByUser',
    })
    .then((response) => {;
      switch(parseInt(response.data.code)){
        case 600230:{
          if(response.data==null||response.data=='')return false;
          var data=[];
          var length= Object.keys(response.data.data).length;
          for(var i=0;i<length-1;i++){
            if(!$this.noSelect){
              if(parseInt(response.data.data[i].is_default)==1&&$this.selectAddress==-1){
                $this.selectAddress=response.data.data[i].address_id;
              }
            }
            data.push(response.data.data[i]);
          }
          $this.$emit('selectListen',$this.selectAddress);
          $this.data=data;
          break;
        }
        case 888 :$this.$emit("appListen","loginAgain");break;
        default:break;
      }
    })
    .catch(function (error) { 
        //console.log(error);
      });

    //初始化省市级联信息
     axios({   //现实省会城市信息
      method:'post',
      url: $basePath+'?c=UserAddress&m=getProvince',
    })
     .then((response) => {
				//200131表示已登陆状态，200132表示未登录
				let data =  response.data
				if(data.code=='600100'){
					let arr = data.data
          $this.provinces = arr 
          
        }
      })
     .catch(function (error) { 
				//console.log(error);
      });  
     
   },
   watch:{
    reload(c,v){
        axios({   //获取地址
          method:'post',
          url: $basePath+'?c=UserAddress&m=getListByUser',
        })
        .then((response) => {
          switch(parseInt(response.data.code)){
            case 600230:{
              if(response.data==null||response.data=='')return false;
              var data=[];
              var length= Object.keys(response.data.data).length;
              for(var i=0;i<length-1;i++){
                if(!$this.noSelect){
                  if(parseInt(response.data.data[i].is_default)==1&&$this.selectAddress==-1){
                    $this.selectAddress=response.data.data[i].address_id;
                  }
                }
                data.push(response.data.data[i]);
              }
              $this.$emit('selectListen',$this.selectAddress);
              $this.data=data;
              break;
            }
            case 888 :$this.$emit("appListen","loginAgain");break;
            default:break;
          }
        })
        .catch(function (error) { 
            //console.log(error);
          });
      },
      selectAddressId(c,v){
        this.selectAddress=c;
      }
    },
    methods:{
      clearParams:function(){
      $this.getCity=[],   // 市
      $this.area=[],  // 区
      $this.provincesId='',
      $this.cityId='',
      $this.areaId='',
      $this.consignee='',
      $this.mobile='',
      $this.address='',
      $this.zipcode='',
      $this.tel='',
      $this.addressId='',
      $this.checked=true,
      $this.consigneeError=false;
      $this.consigneeErrorText='';
      $this.mobileError=false;
      $this.mobileErrorText='';
      $this.proviceError=false;
      $this.proviceErrorText='';
      $this.cityError=false;
      $this.cityErrorText='';
      $this.areaError=false;
      $this.areaErrorText='';
      $this.addressError=false;
      $this.addressErrorText='';
      $this.zipcodeError=false;
      $this.zipcodeErrorText='';
      $this.telError=false;
      $this.telErrorText='';
    },
    addressAddListen:function(){
      $this.clearParams();
      $this.dialogTitle='新增收货地址',
      $this.mydialog=true;
    },
    editListen:function($i){
      $this.clearParams();
      $this.dialogTitle='修改收货地址',
      $this.addressId=$i,
      axios({   //现实省会城市信息
        method:'post',
        url: $basePath+'?c=UserAddress&m=getAddress',
        data:{
          addressId:$this.addressId
        }
      })
      .then((response) => {
        switch(parseInt(response.data.code)){
          case 600220 :{
            var $res = response.data.data;
              $this.getCity=$res.citys;   // 市
              $this.area=$res.areas;  // 区
              $this.provinces=$res.provinces;
              $this.provincesId=$res.addressData.province;
              $this.cityId=$res.addressData.city;
              $this.areaId=$res.addressData.district;
              $this.consignee=$res.addressData.consignee;
              $this.mobile=$res.addressData.mobile;
              $this.address=$res.addressData.address;
              $this.zipcode=$res.addressData.zipcode;
              $this.tel=$res.addressData.tel;
              if(parseInt($res.addressData.is_default)==1)$this.checked=true;
              else $this.checked=false;
              $this.mydialog=true;
              break;
            }
            case 600221 ://console.log("请填写必填项");
            case 600222 :break;
            case 888 :$this.$emit("appListen","loginAgain");break;
          }
        })
      .catch(function (error) { 
        //console.log(error);
      }); 
    },
    deleteListen:function($addressId){
      $this.$emit("appListen","deleteAddress",$addressId);
    },
    closeDialog:function(){
      $this.mydialog=false;
    },
    checkClick:function(e){
      $this.checked= e.target.checked;
    },
    //编辑地址弹窗事件
    cancelClick:function(){
      $this.mydialog=false;
    },
    //编辑地址弹窗事件
    okClick:function(){
      if($this.consignee==null||$this.consignee==''){
        $this.consigneeError=true;
        $this.consigneeErrorText='请填写收货人姓名';
        return false;
      }
      // if($illegalCheck.test($this.consignee)){
      //   $this.consigneeError=true;
      //   $this.consigneeErrorText='含有非法字符,请剔除';
      //   return false;
      // }
      if($this.mobile==null||$this.mobile==''){
        $this.mobileError=true;
        $this.mobileErrorText='请填写收货人电话';
        return false;
      }
      if(!$phoneCheck.test($this.mobile)){
        $this.mobileError=true;
        $this.mobileErrorText='无效的手机号';
        return false;
      }
      if($this.provincesId==null||$this.provincesId==''){
        $this.proviceError=true;
        $this.proviceErrorText='请填写省/自治区';
        return false;
      }
      if($this.cityId==null||$this.cityId==''){
        $this.cityError=true;
        $this.cityErrorText='请填写城市/地区';
        return false;
      }
      if($this.areaId==null||$this.areaId==''){
        $this.areaError=true;
        $this.areaErrorText='请填写区/县';
        return false;
      }
      if($this.address==null||$this.address==''){
        $this.addressError=true;
        $this.addressErrorText='请填写详细地址';
        return false;
      }
      // if($illegalCheck.test($this.address)){
      //   $this.addressError=true;
      //   $this.addressErrorText='含有非法字符,请剔除';
      //   return false;
      // }
      if($this.zipcode==null||$this.zipcode==''){

      }else{
        var reg= /^[0-9]{6}$/;
        if(!reg.test($this.zipcode)){
          $this.zipcodeError=true;
          $this.zipcodeErrorText='邮编不正确';
          return false;
        }
      }
      if($this.tel==null||$this.tel==''){

      }else{
        reg= /^[0-9]{11}$/;
        if(!reg.test($this.tel)){
          $this.telError=true;
          $this.telErrorText='固定电话不正确';
          return false;
        }
      }
      if($this.checked)$this.isDefault=1;
      else $this.isDefault=0;
      if($this.addressId==null||$this.addressId==''){
        axios({   //市区
          method:'post',
          url: $basePath+'?c=UserAddress&m=addAddress',
          data:{
            consignee:$this.consignee,
            mobile:$this.mobile,
            provinceId:$this.provincesId,
            cityId:$this.cityId,
            areaId:$this.areaId,
            address:$this.address,
            zipcode:$this.zipcode,
            tel:$this.tel,
            isDefault:$this.isDefault,
          }
        })
        .then((response) => {
          //200131表示已登陆状态，200132表示未登录
          let data =  response.data
          switch(parseInt(response.data.code)){
            case 600200 :{
              $this.$emit("appListen","addAddressSuccess");
              axios({   //现实省会城市信息
                method:'post',
                url: $basePath+'?c=UserAddress&m=getListByUser',
              })
              .then((response) => {
                if(parseInt(response.data.code)==600230){
                  if(response.data==null||response.data=='')return false;
                  var data=[];
                  var length= Object.keys(response.data.data).length;
                  for(var i=0;i<length-1;i++){
                    data.push(response.data.data[i]);
                  }
                  $this.data=data;
                }
              })
              .catch(function (error) { 
                //console.log(error);
              }); 
              break;
            }
            case 600201 ://console.log('请填写必填项');break;
            case 600202 : 
            $this.mobileError=true;
            $this.mobileErrorText='无效的手机号';
            break;
            case 600203 : 
            $this.proviceError=true;
            $this.proviceErrorText='区域不合法';break;
            case 600204 : alert('无此用户');break;
            case 600205 : $this.$emit("appListen","addressFail");break;
            case 888 :$this.$emit("appListen","loginAgain");break;
            default:break;
          }
        })
        .catch(function (error) { 
          //console.log(error);
        }); 
      }else{
        axios({   //市区
          method:'post',
          url: $basePath+'?c=UserAddress&m=editAddressByUser',
          data:{
            consignee:$this.consignee,
            mobile:$this.mobile,
            provinceId:$this.provincesId,
            cityId:$this.cityId,
            areaId:$this.areaId,
            address:$this.address,
            zipcode:$this.zipcode,
            tel:$this.tel,
            isDefault:$this.isDefault,
            addressId:$this.addressId
          }
        })
        .then((response) => {
          //200131表示已登陆状态，200132表示未登录
          let data =  response.data
          
          switch(parseInt(response.data.code)){
            case 600210 :{
              $this.$emit("appListen","editAddressSuccess");
              axios({   //现实省会城市信息
                method:'post',
                url: $basePath+'?c=UserAddress&m=getListByUser',
              })
              .then((response) => {
                if(parseInt(response.data.code)==600230){
                  if(response.data==null||response.data=='')return false;
                  var data=[];
                  var length= Object.keys(response.data.data).length;
                  for(var i=0;i<length-1;i++){
                    data.push(response.data.data[i]);
                  }
                  $this.data=data;
                }
              })
              .catch(function (error) { 
                //console.log(error);
              }); 
              break;
            }
            case 600211 ://console.log('请填写必填项');break;
            case 600212 : $this.mobileError=true;$this.mobileErrorText='无效的手机号';break;
            case 600213 : $this.proviceError=true;
            $this.proviceErrorText='区域不合法';break;
            case 600214 : alert('无此用户');break;
            case 600215 : $this.$emit("appListen","addressFail");break;
            case 888 :$this.$emit("appListen","loginAgain");break;
            default:break;
          }
        })
        .catch(function (error) { 
          //console.log(error);
        }); 
      }
      $this.clearParams();
      $this.mydialog=false;
    },
    //删除地址弹窗事件
    removeConfrimListen:function($b){
      if($b){
        var $i = $this.removeIndex;
        if($i!=-1){
          var temp=[];
          for(var i=0;i<$this.data.length;i++){
            temp.push($this.data[i]);
          }
          temp.splice($i,1);
          $this.data=[];
          $this.data=temp;
        }
      }
      $this.dialogOne=false;
    },
    provinceListen:function(e){
      $this.provincesId = document.getElementById('provice').value
      $this.getCity = [] //清除 市区
      $this.area = []  // 清除 地区
     // $this.sheng=e.target.value;
        axios({   //市区
          method:'post',
          url: $basePath+'?c=UserAddress&m=getCity',
          data:{
            provinceId:$this.provincesId 
          }
        })
        .then((response) => {
				//200131表示已登陆状态，200132表示未登录
        let data =  response.data
        
        if(data.code=='600100'){
         let arr = data.data
         $this.getCity = arr 
         
       }
     })
        .catch(function (error) { 
				//console.log(error);
      });  
      },
      cityListen:function(e){
        $this.cityId = document.getElementById('cityId').value  // 地区
        $this.area =[]
        axios({
          method:'post',
          url: $basePath+'?c=UserAddress&m=getArea',
          data:{cityId:$this.cityId},
        })
        .then((response) => {
				//200131表示已登陆状态，200132表示未登录
				let data =  response.data
				if(data.code=='600100'){
					let arr = data.data
			 	//	debugger
        $this.area = arr
        
      }
    })
        .catch(function (error) { 
				//console.log(error);
			}); 
      },
      areaListen:function(e){
      $this.areaId = document.getElementById('areaId').value  // 地区
    },
    clearConsignee:function(){
      $this.consigneeError=false;
      $this.consigneeErrorText='';
    },
    clearMobile:function(){
      $this.mobileError=false;
      $this.mobileErrorText='';
    },
    clearProvince:function(){
      $this.proviceError=false;
      $this.proviceErrorText='';
    },
    clearCity:function(){
      $this.cityError=false;
      $this.cityErrorText='';
    },
    clearArea:function(){
      $this.areaError=false;
      $this.areaErrorText='';
    },
    clearAddress:function(){
      $this.addressError=false;
      $this.addressErrorText='';
    },
    clearZipcode:function(){
      $this.zipcodeError=false;
      $this.zipcodeErrorText='';
    },
    clearTel:function(){
      $this.telError=false;
      $this.telErrorText='';
    },
    selectedListen:function($adddressId){
      if(!$this.noSelect){
        $this.selectAddress=$adddressId;
        $this.$emit('selectListen',$this.selectAddress);
      }
    }
  },
  components:{
    'aL':addressLi,
    'aLA':addressLiAdd,
    'mydialog':mydialog
  },
}
</script>

<style lang="scss">
  .addressList{
    ul{
      width:auto;
      display: inline-flex;
      flex-direction:row;
      align-content: flex-start;
      flex-wrap: wrap;
      >li{
        font-size:0;
        vertical-align: middle;
        margin-right:10px;
      }
    }
    h3{
      font-size:20px;
      font-weight:normal;
      color:#333333;
    }
    .dialogBig .dialog-wrap .dialog-container .dialog-header{
      text-align:left;
    }
    .content-info{
      input,select,button{
        width:170px;
        height:40px;
        border-radius:8px;
        outline:none;
        border: 1px solid #E6E6E6;
        padding-left:5px;
        font-size:14px;
        &.error{
          border: 1px solid #c8161e;
        }
      }
      label{
        font-size:14px;
        font-weight:normal;
        color:#333333;
        line-height:40px;
        width:auto;
        margin-right:20px;
        text-align:right;
        &:first-child{
          width:84px;
        }
      }
      select{
        width:120px;
        margin-right:10px;
        option{
          color:#333333;
          &:first-child{
            display:none;
          }
        }
        &.default-style{
          color:#9DA2A6;
        }
        &.selected-style{
          color:#333333;
        }
      }
      .group-info{
        display:inline-flex;
        width:100%;
        margin-bottom:20px;
        position:relative;
        span{
          font-size: 12px;
          color:#c8161e;
          position:absolute;
          top: 41px;
          left: 113px;
          &:last-child{
            left: 370px;
          }
        }
        &:first-child{
          margin-top:26px;
        }
      }
      .default-info{
        margin-left:235px;
        label{
          font-size:12px;
          font-weight:normal;
        }
        img{
          margin-left:13px;
          position:relative;
          top:5px;
        }
      }
      .group-btn{
        padding-left:84px;
        margin-top:20px;
        width:100%;
        button{
          margin-right:30px;
          width:180px;
          font-size:16px;
          cursor: pointer;
        }
        button.cancel{
          background-color:#5c6670;
          text-align:center;
          color:white;
        }
        button.ok{
          background-color:#c8161e;
          text-align:center;
          color:white;
        }
      }
    }
  }

</style>

<template>
  <dialogEditPhoneOneStyle class="dialogEditPhoneOne" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>修改手机号码</h1>
    </div>
    <div slot="content-info">
      <div class="group">
        <label>当前手机号:</label><input type="text" :value="phone" disabled />
      </div>
      <div class="group" :class="{'group-error':codeError}">
        <label>短信验证码:</label><input type="text" placeholder="请输入短信验证码" v-model="code" maxlength=6 @focus="clearCode" /><button style="font-size:12px;" :disabled="disabled" @click="sendcode">{{regBtn}}</button>
        <span>{{codeErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':captchaError}">
        <label>操作验证码:</label><input type="text" placeholder="请输入验证码" v-model="captcha" maxlength=4 @focus="clearCaptcha" /><img :src="captchaImg" @click="getCaptcha">
        <span>{{captchaErrorText}}</span>
      </div>
      <button @click="btnClick(true)">确认</button>
    </div>
  </dialogEditPhoneOneStyle>
</template>
<script>
  import dialogEditPhoneOneStyle from '@/components/dialog/dialogEditPhoneOneStyle';
  import axios from 'axios';
  let $data={
    time:0,
    disabled:false,
    regBtn:'获取验证码',
    code:'',
    captcha:'',
    codeErrorText:'',
    captchaErrorText:'',
    codeError:false,
    captchaError:false,
    captchaImg:'',
    captchaFlag:true,
    phone:'获取中'
  };
  let $this={};
  export default {
    name:"dialogEditPhoneOne",
      props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          cover:{type:Boolean,default:true}
          //TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
        },
        created:function(){

        },
        mounted:function(){

        },
        watch:{
          isShow(curVal,oldVal){
            if(curVal){
              $this.phone=$user.mobile_phone.substr(0,3)+"****"+$user.mobile_phone.substr(7,11);
              $this.code='';
              $this.captcha='';
              $this.regBtn='获取验证码';
              　　　　　  axios({
                method:'post',
                url: $basePath+'?c=User&m=getCaptcha',
                data: {}
              })
              .then((response) => {
                  //操作码 500320或500323表示发送成功，500321发送失败，500322填写正确手机号，500323填写必填项，500324填写正确类型
                  this.captchaImg=$codePicPath+response.data.data;
                  //console.log(response.data)
                })
              .catch(function (error) { 
                    //console.log(error);
                  });
            }
          }
        },
        data(){
         $this=this;
         return $data
       },
       methods:{
          //子组件传值到父组件
          btnClick:function($b){
            if($b){
              if(!$this.checkEmpty())return false;
              axios({
                method:'post',
                url: $basePath+'?c=User&m=checkOldPhone',
                data:  {
                  'phone':$user.mobile_phone,
                  'code':$this.code,
                  'captcha':$this.captcha
                }
              })
              .then((response) => {
                //500270表示验证成功，可进行下一步,500271表示填写必填项,500272表示手机格式不对,500274表示验证码验证失败,500275表示输入的手机号不是原来的手机号，500276表示校验码不正确
                switch(parseInt(response.data.code)){
                  case 500270 :$this.$emit('clickListen',1);break;
                  case 500271 ://console.log("请填写必填项");break;
                  case 500272 :$this.phoneError=true;$this.phoneErrorText='无效的手机号';break;break;
                  case 500274 :$this.captchaError=true;$this.captchaErrorText='短信验证码错误或已超时,请重试';break;
                  case 500275 :$this.phoneError=true;$this.phoneErrorText='不是当前账户手机号,请刷新后重试';break;
                  case 500276 :$this.codeError=true;$this.codeErrorText='操作验证码错误或已超时,请重试';break;
                  case 888 :$this.$emit('clickListen',2);break;
                  default:break;
                }
                //console.log(response.data)
              })
              .catch(function (error) { 
                //console.log(error);
              });
            }else{
              $this.$emit('clickListen',0);
            }
          },
          sendcode:function(){
            if(/^1[34578]\d{9}$/.test($user.mobile_phone)){
              $this.code=''
              $this.time=60
              $this.disabled=true
              $this.setInter()
              axios({
                method:'post',
                url: $basePath+'?c=User&m=send_msg',
                data: {
                  'phone':$user.mobile_phone,
                  'type':2
                }
              })
              .then((response) => {
                //操作码 500320或500323表示发送成功，500321发送失败，500322填写正确手机号，500323填写必填项，500324填写正确类型
                //console.log(response.data)
              })
              .catch(function (error) { 
                //console.log(error);
              });
            }else{
              $this.phoneError=true;
              $this.phoneErrorText='请刷新页面,重试获取验证码';
            }
          },
           //验证信息
           setInter:function(){
             $this.timer = setInterval(() => {
               if($this.time>0){
                $this.time--
                $this.regBtn = $this.time+'s后重新获取'
                $this.disabled = true
              }else{
                $this.time=0
                $this.regBtn = '重新获取验证码'
                $this.disabled =  false
                clearInterval($this.timer)
              }
            },1000)
           }, 
           clearCode:function(){
            $this.codeError=false;
            $this.codeErrorText='';
          },
          clearCaptcha:function(){
            $this.captchaError=false;
            $this.captchaErrorText='';
          },
          getCaptcha:function(){
            if($this.captchaFlag){
              axios({
                method:'post',
                url: $basePath+'?c=User&m=getCaptcha',
                data: {}
              })
              .then((response) => {
                //操作码 500320或500323表示发送成功，500321发送失败，500322填写正确手机号，500323填写必填项，500324填写正确类型
                this.captchaImg=$codePicPath+response.data.data;
                $this.captchaFlag=true;
                //console.log(response.data)
              })
              .catch(function (error) { 
                  //console.log(error);
                });
              $this.captcha='';
              $this.captchaFlag=false;
            }
          },
          checkEmpty(){
            if($this.code==''||$this.code==null){
              $this.codeError=true;
              $this.codeErrorText='请填写6位短信验证码';
              return false;
            }else if($this.code.length<6){
              $this.codeError=true;
              $this.codeErrorText='请填写6位短信验证码';
              return false;
            }else if($this.captcha==''||$this.captcha==null){
              $this.captchaError=true;
              $this.captchaErrorText='请填写4位操作验证码';
              return false;
            }else if($this.captcha.length<4){
              $this.captchaError=true;
              $this.captchaErrorText='请填写4位操作验证码';
              return false;
            }
            return true;
          }
        },
        components:{
         'dialogEditPhoneOneStyle':dialogEditPhoneOneStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogEditPhoneOne{
      .dialog-header{
        padding:0;
        height:auto;
        *>h1{
          text-align:left;
          font-size:20px;
          color:#333333;
          font-weight:normal;
        }
      }
      .dialog-content{
        text-align:center;
        .group-error{
          input{
            border:1px solid #c8161e!important;
          }
        }
        .group{
          margin-top:20px;
          display:inline-flex;
          flex-direction: row;
          position:relative;
          &:first-child{
            margin-top:60px;
            input{
              width:270px;
              border:0px solid #e0e0e0;
              font-size:14px;
              color:#333333;
              cursor:default;
            }
          }
          label{
            line-height:40px;
            margin-right:10px;
            font-size:14px;
            width:100px;
            color:#333333;
            font-weight: normal;
          }
          input{
            width:270px;
            height:40px;
            border:1px solid #e0e0e0;
            border-radius:8px;
            padding:10px;
            outline:none;
            font-weight: normal;
          }
          img,button{
            width:100px;
            height:40px;
            border-radius:8px;
            background-color:#5C6670;
            margin:0;
            position:absolute;
            right:0;
          }
          span{
            font-size:12px;
            color:#c8161e;
            position: absolute;
            left: 125px;
            bottom: -19px;
          }
        }
        button{
          margin-top:60px;
          width:260px;
          height:40px;
          border-radius:8px;
          outline:none;
          padding-left:5px;
          font-size:16px;
          cursor: pointer;
          border:0 solid white;
          background-color:#c8161e;
          text-align:center;
          color:white;
        }
      }
    }
  </style>
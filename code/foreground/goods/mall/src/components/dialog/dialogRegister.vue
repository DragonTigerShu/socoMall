<template>
  <dialogRegisterStyle class="dialogRegister" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>注册账号</h1>
    </div>
    <div slot="content-info">
      <div class="group" :class="{'group-error':phoneError}">
        <label class="phone"></label><input type="text" v-model="phone" placeholder="请输入手机号" maxlength="11"  @keydown="enterTo($event)" @focus="clearPhone" />
        <span>{{phoneErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':codeError}">
        <label class="proving"></label><input type="text" v-model="code" placeholder="请输入验证码" @focus="clearCode"  @keydown="enterTo($event)" /><button style="font-size:12px;" :disabled="disabled" @click="sendcode">{{regBtn}}</button>
        <span>{{codeErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':passwordError}">
        <label class="pwd"></label><input type="password" v-model="password" placeholder="请输入密码" @focus="clearPassword"  @keydown="enterTo($event)" />
        <span>{{passwordErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':confirmPasswordError}">
        <label class="pwd"></label><input type="password" v-model="confirmPassword" placeholder="请再次输入密码" @focus="clearConfirmPassword"  @keydown="enterTo($event)" />
        <span>{{confirmPasswordErrorText}}</span>
      </div>
      <button @click="btnClick(true)">注册</button>
      <p class="errorText">已有账号,立即<a @click="loginListen">&nbsp;登录</a></p>
    </div>
  </dialogRegisterStyle>

</template>
<script>
  import dialogRegisterStyle from '@/components/dialog/dialogRegisterStyle';
  import axios from 'axios';
  let $data={
    phone:'',
    password:'',
    confirmPassword:'',
    code:'',
    phoneError:false,
    codeError:false,
    passwordError:false,
    confirmPasswordError:false,
    phoneErrorText:'',
    passwordErrorText:'',
    confirmPasswordErrorText:'',
    codeErrorText:'',
    regBtn:'获取验证码',
    disabled:false,
    time:0
  };
  let $this={};
  export default {
   name:"dialogRegister",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          h:{type:String,default:''},//标题内容
          cover:{type:Boolean,default:true}
          //TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
        },
        created:function(){
         
        },
        data(){
         $this=this;
         return $data;
       },
       methods:{
          //子组件传值到父组件
          enterTo :function(ev) {
            if(ev.keyCode === 13) {
              this.btnClick(true)
            }
          },
          btnClick:function($b){
            if($b){
              if(!$this.checkEmpty())return false;
              axios({
                method:'post',
                url: $basePath+'?c=User&m=regUser',
                data: {
                  'phone':$this.phone,
                  'password':$this.password,
                  'confirmPassword':$this.confirmPassword,
                  'code':$this.code
                }
              })
              .then((response) => {
                //操作码 500200或500203表示注册成功，500201填写必填项，500202校验码超时或不正确，500205填写正确手机号，500204手机号已注册，500206两次密码不同
                //console.log(response.data)
                switch(parseInt(response.data.code)){
                  case 500200 :$this.$emit('clickListen',true);break;
                  case 500201 ://console.log('填写必填字段');break;
                  case 500202 :
                  $this.codeErrorText='验证码错误或已过期,请重试';
                  $this.codeError=true;
                  break;
                  case 500203 :
                  $this.$emit('clickListen',true);
                  break;
                  case 500204 :
                  $this.phoneErrorText='该手机已被注册';
                  $this.phoneError=true;
                  break;
                  case 500205 :
                  $this.phoneErrorText='无效的手机号';
                  $this.phoneError=true;break;
                  case 500206 :
                  $this.passwordError=true;
                  $this.passwordErrorText='前后密码不一致';
                  $this.confirmPasswordError=true;
                  $this.confirmPasswordErrorText='前后密码不一致';
                  break;
                  case 500207:
                  $this.phoneErrorText='请使用接收短信的手机号注册';
                  $this.phoneError=true;
                  break;
                  case 500208:
                  $this.codeErrorText=response.data.msg;
                  $this.codeError=true;
                  break;
                  default:break;
                }
              })
              .catch(function (error) { 
                  //console.log(error);
                });
            }else{
              $this.$emit('clickListen',false);
            }
          },
          clearPhone:function(){
            $this.phoneError=false;
            $this.phoneErrorText='';
          },
          clearCode:function(){
            $this.codeError=false;
            $this.codeErrorText='';
          },
          clearConfirmPassword:function(){
            $this.confirmPasswordError=false;
            $this.confirmPasswordErrorText='';
            $this.passwordError=false;
            $this.passwordErrorText='';
          },
          clearPassword:function(){
            $this.confirmPasswordError=false;
            $this.confirmPasswordErrorText='';
            $this.passwordError=false;
            $this.passwordErrorText='';
          },
          loginListen:function(){
            $this.$emit("loginListen");
          },
          sendcode:function(){
            if(/^1[34578]\d{9}$/.test($this.phone)){
              $this.code=""
              $this.time=60
              $this.disabled=true
              $this.setInter()
              axios({
                method:'post',
                url: $basePath+'?c=User&m=send_msg',
                data: {
                  'phone':$this.phone,
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
              $this.phoneErrorText='无效的手机号';
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
           checkEmpty:function(){
            if($this.phone==null||$this.phone==''){
              $this.phoneError=true;
              $this.phoneErrorText='请填写手机';
              return false;
            }else if($this.code==null||$this.code==''){
              $this.codeError=true;
              $this.codeErrorText='请填写6位校验码';
              return false;
            }else if($this.code.length<4){
              $this.codeError=true;
              $this.codeErrorText='请填写4位验证码';
              return false;
            }else if(!/^1[34578]\d{9}$/.test($this.phone)){
              $this.phoneError=true;
              $this.phoneErrorText='无效的手机号';
              return false;
            }else if($this.password==null||$this.password==''){
              $this.passwordError=true;
              $this.passwordErrorText='请填写密码';
              return false;
            }else if(!/^[A-Za-z0-9]{6,20}$/.test($this.password)){
              $this.passwordError=true;
              $this.passwordErrorText='密码是6-20位字母数字组合';   
              return false;
            }else if($this.confirmPassword==null||$this.confirmPassword==''){
              $this.confirmPasswordError=true;
              $this.confirmPasswordErrorText='请填写确认密码';
              return false;
            }else if($this.password!=$this.confirmPassword){
              $this.passwordError=true;
              $this.passwordErrorText='前后密码不一致';
              $this.confirmPasswordError=true;
              $this.confirmPasswordErrorText='前后密码不一致';
              return false;
            }
            return true;
          }
        },
        components:{
         'dialogRegisterStyle':dialogRegisterStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogRegister{
      .dialog-header{
        text-align:center;
        margin-bottom:50px;
        padding:50px 0 0 0!important;
        height:auto;
        *>h1{
          margin:30px 0;
          font-size: 28px;
          letter-spacing: 3px;
          color:#333333;
          font-weight:normal;
        }
        *>img{
          width:210px;
          height:210px;
        }
      }
      .dialog-content{
        text-align:center;
        p{
          margin-top:10px;
        }
        .group-error{
          input{
            border:1px solid #c8161e!important;
            border-left:none!important;
          }
          label{
            border:1px solid #c8161e!important;
            border-right:none!important;
          }
        }
        .group{
          margin: 20px auto 0px auto;
          height:40px;
          display: block;
          text-align: center;
          width: 370px;
          position: relative;
          &:first-child{
            margin-top:30px;
          }
          label{
            border:1px solid #f5f5f5;
            border-right:none;
          }
          input{
            height: 40px;
            border-radius: 0 8px 8px 0;
            width: 330px;
            background: #f5f5f5;
            border:1px solid #f5f5f5;
            border-left:none;
            padding: 0;
            margin: 0;
            outline:none;
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
            left: 44px;
            bottom: -19px;
          }
        }
        button{
          margin-top:30px;
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
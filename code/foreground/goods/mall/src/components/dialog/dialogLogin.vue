<template>
  <dialogLoginStyle class="dialogLogin" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>用户登录</h1>
    </div>
    <div slot="content-info">
      <div class="group" :class="{'group-error':phoneError}">
        <label class="phone"></label><input type="text" v-model="phone" placeholder="请输入手机号" maxlength="11" @focus="clearPhone" />
        <span>{{phoneErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':passwordError}">
        <label class="pwd"></label><input type="password" v-model="password" placeholder="请输入密码" @focus="clearPassword"  @keydown="enterTo($event)" />
        <span>{{passwordErrorText}}</span>
      </div>
      <div class="group">
        <div class="forget" @click="forgetListen">忘记密码?</div>
      </div>
      <button @click="btnClick(true)" >登录</button>
      <p class="errorText">还没有账号,立即<a @click="registerListen">&nbsp;注册</a></p>
    </div>
  </dialogLoginStyle>
</template>
<script>
  import dialogLoginStyle from '@/components/dialog/dialogLoginStyle';
  import {overflowDisabled} from '@/common/js/data'
  import axios from 'axios'
  let $data={
    phone:'',
    password:'',
    phoneError:false,
    passwordError:false,
    phoneErrorText:'',
    passwordErrorText:''
  };
  let $this={};
  export default {
   name:"dialogLogin",
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
         return $data
       },
       methods:{
          //子组件传值到父组件
          enterTo :function(ev) {
            if(ev.keyCode === 13) this.btnClick(true)
          },
        btnClick:function($b){
          if($b){
            if(!$this.checkEmpty())return false;
            axios({
              method:'post',
              url: $basePath+'?c=User&m=login_in',
              data: {
                'phone':$this.phone,
                'password':$this.password
              }
            })
            .then((response) => {
                //操作码 500210表示登陆成功，500211表示必填字段必填，500212表示手机号不正确，500213用户不存在，500214表示密码错误，500215表示已登陆勿重复提交
                switch(parseInt(response.data.code)){
                  case 500210 : 
                  $this.password='';
                  $user=response.data.data;
                  $user.phone=$user.mobile_phone.substr(0,3)+"****"+$user.mobile_phone.substr(7,11);
                  if($user.head_pic!=null&&$user.head_pic!='')$user.headImg=$headPicPath+$user.head_pic;
                  $this.$emit('clickListen',true);
                  break;
                  case 500211 : 
                      //console.log("必填字段必填");
                      break;
                      case 500212 : 
                      $this.phoneErrorText='手机号不正确';
                      $this.phoneError=true;
                      break;
                      case 500213 : 
                      $this.phoneErrorText='该手机未注册';
                      $this.phoneError=true;
                      break;
                      case 500214 : 
                      $this.passwordErrorText='密码错误';
                      $this.passwordError=true;
                      break;
                      case 500215 :
                      $this.password='';
                      $this.$emit('clickListen',true);
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
        clearPassword:function(){
          $this.passwordError=false;
          $this.passwordErrorText='';
        },
        forgetListen:function(){
          $this.$emit('forgetListen');
        },
        registerListen:function(){
          $this.$emit('registerListen');
        },
        checkEmpty(){
          if($this.phone==null||$this.phone==''){
            $this.phoneError=true;
            $this.phoneErrorText='请填写手机号';
            return false;
          }else if(!/^1[34578]\d{9}$/.test($this.phone)){
            $this.phoneError=true;
            $this.phoneErrorText='无效的手机号';
            return false;
          }else if($this.password==null||$this.password==''){
            $this.passwordError=true;
            $this.passwordErrorText='请填写密码';
            return false;
          }
          return true;
        }
      },
      components:{
       'dialogLoginStyle':dialogLoginStyle
     }
     
   }
 </script>

 <style lang="scss">
  .dialogLogin{
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
        .forget{
          float:right;
          cursor:pointer;
        }
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
          left: 38px;
          bottom: -19px;
        }
      }
      button{
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
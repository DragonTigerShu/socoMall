<template>
  <dialogEditPasswordTwoStyle class="dialogEditPasswordTwo" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>设置新密码</h1>
    </div>
    <div slot="content-info">
      <p>短信验证成功,请输入新的密码</p>
      <div class="group phone" :class="{'group-error':errorFlag}"><label>设置新密码:</label><input type="password" placeholder="请输入新密码" @focus="clearListen" v-model="password" /><span>{{errorText}}</span></div>
      <div class="group phone" :class="{'group-error':errorFlag2}"><label>确认新密码:</label><input type="password" placeholder="请再次输入新密码" @focus="clearListen" v-model="password2"/><span>{{errorText2}}</span></div>
      <div class="group" :class="{'group-error':captchaError}"><label>操作验证码:</label><input type="text" placeholder="请输入验证码" v-model="captcha" maxlength=4 @focus="clearCaptcha"/><img :src="captchaImg" @click="getCaptcha"><span>{{captchaErrorText}}</span></div>
      <button @click="btnClick(true)">确认</button>
    </div>
  </dialogEditPasswordTwoStyle>
</template>
<script>
  import dialogEditPasswordTwoStyle from '@/components/dialog/dialogEditPasswordTwoStyle';
  import axios from 'axios'
  let $data={
    errorText:'',
    errorText2:'',
    captchaErrorText:'',
    errorFlag:false,
    errorFlag2:false,
    captchaError:false,
    captchaImg:'',
    captchaFlag:true,
    password:'',
    password2:'',
    captcha:''
  };
  let $this={};
  export default {
   name:"dialogEditPasswordTwo",
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
            $this.password='';
            $this.password2='';
            $this.captcha='';
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
                url: $basePath+'?c=User&m=changeToNewPass',
                data:  {
                  newPass:$this.password,
                  confirmPass:$this.password2,
                  captcha:$this.captcha
                }
              })
              .then((response) => {
                switch(parseInt(response.data.code)){
                  case 500250 :$this.$emit('clickListen',true);break;
                  case 500251 ://console.log("请填写必填项");break;
                  case 500252 ://console.log('用户不存在');break;
                  case 500253 :$this.captchaError=true;$this.captchaErrorText='验证码错误或已过期';break;
                  case 500254 :$this.captchaError=true;$this.captchaErrorText='服务器忙稍后重试';break;
                  case 500256 :
                  $this.errorText='前后密码不一致';
                  $this.errorText2='前后密码不一致';
                  $this.errorFlag=true;
                  $this.errorFlag2=true;
                  break;
                  case 500257 :$this.$emit('appListen','reDialogEditPasswordOne');break;
                  case 500208 :$this.$emit('appListen','reDialogEditPasswordOne');break;
                  default:break;
                }
                //console.log(response.data)
              })
              .catch(function (error) { 
                //console.log(error);
              });
            }else{
              $this.$emit('clickListen',false);
            }
          },
          clearListen:function(){
            $this.errorFlag=false;
            $this.errorText='';
            $this.errorFlag2=false;
            $this.errorText2='';
          },
          checkEmpty:function(){
            if($this.password==null||$this.password==''){
              $this.errorText='请填写新密码';
              $this.errorFlag=true;
              return false;
            }else if($this.password2==null||$this.password2==''){
              $this.errorText2='请填写确认密码';
              $this.errorFlag2=true;
              return false;
            }else if(!/^[A-Za-z0-9]{6,20}$/.test($this.password)){
              $this.errorFlag=true;
              $this.errorText='密码是6-20位字母数字组合';   
              return false;
            }else if($this.password2!=$this.password){
              $this.errorText='前后密码不一致';
              $this.errorText2='前后密码不一致';
              $this.errorFlag=true;
              $this.errorFlag2=true;
              return false;
            }else if($this.captcha==null||$this.captcha==''){
              $this.captchaErrorText='请填写4位验证码';
              $this.captchaError=true;
              return false;
            }else if($this.captcha.length<4){
              $this.captchaErrorText='请填写4位验证码';
              $this.captchaError=true;
              return false;
            }
            return true;
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
              $this.captchaFlag=false;
            }
          },
        },
        components:{
         'dialogEditPasswordTwoStyle':dialogEditPasswordTwoStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogEditPasswordTwo{
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
        *>p{
          margin-top:20px;
          text-align:left;
          color:#c8161e;
          padding-left:96px;
        }
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
          label{
            line-height:40px;
            margin-right:10px;
            font-size:14px;
            width:100px;
            color:#333333;
          }
          input{
            width:270px;
            height:40px;
            border:1px solid #e0e0e0;
            border-radius:8px;
            padding:10px;
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
            cursor:pointer;
          }
          span{
            font-size:12px;
            color:#c8161e;
            position: absolute;
            left: 125px;
            bottom: -19px;
          }
        }
        .group.phone input{
          width:270px;
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
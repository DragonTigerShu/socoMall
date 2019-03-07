<template>
  <dialogPassWordStyle class="dialogPassWord" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>修改密码</h1>
    </div>
    <div slot="content-info">
      <div class="group" :class="{'group-error':oriPassError}">
        <label>当前的密码:</label><input type="password" placeholder="请输入当前使用的原密码" v-model="oriPass" @focus="clearOriPass" />
        <span>{{oriPassErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':newPassError}">
        <label>设置新密码:</label><input type="password" placeholder="请输入新密码" v-model="newPass" @focus="clearNewPass" />
        <span>{{newPassErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':confirmPassError}">
        <label>确认新密码:</label><input type="password" placeholder="再次确认新密码" v-model="confirmPass" @focus="clearConfirmPass" />
        <span>{{confirmPassErrorText}}</span>
      </div>
      <!-- <p>密码长度8~16位,其中数字,字母和符号至少包含两种</p> -->
      <div class="group" :class="{'group-error':captchaError}">
        <label>操作验证码:</label><input type="text" placeholder="请输入验证码" v-model="captcha" maxlength=4 @focus="clearCaptcha" /><img :src="captchaImg" @click="getCaptcha">
        <span>{{captchaErrorText}}</span>
      </div>
      <div class="group-btn">
        <button class="cancel" @click="btnClick(false)">取消</button>
        <button class="ok" @click="btnClick(true)">确认</button>
      </div>
    </div>
  </dialogPassWordStyle>
</template>
<script>
  import dialogPassWordStyle from '@/components/dialog/dialogPassWordStyle';
  import axios from 'axios';
  let $data={
    code:'',
    oriPass:'',
    newPass:'',
    confirmPass:'',
    captcha:'',
    oriPassError:false,
    newPassError:false,
    confirmPassError:false,
    captchaError:false,
    oriPassErrorText:'',
    newPassErrorText:'',
    confirmPassErrorText:'',
    captchaErrorText:'',
    captchaImg:'',
    captchaFlag:true
  };
  let $this={};
  export default {
   name:"dialogPassword",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          h:{type:String,default:''},//标题内容
          type:{type:Number,default:1},//图片
          confirm:{type:String,default:''},
          //取消按钮内容 默认不赋值不出现
          cover:{type:Boolean,default:true}
          //TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
        },
        created:function(){
          
        },
        mounted:function(){
          
        },
        watch:{
          isShow(curVal,oldVal){
            $this.code='';
            $this.oriPass='';
            $this.newPass='';
            $this.confirmPass='';
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
                url: $basePath+'?c=User&m=changePass',
                data:  {
                  'oriPass':$this.oriPass,
                  'newPass':$this.newPass,
                  'confirmPass':$this.confirmPass,
                  'captcha':$this.captcha
                }
              })
              .then((response) => {
                //500260表示密码修改成功，请重新登陆,500261表示填写必填项,500262表示用户不存在,500263表示验证码验证失败,500264表示服务器忙，稍后重试，500265表示原密码错误，500266表示两次密码不相同！
                switch(parseInt(response.data.code)){
                  case 500260 :$this.$emit('clickListen',1);break;
                  case 500261 ://console.log("请填写必填项");break;
                  case 500262 :$this.oriPassError=true;$this.oriPassErrorText='用户不存在,请刷新页面后重试';break;
                  case 500263 :$this.captchaError=true;$this.captchaErrorText='验证码错误或已超时,请重试';break;
                  case 500264 :$this.captchaError=true;$this.captchaErrorText='服务器忙，稍后重试';break;
                  case 500265 :$this.oriPassError=true;$this.oriPassErrorText='原密码错误';break;
                  case 500265 :$this.newPassError=$this.confirmPassError=true;$this.confirmPassErrorText=$this.newPassErrorText='密码不一致';break;
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
          clearOriPass:function(){
            $this.oriPassError=false;
            $this.oriPassErrorText='';
          },
          clearNewPass:function(){
            $this.newPassError=false;
            $this.newPassErrorText='';
            $this.confirmPassError=false;
            $this.confirmPassErrorText='';
          },
          clearConfirmPass:function(){
            $this.newPassError=false;
            $this.newPassErrorText='';
            $this.confirmPassError=false;
            $this.confirmPassErrorText='';
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
          checkEmpty:function(){
            if($this.oriPass==''||$this.oriPass==null){
              $this.oriPassError=true;
              $this.oriPassErrorText='请填写当前密码';
              return false;
            }else if($this.newPass==''||$this.newPass==null){
              $this.newPassError=true;
              $this.newPassErrorText='请填写新密码';
              return false;
            }else if($this.confirmPass==''||$this.confirmPass==null){
              $this.confirmPassError=true;
              $this.confirmPassErrorText='请填写确认新密码';
              return false;
            }else if(!/^[A-Za-z0-9]{6,20}$/.test($this.newPass)){
              $this.newPassError=true;
              $this.newPassErrorText='密码是6-20位字母数字组合';   
              return false;
            }else if($this.newPass!=$this.confirmPass){
              $this.newPassError=true;
              $this.confirmPassError=true;
              $this.confirmPassErrorText='密码不一致';
              $this.newPassErrorText='密码不一致';
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
         'dialogPassWordStyle':dialogPassWordStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogPassWord{
      .dialog-header{
        padding:0;
        height:auto;
        *>h1{
          text-align:left;
          font-size:20px;
          color:#333333;
          font-weight:bold;
        }
      }
      .dialog-content{
        text-align:center;
        *>p{
          margin-top:10px;
          text-align:left;
          color:#5C6670;
          font-size:12px;
          padding-left:105px;
        }
        .group-error{
          input{
            border:1px solid #c8161e!important;
          }
        }
        .group{
          margin-left:30px;
          margin-top:20px;
          display:inline-flex;
          flex-direction: row;
          position:relative;
          &:first-child{
            margin-top:26px;
          }
          label{
            line-height:40px;
            margin-right:20px;
            font-size:14px;
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
          img{
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
            left: 112px;
            bottom: -19px;
          }
        }
        .group-btn{
          width:100%;
          margin-left:0;
          display:inline-flex;
          justify-content: center;
          margin-top:40px;
          button.cancel{
            background-color:#5c6670;
            color:white;
            margin-right:30px;
            width:180px;
          }
          button.ok{
            width:180px;
            background-color:#c8161e;
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
          text-align:center;
          color:white;
        }
      }
    }
  </style>
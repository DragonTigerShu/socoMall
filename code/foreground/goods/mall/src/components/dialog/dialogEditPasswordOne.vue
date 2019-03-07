<template>
  <section>
    <dialogEditPasswordOneStyle class="dialogEditPasswordOne" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
      <div slot="header-title">
        <h1>找回密码</h1>
      </div>
      <div slot="content-info">
        <div class="group" :class="{'group-error':phoneError}"><label>账户手机号:</label><input type="text" placeholder="请输入找回密码手机号" v-model="phone" maxlength=11 @focus="clearPhone"/><span>{{phoneErrorText}}</span></div>
        <div class="group" :class="{'group-error':codeError}"><label>短信验证码:</label><input type="text" placeholder="请输入短信验证码" v-model="code" maxlength=6 @focus="clearCode"/><button style="font-size:12px;" @click="sendcode" :disabled="disabled">{{regBtn}}</button><span>{{codeErrorText}}</span></div>
        <div class="group" :class="{'group-error':captchaError}"><label>操作验证码:</label><input type="text" placeholder="请输入验证码" v-model="captcha" maxlength=4 @focus="clearCaptcha"/><img :src="captchaImg" @click="getCaptcha"><span>{{captchaErrorText}}</span></div>
        <button @click="btnClick(true)">确认</button>
      </div>
    </dialogEditPasswordOneStyle>
  </section>
</template>
<script>
  import dialogEditPasswordOneStyle from '@/components/dialog/dialogEditPasswordOneStyle';
  import axios from 'axios'
  let $data={
    disabled:false,
    regBtn:'获取验证码',
    time:0,
    phone:'',
    code:'',
    captcha:'',
    phoneErrorText:'',
    codeErrorText:'',
    captchaErrorText:'',
    phoneError:false,
    codeError:false,
    captchaError:false,
    captchaImg:'',
    captchaFlag:true
  };
  let $this={};
  export default {
   name:"dialogEditPasswordOne",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          cover:{type:Boolean,default:true},
          //TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
        },
        mounted:function(){
          
        },
        watch:{
          isShow(curVal,oldVal){
            $this.phone='';
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
        },
        created:function(){
          
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
                url: $basePath+'?c=User&m=checkPhone',
                data:  {
                  'phone':$this.phone,
                  'code':$this.code,
                  'captcha':$this.captcha
                }
              })
              .then((response) => {
                //500240表示验证成功,500241表示填写必填项,500242表示手机格式不对,500243表示手机号不存在,500244表示校验码不正确，500245表示校验码已超时，请重新获取校验码，500246表示验证码验证失败
                switch(parseInt(response.data.code)){
                  case 500240 :$this.$emit('clickListen',true);break;
                  case 500241 ://console.log("请填写必填项");break;
                  case 500242 :$this.phoneError=true;$this.phoneErrorText='手机格式不对';break;
                  case 500243 :$this.phoneError=true;$this.phoneErrorText='该手机号未注册';break;
                  case 500244 :$this.codeError=true;$this.codeErrorText='短信验证码错误';break;
                  case 500245 :$this.codeError=true;$this.codeErrorText='无效验证码,请重新获取';break;
                  case 500246 :$this.captchaError=true;$this.captchaErrorText='操作验证码错误';break;
                  case 500207 :$this.phoneError=true;$this.phoneErrorText='非接收短信手机,验证失败';break;
                  case 500208 :$this.codeError=true;$this.codeErrorText='验证码超时,请重新获取';break;
                  default:break;
                }
                //console.log(response.data)
              })
              .catch(function (error) { 
                //console.log(error);
              });
            }else{
              $this.$emit('clickListen',$b);
            }
          },
          sendcode:function(){
            if(/^1[34578]\d{9}$/.test($this.phone)){
              $this.time=60;
              $this.disabled=true;
              $this.setInter();
              $this.code='';
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
              $this.phoneErrorText='无效的手机号,修改后重试';
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
           clearPhone:function(){
            $this.phoneError=false;
            $this.phoneErrorText='';
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
          checkEmpty:function(){
            if($this.phone==''||$this.phone==null){
              $this.phoneError=true;
              $this.phoneErrorText='请填写手机号';
              return false;
            }else if(!/^1[34578]\d{9}$/.test($this.phone)){
              $this.phoneError=true;
              $this.phoneErrorText='无效的手机号';
            }else if($this.code==''||$this.code==null){
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
         'dialogEditPasswordOneStyle':dialogEditPasswordOneStyle,
       }
       
     }
   </script>

   <style lang="scss">
    .dialogEditPasswordOne{
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
            cursor:pointer;
          }
          span{
            font-size:12px;
            color:#c8161e;
            position: absolute;
            left: 123px;
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
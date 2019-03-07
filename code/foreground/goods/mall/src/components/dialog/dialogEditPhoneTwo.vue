<template>
  <dialogEditPhoneTwoStyle class="dialogEditPhoneTwo" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>修改手机号码</h1>
    </div>
    <div slot="content-info">
      <p>短信验证成功,请输入新的手机号码并验证</p>
      <div class="group phone" :class="{'group-error':phoneError}">
        <label>绑定手机号:</label><input type="text" placeholder="请输入新手机号码" v-model="phone" @focus="clearPhone" />
        <span>{{phoneErrorText}}</span>
      </div>
      <div class="group" :class="{'group-error':codeError}">
        <label>短信验证码:</label><input type="text" placeholder="请输入短信验证码" v-model="code" maxlength=6 @focus="clearCode" /><button style="font-size:12px;" :disabled="disabled" @click="sendcode">{{regBtn}}</button>
        <span>{{codeErrorText}}</span>
      </div>
      <button @click="btnClick(true)">确认</button>
    </div>
  </dialogEditPhoneTwoStyle>
</template>
<script>
  import dialogEditPhoneTwoStyle from '@/components/dialog/dialogEditPhoneTwoStyle';
  import axios from 'axios';
  let $data={
    time:0,
    disabled:false,
    regBtn:'获取验证码',
    phone:'',
    code:'',
    phoneError:false,
    codeError:false,
    phoneErrorText:'',
    codeErrorText:''
  };
  let $this={};
  export default {
   name:"dialogEditPhoneTwo",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          cover:{type:Boolean,default:true}
          //TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
        },
        watch:{
          isShow(curVal,oldVal){
            $this.regBtn='获取验证码';
            $this.phone='';
            $this.code='';
          }
        },
        created:function(){

        },
        mounted:function(){

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
                url: $basePath+'?c=User&m=changeToNewPhone',
                data:  {
                  'phone':$this.phone,
                  'code':$this.code,
                }
              })
              .then((response) => {
                //500270表示验证成功，可进行下一步,500271表示填写必填项,500272表示手机格式不对,500274表示验证码验证失败,500275表示输入的手机号不是原来的手机号，500276表示校验码不正确
                switch(parseInt(response.data.code)){
                  case 500280 :$this.$emit('clickListen',1,$this.phone);break;
                  case 500281 ://console.log("请填写必填项");break;
                  case 500282 :$this.phoneError=true;$this.phoneErrorText='无效的手机号码';break;
                  case 500283 :$this.phoneError=true;$this.phoneErrorText='用户不存在,请刷新页面后重试';break;
                  case 500284 :$this.phoneError=true;$this.phoneErrorText='服务器忙,请稍后重试';break;
                  case 500285 :$this.codeError=true;$this.codeErrorText='验证码错误或已超时,请重试';break;
                  case 500286 :$this.phoneError=true;$this.phoneErrorText='该手机号已被使用,无法修改';break;
                  case 888:$this.$emit('clickListen',2);break;
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
            if(/^1[34578]\d{9}$/.test($this.phone)){
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
          checkEmpty(){
            if($this.phone==''||$this.phone==null){
              $this.phoneError=true;
              $this.phoneErrorText='请填写手机号';
              return false;
            }else if($this.code==''||$this.code==null){
              $this.codeError=true;
              $this.codeErrorText='请填写6位短信验证';
              return false;
            }else if($this.code.length<6){
              $this.codeError=true;
              $this.codeErrorText='请填写6位短信验证';
              return false;
            }else if(!/^1[34578]\d{9}$/.test($this.phone)){
              $this.phoneError=true;
              $this.phoneErrorText='无效的电话号码';
              return false;
            }
            return true;
          }
        },
        components:{
         'dialogEditPhoneTwoStyle':dialogEditPhoneTwoStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogEditPhoneTwo{
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
          margin-top:60px;
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
          button{
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
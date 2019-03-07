<template>
  <dialogEditUserNameStyle class="dialogEditUserName" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>修改用户名</h1>
    </div>
    <div slot="content-info">
      <div class="group" :class="{'group-error':errorFlag}"><label>新用户名*:</label><input type="text" placeholder="请输入您的用户名" v-model="userName" maxlength="30" /><span>{{errorText}}</span></div>
      <button @click="btnClick(true)">修改</button>
    </div>
  </dialogEditUserNameStyle>
</template>
<script>
  import dialogEditUserNameStyle from '@/components/dialog/dialogEditUserNameStyle';
  import axios from 'axios'
  let $data={
    errorText:'',
    errorFlag:false,
    userName:''
  };
  let $this={};
  export default {
   name:"dialogEditUserName",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          cover:{type:Boolean,default:true},
          //TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
        },
        created:function(){
          
        },
        data(){
         $this=this;
         return $data
       },
       watch:{
        isShow(c,v){
          if(c)this.userName=$user.user_name;
        }
      },
      methods:{
          //子组件传值到父组件
          btnClick:function($b){
            if($b){
              if(!$this.checkEmpty())return false;
              axios({
                method:'post',
                url: $basePath+'?c=User&m=changeNH',
                data:  {
                  'username':$this.userName
                }
              })
              .then((response) => {
                //500750表示修改头像成功,500751表示用户不存在,500752表示修改用户名成功,500753表示服务器忙，稍后重试,500754表示用户名太长啦！，500755表示服务器忙，稍后重试，500756表示图片编码不正确，500757表示并没有传递任何参数
                switch(parseInt(response.data.code)){
                  case 500752 :
                  $this.$emit('clickListen',1);
                  $user.user_name=$this.userName;
                  //$this.$set($user.user_name, $this.userName);
                  break;
                  case 500753 :$this.errorText='服务器忙，稍后重试';$this.errorFlag=true;break;
                  case 500754 :$this.errorText='用户名太长,请修改';$this.errorFlag=true;break;
                  case 500755 :$this.errorText='服务器忙，稍后重试';$this.errorFlag=true;break;
                  case 500757 :$this.errorText='请填写用户名';$this.errorFlag=true;break;
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
          checkEmpty:function(){
            if($this.userName==null||$this.userName==''){
              $this.errorFlag=true;
              $this.errorText='请填写用户名';
              return false;
            }
            /*if($illegalCheck.test($this.userName)){
              $this.errorFlag=true;
              $this.errorText='用户名内有非法字符,请剔除';
              return false;
            }*/
            return true;
          }
        },
        components:{
         'dialogEditUserNameStyle':dialogEditUserNameStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogEditUserName{
      .dialog-header{
        margin-bottom:50px;
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
          position: relative;
          input{
            border:1px solid #c8161e!important;
          }
        }
        .group{
          margin:120px 0;
          flex-direction: row;
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
          span{
            font-size:12px;
            color:#c8161e;
            position: absolute;
            left: 200px;
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
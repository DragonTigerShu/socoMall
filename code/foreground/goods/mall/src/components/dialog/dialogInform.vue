<template>
  <dialogInformStyle class="dialogInform" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>到货通知</h1><p>商品到货时,我们为您提供以下服务</p>
    </div>
    <div slot="content-info">
      <img :src="picImg">
      <div class="info">
        <p>若商品在90日内到货,我们将通过以手机短信的形式通知您。<br/>感谢您对于速珂的支持！</p>
        <div class="group"><label>手机号*</label><input type="text"/></div>
        <button @click="btnClick(true)">确认</button>
      </div>
    </div>
  </dialogInformStyle>
</template>
<script>
  import dialogInformStyle from '@/components/dialog/dialogInformStyle';
  let $data={
    'picImg':require('../../common/images/personal/message.png')
  };
  let $this={};
  export default {
   name:"dialogInform",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          h:{type:String,default:''},//标题内容
          //取消按钮内容 默认不赋值不出现
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
          btnClick:function($b){
            $this.$emit('clickListen',$b);
          }
        },
        components:{
         'dialogInformStyle':dialogInformStyle
       }
     }
   </script>

   <style lang="scss">
    .dialogInform{
      .dialog-wrap .dialog-container .dialog-header{
        text-align:left;
      }
      .dialog-header{
        font-size:0;
        >div{
          display:inline-flex;
          align-items:baseline;
        }
        *>h1{
          font-size:24px;
          color:#333333;
          font-weight:bold;
          margin-right:10px;
          padding-top:0px;
        }
        *>p{
          font-size:14px;
          color:#5c6670;
        }

      }
      .dialog-content{
        >div:first-child{
          margin-top:56px;
          padding-left:30px;
          display:inline-flex;
          >img{
            width:210px;
            height:210px;
            margin-right:30px;
          }
          .info{
            display:flex;
            align-items:baseline;
            flex-direction:column;
            >p{
              width:225px;
              display:block;
              font-size:14px;
              color:#5c6670;
              margin-bottom:30px;
            }
            button{
              margin-left:30px;
              width:180px;
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
            .group{
              flex-direction: row;
              margin-bottom:50px;
              label{
                line-height:40px;
                margin-right:15px;
                font-size:14px;
                color:#333333;
              }
              input{
                width:160px;
                height:40px;
                border:1px solid #e0e0e0;
                border-radius:8px;
                padding:10px;
                outline:none;
              }
            }
          }
        }
      }
    }
  </style>
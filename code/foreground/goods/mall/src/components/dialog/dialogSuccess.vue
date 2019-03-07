<template>
  <dialogSuccessStyle class="dialogSuccess" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <img :src="picImg[type]">
      <h1>{{h}}</h1>
    </div>
    <div slot="content-info">
      <button @click="btnClick(true)"   @keyup.enter="enter">确认</button>
    </div>
  </dialogSuccessStyle>

  <!-- 使用例子
  <dialogSuccess :isShow="true" :type="图片编号0成功1手机2人3时钟4短信" :h="'操作成功'" @clickListen="clickListen(true/false)"></dialogTwo> -->
  </template>
  <script>
    import dialogSuccessStyle from '@/components/dialog/dialogSuccessStyle';
    let $data={
      'picImg':[require('../../common/images/personal/success.png'),
      require('../../common/images/personal/phone.png'),
      require('../../common/images/personal/person.png'),
      require('../../common/images/personal/clock.png'),
      require('../../common/images/personal/message.png'),
      require('../../common/images/aftersale/customservice.png')],
    };
    let $this={};
    export default {
     name:"dialogSuccess",
       props:{  // 期望在父组件传下来，子组件需要显示props
          isShow:Boolean,//弹窗是否显示控制标记Boolean
          h:{type:String,default:''},//标题内容
          type:{type:Number,default:1},//图片类型,目前有4种,见$data
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
        enter :function(ev) {
           //   if(ev.keyCode === 13)  $this.$emit('clickListen',$b);
         },
          //子组件传值到父组件
          btnClick:function($b){
            
            $this.$emit('clickListen',$b);
          }
        },
        components:{
         'dialogSuccessStyle':dialogSuccessStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogSuccess{
      .dialog-header{
        text-align:center;
        margin-bottom:50px;
        padding:30px 0 0 0!important;
        height:auto;
        *>h1{
          margin:30px 0;
          font-size:22px;
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
        position: absolute;
        bottom: 60px;
        width: 100%;
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
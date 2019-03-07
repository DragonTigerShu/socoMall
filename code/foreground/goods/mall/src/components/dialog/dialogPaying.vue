<template>
  <dialogPayingStyle class="dialogPaying" :isShow="isShow" @closeIcon="btnClick(0)" @close="cover?btnClick(0):''">
    <div slot="header-title">
      <h1>正在支付中...</h1>
    </div>
    <div slot="content-info">
      <img :src="picImg">
      <section class="info-group">
        <div class="info">
          <p>支付完成</p>
          <button @click="btnClick(1)">查看订单</button>
        </div>
        <div class="info">
          <p>遇到问题</p>
          <button @click="btnClick(2)">常见问题解决</button>
        </div>
      </section>
    </div>
  </dialogPayingStyle>
</template>
<script>
  import dialogPayingStyle from '@/components/dialog/dialogPayingStyle';
  let $data={
    'picImg':require('../../common/images/personal/clock.png')
  };
  let $this={};
  export default {
   name:"dialogPaying",
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
       methods:{
          //子组件传值到父组件
          btnClick:function($b){
            $this.$emit('clickListen',$b);
          }
        },
        components:{
         'dialogPayingStyle':dialogPayingStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogPaying{
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
      }
      .dialog-content{
        >div:first-child{
          margin-top:40px;
          padding-left:30px;
          display:inline-flex;
          >img{
            width:210px;
            height:210px;
            margin-right:70px;
          }
          .info{
            display:flex;
            align-items:baseline;
            flex-direction:column;
            margin-top:40px;
            >p{
              width:225px;
              display:block;
              font-size:18px;
              color:#333333;
              font-weight:bold;
              margin-bottom:10px;
            }
            button{
              outline:none;
              font-size:14px;
              padding:0;
              cursor: pointer;
              border:0 solid white;
              color:#5C6670;
              background-color:white;
              text-decoration: underline;
            }
          }
        }
      }
    }
  </style>
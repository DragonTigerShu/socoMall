<template>
  <dialogQuestionStyle class="dialogQuestion" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>在线支付常见问题</h1>
    </div>
    <div slot="content-info">
      <ul>
        <li><a href="#part1">I.在线支付常见问题#</a></li>
        <li><a href="#part2">II.在线支付 - PC端支付宝支付教程#</a></li>
        <li><a href="#part3">III.在线支付 - PC端微信支付教程#</a></li>
        <li><a href="#part4">IV.在线支付 - M端微信支付教程#</a></li>
      </ul>
      <h2 id="part1">I.在线支付常见问题</h2>
      <ul>
        <li>
          <p>在线支付方式:支付宝、微信</p>
          <p><strong>Q1</strong>：为什么支付宝、微信提示已经支付，但是订单信息却显示还未支付成功？</p>
          <p><strong>A1</strong>：请您放心，这是由于同时支付的订单数量太多，导致支付宝、微信支付数据与我们系统数据暂时没有同步。原则上24小时内支付信息会同步正确，建议您注意查看。给您带来不便，请谅解！</p>
        </li>
        <li>
          <p><strong>Q2</strong>：在线支付订单需要在多长时间内完成付款？</p>
          <p><strong>A2</strong>：我们订单通常自动为您保留24小时，过期后您的订单将会自动关闭。活动期间支付时效以活动通知为准。 </p>
        </li>
        <li>
          <p><strong>Q3</strong>：如何查询是否支付成功？</p>
          <p><strong>A3</strong>：登陆后打开“我的订单”查询订单状态。</p>
        </li>
        <li>
          <p><strong>Q4</strong>：PC端网页打开支付页面，提示"该页无法显示"或空白页，可能是什么原因？</p>
          <p><strong>A4</strong>:<br/>&nbsp;&nbsp;1、没有升级IE浏览器，导致加密级别过低，无法进入银行系统。请升级到6.0及以上版本。<br/>&nbsp;&nbsp;2、上网环境或上网方式受限，可能是网络服务商限制，如有条件更换一种上网方式或环境。<br/>&nbsp;&nbsp;3、瞬间网络不通，尝试刷新页面；如果刷新不能解决问题，可能由于如果浏览器设置缓存，请在阅览器菜单—工具—Internet选项—点击"删除cookies"和"删除文件"，用以清除临时文件。</p>
        </li>
        <li>
          <p>Q5：扫描支付二维码无效怎么办？</p>
          <p>A5：进入“我的订单”查询订单状态，如支付未成功，点击“立即支付”，选择支付方式，页面生成新的二维码，扫码支付。</p>
        </li>
      </ul>
      <h2 id="part2">II.在线支付 - PC端支付宝支付教程</h2>
      <ul>
        <li>
          <p><strong>提醒</strong>：如您选择支付宝遇到支付的问题可以联系支付宝7*24小时客服电话95188.也可以在工作时间周一至周日 8:30-17:30，拨打客服电话400-021-2008，联系速珂工作人员帮您处理。</p>
        </li>
        <li><img :src="AliPay"></li>
        <li>1.首先选择并点击”支付宝”支付选项.</li>
        <li>2.跳转到支付宝的登陆支付界面.</li>
        <li>3.打开手机支付宝APP，点击“扫一扫”，扫描网页上二维码，即支付订单。</li>
      </ul>
      <h2 id="part3">III.在线支付 – PC端微信支付教程</h2>
      <ul>
        <li>
          <p>提醒：如您选择微信支付遇到支付的问题可以联系微支付专线7*24小时客服电话95017或添加微信公众号“腾讯客服”提交微信支付问题。<br/>也可以在工作时间周一至周日 8:30-17:30，拨打客服电话400-021-2008，联系速珂工作人员帮您处理。</p>
        </li>
        <li><img :src="WeChat"></li>
        <li>1.首先选择并点击”微信支付”支付选项</li>
        <li>2.弹出微信支付二维码</li>
        <li>3.打开手机微信APP，点击“扫一扫”，扫描网页上二维码，即支付订单</li>
      </ul>
      <h2 id="part4">IV.在线支付 - M端微信支付教程</h2>
      <ul>
        <li>
          <p><strong>提醒</strong>：如您选择微信支付遇到支付的问题可以联系微支付专线7*24小时客服电话95017或添加微信公众号“腾讯客服”提交微信支付问题。<br/>也可以在工作时间周一至周日 8:30-17:30，拨打客服电话400-021-2008，联系速珂工作人员帮您处理。</p>
        </li>
        <li><img :src="WeChat"></li>
        <li>1.首先选择并点击”微信支付”支付选项</li>
        <li>2.页面生成微信支付链接（微信浏览器内点击”微信支付”，直接跳转至支付订单页面）</li>
        <li>3.复制微信支付链接，打开手机微信APP，在微信App内打开链接，即支付订单</li>
      </ul>
    </div>
  </dialogQuestionStyle>
</template>
<script>
  import dialogQuestionStyle from '@/components/dialog/dialogQuestionStyle';
  let $data={
    'picImg':require('../../common/images/personal/clock.png'),
    'WeChat':require("../../common/images/payList/wechat.png"),
    'AliPay':require("../../common/images/payList/alipay.png"),
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
         'dialogQuestionStyle':dialogQuestionStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogQuestion{
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
        padding-bottom:30px;
        >div:first-child{
          margin-top:40px;
          padding:0 30px;
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
        a{
          font-size:20px;
          margin:10px 0;
        }
        h2{
          color:#333333;
          font-size:20px;
          margin:30px 0 15px 0;
        }
        p{
          color:#333333;
          font-size:14px;
          margin:5px 0;
        }
        li{
          color:#333333;
          font-size:14px;
          margin:5px 0;
        }
      }
    }
  </style>
<template>
	<dialogConfirmStyle class="dialogConfirm" :isShow="isShow" @closeIcon="btnClick(false)" @close="cover?btnClick(false):''">
    <div slot="header-title">
      <h1>{{h}}</h1>
      <p>{{p}}</p>
    </div>
    <div slot="content-info">
      <button v-if="cancel!=''" class="cancel" @click="btnClick(false)">{{cancel}}</button><button v-if="ok!=''" class="ok" @click="btnClick(true)">{{ok}}</button>
      <button v-if="confirm!=''" @click="btnClick(true)">{{confirm}}</button>
    </div>
  </dialogConfirmStyle>
  <!-- 使用例子
  <dialogConfirm :isShow="true/false是否显示" :cover="true/false点阴影是否可关闭" :h="'确定删除吗?'" :p="'可能会失去本次购买的机会'" :ok="'确定短按钮'" :cancel="'取消短按钮'" :confirm="'确定长按钮'" @btnClick="clickListen(true/false)">
  </dialogConfirm> -->
</template>
<script>
  import dialogConfirmStyle from '@/components/dialog/dialogConfirmStyle';
  let $data={
   
  };
  let $this={};
  export default {
   name:"dialogConfirm",
       props:{  // 期望在父组件传下来，子组件需要显示props
       		isShow:Boolean,//弹窗是否显示控制标记Boolean
       		h:{type:String,default:''},//标题内容
       		p:{type:String,default:''},//下方提示内容
       		cancel:{type:String,default:''},
       		//取消按钮内容 默认不赋值不出现
       		ok:{type:String,default:''},
       		//取消按钮内容 默认不赋值不出现
       		confirm:{type:String,default:''},
       		//取消按钮内容 默认不赋值不出现
       		cover:{type:Boolean,default:true}
       		//TRUE 点击遮罩关闭弹窗 false则不会关闭弹窗
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
         'dialogConfirmStyle':dialogConfirmStyle
       }
       
     }
   </script>

   <style lang="scss">
    .dialogConfirm{
     .dialog-header{
      display:flex;
      justify-content:center;
      margin-bottom:50px;
      *>h1{
       padding-top:61px;
       font-size:28px;
       color:#333333;
       font-weight:normal;
       width: 330px;
     }
     *>p{
       font-size:16px;
       color:#9da2a6;
       font-weight:normal;
       margin-top:8px;
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
    button.cancel{
      background-color:#5c6670;
      color:white;
      margin-right:30px;
      width:170px;
    }
    button.ok{
      width:170px;
    }
  }
}
</style>
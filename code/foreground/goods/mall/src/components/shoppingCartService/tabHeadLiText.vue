<template>
  <!-- 下方字体 -->
  <div class="tabHeadLiText">
    <div v-if="Num==0" class="left">{{Odatas[Num]}}</div>
    <div v-else-if="Num==Odatas.length-1" class="right">{{Odatas[Num]}}</div>
    <div v-else class="middle">{{Odatas[Num]}}</div>
  </div>
</template>

<script>
  export default {
    name: 'tabHeadLiText',
    props: {
      Num:Number,
      Odatas:Array,
      Now:Number
    },
    data(){
      var $data={
        
      }
      return $data;
    },
    created: function () {

    },
    watch:{
      　　　　Now(curVal,oldVal){
        　　　　　　if(this.Num>curVal)this.flag=false
          else this.flag=true;
      　　　　}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  .tabHeadLiText{
    margin: 0px 0 30px 0;
    display:inline-block;
    div{
      font-size: 14px;
      color: #333333;
      font-weight:normal;
      width:264px;
      text-align:center;
      margin-top:12px;
    }
  }
</style>

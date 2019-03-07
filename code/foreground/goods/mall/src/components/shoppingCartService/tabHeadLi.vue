<template>
  <div class="tabHead" :class="{'fix-right':first,'fix-left':last}">
    <div v-if="Num!=0" class="tabHeadLiConcant" :class="{'active' : flag}"></div>
    <div class="tabHeadLi" :class="{'active':flag}">{{Num+1}}</div>
    <div v-if="Num!=Odatas.length-1" class="tabHeadLiConcant fix-left" :class="{'active':flag}"></div>
  </div>
</template>

<script>
  export default {
    name: 'tabHeadLi',
    props: {
      Num:Number,
      Odatas:Array,
      Now:Number
    },
    data(){
      var $data={
        flag:false,
        first:false,
        last:false
      }
      return $data;
    },
    created: function () {
      if(this.Num>this.Now)this.flag=false
        else this.flag=true;
      if(this.Num==0)this.first=true;
      if(this.Num==this.Odatas.length-1)this.last=true;
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
  .tabHead{
    display:inline-block;
    width:264px;
    margin: 40px 0 0 0;
    font-size:0;
    letter-spacing: 0;
    .active{
      background-color: #c8161e;
      color: white;
    }
  }
  .fix-left{
    text-align:left;
  }
  .fix-right{
    text-align:right;
  }
  .tabHeadLi{
    width: 34px;
    height: 34px;
    border-radius: 50%;
    text-align: center;
    line-height: 34px;
    display:inline-block;
    font-size: 14px;
    font-weight: bold;
    background-color: white;
    color: #ddd;
    box-sizing:boder-box;
  }
  .tabHeadLiConcant{
    width:117px;
    height:8px;
    margin:0 -1px;
    display:inline-block;
    background-color: white;
    color: #ddd;
  }
</style>

<template>
  <ul class="goodsListContentOrderLi">
    <li class="fix-img-style"><img :data-id="data.goods_id" :src="baseHead+data.goods_thumb"></li>
    <li class="title">{{data.goods_name}} {{data.spec_key_name}}</li>
    <li style="margin-left:112px;width:50px">{{data.goods_price}}</li>
    <li class="amount">X{{data.goods_number}}</li>
    <li class="count-style">{{data.goods_number*data.goods_price}}元</li>
  </ul>
</template>

<script>
  var $data = {
    'baseHead':''
  }
  var $this={}
  export default {
    name: 'goodsListContentOrderLi',
    props: {
      index:Number,
      data:Object
    },
    data () {
      var $this = this;
      return $data;
    },
    created:function(){
      this.baseHead=$baseHead;
    },
    watch:{

    },
    methods:{
      
    },
    components:{
      
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .goodsListContentOrderLi{
    font-size:0;
    background: white;
    height: 150px;
    background-color:white;
    &:nth-child(2){
      margin-top:20px;
    }
    li{
      color: #5C6670;
      font-size:14px;
      font-weight: normal;
      text-align: center;
      display:inline-block;
      vertical-align: middle;
    }
    li.title{
      margin-left:40px;
      width:200px;
      text-align:left;
    }
    li.amount{
      margin-left:104px;
      width:50px;
      text-align:center;
      span{
        font-size:30px;
      }
    }
    li.count-style{
      margin-left:75px;
      width:100px;
      text-align:center;
      color:#c8161e;
    }
    .fix-img-style{
      margin-left:40px;
      img{
        width:150px;
        height:150px;
        cursor:pointer;
      }
    }
    
  }
</style>

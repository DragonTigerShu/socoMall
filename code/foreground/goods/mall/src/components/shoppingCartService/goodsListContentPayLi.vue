<template>
  <ul class="goodsListContentPayLi">
    <li class="fix-img-style"><img :data-id="data.goods_id" :src="baseHead+data.goods_thumb">{{data.goods_name}} {{data.spec_key_name}}</li>
    <li>{{data.goods_price}}</li>
    <li class="amount">X{{data.goods_number}}</li>
    <li class="count-style">{{data.goods_number*(data.goods_price*100)/100}}元</li>
  </ul>
</template>

<script>
  var $data = {
    baseHead:''
  }
  var $this={}
  export default {
    name: 'goodsListContentPayLi',
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
  .goodsListContentPayLi{
    font-size:0;
    background: white;
    height: 150px;
    background-color:white;
    margin-bottom:10px;
    display:flex;
    justify-content:center;
    align-items: center;
    li{
      color: #5C6670;
      font-size:14px;
      font-weight: normal;
      flex:1;
      display:flex;
      justify-content:center;
      align-items: center;
    }
    li.amount{

    }
    li.count-style{

      color:#c8161e;
    }
    .fix-img-style{
      flex:3;
      justify-content:flex-start;
      img{
        width:150px;
        height:150px;
        cursor:pointer;
        margin-right:20px;
      }
    }
    &:last-child{
      margin-bottom:30px;
    }
  }
</style>

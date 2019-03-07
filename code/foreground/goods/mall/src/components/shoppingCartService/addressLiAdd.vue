<template>
  <!-- 新增地址栏 -->
  <div class="addressLiAdd" @click="addressAddListen" >
    <img :src='addImg'>
    <p>添加新地址</p>
  </div>
</template>

<script>
  var data={
    'addImg':require('../../common/images/shoppingCart/add.png'),
  }
  var $this={}
  export default {
    name: 'addressLiAdd',
    props: {
      
    },
    data(){
      $this = this;
      return data;
    },
    created: function () {
      
    },
    watch:{
      　　
    },
    methods:{
      addressAddListen:function(){
        $this.$emit('addressAddListen');
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  .addressLiAdd{
    margin-top:20px;
    box-sizing:border-box;
    background:white;
    width:270px;
    height:180px;
    border-radius:4px;
    color:#5C6670;
    position:relative;
    display:block;
    border:1px solid #e0e0e0;
    cursor: pointer;
    text-align:center;
    img{
      width:40px;
      height:40px;
      margin-top:60px;
    }
    p{
      margin-top:20px;
      color:#9DA2A6;
    }
  }
  .addressLiAdd:hover{
    box-shadow: 0px 2px 6px #cbcbcb;
  }
</style>

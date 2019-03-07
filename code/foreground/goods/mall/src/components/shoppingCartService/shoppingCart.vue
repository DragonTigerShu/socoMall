<template id="shoppingCart">
  <div class="background-color">
    <div class="w h">
      <router-view :reload="reload" :reloadCart="reloadCart" :tabData="tabData" @appListen="appListen"></router-view>
    </div>
  </div>
</template>
<script>
  var $data = {
    'tabData' : ['购物','填写订单信息','支付','完成'],
  }
  var $this = {}
  export default {
    name: 'shoppingCart',
    props: {
      reload:Boolean,
      reloadCart:Boolean
    },
    data () {
      $this=this;
      return $data
    },
    watch:{

    },
    methods:{
      appListen:function($c,$i){
        $this.$emit('appListen',$c,$i);
      }
    },
    components:{
      
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .h{
    height:auto;
    padding-bottom:30px;
  }
  .background-color{
    background-color:#f5f5f5;
  }
</style>

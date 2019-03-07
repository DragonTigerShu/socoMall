<template>
  <img :src="remove ? removeImgActive : removeImgDefauly " @mouseenter="checkRemove" @mouseleave="checkRemove" @click="clickRemove">
</template>
<script>
  var $data = {
    'removeImgDefauly':require('../../common/images/icon/remove-default.png'),
    'removeImgActive':require('../../common/images/icon/remove-active.png'),
    'remove':false
  }
  var $this={}
  export default {
    name: 'removeIcon',
    props: {

    },
    data () {
      $this = this;
      return $data;
    },
    created:function(){
    },
    watch:{
    },
    methods:{
      checkRemove:function(){
        if($this.remove)$this.remove=false;
        else $this.remove=true;
      },
      clickRemove:function(){
        $this.$emit('close');
      }
    },
    components:{
      
    },
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>

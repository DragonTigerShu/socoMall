<template>
  <!--查询售后目录信息-->
  <div class="info_afterSale_check">  
    
  </div>
</template>
<script>
  let $this = {}
  let $data ={
    id:0
  }

  export default{
    name:'info_afterSale_check',
    props:{
      
    },
    data () {
      $this = this
      return $data
    },
    watch:{
      
    },
    created(){
      this.id=this.$route.params.id;
      if(this.id==null||this.id==''){
        this.$router.push({path:'/'});
      }else{
        this.$emit('checkOrderListen',this.id);
      }
    }
  }
</script>

<style lang="scss">
</style>
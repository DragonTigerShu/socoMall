<template>
  <div class="tabHead-Style w" >
    <ul>
      <tLi v-for="(value,index) in data" :Num="index" :Odatas='data' :Now='now' v-model="now" :key="index">
      </tLi>
    </ul>
    <ul>
      <tLt v-for="(value,index) in data" :Num="index" :Odatas='data' :Now='now' v-model="now" :key="index">
      </tLt>
    </ul>
  </div>
</template>

<script>
  import tabHeadLi from '@/components/shoppingCartService/tabHeadLi.vue';
  import tabHeadLiText from '@/components/shoppingCartService/tabHeadLiText.vue';
  var $data = {
    
  }
  export default {
    name: 'tabHead',
    props: {
      'data' : Array,
      'now' : Number
    },
    data () {
      return $data
    },
    methods:{
     
    },
    
    components:{
      'tLi':tabHeadLi,
      'tLt':tabHeadLiText
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .tabHead-Style{

    background-color:#f5f5f5;
    text-align:center;

  }
</style>

<template >
  <router-view :key="key" @appListen="appListen"></router-view>
</template>
<script>
let $this={}
let $data={}
export default {
  name: 'Index',
  props: {
    
  },
  data () {
      $this=this;
      return $data
  },
  watch:{

  },
  computed: {
    key() {
        return this.$route.fullPath;
    }
  },
  methods:{
    appListen:function(n,t){
      $this.$emit('appListen',n,t);
    }
  },
  components:{
    
  },
}
</script>
<style lang="scss">

</style>

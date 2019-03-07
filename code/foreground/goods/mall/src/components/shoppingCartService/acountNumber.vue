<template>
  <ul class="aN">
    <li><button class="minus" :class="minusDis?'disabled':''" @click="minus">-</button></li>
    <li class="number">{{num}}</li>
    <li><button class="add" :class="addDis?'disabled':''" @click="add">+</button></li>
  </ul>
</template>
<script>
  var $data = {

  }
  var $this={}
  export default {
    name: 'acountNumber',
    props: {
      num:Number,
      minusDis:Boolean,
      addDis:Boolean
    },
    data () {
      var $this = this;
      return $data;
    },
    created:function(){
      
    },
    watch:{
      　　
    },
    methods:{
      minus:function(){
        if(!this.minusDis)this.$emit('aNClickListen',false);
      },
      add:function(){
        if(!this.addDis)this.$emit('aNClickListen',true);
      }
    },
    computed: {

    },
    components:{
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .aN{
    border: 1px solid #E0E0E0;
    width: 150px;
    font-size:0;
    border-radius: 4px;
  }
  .aN>li{
    display: inline-block;
    text-align: center;
    .minus{
      border-radius: 4px 0 0 4px;
    }
    .add{
      border-radius: 0 4px 4px 0;
    }
  }
  .aN>li button{
    width: 40px;
    height: 39px;
    color: #E0E0E0;
    font-size: 20px;
    border: 0 solid white;
    background-color: white;
    outline: none;
  }
  .aN>li button:hover{
    background-color: #e0e0e0;
    color: white;
    cursor:pointer;
  }
  .aN>li.number{
    min-width: 67px;
    cursor: default;
  }
  .aN>li button.disabled{
    cursor:no-drop;
  }
</style>

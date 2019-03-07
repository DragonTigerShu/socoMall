<template>
	<div class="dialogLoading">
		<div class="dialog-modal fade" v-show="isShow">
			<div class="dialog-modal-container">
				<img :src="loadingImg" alt="loading" />
			</div>
		</div>
		<div class="doalog-cover" v-show="isShow"></div>
  </div>
</template>
<script>

  let $data={
    loadingImg:require('../../common/images/personal/loading.gif'),
  };
  let $this={};
  export default {
    name:"dialogLoading",
  props:{  // 期望在父组件传下来，子组件需要显示props
    isShow:Boolean
  },
  data(){
    $this=this;
    return $data
  },
  watch:{
    isShow:function(){}
  },
  methods:{
    
  },
  components:{
   
  }
}
</script>

<style lang="scss">
  .dialogLoading{
    .doalog-cover{
      position:fixed;
      top:0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000;
      opacity: 0;
      z-index: 99;
    } 
    .dialog-modal{
      z-index: 100;
      display:block;
      position: fixed;
      top:0;
      left:0;
      bottom:0;
      right:0;
      overflow:hidden;
      .dialog-modal-container{
        margin: 10% auto;
        width: 550px;
        height: 450px;
        border-radius: 8px;
        display: flex;
        justify-content: center;
        align-items: center;
        opacity: 1;
        z-index: 100;
      }
    }
  }
</style>
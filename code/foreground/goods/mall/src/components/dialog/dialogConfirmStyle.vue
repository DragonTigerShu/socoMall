<template>
	<div class="dialogConfirmStyle">
		<transition name="fade">
			<div class="dialog-modal fade" v-show="isShow" @click="closeMyself">
				<div class="dialog-modal-container" @click="closeCheck">
					<div class="dialog-header">
						<img :src="remove ? removeImgActive : removeImgDefauly " @mouseenter="checkRemove" @mouseleave="checkRemove" @click="clickRemove">
						<slot name="header-title"></slot>
					</div>
					<div class="dialog-content">
						<slot name="content-info"></slot>
					</div>
				</div>
			</div>
		</transition>
		<div class="doalog-cover"  v-show="isShow"></div>
	</div>
</template>
<script>
	import {overflowDisabled} from '@/common/js/data'
	let $data={
		'removeImgDefauly':require('../../common/images/icon/remove-default.png'),
		'removeImgActive':require('../../common/images/icon/remove-active.png'),
		'remove':false
	};
	let $this={};
	export default {
		name:"dialogConfirmStyle",
       props:{  // 期望在父组件传下来，子组件需要显示props
       	isShow:Boolean,
       },
       watch:{
       	isShow:function(){ overflowDisabled(this.isShow)}
       },
       data(){
       	$this=this;
       	return $data
       },
       created:function(){
       	
       },
       methods:{
          //子组件传值到父组件
          closeMyself:function(){
          	$this.$emit('close');
          },
          checkRemove:function(){
          	if($this.remove)$this.remove=false;
          	else $this.remove=true;
          },
          clickRemove:function(){
          	$this.$emit('closeIcon');
          },
          closeCheck:function(){
          	window.event.stopPropagation();
          }
      },
      components:{
      	
      }
      
  }
</script>

<style lang="scss">
	.dialogConfirmStyle{
		.doalog-cover{
			position:fixed;
			top:0;
			left: 0;
			width: 100%;
			height: 100%;
			background: #000;
			opacity: 0.3;
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
			overflow-x:hidden;
			overflow-y:auto;
			cursor:default;
			.dialog-modal-container{
				position: relative;
				margin:10% auto;
				width: 550px;
				height: 280px;
				border-radius: 8px;
				background: #fff;
				opacity: 1;
				z-index: 101;
				cursor:default;
				.dialog-modal-content{
					position: relative;
				}
				.dialog-header{
					width: 100%;
					height: auto;
					border-radius: 10px;
					text-align: center;
					padding:0;
					>img:first-child{
						position: absolute;
						top: 15px;
						right: 25px;
						cursor:pointer;
					}
					.dialog-close{
						position:absolute;
						top:10px;
						right:25px;
						width:20px;
						height:20px;
						border:1px solid #ccc;
						text-align:center;
						line-height:15px;
						font-size:20px;
						cursor:pointer;
					}

				}
				
			}
		}
	}
</style>
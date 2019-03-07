<template>
	<div class="dialogBig">
		<transition name="fade">
			<div class="dialog-modal fade" v-show="isShow" @click="closeMyself">
				<div class="dialog-modal-container"  @click="closeCheck">
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
		<div class="doalog-cover" v-show="isShow"></div>
	</div>
</template>
<script>
	import {overflowDisabled} from '@/common/js/data'
	let $data={
		'removeImgDefauly':require('../../common/images/icon/remove-default.png'),
		'removeImgActive':require('../../common/images/icon/remove-active.png'),
		'remove':false,
		'closeCheckFlag':false
	};
	let $this={};
	export default {
		name:"dialogUserNameStyle",
       props:{  // 期望在父组件传下来，子组件需要显示props
       	isShow:Boolean
       },
       data(){
       	$this=this;
       	return $data
       },
       watch:{
       	isShow:function(){overflowDisabled(this.isShow)}
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
	      	//点击弹窗区域，先触发弹窗区域事件，之后会触发遮罩区域事件，阻止事件冒泡
	      }
	  },
	  components:{
	  	
	  }
	  
	}
</script>

<style lang="scss">
	.dialogBig{
		::-webkit-input-placeholder{ 
			color:#9da2a6;
			font-size:12px;
			font-weight:normal;
			letter-spacing:0.5;
		}
		:-moz-placeholder {
			color:#9da2a6;
			font-size:12px;
			font-weight:normal;
			letter-spacing:0.5;
		}
		::-moz-placeholder {
			color:#9da2a6;
			font-size:12px;
			font-weight:normal;
			letter-spacing:0.5;
		}
		:-ms-input-placeholder {
			color:#9da2a6;
			font-size:12px;
			font-weight:normal;
			letter-spacing:0.5;
		}
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

			.dialog-modal-container{
				position: relative;
				margin:10% auto;
				width: 550px;
				height: 450px;
				border-radius: 8px;
				background: #fff;
				opacity: 1;
				z-index: 100;

				.dialog-header{
					width: 100%;
					height: auto;
					border-radius: 0;
					line-height: normal;
					padding: 30px 0 0 30px;
					>img:first-child{
						position: absolute;
						top: 15px;
						right: 25px;
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
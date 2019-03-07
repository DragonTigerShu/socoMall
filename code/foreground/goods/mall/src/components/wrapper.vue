<!--弹层组件封装-->
<template>
	<div class="model-mask" v-show="show">
		<div :class="[type === 'top' ? 'model-wrapper-top' : 'model-wrapper']" @click="close">
			<div :class="[type === 'top' ? 'model-container-top' : 'model-container']"
			:style="{width:width + 'px'}">
			<div class="model-header">
				<span>{{title}}</span>
				<i class="close-empty" @click="close">
					x
				</i>
			</div>
			<div class="model-body">
				<slot name="title"></slot>
			</div>
		</div>
	</div>
</div>
</template>
<script>
	export default{
		name:'mymodel',
	 	props:{  //给子类添加参数类型
	 		title:String,
	 		show:Boolean,
	 		width:Number,
	 		type:String
	 	},
	 	data(){
	 		return {
	 			scrollTop:''
	 		}
	 	},
	 	watch: {
	 		show: function (val, oldVal) {
	 			function getScrollTop () {
	 				return document.body.scrollTop || document.documentElement.scrollTop
	 			}
	 			if (val) {
        // 在弹出层显示之前，记录当前的滚动位置
        this.scrollTop = getScrollTop()
        let body = document.querySelector('body')
        body.className = 'not-scroll'
        // 把脱离文档流的body拉上去！否则页面会回到顶部！
        document.body.style.top = -this.scrollTop + 'px'
    }
}
},
methods: {
	close: function (e) {
		function to (scrollTop) {
			document.body.scrollTop = document.documentElement.scrollTop = scrollTop
     //   debugger
 }
 let target = e.srcElement || e.target
     // alert(target.className);
     if (target.className === 'model-wrapper' ||
     	target.className ==='close-empty' ||
     	target.className === 'model-wrapper-top') {
     	this.$emit('closes')
    //  debugger
    let body = document.querySelector('body')
    body.className = ''
        // 滚回到老地方！
        to(this.scrollTop)
    } 
}
}
}
</script>
<style lang="scss">
	.model-mask{	
		transition: opacity .8s ease;
		height: 100%;
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background: rgba(0, 0, 0, .5);
		min-height: 150px;
	}
	.model-wrapper {
		height: 100%;
		text-align: center;
	}
	.model-wrapper:before {
		content: "";
		display: inline-block;
		height: 100%;
		vertical-align: middle;
	}
	.model-container {
		position: relative;
		display: inline-block;
		vertical-align: middle;
		background-color: white;
		text-align: left;
		box-shadow: 0 5px 14px 0 rgba(0,0,0,0.15);
		border-radius: 6px;
		overflow: hidden;
		z-index: 1050;
		min-height: 150px;
	}
	/**
	* 距离顶部100px，可滚动
	*/
	.model-wrapper-top {
		position: relative;
		height: 100%;
		overflow-x: hidden;
		overflow-y: scroll;
	}
	.model-container-top {
		margin: 100px auto;
		background-color: white;
		text-align: left;
		box-shadow: 0 5px 14px 0 rgba(0,0,0,0.15);
		border-radius: 6px;
		overflow: hidden;
	}
	.close-empty {
		position: absolute;
		right: 16px;
		top: 10px;
		overflow: hidden;
		cursor: pointer;
		z-index: 1100;
	}
	.model-header {
		position: relative;
		height: 45px;
		line-height: 45px;
		padding: 0 20px;
		font-size: 14px;
		color: #999;
		border-bottom: 1px solid #eee;
	}
	.model-body{
		padding: 0 20px;
	}

</style>
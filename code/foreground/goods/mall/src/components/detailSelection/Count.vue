<template>
	<div class="count">
		<div class="counter-btn btn-top" @click="decrease"><img :src="imgTop" /></div>
		<div class="counter-show">
			<input type="text" disabled="disabled" value="1" v-model="number" :class="{moving:'animate'}" />
		</div>
		<div class="counter-btn btn-bottom" @click="increase"><img :src="imgBottom" /></div>
	</div>

</template>
<script>
//点击NUmber数据信息
export default{
	props:{
		max :{
			type:Number,
			default:100  
		},
		min :{
			type:Number,
			default:1
		}
	},
	data(){
		return{
			number:this.min,
			animate:false,
			imgTop:require('../../common/images/page/top.png'),
			imgBottom:require('../../common/images/page/bottom.png')
		}
	},	
	methods:{
		decrease () {
			// 增加
			if(this.number >= this.max) {
				// alert('数字范围为1--101')
				return false
			}
			this.number ++
		},
		increase () {
			// 减少
			if (this.number <= this.min) {
				return false
			}
			this.number--
		}
	},
	mounted(){
		if(this.number>0){
			this.active = true
		}
	},
	watch:{
		number:function(){
			this.$emit('selectCount',this.number)
		}
	}
}
</script>
<style>
	.counter-show {
	}
	.animate{
		
	}
	.count{
		position: relative;
		width: 100px;
		height: 100%;
	}
	.count .counter-show input {
		width:100px;
		height:36px;
		border:none;
		border:1px solid #e0e0e0;
		text-align:left;
		padding-left: 1em;
		line-height:36px;
		background: none;
		border-radius: 5px;	
	}
	
	.count .counter-btn {
		width: 20px;
		height: 20px;
		text-align: center;
		line-height: 20px;
		font-size: 12px;
		cursor: pointer;
		border-width: 1px;
		position: absolute;
		right: -5px;
		border-color: rgb(204, 204, 204);
	}
	.count .btn-top{
		right: 0;
		top:0;
	}
	.count .btn-bottom{
		bottom: 0;
		right: 0;
	}

	
</style>
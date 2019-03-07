<template>
	<div class="radioChoose-wrap">
		<ul>
			<li v-for="(item,index) in selections.item"  :class="{active:index===nowIndex}"   @click="chooseSelection(index,item)">{{item.item_name}}
				<i v-if="item.itemImg" :style="{background:`url(${baseHead +item.itemImg[0].img_url}) center center no-repeat`,backgroundSize:`cover`}"></i>  
			</li>
		</ul>
	</div>
</template>
<script>
	export default{  // 子组件
		props:{ //父类注入数据过来
			selections:Object,
			baseHead:String
		},
		data(){
			return {
			   nowIndex:0, //类型数据信息
			   goodsPrice:''  // 传过来的id 
			}
		},
		methods:{
			chooseSelection:function(index,cb){
				this.nowIndex = index
				var _this = this 
			 if(cb&&cb.itemImg){  //
			 	_this.goodsPrice = cb.item_id
			 }else{
			 	_this.goodsPrice = cb.item_id
			 }
			 this.$emit('selectgoodsPrice',this.goodsPrice,this.selections.spec_id)   // ID   goodsPrice是你选择的参数的值的Id    spec_id是你点击的修改的是哪个(参数的Id) 
			 
			}
		}
	}
</script>
<style lang="scss">
	.radioChoose-wrap{
		ul {
			display: flex;
			max-width: 330px;
			flex-direction: row;
			flex-wrap: wrap;
			li{
				flex: 1;
				list-style: none;
				padding: 0 5px;
				line-height: 35px;
				border: 1px solid #e0e0e0;
				border-radius: 5px;
				margin-right: 10px;
				font-size: 16px;
				color: #5c6670;
				width: auto;
				height: 36px;
				cursor: pointer;
				margin-bottom: 10px;
				white-space: nowrap;
				text-align: center;
				&.active{
					border:2px solid #5D6670;
				}
				i{
					display: inline-block;
					width:16px;
					height: 16px;
					border-radius: 8px;
					margin-right: 5px;
					position: relative;
					top:2px;
				}
				
			}
		}
	} 
</style>
<template>
	<div class="radioChoose-wrap">
		<ul class="radiowarp">
			<li v-for="(item,index) in colores" :class="{active:index===nowIndex}" @click="chooseSelection(index)">
				<i :style="{'background':item.color}"></i>{{item.name}}
			</li>
		</ul>
	</div>
</template>
<script>
	export default{
		props:{ //父类注入数据过来
			colores:Array
		},
		data(){
			return {
               nowIndex:0    //类型数据信息
           }
       },
       methods:{
       	chooseSelection:function(index){
       		this.nowIndex = index
       		this.$emit('colorChange',this.colores[index])
       	}
       }
   }
</script>
<style lang="scss">
	.radioChoose-wrap{
		ul.radiowarp{
			overflow: hidden;
			width: 400px;
			li{
				list-style:none;
				display:inline-block;
				padding:0 10px;
				line-height:35px;
				border:1px solid #e0e0e0;
				border-radius:5px;
				margin-right:10px;
				font-size:14px;
				color: #5c6670;
				height: 36px;
				text-align: center;
				cursor:pointer;
				margin-bottom: 10px;
				min-width: 90px;
				&.active{
					border:2px solid #5D6670;
				}
				i{
					display: inline-block;
					width:16px;
					height: 16px;
					background: red;
					border-radius: 8px;
					margin-right: 5px;
					position: relative;
					top:2px;
					
					
					
				}
			}
		}
	} 
</style>
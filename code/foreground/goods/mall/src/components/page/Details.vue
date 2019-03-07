<template>
<div class="details-title" >
	<div class="summary">
		<div class="sum-muen w">
		  <ul>
		   	<!-- <li v-for="(item,index) in items" @click="colors(index)" :class="{active:index===nowIndex}"><router-link  :to="{}">{{item.name}}</router-link></li> -->
		   	<li v-for="(item,index) in items" class="active"></span>{{item.name}}</li>
		  </ul>
		</div>
	</div>
  <div class="detaiar" v-html="detcon">

  </div>
  
</div>
</template>
<script>
export default{
name:'Details',
data(){
	return {
		nowIndex:0,
		detals :'',
      items:[{
       name:'商品名称',
       id:'1'
      },{
      	  name:'',
        id:'2'
      },{
      	  name:'详细参数',
        id:'3'
      },{
      	  name:'',
        id:'4'
      },{
      name:'售后政策',
      id:'5'
      }]
	  }
  },
  props:{
    detcon:{
      type:String
    }
  },
  watch:{
    detcon(To,form){
      this.detals = To
    }
  },
  methods:{
    colors:function(index){
      this.nowIndex= index
    }
  }
}
</script>
<style lang="scss">
	.details-title{
		width: 100%;
	    position: relative;
	.summary{
        position: relative;
        background: #fff;
        height: 50px;
        width: 100%;
        
        .sum-muen{
        	li{
        		float: left;
        		width: 30%;
                line-height: 50px;
                text-align: center;
                font-size: 16px;
                a{
                	color: #9da2a6;
                }
                &.active a{
                color: #333;
                }
                &:nth-child(even){
					width: 5%;
                }
        	}
        }
       
	}
	 .detaiar{
	 	margin-top: 20px;
		
         background: #fff;
         min-height: 600px;
		 img{
			  display: block;
		      margin: 0 auto;
		 }
        	
        }
   }
</style>
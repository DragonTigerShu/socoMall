<template>
   <div class="purchase ">
       <!--轮播图-->
       	<div class="carousel-wrap" id="carousel" @mouseenter="stop" @mouseleave="go">
       	<template v-if="$cart==''">
       		<div class="showList" style="justify-content:center">
				<div><img :src="loading" alt="loading" /></div>
			</div>
       	</template>
       	<template v-else>
			<template v-if="purchase==[]||purchase.length==''">
				<p>购物车空空如也</p>
			</template>
			<template v-else>
				<transition-group tag="ul" class="slide-ul" name="list">
			       	<li v-for="(list,index) in purchase" :key="index" v-show="index==currentIndex" >
				        <div class="showList">
					   	   	<div class="list" v-for="(item,index) in curList">
								    <ul class="clearfix"> 
										<li class="clearfix">
											<div class="list_left"><router-link :to="{name: 'detail',params:{id:item.goods_id}}"><img :src="baseHead+item.goods_thumb"></router-link></div>
											<div class="list_right">
												<label>
													<span>{{item.goods_name}}</span>
													<span>{{price}}<i>￥{{item.goods_price}}</i></span>
													<span>{{sNumber}}<i>{{item.goods_num}}</i></span>
												</label>
											</div>
										</li>
									</ul>
							</div>
						</div>
			       	</li>
		        </transition-group>
		        <div class="purshop">
				   <p>￥{{totalMoney}}</p><h2>总计<span>{{totalNum}}&nbsp;</span>件商品</h2><button type="button" @click="goShoppingCart">去购物车结算</button>
				</div>
			</template>
		</template>
        <div class="carousel-items">
        	<span v-for="(item,index) in Math.ceil(purchase.length/3)" v-if="Math.ceil(purchase.length/3)>1" :class="{'active':index==currentIndex}" @click="Onchange(index)"></span>
        </div>
        <div class="carousel-main"  v-show="showhide" :class="{'active-main':cprise==showhide}" v-if="Math.ceil(purchase.length/3)>1">
        	<div class="carousel-left" @click="Onleft()"><img  :src="avatarleft"></div>
        	<div class="carousel-right" @click="Onright()"><img :src="avatarright"></div>
        </div>
       </div>
		<div class="clear"></div>
   </div>
</template>
<script>
	var $data={
		baseHead:'',
		showhide:false,
		totalMoney:0,
		totalNum:0,
    	cprise:true,
        price:'单价',
        sNumber:'数量',
        avatarleft:require("../../common/images/page/left.png"),
        avatarright:require("../../common/images/page/right.png"),
        loading:require("../../common/images/personal/loading.gif"),
        purchase:[], // 购物车详情
        currentIndex:-1,
        timer:''
	};
	var $this={};
	export default{
		name:'purchase',//购物车清单
		data(){
			$this=this;
            return $data;
		},
		computed:{
		    $cart:function(){
		  		this.totalNum = 0;
				this.totalMoney = 0;
				var purchase=[];
				var data = this.$store.state.$cart.list;
		        if(data&&data.length>0){
                   for(var i=0;i<data.length;i++){
			    		if(data[i].selected==1){                            
							purchase.push(data[i]);
							this.totalNum +=  parseFloat(data[i].goods_num);    //  总数量
			    	    }
					}
					this.totalMoney=this.$store.state.$cart.totalPrice;
					this.purchase=purchase;
				}else{
				    this.purchase=[];
				}
				return this.$store.state.$cart;
		    },
			curList(){
				let endList=this.purchase.slice(this.currentIndex*3,(this.currentIndex+1)*3);
				return endList;
			}
		},
	    created:function(){
	    	this.baseHead=$baseHead;
	    },
	    mounted:function(){
	   		this.autoPlay()
	    },
	    props: {
	      	reloadCart:Boolean
	 	},
	 	watch:{

		},
       	methods:{
         created:function(){
         	this.$nextTick(()=>{
         		this.timer = serInterval(() =>{
         			this.autoPlay()
         		},1000)
         	})
         },
         autoPlay:function(){
         	this.currentIndex ++
         	if(this.currentIndex >Math.ceil(this.purchase.length/3)-1){
         		this.currentIndex = 0
         	}
         },
		 stop:function(){
           //光标移入
		   this.showhide = true
		   
		 },
		 go:function(){ 
		 //光标移出
          this.showhide = false
		 },
         Onchange:function(index){

         	this.currentIndex = index
         },
         Onleft:function(index){
           if(this.currentIndex==0){
           	  this.currentIndex=Math.ceil(this.purchase.length/3)-1
           }else{
           	  this.currentIndex -=1
           }
         },
         Onright:function(index){
         	if(this.currentIndex==(Math.ceil(this.purchase.length/3)-1)){
         		this.currentIndex=0
         	}else{
         		this.currentIndex++
         	}	
         },
         goShoppingCart:function(){
           this.$emit('closePurchase');
	       this.$router.push({path:'/shoppingCart'});
	       window.scrollTo(0,0);
	    }
      }
 }
</script>
<style lang="scss">
	.purchase{
		    background: #fff;
		    border-radius: 8px;
		    margin-top: 20px;
		    box-shadow: 0px 2px 6px #cbcbcb;
		    left: 20px;
		    position: absolute;
		    top:32px;
		    z-index: 99;
		    left: 50%;
		    width: 1200px;
		    margin-left: -600px;
		    padding-bottom: 60px;
		    overflow: hidden;
	     .purshop{
	     	    position: absolute;
			    right: 0;
			    bottom: 0;
			    margin-bottom: 20px;
                margin-right: 20px;
                p{
                	    display: inline-block;
					    margin: 0 20px;
					    font-size: 20px;
					    color: #c8161e;
                }
                h2{
                	display: inline-block;
                	color: #5c6670;
                }
                span{
                	    font-size: 14px;
					    color: #5c6670;
					    margin-right: 30px;
					    margin: 0 5px;
                }
                button{
                	    border: 0;
					    background: #c8161e;
					    color: #fff;
					    border-radius: 8px;
					    width: 180px;
					    height: 40px;
					    line-height: 40px;
					    text-align: center;
					    margin-left: 30px;
					    cursor: pointer;
					    outline: none;
                }
	     }
	  } 

.clearfix:after{
	content:'';
	display:block;
	clear:both;
	visibility:hidden;
	height:0;
	
}
.carousel-wrap{
	border-radius: 8px;
	height:200px;
	width: 100%;
	overflow: hidden;
	cursor: pointer;
	background: #fff;
	>p{
		text-align: center;
		position: absolute;
		left: 50%;
		top: 46%;
		margin-left: -58px;
    }
	.slide-ul{
		position: relative;
		width: 100%;
		height: 100%;
		>li{
			margin:0;
		}
	 	li{
			position: absolute;
			width: 100%;
			height: 100%;
	   	>img{
		   	position: relative;
		   	z-index:2;
		   	width: 100%;
		   	height: 100%;
	   	}
	   	.showList{
	   		position:absolute;
	   		top:50%;
	   		left:50%;
			transform:translateX(-50%) translateY(-50%);
	   		z-index:5;
			width: 100%;
			display:flex;
			>.list{
				flex:1;
			    >ul>li{
					position:static;
			    	float: left;
				    width: 320px;
				    margin: 0 30px;
				    display:flex;
				    >.list_left{
				    	/*width:49%;*/
				    	/*display: inline-block;*/
				    	/*float: left;*/
				    	padding: 20px;
				    	img{
				    		width: 120px;
							height:auto;
				    	}
				    }
				    >.list_right{
				    	    /*width: 50%;
						    display: block;*/
						    /*float: left;*/
						    padding: 20px;
						    label{
						    	display: inline-block;
						    	width: 100%;
						    span{
				    		width:120px;
				    		display: block;
				    		line-height: 30px;
				    		float:right; 
				    		&:nth-of-type(1){
				    			margin-bottom: 20px;
				    		}
				    		&:nth-of-type(2){
				    			i{
				    				float: right;
		                            padding: 4px; 
		                            font-size: 16px;
				    			}
				    		}
				    		&:nth-of-type(3){
				    			i{
				    				float: right;
		                            padding: 4px;
		                            font-size: 16px;
				    			}
				    		}
				    	 }
				        }
				     }
			       }
			    }
		   }
	 }
 }
 .carousel-items{
 	position:absolute;
 	z-index: 10;
 	bottom: 130px;
 	width: 100%;
 	margin: 0 auto;
 	text-align: center;
 	font-size: 0;
 	 span{
 	 	display: inline-block;
 	 	height: 6px;
 	 	width: 30px;
 	 	margin: 0 5px;
 	 	background-color: #3ec7ba;
 	 	cursor: pointer;
 	 	visibility: hidden;
 	 	&.active{
 	 		background-color:#c30808;
 	 	}
 	 }
  } 
}
.carousel-main{
	width: 100%;
    position: absolute;
    bottom: 50%;
    margin-bottom:40px;
    left: 0;
    margin-left: 50px;
    cursor: pointer;
	z-index: 99;
	opacity: 0;
	transition:opacity ease 5s;
	&.active-main{
		opacity: 1;
	}
	.carousel-left{
		position: absolute;
		left: 0;
		margin-left: -35px;
	    height: 50px;
	    width: 50px;
	    border-radius: 25px;
	   background-color: rgba(245,245,245,100);
	    transition: all 0.1s ease;
	    &:hover{
	      background:#fff;
	      box-shadow: 0px 2px 6px #cbcbcb;
	    }
	}
	.carousel-right{
		position: absolute;
	    right: 0;
	    margin-right:65px;
	    height: 50px;
	    width: 50px;
	    border-radius: 25px;
	    background-color: rgba(245,245,245,100);
	     transition: all 0.1s ease;
	    &:hover{
	      background:#fff;
	      box-shadow: 0px 2px 6px #cbcbcb;
	    }
	}
	img{
		width: 9px;
		height:15px;
		display: block;
		margin: 18px auto;
	}
}

.list-enter-active {
  transition: all 0.5s ease;
  transform: translateX(0)
}

.list-leave-active {
  transition: all 0.5s ease;
  transform: translateX(-100%)
}

.list-enter {
  transform: translateX(100%)
}

.list-leave {
  transform: translateX(0)
}


</style>
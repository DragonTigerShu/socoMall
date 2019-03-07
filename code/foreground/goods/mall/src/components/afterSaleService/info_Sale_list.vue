<template>
  <!-- 提交售后申请   前   的商品json数据 -->
  <section class="goods_list" v-if="data['order_goods']">
  	<ul class="goodsListContentLi">
      <li class="fix-img-style"><img @click="goDetail($event)" :data-id="data['order_goods']['goods_id']" :src="baseHead+data['order_goods']['goods_thumb']"></li>
      <li style="flex:2">{{data['order_goods']['goods_name']}} {{data['order_goods']['spec_key_name']}}</li>
      <li >￥{{data['order_goods']['goods_price']}}</li>
      <li >X{{data['order_goods']['goods_number']}}</li>
    </ul>
  </section>
  <!-- 提交售后编辑   后   的商品json数据 -->
  <section class="goods_list" v-else-if="data['order_goods_info']">
    <ul class="goodsListContentLi">
      <li class="fix-img-style"><img @click="goDetail($event)" :data-id="data['order_goods_info']['goods_id']" :src="baseHead+data['order_goods_info']['goods_thumb']"></li>
      <li style="flex:2">{{data['order_goods_info']['goods_name']}} {{data['order_goods_info']['spec_key_name']}}</li>
      <li >￥{{data['order_goods_info']['goods_price']}}</li>
      <li >X{{data['order_goods_info']['goods_number']}}</li>
    </ul>
  </section>
</template>

<script>
	export default{
   props: {
    data:Object
  },
  data(){
    return {
     baseHead:''
   }
 },
 created:function(){
  this.baseHead=$baseHead;
},
methods:{
 goDetail:function(e){
   const id = parseInt(e.target.dataset.id);
   $this.$router.push({name: 'info_order_goods/order_details',params:{id:id}})
   window.scrollTo(0,0);
 }
}
}
</script>

<style lang="scss">
  .goods_list{
   .goodsListContentLi{
    background: white;
    height: 150px;
    background-color:white;
    margin-bottom:10px;
    display:flex;
    align-items:center;
    justify-content:center;
    li{
      flex:1;
      color: #5C6670;
      font-size:14px;
      display:flex;
      justify-content:center;
    }
    .fix-img-style{
      img{
        width:150px;
        height:150px;
        cursor:pointer;
      }
    }
    &:last-child{
      margin-bottom:30px;
    }
  }
}
</style>
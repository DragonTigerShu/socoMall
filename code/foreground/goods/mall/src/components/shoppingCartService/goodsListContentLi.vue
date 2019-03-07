<template>
  <ul class="goodsListContentLi" :key="index">
    <li class="li-checkBox-style" style="margin-left:20px;">
      <input type="checkbox" style="display:none" name="gLi" :id="'goodListLi'+index" @click="checkClick" :checked="data.selected==1?true:false"><label :for="'goodListLi'+index"><img :src="data.selected==1 ? imgchecked : imgUnChecked "></label>
    </li>
    <li class="fix-img-style"><router-link :to="{name: 'detail',params:{id:data.goods_id}}"><img :src="baseHead+data.goods_thumb"></router-link></li>
    <li class="title">{{data.goods_name}} {{data.spec_key_name}}</li>
    <li style="margin-left:5px;width:50px">{{data.goods_price}}</li>
    <li style="margin-left:89px"><aN :minusDis="minusDis" :addDis="addDis" :num="parseInt(data.goods_num)" @aNClickListen="aNClickListen"></aN></li>
    <li class="count-style" style="margin-left:79px">{{data.goods_num*(data.goods_price*100)/100}}元</li>
    <li class="remove"><img :src="removeGroup[index] ? removeImgActive : removeImgDefauly " @mouseenter="checkRemove" @mouseleave="checkRemove" @click="clickRemove"></li>
  </ul>
</template>

<script>
  import acountNumber from '@/components/shoppingCartService/acountNumber.vue';
  var $data = {
    'imgUnChecked':require('../../common/images/icon/checkbox.png'),
    'imgchecked':require('../../common/images/icon/checkbox-checked.png'),
    'removeImgDefauly':require('../../common/images/icon/remove-default.png'),
    'removeImgActive':require('../../common/images/icon/remove-active.png'),
    'baseHead':'',
    'removeGroup':[]
  }
  var $this={}
  export default {
    name: 'goodsListContentLi',
    props: {
      index:Number,
      data:Object,
      minusDis:Boolean,
      addDis:Boolean,
      //remove:Boolean
    },
    data(){
      $this = this;
      return $data;
    },
    created:function(){
      this.baseHead=$baseHead;
      this.removeGroup[this.index]=false
    },
    watch:{

    },
    methods:{
      aNClickListen:function($b){
        this.$emit('aNClickListen',this.index,$b);
      },
      checkClick:function(e){
        this.$emit('checkedListen',this.index,e.target.checked);
      },
      checkRemove:function(){
        if(this.removeGroup[this.index]){this.$set(this.removeGroup, this.index, false);}
        else {this.$set(this.removeGroup, this.index, true);}
      },
      clickRemove:function(){
        this.$emit('removeClickListen',this.index);
      }
    },
    components:{
      'aN':acountNumber
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .goodsList{
    .goodsListContentLi{
      font-size:0;
      background: white;
      height: 180px;
      border-bottom: 1px solid #f5f5f5;
      padding-top: 15px;
      z-index:20;
      padding-left:20px;
      li{
        color: #5C6670;
        font-size:14px;
        font-weight: normal;
        text-align: center;
        display:inline-block;
        vertical-align: middle;
      }
      li.title{
        margin-left:20px;
        margin-right:20px;
        width:200px;
        text-align:left;
      }
      li.remove{
        position: relative;
        top: 3px;
        margin-left:145px;
      }
      .count-style{
        color: #C8161E;
        width: 60px;
        white-space: nowrap;
      }
      .fix-img-style{
        margin-left:69px;
        img{
          width:150px;
          height:150px;
          cursor:pointer;
        }
      }
    }
  }
</style>

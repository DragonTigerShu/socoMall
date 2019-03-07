<template>
  <!-- 地址栏 -->
  <div class="addressLi" :class="{'selected':isSelected}" @click="selectedListen">
    <h6>{{data.consignee}}</h6><span :class="parseInt(data.is_default)==1?'default':'none'">默认</span>
    <p>{{data.mobile}}</p>
    <p>{{data.pname}} {{data.zname}} {{data.xname}}</p>
    <p class="detailAddress" :title="data.addressDetail">{{data.address}}</p>
    <div class="toolLine">
      <span @click="editListen">修改</span><span @click="deleteListen">删除</span>
    </div>
    <img :src='selectedImg'>
  </div>
</template>

<script>
  export default {
    name: 'addressLi',
    props: {
      isSelected:{
        type:Boolean,
        default:false
      },
      data:Object,
      addressId:Number
    },
    data(){
      return {
        'selectedImg':require('../../common/images/shoppingCart/selected.png')
      };
    },
    created: function () {
    },
    mounted:function(){

    },
    watch:{
      　　
    },
    methods:{
      selectedListen:function(){
        this.$emit('selectedListen',this.data.address_id);
      },
      editListen:function(e){
        this.$emit('editListen',this.data.address_id);
        e.stopPropagation();
      },
      deleteListen:function(e){
        this.$emit('deleteListen',this.data.address_id);
        e.stopPropagation();
      }
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='scss'>
  .addressLi{
    &:hover{
      .toolLine{
        display:block;
      }
      img{
        display:none;
      }
      box-shadow: 0px 2px 6px #cbcbcb;
    }
    margin-top:20px;
    box-sizing:border-box;
    width:270px;
    height:180px;
    border-radius:4px;
    color:#5C6670;
    padding:28px 20px 0px 30px;
    position:relative;
    display:block;
    border:1px solid #e0e0e0;
    cursor: default;
    h6{
      font-size:18px;
      margin-bottom:6px;
      color:#5C6670;
    }
    p{
      font-size:14px;
      color:#5C6670;
    }
    p.detailAddress{
      text-overflow: -o-ellipsis-lastline;  
      overflow: hidden;  
      text-overflow: ellipsis;  
      display: -webkit-box;  
      -webkit-line-clamp: 2;  
      -webkit-box-orient: vertical;  
    }
    span{
      font-weight:noraml;
      text-align:center;
      width:50px;
      height:20px;
      font-size:10px;
      border-radius:4px;
      color:#9da2a6;
    }
    span.default{
      background-color:#c8161e;
      color:white;
      position: absolute;
      top: 12px;
      right: 12px;
      line-height:20px;
    }
    span.none{
      display:none;
    }
    .toolLine{
      display:none;
      position:absolute;
      bottom: 10px;
      right:0px;
      span{
        margin-right:15px;
        cursor:pointer;
      }
    }
    img{
      display:none;
      position:absolute;
      bottom: 10px;
      right:10px;
      span{
        margin-right:15px;
        cursor:pointer;
      }
    }
  }
  .addressLi:hover{
    
  }
  .addressLi.selected{
    background:#f5f5f5;
    border:1px solid white;
    img{
      display:block;
    }
    .toolLine{
      display:none;
    }
    &:hover{
      img{
        display:none;
      }
      .toolLine{
        display:block;
      }
    }
  }
</style>

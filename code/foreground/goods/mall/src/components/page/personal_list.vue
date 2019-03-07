<template>
   <div class="personal_list" v-show="personal_list">
   	   	<div class="nav info">
			    <ul class="fl-r"> 
					<li @click="event(0)" class="active"><router-link :to="{}">个人中心</router-link></li>
					<li @click="event(1)"><router-link :to="{}">我的订单</router-link></li>
					<li @click="event(2)"><router-link :to="{}">收货地址</router-link></li>
					<li @click="event(3)"><router-link :to="{}">修改密码</router-link></li>
					<li @click="event(4)"><router-link :to="{}">退出登录</router-link></li>
					<div class="clear"></div>
				</ul>
		</div>
   </div>
</template>
<script>
var $this = {};
var $data = {
  mydialog: false,
  dialogPassword: false
};
export default {
  props: {
    personal_list: Boolean,
    userNames: String
  },
  data() {
    $this = this;
    return $data;
  },
  methods: {
    event:function(index){
      $this.$emit("order_topIndex",index);
    }
  },
  components: {}
};
</script>
<style lang="scss">
.personal_list{
  background: #fff;
  height: 52px;
  border-radius: 8px;
  margin-top: 14px;
  margin-bottom: 50px;
  box-shadow: 0px 2px 6px #cbcbcb;
  left: 20px;
  position: absolute;
  top: 38px;
  z-index: 99;
  width: 1200px;
  left: 50%;
  margin-left: -600px;
  transition: all 2s ease-out;
  .info {
    li {
      float: left;
      a {
        color: #5c6670;
        font-size: 14px;
        line-height: 55px;
        padding: 18px 22px;
        transition: all 0.3s;
        &:hover {
          color: darkgrey;
        }
      }

      &:nth-of-type(5) {
        margin-right: 27px;
      }
    }
  }
}
</style>
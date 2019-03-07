<template>
	<div class="order_address">
    <template v-if="data['return_goods_info']">
      <h3>订单信息</h3>
      <section class="goodsListContent">
        <ul class="goodsListContentLi">
          <li class="fix-img-style"><img :data-id="data['order_goods_info']['goods_id']" :src="baseHead+data['order_goods_info']['goods_thumb']"></li>
          <li style="justify-content: flex-start;">{{data['order_goods_info'].goods_name}} {{data['order_goods_info'].spec_key_name}}</li>
          <li >￥{{data['order_goods_info'].goods_price}}</li>
          <li >X{{data['order_goods_info'].goods_number}}</li>
          <li v-if="data['return_goods_info']['status']==0">{{typeArray[data['return_goods_info']['type']]}}</li>
        </ul>
      </section>
      <div class="order_diail">
        <h4>收货信息</h4>
        <section>
          <div>
            <label>收货人名:</label><p>{{data['order_info'].consignee}}</p>
          </div>
          <div>
            <label>联系电话:</label><p>{{data['order_info'].mobile}}</p>
          </div>
          <div>
            <label>收货地址:</label><p>{{data['order_info'].province}} {{data['order_info'].city}} {{data['order_info'].area}} {{data['order_info'].address}}</p>
          </div>
        </section>
      </div>
      <div class="order_diail">
        <h4>发票信息</h4>
        <section v-if="data['order_info'].inv_type==0">
          <div>
            <label>发票类型:</label><p>普通纸质发票</p>
          </div>
          <div v-if="data['order_info'].inv_payee">
            <label>发票抬头:</label><p>{{data['order_info'].inv_payee}}</p>
          </div>
          <div v-if="data['order_info'].co_name">
            <label>公司名称:</label><p>{{data['order_info'].co_name}}</p>
          </div>
          <div v-if="data['order_info'].co_ident_no">
            <label>纳税人识别号:</label><p>{{data['order_info'].co_ident_no}}</p>
          </div>
        </section>
        <section v-if="data['order_info'].inv_type==1">
          <div>
            <label>发票类型:</label><p>增值税专用发票</p>
          </div>
          <div>
            <label>公司名称:</label><p>{{data['order_info'].co_name}}</p>
          </div>
          <div>
            <label>纳税人识别号:</label><p>{{data['order_info'].co_ident_no}}</p>
          </div>
          <div>
            <label>开户银行:</label><p>{{data['order_info'].dep_bank}}</p>
          </div>
          <div>
            <label>开户银行账户:</label><p>{{data['order_info'].dep_bank_no}}</p>
          </div>
          <div>
            <label>注册地址:</label><p>{{data['order_info'].reg_address}}</p>
          </div>
          <div>
            <label>注册电话:</label><p>{{data['order_info'].reg_number}}</p>
          </div>
        </section>
      </div>  
    </template>
    <template v-else>
      <div class="order_detail_edit" v-if="data['order_status']==0&&data['pay_status']==0">
        <button @click="editOrder">修改</button>
      </div>
      <h3>订单信息</h3>
      <section class="goodsListContent" @click="ulClickListen($event)" v-if="data.order_goods_list">
        <ul class="goodsListContentLi" v-for="(d,index) in data.order_goods_list" :key="index">
          <li class="fix-img-style"><img :data-id="d.goods_id" :src="baseHead+d.goods_thumb"></li>
          <li >{{d.goods_name}} {{d.spec_key_name}}</li>
          <li >￥{{d.goods_price}}</li>
          <li >X{{d.goods_number}}</li>
          <li style="cursor:pointer" v-if="(parseInt(data.order_status)==2||parseInt(data.order_status)==4)&&checkComfirmTime(d.receive_time
          )" :data-function="1" :data-orderid="data.order_id" :data-recid="d.rec_id" >售后申请</li>
        </ul>
      </section>
      <div class="order_diail">
        <h4>收货信息</h4>
        <section>
          <div>
           <label>收货人名:</label><p>{{data.consignee}}</p>
         </div>
         <div>
           <label>联系电话:</label><p>{{data.mobile}}</p>
         </div>
         <div>
           <label>收货地址:</label><p>{{data.province}} {{data.city}} {{data.area}} {{data.address}}</p>
         </div>
       </section>
     </div>
     <div class="order_diail" v-if="data.pay_status==1">
      <h4>支付信息</h4>
      <section>
        <div>
          <label>支付方式:</label><p>{{data.pay_name}}</p>
        </div>
        <div>
          <label>支付时间:</label><p v-if="data.pay_time!=0">{{transformTime(data.pay_time)}}</p>
        </div>
      </section>
    </div>
    <div class="order_diail" v-if="data.shipping_status==1">
      <h4>快递信息</h4>
      <section>
        <div>
          <label>快递公司:</label><p>{{data.delivery_list.express_co}}</p>
        </div>
        <div>
          <label>快递单号:</label><p>{{data.delivery_list.express_no}}</p>
        </div>
        <div>
          <label>快递时间:</label><p v-if="data.delivery_list.add_time!=0">{{transformTime(data.delivery_list.add_time)}}</p>
        </div>
      </section>
    </div>
    <div class="order_diail">
      <h4>发票信息</h4>
      <section v-if="data.inv_type==0">
        <div>
          <label>发票类型:</label><p>普通纸质发票</p>
        </div>
        <div v-if="data.inv_payee">
          <label>发票抬头:</label><p>{{data.inv_payee}}</p>
        </div>
        <div v-if="data.co_name">
          <label>公司名称:</label><p>{{data.co_name}}</p>
        </div>
        <div v-if="data.co_ident_no">
          <label>纳税人识别号:</label><p>{{data.co_ident_no}}</p>
        </div>
      </section>
      <section v-if="data.inv_type==1">
        <div>
          <label>发票类型:</label><p>增值税专用发票</p>
        </div>
        <div>
          <label>公司名称:</label><p>{{data.co_name}}</p>
        </div>
        <div>
          <label>纳税人识别号:</label><p>{{data.co_ident_no}}</p>
        </div>
        <div>
          <label>开户银行:</label><p>{{data.dep_bank}}</p>
        </div>
        <div>
          <label>开户银行账户:</label><p>{{data.dep_bank_no}}</p>
        </div>
        <div>
          <label>注册地址:</label><p>{{data.reg_address}}</p>
        </div>
        <div>
          <label>注册电话:</label><p>{{data.reg_number}}</p>
        </div>
      </section>
	  	 	<!-- <div class="invoices" v-if="num==0">
	  	 		<button type="button">
	  	 			查看发票
	  	 		</button>
	  	 		<button type="button">
	  	 			下载发票
	  	 		</button>
	  	 	</div> -->
	  	 </div>	 
	  	 <div class="outlay">
	  	 	<p>含运费: <i>{{data.shipping_fee}}元</i></p>
        <template v-if="data.discount!=''&&data.discount!=0"><p>调整金额: <i>{{data.discount}}元</i></p></template>
        <p>共<em><template v-if="data.order_goods_list">{{data.order_goods_list.length}}</template><template v-else>*</template></em>件商品 <span>支付金额：</span> <small>{{data.total_amount}}</small>元</p>
      </div>
    </template>
  </div>
</template>
<script>
  var $this = {};
  var $data = {
   baseHead:'',
   orderId:'',
   time:0,
   clock:'',
   flag:false,
   orderType:'',
   orderTypeArray:['已结束','待付款','待收货','已完成'],
   typeArray:['退款退货中','换货中','退款中'],
 };
 export default{
	name:'address_message', //订单详情页面
    props:{  // 期望在父组件传下来，子组件需要显示props
      data:Object
    },
    components:{
     
    },
    created:function(){
     this.baseHead=$baseHead;
   },
   data() {
    $this = this;
    return $data;
  },
  methods:{
    checkComfirmTime:function(time){
      if(parseInt(time) + 604800 < new Date().getTime()/1000)return false;
      return true;
    },
    editOrder:function(){
      $this.$router.push({name: 'info_order_goods/order_details_edit',params:{id:$this.data['order_id']}})
    },
    ulClickListen:function(e) {
      switch (e.target.nodeName.toLowerCase()){
        case 'img':{
          const index = parseInt(e.target.dataset.id);
          if(!isNaN(index))window.open($hostUrl+'/#/detail/'+index);
          break;
        }
        case 'li':{
          const fun = parseInt(e.target.dataset.function);
          if(fun==1){
            const recId = parseInt(e.target.dataset.recid);
            $this.$router.push({name: 'info_order_goods/info_afterSale_list',params:{recId:recId}});
          }
        }
      }
    },
  }, 
  components:{
    
  },
}
</script>
<style lang="scss">
	.order_address{
    width: 940px;
    border-radius:4px;
    padding: 30px;
    background:#fff;
    margin-bottom: 20px;
    position: relative;
    letter-spacing: 1px;
    .order_detail_edit{
      position:absolute;
      top: 30px;
      right: 70px;
      button{
        text-align: center;
        width:90px;
        height:40px;
        color:#9da2a6;
        background:white;
        border:0;
        outline:none;
        border-radius:8px;
        line-height:30px;
        font-size:14px;
        box-sizing:border-box;
        border:1px solid #e0e0e0;
        cursor:pointer;
        letter-spacing:1px;
      }
    }
    h3{
      margin-bottom:35.5px;
      font-size: 20px;
      color: #333333;
      font-weight: 600;
    }
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
    .order_diail{
      position: relative;
      h4{
       margin-top:40px;
       font-size: 16px;
       color: #333;
       font-weight: bold;
       margin-bottom: 10px;	
       span{
         color:#d31111;
         margin-left:10px;
         em{
           color:#d31111;
           display:inline-block;
           margin:0 10px;
           
         }
       }
     }

     section{
      div{
        display:flex;
        label{
          font-size: 14px;
          color: #5C6670;
          padding-right: 5px;
          display: block;
          margin:10px 0;
        }
        p{
          flex:1;
          margin-left: 10px;
          font-size: 14px;
          margin:10px 0;
        }
      }
    }
    .invoices{
      text-align: right;	
      position: absolute;
      right: 0;
      top:0;
      margin-top: -20px;
      button{
       display: block;
       margin: 20px 0;
       color: #000;
       border-radius: 8px;
       border: 0;
       outline: none;
       width: 120px;
       height: 30px;
       line-height: 30px;
       background: #5C6670;
       color: #fff;
       font-size: 12px;
       letter-spacing: 1px;
       cursor: pointer;
     }
   }   		
 }
 .outlay{
  text-align: right;
  p{
   font-size: 14px;
   color: #5C6670;
   line-height: 40px;
   i{
    color:#C8161E;
    font-size: 20px;
  }
  em{
    margin:0 5px;
  }
  span{
    margin: 0 0px 0 10px;
  }
  &:nth-last-child(1) small{
    color:#C8161E;
    font-size: 36px;
  }
}
}
}
</style>
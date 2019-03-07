import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/page/Index.vue'
import Detail from '@/components/page/Detail.vue'
import Product from '@/components/page/Product.vue'  // 首页商品展示详情
import shoppingCart from '@/components/shoppingCartService/shoppingCart.vue'
import shoppingCartService from '@/components/shoppingCartService/shoppingCartService.vue' // 购物车页 - 购物车 xzj
import shoppingCartOrder from '@/components/shoppingCartService/shoppingCartOrder.vue' // 购物车页 - 填写订单信息 xzj
import shoppingCartPay from '@/components/shoppingCartService/shoppingCartPay.vue'  // 购物车页 - 支付 xzj
import shoppingCartOK from '@/components/shoppingCartService/shoppingCartOK.vue'  // 购物车页 - 完成 xzj
import info_afterSale from '@/components/afterSaleService/info_afterSale.vue' // 售后申请服务
import info_afterSale_check from '@/components/afterSaleService/info_afterSale_check.vue' // 售后导航子组件
import info_aftersale_cation_one_application from '@/components/afterSaleService/info_aftersale_cation_one_application.vue'  // 退款审核
import info_aftersale_cation_one_application_edit from '@/components/afterSaleService/info_aftersale_cation_one_application_edit.vue'  // 退款审核编辑
import info_afterSale_cation_success from '@/components/afterSaleService/info_afterSale_cation_success.vue'  // 申请审核成功或通过
import info_aftersale_cation_fail from '@/components/afterSaleService/info_aftersale_cation_fail.vue'  // 售后审核拒绝
import info_aftersale_cation_two_application from '@/components/afterSaleService/info_aftersale_cation_two_application.vue'  // 退款退货审核
import info_aftersale_cation_two_application_edit from '@/components/afterSaleService/info_aftersale_cation_two_application_edit.vue'  // 退款退货审核审核编辑
import info_aftersale_cation_two_exchange from '@/components/afterSaleService/info_aftersale_cation_two_exchange.vue'  // 换货填写物流单
import info_aftersale_cation_three_application from '@/components/afterSaleService/info_aftersale_cation_three_application.vue'  // 换货审核
import info_aftersale_cation_three_application_edit from '@/components/afterSaleService/info_aftersale_cation_three_application_edit.vue'  // 退款退货审核审核编辑
import info_aftersale_cation_three_exchange from '@/components/afterSaleService/info_aftersale_cation_three_exchange.vue'  // 换货填写物流单
import info_aftersale_cation_three_address from '@/components/afterSaleService/info_aftersale_cation_three_address.vue'  // 商家等待收货
import info_aftersale_cation_three_pay from '@/components/afterSaleService/info_aftersale_cation_three_pay.vue'  // 用户支付运费
/****
 * 售后信息 个人中心 订单详情 售后地址  
 */
import info_order_goods from '@/components/personal/info_order_goods.vue'  // 订单主目录
import info_order_account from '@/components/personal/info_account.vue'    // 个人中心
import info_order_list from '@/components/order/order_children/info_order.vue'           // 订单信息
import info_order_aftersale_list from '@/components/order/order_children/info_order_aftersale.vue'           // 售后订单信息
import info_address_msg from '@/components/order/order_children/info_address_msg.vue'   // 地址详情
import order_details_list from '@/components/order/order_children/order_details.vue'    // 订单详情
import order_details_list_edit from '@/components/order/order_children/order_details_edit.vue'    // 编辑订单详情
import info_afterSale_list from '@/components/order/afterSale/info_afterSale.vue'      // 售后
import info_aftersale_cation_one from '@/components/order/afterSale/info_aftersale_cation_one.vue'   // 退款
import info_aftersale_cation_two from '@/components/order/afterSale/info_aftersale_cation_two.vue'   // 退货退换
import info_aftersale_cation_three from '@/components/order/afterSale/info_aftersale_cation_three.vue'   // 换货
Vue.use(Router)
const routes = [
  {
    path: '/',   // 代表首页默认显示
    component: Index,
    children: [
    {path: '', component: Product, name: 'Product'},
    {path: '/detail/:id', component: Detail, name: 'detail'}
    ]
  },
  {
      path: "*",
      redirect: "/"
  },
  {
    path: '/info_order_goods',  // 商品订单信息
    component: info_order_goods,
    children: [
      {path: '', component: info_order_account, name: 'info_order_goods/info_account'},   // 个人信息
      {path: '/info_order_goods/order_children/info_order_list', component: info_order_list, name: 'info_order_goods/info_order_list'},        // 订单服务
      {path: '/info_order_goods/order_children/info_order_aftersale_list', component: info_order_aftersale_list, name: 'info_order_goods/info_order_aftersale_list'},        // 售后服务
      {path: '/info_order_goods/order_children/info_address_msg', component: info_address_msg, name: 'info_order_goods/info_address_msg'},      // 收货地址
      {path: '/info_order_goods/order_children/order_details/:id', component: order_details_list, name: 'info_order_goods/order_details'},           // 收货地址
      {path: '/info_order_goods/order_children/order_details_edit/:id', component: order_details_list_edit,name: 'info_order_goods/order_details_edit'},           // 修改订单
      {path: '/info_order_goods/order_children/pay/:id', component: shoppingCartPay,name:'info_order_goods/pay'}, // 支付 与购物车内支付共用同一个页面，为了路由名称统一设置，与购物车支付仅路由不一样
      {path: '/info_order_goods/afterSale/info_afterSale_list/:recId', component: info_afterSale_list, name: 'info_order_goods/info_afterSale_list'},  // 售后主页
      {path: '/info_order_goods/afterSale/Aftersale_cation_one/:recId', component: info_aftersale_cation_one, name: 'info_order_goods/info_aftersale_cation_one'},    // 退款
      {path: '/info_order_goods/afterSale/Aftersale_cation_two/:recId', component: info_aftersale_cation_two, name: 'info_order_goods/info_aftersale_cation_two'},    // 退货退款
      {path: '/info_order_goods/afterSale/Aftersale_cation_three/:recId', component: info_aftersale_cation_three, name: 'info_order_goods/info_aftersale_cation_three'},   // 换货
      {path: '/afterSale_order/afterSaleService_one/application/edit/:id', component: info_aftersale_cation_one_application_edit,name:'info_aftersale_cation_one_application_edit'},  // 退款编辑
      {path: '/afterSale_order/afterSaleService_two/application/edit/:id', component: info_aftersale_cation_two_application_edit,name:'info_aftersale_cation_two_application_edit'},  // 退货退款编辑
      {path: '/afterSale_order/afterSaleService_three/application/edit/:id', component: info_aftersale_cation_three_application_edit,name:'info_aftersale_cation_three_application_edit'},  // 换货编辑
      ]
    },
    {
    path: '/afterSale_order', // 售后订单 路由
    component: info_afterSale,
    children: [
      {path: '', component: info_afterSale_check},  // 售后导航子组件
      {path: '/afterSale_order/checkOder/:id', component: info_afterSale_check,name:'info_afterSale_check'},  // 售后导航子组件
      {path: '/afterSale_order/afterSaleService_one/application/:id', component: info_aftersale_cation_one_application,name:'info_aftersale_cation_one_application'},  // 退款申请
      {path: '/afterSale_order/afterSaleService_one/success/:id', component: info_afterSale_cation_success,name:'info_aftersale_cation_one_success'},   // 买家处理退款申请成功
      {path: '/afterSale_order/afterSaleService_one/fail/:id', component: info_aftersale_cation_fail,name:'info_aftersale_cation_one_fail'},   // 买家处理退款申请信息
      {path: '/afterSale_order/afterSaleService_two/application/:id', component: info_aftersale_cation_two_application,name:'info_aftersale_cation_two_application'}, // 退货退换申请
      {path: '/afterSale_order/afterSaleService_two/exchange/:id', component: info_aftersale_cation_two_exchange,name:'info_aftersale_cation_two_exchange'}, // 退货退换申请寄回商品
      {path: '/afterSale_order/afterSaleService_two/wait/:id', component: info_aftersale_cation_two_exchange,name:'info_aftersale_cation_two_exchange_wait'}, // 退货商品等待确认信息
      {path: '/afterSale_order/afterSaleService_two/success/:id', component: info_afterSale_cation_success,name:'info_aftersale_cation_two_success'}, // 退款申请成功
      {path: '/afterSale_order/afterSaleService_two/fail/:id', component: info_aftersale_cation_fail,name:'info_aftersale_cation_two_fail'},//退款退货成功
      {path: '/afterSale_order/afterSaleService_three/application/:id', component: info_aftersale_cation_three_application,name:'info_aftersale_cation_three_application'},
      {path: '/afterSale_order/afterSaleService_three/exchange/:id', component: info_aftersale_cation_three_exchange,name:'info_aftersale_cation_three_exchange'},
      {path: '/afterSale_order/afterSaleService_three/wait/:id', component: info_aftersale_cation_three_exchange,name:'info_aftersale_cation_three_exchange_wait'},
      {path: '/afterSale_order/afterSaleService_three/address/:id', component: info_aftersale_cation_three_address,name:'info_aftersale_cation_three_address'},
      {path: '/afterSale_order/afterSaleService_three/pay/:id', component: info_aftersale_cation_three_pay,name:'info_aftersale_cation_three_pay'},
      {path: '/afterSale_order/afterSaleService_three/success/:id', component: info_afterSale_cation_success,name:'info_aftersale_cation_three_success'},
      {path: '/afterSale_order/afterSaleService_three/fail/:id', component: info_aftersale_cation_fail,name:'info_aftersale_cation_three_fail'}
      ]
    },
    {
      path: '/shoppingCart',
      component: shoppingCart,
      children: [
      {path: '', component: shoppingCartService},  // 购物车页 - 购物车 xzj 默认
      {path: '/shoppingCart/Service', component: shoppingCartService}, // 购物车页 - 购物车 xzj
      {path: '/shoppingCart/Order', component: shoppingCartOrder}, // 购物车页 - 填写订单信息 xzj
      {path: '/shoppingCart/Pay/:id', component: shoppingCartPay,name:'shoppingCartPay'}, // 购物车页 - 支付 xzj
      {path: '/shoppingCart/OK/:id', component: shoppingCartOK,name:'shoppingCartOK'} // 购物车页 - 完成 xzj
      ]}]
      const router = new Router({
        routes: routes,
      })
      export default router
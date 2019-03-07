import Vue from 'vue'
import Vuex from 'vuex'
import axios from '@/common/js/axios.js'
Vue.use(Vuex)
//Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：
import vuex_dialog from './vuex_dialog.js';//引入vuex_dialog对象
import vuex_order from './vuex_order.js';//引入vuex_order对象
export default new Vuex.Store({
  modules: {
    dialog: vuex_dialog,
    order: vuex_order
  },
  state:{
    $cart:'',//购物车
  },
  getters: {
    /*$baseHead: (state, getters) => state.$baseHead,
    $bannerPath:(state, getters)=> state.$bannerPath,
    $hostUrl:(state, getters)=> state.$hostUrl,
    $baseHead:(state, getters)=> state.$baseHead,
    $codePicPath:(state, getters)=> state.$codePicPath,
    $headPicPath:(state, getters)=> state.$headPicPath,*/
  },
  mutations:{
    $cartUpdate:(state,n) => {
      state.$cart = n;
    }
  },
  actions: {
    $cartUpdate:(context,$this) => {
      return axios({
        method:'post',
        url: $basePath+'?c=Cart&m=getCarts',
        data:{}
      })
      .then((response) => {
        switch(parseInt(response.data.code)){
          case 1000500 :{
            context.commit('$cartUpdate',response.data.data);
            break;
          }
          case 1000510 :$this.appListen("inform","服务器忙,读取购物车失败,请稍后重试");break;
          case 1000520 :$this.appListen("inform","服务器忙,读取购物车失败,请稍后重试");break;
          case 888 :$this.loginAgain();break;
          default :$this.appListen("inform","服务器忙,读取购物车失败,请稍后重试");break;
        }
      })
      .catch(function (error) {
      
      });
    },
    $cartUpdateCustom:(context) => {
      return axios({
        method:'post',
        url: $basePath+'?c=Cart&m=getCarts',
        data:{}
      })
    }
  }
})
    //本地
    // $basePath:'adp',    // 本地测试接口
    // $bannerPath:'api/',  // 本地测试
    // $hostUrl:'http://127.0.0.1:8090', //本地源路径
    // $baseHead:'http://scshop.chuckchen.top/server',
    // $codePicPath:this.$baseHead+'/data/image/code/',
    // $headPicPath:this.$baseHead,
    // 
    // 
    // $basePath = 'http://scshop.chuckchen.top/server/index.php'
    // $bannerPath = 'http://wx.supersoco.com:8070'
    // $hostUrl='http://scshop.chuckchen.top/index/pc-ch'
    // $baseHead='http://scshop.chuckchen.top/server'

/*...mapState([
      '$basePath','$bannerPath','$hostUrl','$baseHead','$codePicPath','$headPicPath'
    ]),*/
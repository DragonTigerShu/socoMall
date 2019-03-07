// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'   //异步请求数据
import Assets from './common/css/reset.css'
import Common from './common/css/common.css'
import Icon from './common/css/icon.css'
import Store from './common/js/store.js'
import './common/js/common.js'
import direct from '@/common/js/vScroll' // 轮播滚动
import 'babel-polyfill'
import store from './vuex/vuex.js' //vuex

Vue.use(direct);

Vue.config.productionTip = false
Vue.prototype.$http= axios
Vue.prototype.transformTime = function(timestamp){
    if(timestamp==0||timestamp==null)return '';
    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate().toString().length < 2 ? '0'+date.getDate() : date.getDate()) + ' ';
    var h = (date.getHours().toString().length < 2 ? '0'+date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes().toString().length < 2 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds().toString().length < 2 ? '0'+date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
//Vue.prototype.$vuex= vuex
window.Assets =Assets
window.Common =Common
window.Store =Store
window.Icon =Icon
/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	template: '<App/>',
	components: { App }
})
/**
 *  封装组件的总结
 *  组件开发
 *  将一个页面js+css+html 封装起来
 *  组件的数据类型传递
 *  如果是父组件传递信息给子组件的话，子组件通过props接受
 *  props的api 
 *     type 接受数据的类型
 *     dedault 默认数据的值
 *     ruqired 必须传递数据的 不能喝default 同时引用
 *     validator 自定义验证
 *   子组件给父组件传递用this.$emit("app",app);
 *   父组件调用子组件的方法 ref=>this.$ref.xxx.子类方法
 *   solt 插槽（设置的一些空闲的位置等等）
 *
 *  父组件传递给子的数据信息
 *     先在儿子组件上绑定一个属性名,然后赋值给这个属性:m='msg'
 *     儿子接受父亲传递的数据 用props接收传递的属性名字 props:{m:{type:Array}} 
 * 
 */

export function formatDate(date, fmt) {
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
//弹出弹窗后，禁止后方主页面滚动
export function overflowDisabled(boolean){
    if(boolean){
       	document.getElementsByTagName("html")[0].style.overflow="hidden";
		document.getElementsByTagName("body")[0].style.overflow="hidden";
	}else{
		document.getElementsByTagName("body")[0].style.overflow="auto"; 
      	document.getElementsByTagName("html")[0].style.overflow="auto";
	}
}
// 滚动的指令
// 默认滚动到底部 v-scroll,
// 用法：v-scroll="directive" ,directive:默认'bottom',可以有 'top'

const vScrollTo = (el, direction = 'bottom') => {
  // top
//   el.scrollTop = direction == 'bottom'? 0:el.scrollHeight;
  el.scrollTop = 0;
};

const vScroll = {
    bind:(el,binding)=>{
        let config={childList:true,subtree:true};
        let target=el;
        let _mutation = new MutationObserver(mutationArr=>{
            vScrollTo(el,binding.value)
        })
        _mutation.observe(target,config)
    },
    inserted:(el,binding)=>{vScrollTo(el,binding.value)}
};

vScroll.install=(Vue)=>{
    Vue.directive('scroll',vScroll)
};

vScroll.name='scroll';

export default vScroll
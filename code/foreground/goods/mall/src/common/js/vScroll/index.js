import scroll from './vScroll/vScroll.js'
const directives=[
    scroll
];
const install=function(Vue,options){
    if (install.installed) return;
    directives.map((directive)=>{
        Vue.directive(directive.name,directive)
    })
};

if(typeof window !='undefined' && window.Vue){
    install(window.Vue)
    // window.Vue.use()
}

export default{
    install,
    scroll
}
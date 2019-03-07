速珂商城PC栈注意及说明事项 2018年4月18日 徐子杰 18852951350 记

1.主要信息
版本:1.0
框架:Vue + webpack
开发人员:舒龙虎,徐子杰
编译运行环境:NodeJS
正式运行环境:mall.supersoco.com服务器

2.编译及测试说明

a).引用路径位置,接口请求路径，图片前缀等
源文件/src/common/js/common.js
{
global.$basePath// 接口请求路径
global.$bannerPath// banner图获取接口路径
global.$hostUrl//支付回调等
global.$baseHead//图片基本前缀（用于图片与操作码图片获取时共同前缀添加）
const baseUrl//banner图前缀
}

b).商城PC栈路由,页面跳转路由,页面地址栏中以 /#/ 开头
源文件/src/router/index.js
略

c).NodeJS源文件运行配置依赖包,类似引用js
源文件/package.json
该文件内配置了所有需要的依赖模块及版本,启动nodejs后在源文件路径下运行npm init即可,
随后运行npm run dev，可在本地启用项目测试服务器，在完成代码修改编辑后,
用nodejs后在源文件路径下运行npm run build，打包文件放置在正式服务器上运行。
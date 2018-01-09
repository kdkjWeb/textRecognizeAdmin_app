/* 管理项目整个路由的加载 */

const Login = ()=>import('@/pages/login/login'), // 登录
	  Index = ()=>import('@/pages/index/index'), //主要一级页面
	  ProxyUsers = ()=>import('@/pages/proxy/proxy') //代理


export default {
	routes: [
		{
			path: '/',
		    name: 'Login',
		    component: Login
		},
		{
			path: '/index',
			name: 'Index',
			component: Index,
			redirect: '/index/proxy',
			children: [
				{
					path: 'proxy',
					name: 'ProxyUsers',
					component: ProxyUsers
				}
			]
		},
	]
}
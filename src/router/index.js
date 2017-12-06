import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/Home'
import Kind from '@/page/Kind'
import Detail from '@/page/Detail'
import Cart from '@/page/cart'
import My from '@/page/my'
import Register from '@/page/register'

import App from '@/App'


Vue.use(Router)
var routes = [
    {
      path: '/',
      name: 'app',
      component: App,
      redirect:'/home',
      children:[
      	{
      		path: '/home',
		    name: 'home',
		    component: Home
      	},{
      		path: '/kind',
		    name: 'kind',
		    component: Kind
      	},{
      		path: '/detail',
		    name: 'detail',
		    component: Detail
      	},{
      		path: '/cart',
		    name: 'cart',
		    component: Cart
      	},{
      		path: '/my',
		    name: 'my',
		    component: My
      	},{
      		path: '/register',
		    name: 'register',
		    component: Register
      	}
      ]
    }
]
var router = new Router({
	routes
})
export default router

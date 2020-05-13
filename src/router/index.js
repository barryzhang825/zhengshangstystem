import Vue from 'vue'
import VueRouter from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/login'
import OurService from '@/components/ourService'
import AboutUs from '@/components/aboutUs'
import CustomerCase from '@/components/customerCase'
import CustomerClass from '@/components/customerClass'
import CustomerCaseDetail from '@/components/customerCaseDetail'
import Company from '@/components/company'
import NewsCenter from '@/components/newsCenter'
import NewsClass from '@/components/newsClass'
import OurAdvantage from '@/components/ourAdvantage'
import Parternar from '@/components/parternar'
import Slideshow from '@/components/slideshow'
import CustomerDemand from '@/components/customerDemand'
import NewsTinym from '@/components/newsTinym'
Vue.use(VueRouter)

const routes = [
  {path:"/",redirect:"/login"},   //重定向（默认首页）
  //{path:"/",redirect:"/newsTinym"},   //重定向（默认首页）
  {
    path: '/newsTinym',
    name: 'NewsTinym',
    component: NewsTinym
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/ourService',
    name: 'OurService',
    component: OurService
  },
  {
    path: '/aboutUs',
    name: 'AboutUs',
    component: AboutUs
  },
	{
		path: '/customerCaseDetail',
		name: 'CustomerCaseDetail',
		component: CustomerCaseDetail
	},
	{
		path: '/company',
		name: 'Company',
		component: Company
	},
	{
	  path: '/customerCase',
	  name: 'CustomerCase',
	  component: CustomerCase
	},
  {
    path: '/customerClass',
    name: 'CustomerClass',
    component: CustomerClass
  },
  {
    path: '/newsCenter',
    name: 'NewsCenter',
    component: NewsCenter
  },
  {
    path: '/newsClass',
    name: 'NewsClass',
    component: NewsClass
  },
	{
		path: '/ourAdvantage',
		name: 'OurAdvantage',
		component: OurAdvantage
	},
	{
		path: '/parternar',
		name: 'Parternar',
		component: Parternar
	},
	{
		path: '/slideshow',
		name: 'Slideshow',
		component: Slideshow
	},
	{
		path: '/customerDemand',
		name: 'CustomerDemand',
		component: CustomerDemand
	}
]
//3、创建路由实例
const router = new VueRouter({
  //mode: 'history',
  routes // (缩写) 相当于 routes: routes
})

export default router;

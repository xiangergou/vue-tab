import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/index'
import Home from '@/views/home'
import Nav from '@/views/nav'
import List from '@/views/nav/components/list'
import goldBaby from '@/views/activePages/goldBaby'
import goldMakeup from '@/views/activePages/goldMakeup'
import Article from '@/views/article/index.vue'
import Detail from '@/views/article/detail.vue'
import Search from '@/views/search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'tbd',
      redirect: '/home',
      component: Layout,
      children: [{
        path: '/home',
        name: 'home',
        component: Home
      }, {
        path: '/nav',
        name: 'nav',
        component: Nav,
        redirect: '/nav/list',
        children: [{
          path: '/nav/list',
          name: 'list',
          component: List
        }, {
          path: '/navi/list',
          name: 'list',
          component: List
        }, {
          path: '/goldBaby',
          name: 'goldBaby',
          component: goldBaby
        }, {
          path: '/goldMakeup',
          name: 'goldMakeup',
          component: goldMakeup
        }]
      }, {
        path: '/navi/article',
        name: 'article',
        component: Detail
      }, {
        name: 'information',
        path: '/information',
        component: Article
      }, {
        name: 'search',
        path: '/search',
        component: Search
      }, {
        path: '/article',
        name: 'article',
        component: Detail
      }, {
        path: '/navi/homePage',
        name: 'home',
        component: Home
      } ]
    }
  ]
})

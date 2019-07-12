import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: resolve => require(['../components/common/Home.vue'], resolve),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: resolve => require(['../components/page/Dashboard.vue'], resolve),
          meta: { title: '系统首页' }
        },
        {
          path: '/menu',
          component: resolve => require(['../components/page/menu.vue'], resolve),
          meta: { title: '菜单管理' }
        },
        {
          path: '/organization',
          component: resolve => require(['../components/page/organization.vue'], resolve),
          meta: { title: '机构管理' }
        },
        {
          path: '/user-list',
          component: resolve => require(['../components/page/userList.vue'], resolve),
          meta: { title: '用户管理' }
        },
        {
          path: '/role-list',
          component: resolve => require(['../components/page/roleList.vue'], resolve),
          meta: { title: '角色管理' }
        },
        {
          path: '/404',
          component: resolve => require(['../components/page/404.vue'], resolve),
          meta: { title: '404' }
        },
        {
          path: '/403',
          component: resolve => require(['../components/page/403.vue'], resolve),
          meta: { title: '403' }
        }
      ]
    },
    {
      path: '/login',
      component: resolve => require(['../components/page/Login.vue'], resolve)
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

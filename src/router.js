import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        {
          path: '',
          name: 'home',
          component: Landing
        },
        {
          path: 'news',
          name: 'news',
          component: () => import(/* webpackChunkName: "news" */ './views/News.vue'),
        },
        {
          path: 'permits',
          name: 'permits',
          component: () => import(/* webpackChunkName: "news" */ './views/Permits.vue'),
        },
        {
          path: 'taxes',
          name: 'taxes',
          component: () => import(/* webpackChunkName: "news" */ './views/Taxes.vue'),
        }
      ]
    },
    {
      path: '/confirmation',
      name: 'Confirmation',
      component: () => import(/* webpackChunkName: "auth" */ './views/Confirmation.vue'),
    },
    {
      path: '/app',
      // component: () => import(/* webpackChunkName: "dash" */ './views/Dashboard.vue'),
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/app/Home')
        },
        // {
        //   path: 'permits',
        //   component: () => import('@/components/permits/Transactions')
        // },
        {
          path: 'taxes',
          component: () => import('@/components/taxes/Transactions')
        },
        {
          path: 'permits/business',
          name: "Business Permit",
          component: () => import("./views/app/BusinessPermit/Form.vue")
        }
      ]
    },
    {
      path: '/chatbot/reports/:sender',
      name: 'Map Reports',
      component: () => import('./views/chatbot/SendReports.vue'),
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import(/* webpackChunkName: "news" */ './views/admin/Login.vue'),
    },
    {
      path: '/admin/app',
      name: 'Main',
      component: () => import(/* webpackChunkName: "news" */ './views/admin/Main.vue'),
      children: [{
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "news" */ './views/admin/Dashboard.vue'),
      },
      {
        path: 'applications',
        name: 'Applications',
        component: () => import(/* webpackChunkName: "news" */ './views/admin/Applications.vue'),
      },
      {
        path: 'taxes',
        name: 'Local Taxes Applications',
        component: () => import(/* webpackChunkName: "news" */ './views/admin/Taxes.vue'),
      }]
    },
    {
      path: '/pdf',
      name: 'PDF View',
      component: () => import('./components/PdfView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Landing from './views/Landing'
import store from './store'

Vue.use(Router)

function isAuthenticated(to, from, next) {
  if(store.state.admin_session.admin.token){
    if(store.state.admin_session.locked){
      next('/admin/lock')
    }else{
      next()
    }    
  }else{
    next('/admin/404')
  }  
  // if(store.state.admin_session.admin.){}
}

function checkSession(to, from, next){
  console.log(from)
  if(store.state.admin_session.admin.token){
    next(from.path)
  }else{
    next()
  }
}

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
          path: 'permit',
          name: 'Permits',
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
      component: () => import(/* webpackChunkName: "dash" */ './views/Dashboard.vue'),
      children: [
        {
          path: '',
          component: () => import('./views/app/Home')
        },
        {
          path: 'permits',
          component: () => import('@/views/Permits')
          // component: () => import('@/components/permits/Transactions')
        },
        {
          path: 'taxes',
          component: () => import('@/components/taxes/Transactions')
        },
        {
          path: 'account',
          component: () => import('./views/app/Profile')
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
      beforeEnter: checkSession,
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/admin/Login.vue'),
    },
    {
      path: '/admin/lock',
      name: 'lock screen',
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/admin/LockScreen.vue'),
    },
    {
      path: '/admin/404',
      name: 'Unauthorized',
      component: () => import(/* webpackChunkName: "adminLogin" */ './views/admin/UnAuthorized.vue'),
    },
    {
      path: '/admin/app',
      name: 'Main',
      component: () => import(/* webpackChunkName: "adminMain" */ './views/admin/Main.vue'),
      children: [{
        path: '',
        name: 'Dashboard',
        component: () => import(/* webpackChunkName: "adminDashboard" */ './views/admin/Dashboard.vue'),
        beforeEnter:isAuthenticated
      },
      {
        path: 'applications',
        name: 'Applications',
        beforeEnter:isAuthenticated,
        component: () => import(/* webpackChunkName: "adminApplications" */ './views/admin/Applications.vue'),
      },
      {
        path: 'users',
        name: 'Users',
        beforeEnter:isAuthenticated,
        component: () => import(/* webpackChunkName: "adminUsers" */ './views/admin/Users.vue'),
      },
      {
        path: 'departments',
        name: 'Departments',
        beforeEnter:isAuthenticated,
        component: () => import(/* webpackChunkName: "adminDepartments" */ './views/admin/Departments.vue'),
      },
      {
        path: 'roles',
        name: 'User Roles',
        beforeEnter:isAuthenticated,
        component: () => import(/* webpackChunkName: "adminDepartments" */ './views/admin/UserRoles.vue'),
      },
      {
        path: 'references',
        name: 'Application References',
        beforeEnter:isAuthenticated,
        component: () => import(/* webpackChunkName: "adminDepartments" */ './views/admin/References.vue'),
      },
      {
        path: 'account',
        name: 'Admin Account',
        beforeEnter:isAuthenticated,
        component: () => import(/* webpackChunkName: "adminDepartments" */ './views/admin/Account.vue'),
      }]
    },
    {
      path: '/permits',
      name: "Permits",
      component: () => import('./views/Main.vue'),
      children: [{
        path: 'business',
        name: "Business Permit",
        component: () => import("./views/app/BusinessPermit/Form.vue")
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

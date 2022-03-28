import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/master'
import HelloWorld from '../components/HelloWorld'
import Login from '@/views/users/login'
import { getToken } from '@/utils/auth' // get token from cookie

const routes = [
  {
    path: '/home',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/Home'),
        name: 'Dashboard'
      },
      {
        path: 'about',
        component: () => import('@/views/About'),
        name: 'About'
      }
    ]
  },
  {
    path: '/users',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/users/index'),
        name: 'Users'
      },
      {
        path: 'create',
        component: () => import('@/views/users/create'),
        name: 'User Create'
      }
    ]
  },
  {
    path: '/invoice',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/invoice/index'),
        name: 'invoices'
      },
      {
        path: ':id',
        component: () => import('@/views/invoice/edit'),
        name: 'invoice'
      },
      {
        path: 'create',
        component: () => import('@/views/invoice/create'),
        name: 'invoice create'
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/customer/index'),
        name: 'customers'
      },
      {
        path: ':id',
        component: () => import('@/views/customer/view'),
        name: 'customer'
      }
    ]
  },
  {
    path: '/payment',
    component: Layout,
    children: [
      {
        path: '',
        component: () => import('@/views/payment/index'),
        name: 'payments'
      },
      {
        path: ':id',
        component: () => import('@/views/payment/edit'),
        name: 'payment'
      },
      {
        path: 'create',
        component: () => import('@/views/payment/create'),
        name: 'payment create'
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !getToken()) next({ name: 'Login' })
  else next()
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '@/views/layout/master'
import HelloWorld from '../components/HelloWorld'
import Login from '@/views/users/login'

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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

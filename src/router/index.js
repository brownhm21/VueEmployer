import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Dashboard from "../views/Dashboard.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  
  {
    path: '/Register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "Register" */ '../components/Register.vue')
  },
  {
    path: '/CompanyForm',
    name: 'CompanyForm',
    component: () => import(/* webpackChunkName: "Register" */ '../components/companyForm.vue')
  },
  {
    path: '/CompanyInfos',
    name: 'CompanyInfos',
    component: () => import(/* webpackChunkName: "Register" */ '../components/CompanyInfos.vue')
  },
  {
    path: '/CompanyAdd',
    name: 'CompanyAdd',
    component: () => import(/* webpackChunkName: "Register" */ '../components/CompanyAdd.vue')
  },
  {
    path: '/CompanyEdit',
    name: 'CompanyEdit',
    component: () => import(/* webpackChunkName: "Register" */ '../components/CompanyEdit.vue')
  },
  {
    path: '/employerAdd',
    name: 'employerAdd',
    component: () => import(/* webpackChunkName: "Register" */ '../components/employerAdd.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue')
    
  },
  {
    path: "/notes",
    name: "notes",
    component: () => import(/* webpackChunkName: "about" */ '../views/Notes.vue')
    
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

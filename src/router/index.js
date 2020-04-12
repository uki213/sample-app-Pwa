import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Top',
    component: () => import('../components/pages/Index/_.vue'),
    props: true
  },
  {
    path: '/ChooseFilter',
    name: 'ChooseFilter',
    component: () => import('../components/pages/ChooseFilter/_.vue'),
    props: true
  },
  {
    path: '/GalleryPreview',
    name: 'GalleryPreview',
    component: () => import('../components/pages/GalleryPreview/_.vue'),
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/stores/authStore'
import HomeView from '@/views/HomeView.vue'
import LoginView from '../views/Auth VIew/LoginView.vue'
import ContentView from '@/views/ContentView.vue'
import NotFound from '@/components/NotFound.vue'
import RegisterView from '@/views/Auth VIew/RegisterView.vue'
import HomeLand from '@/views/HomeLand.vue'
import CreateCategory from '@/components/Categories Components/CreateCategory.vue'
import CommentsView from '@/views/CommentsView.vue'
import PostsByCategory from '@/components/Categories Components/PostsByCategory.vue'
import UsersDashboard from '@/components/UsersDashboard.vue'
import DashUsersProfile from '@/components/DashUsersProfile.vue'
import ModalUpdatePost from '@/components/Posts Components/ModalUpdatePost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/comments/:id',
      name: 'comments',
      component: CommentsView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/create-category',
      name: 'CreateCategory',
      component: CreateCategory,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/categories/:id',
      name: 'postByCategory',
      component: PostsByCategory,
      meta: {
        requiresAuth: true
      }
    },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView
    },
    {
      path: '/content',
      name: 'content',
      component: ContentView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/homeland',
      name: 'homeland',
      component: HomeLand,
      meta: {
        requiresAuth: true
      }
    },
    // UsersDashboard routes
    {
      path: '/UsersDashboard/:id',
      name: 'Dashboard',
      component: UsersDashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/DashUsersProfile/:id',
      name: 'DashUsersProfile',
      component: DashUsersProfile,
      meta: {
        requiresAuth: true
      }
    },

    {
      path: '/:pathname(.*)*',
      name: 'notFound',
      component: NotFound
    },
    // {
    //   path: '/ModalUpdatePost/:id',
    //   name: 'ModalUpdatePost',
    //   component: ModalUpdatePost
    // }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isAuthenticated) { 
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

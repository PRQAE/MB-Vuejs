import { setupLayouts } from 'virtual:generated-layouts'
import { createRouter, createWebHistory } from 'vue-router'

import routes from '~pages'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: to => {
        return { name: 'login', query: to.query }
      },

      // redirect: to => {
      //   const userData = JSON.parse(localStorage.getItem('userData') || '{}')
      //   const userRole = (userData && userData.role) ? userData.role : null

      //   // if (userRole === 'admin')
      //   //   return { name: 'dashboards-analytics' }
      //   // if (userRole === 'client')
      //   //   return { name: 'access-control' }
        
      //   return { name: 'login', query: to.query }
      // },
    },
    {
      path: '/index',
      redirect: () => ({
        name: 'index',
      }),
    },
    ...setupLayouts(routes),
  ],
})

router.beforeEach(to => {
  // const isLoggedIn = isUserLoggedIn()
  // if (canNavigate(to)) {
  //   if (to.meta.redirectIfLoggedIn && isLoggedIn)
  //     return '/'
  // }

  // else {
  //   if (isLoggedIn)
  //     return { name: 'not-authorized' }
  //   else
  //     return { name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } }
  // }
})

// Docs: https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards
export default router

/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useLoginStatusStore } from '@/store/loginStatus'


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  extendRoutes: setupLayouts,
})

router.beforeEach(async ()=> {
   const loginStatusStore = useLoginStatusStore()
   const res = await fetch('/api/getme')
   if(res.ok){
      const myInformation = await res.json()
      loginStatusStore.isVisitor = myInformation.IsVisitor
      loginStatusStore.myIconBase64 = myInformation.MyIconBase64
   }
   return true
})

export default router

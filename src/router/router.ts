import { createWebHistory, createRouter, RouteLocationNormalized } from 'vue-router'

import MainView from '@/views/MainVue.vue'
import AboutView from '@/views/AboutView.vue'
import SectionView from '@/views/SectionView.vue'
import { sections } from '@/content/registry'

const staticRoutes = {
  Main: { path: '/', component: MainView, },
  About: { path: '/about', component: AboutView, },
}

const sectionRoutes = sections.map(section => ({
  path: section.path,
  component: SectionView,
  props: { section },
}))

const ANCHOR_OFFSET = 0.12

const scrollPositions = new Map<string, number>()

if (window.location.hash.startsWith('#/')) {
  window.history.replaceState(null, '', window.location.hash.slice(1))
}

function scrollContainer(): HTMLElement {
  return (document.scrollingElement ?? document.documentElement) as HTMLElement
}

export function anchorTop(anchor: HTMLElement): number {
  return anchor.getBoundingClientRect().top + scrollContainer().scrollTop - window.innerHeight * ANCHOR_OFFSET
}

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...Object.values(staticRoutes),
    ...sectionRoutes,
    { path: '/:pathMatch(.*)*', redirect: '/' },
  ],
  scrollBehavior(to, from) {
    if (to.hash && from.matched.length && to.path === from.path) {
      const anchor = document.getElementById(decodeURIComponent(to.hash.slice(1)))

      if (anchor) {
        window.scrollTo({ top: anchorTop(anchor), behavior: 'smooth' })
      }

      return false
    }

    const alignToAnchor = () => {
      const anchor = document.getElementById(decodeURIComponent(to.hash.slice(1)))

      if (anchor) {
        scrollContainer().scrollTop = anchorTop(anchor)
      }
    }

    return new Promise(resolve => {
      const fonts = (document as Document & { fonts?: FontFaceSet }).fonts
      const ready = fonts ? fonts.ready : Promise.resolve()

      requestAnimationFrame(() => {
        if (!to.hash) {
          scrollContainer().scrollTop = scrollPositions.get(to.fullPath) ?? 0
          resolve(false)

          return
        }

        alignToAnchor()
        ready.then(() => requestAnimationFrame(() => {
          alignToAnchor()
          resolve(false)
        }))
      })
    })
  },
})

router.beforeEach((_, from: RouteLocationNormalized) => {
  if (from.fullPath) {
    scrollPositions.set(from.fullPath, scrollContainer().scrollTop)
  }
})

router.afterEach((to: RouteLocationNormalized) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'page_view', {
      page_path: to.fullPath,
      page_title: to.name || document.title,
    })
  }
})

export default router;
export { staticRoutes as Routes };

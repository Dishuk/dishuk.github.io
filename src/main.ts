import { createApp } from 'vue'
import App from './App.vue'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import { Router } from './router'
import { ExternalLink } from '@/components/external-link'
import { ImageViewer } from '@/components/image-viewer'
import { CodeBlock } from '@/components/code-block'
import { Links } from '@/utils/LinksUtils'
import AnalyticsUtils from '@/utils/AnalyticsUtils'

AnalyticsUtils.init()

const app = createApp(App)
  .use(Router)
  .use(VueViewer)

app.component('ExternalLink', ExternalLink)
app.component('ImageViewer', ImageViewer)
app.component('CodeBlock', CodeBlock)
app.config.globalProperties.links = Links

app.mount('#app')

<template>
  <EclipseScene text-selector=".page-col" />
  <div class="page">
    <nav v-if="back" class="page-nav" aria-label="Back">
      <RouterLink class="t-back t-label" :to="back.path">
        <ArrowLeft class="t-back-arrow" aria-hidden="true" />{{ back.label }}
      </RouterLink>
    </nav>
    <main ref="pageCol" class="page-col" :class="{ 'page-col-home': isHome }">
      <RouterView />
      <footer class="footer">
        <div class="t-caption" basics-footer footer-flex>
          <p basics-info>Updated: <span ref="lastEdit"></span></p>
          <p basics-info>
            <a basics-link decorated :href="generateMailtoLink()">{{ email }}</a>
          </p>
        </div>
      </footer>
    </main>
  </div>
  <SectionRail :key="$route.path" />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ColorUtils from '@/utils/ColorUtils'
import { EclipseScene } from '@/components/eclipse-scene';
import { SectionRail } from '@/components/section-rail';
import { ArrowLeft } from '@/components/icons';
import { Routes } from './router/router';
import { parentOf, sectionByPath } from '@/content/registry';
import ContactUtils from '@/utils/ContactUtils';
import GrainUtils from '@/utils/GrainUtils';

export default defineComponent({
  name: 'App',
  components: {
    EclipseScene,
    SectionRail,
    ArrowLeft
  },
  data() {
    return {
      colorRules: {
        darkenFactor: 30,
        decorationDarkenFactor: 50
      },
      email: ContactUtils.email,
      colorScheme: {
        "name": "Eclipse",
        "yellow": "#f4a03a",
        "white": "#efe6cf",
        "background": "#101838",
      } as { [key: string]: string }
    };
  },
  mounted() {
    this.setTheme({ ...this.colorScheme });
    this.setLastModified();
    GrainUtils.apply();
    window.addEventListener('scroll', this.syncFade, { passive: true });
    this.syncFade();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.syncFade);
  },
  computed: {
    isHome(): boolean {
      return this.$route.path === Routes.Main.path;
    },
    back(): { path: string; label: string } | null {
      const path = this.$route.path;

      if (path === Routes.Main.path) {
        return null;
      }

      const current = sectionByPath(path);
      const parent = current ? parentOf(current.id) : undefined;

      if (parent) {
        return { path: parent.path, label: parent.label };
      }

      return { path: Routes.Main.path, label: 'Main' };
    }
  },
  methods: {
    syncFade() {
      const column = this.$refs.pageCol as HTMLElement | undefined;

      column?.style.setProperty('--fade-from', `${window.scrollY}px`);
    },

    setTheme(themeJson: { [key: string]: string }) {
      this.colorScheme = themeJson;
      const root = document.documentElement;
      const dimColor = ColorUtils.darkenHex(this.colorScheme.white, this.colorRules.darkenFactor);
      const decorationColor = ColorUtils.darkenHex(this.colorScheme.white, this.colorRules.decorationDarkenFactor);

      root.style.setProperty('--background', this.colorScheme.background);
      root.style.setProperty('--text-color', this.colorScheme.white);
      root.style.setProperty('--text-color-dim', dimColor);
      root.style.setProperty('--decoration-color', decorationColor);
      root.style.setProperty('--decoration-active-color', dimColor);
      root.style.setProperty('--scrollbar', dimColor);
      root.style.setProperty('--highlight', this.colorScheme.yellow);
    },
    generateMailtoLink() {
      return ContactUtils.generateMailtoLink();
    },
    setLastModified(): void {
      const lastModified: string = document.lastModified;
      const date: Date = new Date(lastModified);
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate: string = date.toLocaleDateString('en-US', options);

      const lastEdit = this.$refs.lastEdit as HTMLParagraphElement;

      if (lastEdit) {
        lastEdit.textContent = formattedDate;
      }
    }
  }
});
</script>

<style>
@import './styles/styles.css';
</style>

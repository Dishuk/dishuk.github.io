<template>
  <article class="home">
    <header id="intro" class="home-hero" data-nav="Intro">
      <p class="t-label home-kicker">Software engineer · Mobile &amp; IoT</p>
      <h1 class="t-display">
        <RouterLink to="/about">Dmytro Hranchak<ArrowRight class="t-go" aria-hidden="true" /></RouterLink>
      </h1>
      <p class="home-text" basics-text>
        Software engineer with a solid knowledge base in various programming languages and hands-on experience in
        mobile, web, and IoT development. Started coding in 2018 and became a full-time engineer in Q2 2021. Game
        development is my hobby, mostly in Unity and Godot.
      </p>
      <nav class="home-links" aria-label="Contact">
        <a basics-link decorated :href="generateMailtoLink()"><Mail class="t-icon" aria-hidden="true" />Email</a>
        <a basics-link decorated :href="github" target="_blank" rel="noopener noreferrer"><GitHub class="t-icon" aria-hidden="true" />GitHub</a>
        <a basics-link decorated :href="linkedin" target="_blank" rel="noopener noreferrer"><LinkedIn class="t-icon" aria-hidden="true" />LinkedIn</a>
      </nav>
    </header>

    <section v-for="section in sections" :id="section.id" :key="section.id" class="home-section" :data-nav="section.label">
      <h2 class="t-title">
        <RouterLink :to="section.path">{{ section.label }}<ArrowRight class="t-go" aria-hidden="true" /></RouterLink>
      </h2>
      <p class="home-text" basics-text>
        <InlineText :segments="section.summary" />
      </p>
    </section>

    <section id="connect" class="home-section" data-nav="Connect">
      <h2 class="t-title">Connect</h2>
      <p class="home-text" basics-text>
        Feel free to reach out at <a basics-link decorated :href="generateMailtoLink()">{{ email }}</a>.
      </p>
    </section>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ContactUtils from '@/utils/ContactUtils';
import InlineText from '@/components/prose/InlineText';
import { ArrowRight, GitHub, LinkedIn, Mail } from '@/components/icons';
import { navSections } from '@/content/registry';

export default defineComponent({
  name: 'MainVue',
  components: {
    InlineText,
    ArrowRight,
    GitHub,
    LinkedIn,
    Mail
  },
  data() {
    return {
      email: ContactUtils.email,
      github: ContactUtils.github,
      linkedin: ContactUtils.linkedin,
      sections: navSections
    };
  },
  methods: {
    generateMailtoLink() {
      return ContactUtils.generateMailtoLink();
    }
  }
});
</script>

<style scoped>
.home-hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-block: 64px 12vh;
}

.home-kicker {
  margin-bottom: 14px;
}

.home-text {
  margin-top: 22px;
  max-width: 62ch;
  text-wrap: pretty;
}

.home-links {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 22px;
  margin-top: 22px;
}

.home-section {
  padding-top: 16vh;
}

@media (max-width: 860px) {
  .home-hero {
    padding-block: 52svh 10svh;
  }
}
</style>

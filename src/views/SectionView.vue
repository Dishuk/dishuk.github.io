<template>
  <article class="content" basics-section data-animation-controller="false">
    <div basics-prose>
      <h1 id="intro" class="t-title" data-nav="Intro">{{ section.label }}</h1>
      <p v-for="(paragraph, index) in section.lead ?? []" :key="index" basics-text>
        <InlineText :segments="paragraph" />
      </p>
    </div>

    <template v-for="child in childrenOf(section)" :key="child.id">
      <div delimiter />
      <div basics-prose>
        <h2 :id="child.id" class="t-title-s" :data-nav="child.label">
          <RouterLink :to="child.path">{{ child.label }}<ArrowRight class="t-go" aria-hidden="true" /></RouterLink>
        </h2>
        <p basics-text>
          <InlineText :segments="child.summary" />
        </p>
      </div>
    </template>

    <component :is="section.component" v-if="section.component" />

    <template v-for="project in projectsOf(section.id)" :key="project.id">
      <div delimiter />
      <div basics-prose>
        <h2 :id="project.id" class="t-title-s" :data-nav="project.title">{{ project.title }}</h2>
        <component :is="project.component" />
      </div>
    </template>
  </article>
</template>

<script setup lang="ts">
import InlineText from '@/components/prose/InlineText';
import { ArrowRight } from '@/components/icons';
import { childrenOf, projectsOf } from '@/content/registry';
import type { SectionEntry } from '@/content/types';

defineProps<{ section: SectionEntry }>();
</script>

<script setup lang="ts">
  defineProps<{
    images: string[];
    portrait?: boolean;
  }>();

  const options = {
    toolbar: false,
    rotatable: false,
    title: false,
    minZoomRatio: 0.1,
    maxZoomRatio: 1.5,
  }
</script>

<template>
  <viewer :images="images" :options="options">
    <img v-for="src in images" :key="src" :src="src" basics-image :portrait="portrait || undefined">
  </viewer>
</template>

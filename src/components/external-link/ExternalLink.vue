<script setup lang="ts">
  defineProps<{
    address: string;
    label: string;
  }>();
</script>

<template>
  <a basics-link
     decorated
     target="_blank"
     rel="noopener noreferrer"
     :href="address">
    {{ label }}
  </a>
</template>

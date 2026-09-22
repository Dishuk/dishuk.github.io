<template>
  <div code-block>
    <div class="t-caption" code-block-header v-if="label">
      <span>{{ label }}</span>
    </div>
    <pre code-block-pre><code>{{ code }}</code></pre>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label?: string
  code: string
}>();
</script>

<style>
[code-block] {
  border: 1px solid var(--decoration-color);
  border-radius: 6px;
  overflow: hidden;
}

[code-block-header] {
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.04);
  border-bottom: 1px solid var(--decoration-color);
}

[code-block-pre] {
  margin: 0;
  padding: 16px;
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: var(--text-s);
  line-height: var(--leading-s);
  color: var(--text-color);
  background: var(--code-surface);
  white-space: pre;
  tab-size: 2;
}

[code-block-pre] code {
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}
</style>

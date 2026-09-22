<template>
  <p class="t-label">Overview</p>
  <slot name="overview" />

  <template v-if="$slots.responsibilities">
    <p class="t-label">Role and responsibilities</p>
    <div basic-list>
      <slot name="responsibilities" />
    </div>
  </template>

  <template v-if="$slots.scope">
    <p class="t-label">Project scope</p>
    <div basic-list>
      <slot name="scope" />
    </div>
  </template>

  <template v-if="$slots.team">
    <p class="t-label">Team size</p>
    <div basic-list>
      <slot name="team" />
    </div>
  </template>

  <template v-if="$slots.tech">
    <p class="t-label">{{ techLabel }}</p>
    <div basic-list>
      <slot name="tech" />
    </div>
  </template>
</template>

<script setup lang="ts">
withDefaults(defineProps<{ techLabel?: string }>(), { techLabel: 'Tech stack' });
</script>
